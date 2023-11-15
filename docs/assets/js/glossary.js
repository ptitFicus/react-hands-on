function install (hook, vm) {
    hook.beforeEach(function(content,next) {
        //console.log(window.location.hash);
        if(window.location.hash.match(/_glossary/g)){
          next(content);
          return;
        }

        const regex = {
          title : '',
          point: ''
        }
        const commentReplaceMark = 'glossary:replace';
        const codeBlockMatch   = content.match(/(```[\s\S]*?```)/gm) || [];
        const codeBlockMarkers = codeBlockMatch.map((item, i) => {
            const codeMarker = `<!-- ${commentReplaceMark} CODEBLOCK${i} -->`;
    
            // Replace code block with marker to ensure tab markup within code
            // blocks is not processed. These markers are replaced with their
            // associated code blocs after tabs have been processed.
            content = content.replace(item, () => codeMarker);
    
            return codeMarker;
        });
        let addLinks = function(content,next,terms){
          let a = content.split('\n');
          a.forEach(function(line){
            if((!line.match(/^#/g))&&(!line.match(/^\s*$/gm))){
              
              for (let term in terms){
                let link = ` [$1](/_glossary?id=${terms[term]}) `;
                // todo gérer le point en fin de phrase
                let re = new RegExp(`(${term} )`,'ig');
                newline = line.replace(re,'<dfn title="définition">'+link+'</dfn>');
                
                content = content.replace(line, newline)
              }
            }
            
          })
          codeBlockMarkers.forEach((item, i) => {
            content = content.replace(item, () => codeBlockMatch[i]);
          });
          next(content);
        }
          
        
        // on check le chemin par défaut
        const basePath = () => {
          var origin = window.location.origin;
          var path = window.location.pathname;
          return origin + path.replace(/index.html/gi, '');
        }
        if(!window.$docsify.terms){
          // ajout de la location custom ../docs/
          // if (window.location.href.indexOf("/_glossary.md") > -1) {
          //   alert("your url contains the name franky");
          // }
          fetch(basePath()+$docsify.basePath+'/_glossary.md').then(function(data){
            //console.log(basePath()+$docsify.basePath+'/_glossary.md');
            data.text().then(function(text){
              window.$docsify.terms = {};
              
              let lines = text.split('\n');
              //console.log(lines);
              lines.forEach(function(line){
                //if (line.match()){

                  // on parse le glossaire pour sortir les termes
                  if(line.match(/##/g)){
                    //console.log("mtch");
                    let term = line.replace('##','').trim();
                    //let id = term.toLowerCase().replace(' ','-');
                    let id = term.toLowerCase().replace(/ /g,'-');
                    window.$docsify.terms[term] = id;
                    //console.log(window.$docsify.terms[term]);
                  }
                  //}
                });
                addLinks(content,next,window.$docsify.terms);
                
            })
          })
        } else{
          addLinks(content,next,window.$docsify.terms);

        }

      });
}

if (window) {
    window.$docsify = window.$docsify || {};

    // Add config object
    window.$docsify.glossary = window.$docsify.glossary || {};

    // Update settings based on $docsify config
    Object.keys(window.$docsify.glossary).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(settings, key)) {
            settings[key] = window.$docsify.glossary[key];
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