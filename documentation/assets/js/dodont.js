const settings = {
    persist    : true,
    sync       : true,
    // theme      : 'classic',
    // //tabComments: true,
    // tabHeadings: true
};
const commentReplaceMark = 'dodont:replace';
const regex = {
    // Matches markdown code blocks (inline and multi-line)
    // Example: ```text```
    codeMarkup: /(```[\s\S]*?```)/gm,
    // Matches tab set by start/end comment
    // 0: Match
    // 1: Indent
    // 2: Start comment: <!-- tabs:start -->
    // 3: Labels and content
    // 4: End comment: <!-- tabs:end -->
    dodontMarkup: /[\r\n]*(\s*)(<!-+\s+dodont:\s*?start\s+-+>)[\r\n]+([\s|\S]*?)[\r\n\s]+(<!-+\s+dodont:\s*?end\s+-+>)/m,
    doMarkup: /[\r\n]*(\s*)(<!-+\s+do:\s*?start\s+-+>)[\r\n]+([\s|\S]*?)[\r\n\s]+(<!-+\s+do:\s*?end\s+-+>)/m,
    dontMarkup: /[\r\n]*(\s*)(<!-+\s+dont:\s*?start\s+-+>)[\r\n]+([\s|\S]*?)[\r\n\s]+(<!-+\s+dont:\s*?end\s+-+>)/m,
};

function renderDodont(content, vm){
    let doDontBlockMatch;
    const doDontStartReplacement = `<div class="dodont">`;
    const endTag = `</div>`;
    const codeBlockMatch   = content.match(regex.codeMarkup) || [];

    const codeBlockMarkers = codeBlockMatch.map((item, i) => {
        const codeMarker = `<!-- ${commentReplaceMark} CODEBLOCK${i} -->`;

        // Replace code block with marker to ensure tab markup within code
        // blocks is not processed. These markers are replaced with their
        // associated code blocs after tabs have been processed.
        content = content.replace(item, () => codeMarker);

        return codeMarker;
    });
    while ((doDontBlockMatch = regex.dodontMarkup.exec(content)) !== null) {
        let doDontBlock            = doDontBlockMatch[0];
        let doStartReplacement = '';
        let dontStartReplacement = '';
        let doMatch;

        const hasDoMarkup = regex.doMarkup.test(doDontBlock);
        const hasDontMarkup = regex.dontMarkup.test(doDontBlock);
        const tabBlockStart  = doDontBlockMatch[2];
        const tabBlockEnd    = doDontBlockMatch[4];

        doStartReplacement = `<div class="block block--do"><h2 class="block__title">Do<span class="doc-picto do"></h2><span>`;
        dontStartReplacement = `<div class="block block--dont"><h2 class="block__title">Don't<span class="doc-picto dont"><span></h2>`;

        if (hasDoMarkup || hasDontMarkup){
          while (doMatch = (regex.doMarkup.exec(doDontBlock) || regex.dontMarkup.exec(doDontBlock)) !== null) {
              // test si les blocs existent
              if (regex.dontMarkup.exec(doDontBlock)){
                let dontMarkupReg = regex.dontMarkup.exec(doDontBlock);
                const dontBlockStart  = dontMarkupReg[2];
                const dontBlockEnd    = dontMarkupReg[4];
                doDontBlock = doDontBlock.replace(dontBlockStart, () => dontStartReplacement);
                doDontBlock = doDontBlock.replace(dontBlockEnd, () => endTag); 
              }
              if (regex.doMarkup.exec(doDontBlock)){
                let doMarkupReg = regex.doMarkup.exec(doDontBlock);
                const doBlockStart  = doMarkupReg[2];
                const doBlockEnd    = doMarkupReg[4];
                doDontBlock = doDontBlock.replace(doBlockStart, () => doStartReplacement);
                doDontBlock = doDontBlock.replace(doBlockEnd, () => endTag); 
              }
          }
        }
        doDontBlock = doDontBlock.replace(tabBlockStart, () => doDontStartReplacement);
        doDontBlock = doDontBlock.replace(tabBlockEnd, () => endTag);

        content = content.replace(doDontBlockMatch[0], () => doDontBlock);
    }
  // Restore code blocks
  codeBlockMarkers.forEach((item, i) => {
    content = content.replace(item, () => codeBlockMatch[i]);
  });
  return content;
}

function install(hook, vm) {
  let hasDoDont = false;
  hook.init(function() {
    // Called when the script starts running, only trigger once, no arguments,
  });

  hook.beforeEach(function(content) {
      hasDoDont = regex.dodontMarkup.test(content);

      if (hasDoDont) {
          content = renderDodont(content, vm);
      }
      
    return content;
  });
}
if (window) {
    window.$docsify = window.$docsify || {};

    // Add config object
    window.$docsify.dodont = window.$docsify.dodont || {};

    // Update settings based on $docsify config
    Object.keys(window.$docsify.dodont).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(settings, key)) {
            settings[key] = window.$docsify.dodont[key];
        }
    });
    // Init plugin
    // if (settings.dodont) {
    //     // window.$docsify.plugins = [].concat(
    //     //     docsifyTabs,
    //     //     (window.$docsify.plugins || [])
    //     // );
    //   }
      window.$docsify.plugins = (window.$docsify.plugins || []).concat(install)
    
  }

  //$docsify.plugins = [].concat(install, $docsify.plugins);
