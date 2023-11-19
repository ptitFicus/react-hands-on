var defaultOptions = {
    headings: 'h1, h2, h3',
}

var aTag = function(src) {
    var a = document.createElement('a');
    var content = src.firstChild.innerHTML;

    // 使用这个限制长度，未使用。
    // https://github.com/arendjr/text-clipper
    a.innerHTML = content;
    a.href = src.firstChild.href;
    a.onclick = activeClass;

    return a
};

var activeClass = function(e) {
    var divs = document.querySelectorAll('#jx-toc .active');

    // 删除之前的样式
    [].forEach.call(divs, function(div) {
        div.setAttribute('class', '')
    });

    // 给当前点击的项加入新的样式
    e.target.parentNode.setAttribute('class', 'active')
};

var createList = function(wrapper, count) {
    while (count--) {
        wrapper = wrapper.appendChild(
            document.createElement('ul')
        );

        if (count) {
            wrapper = wrapper.appendChild(
                document.createElement('li')
            );
        }
    }

    return wrapper;
};

var getHeaders = function(selector) {
    var allHeadings = document.querySelectorAll(selector);
    var ret = [];

    [].forEach.call(allHeadings, function(heading) {
        ret = ret.concat(heading);
    });

    return ret;
};

var getLevel = function(header) {
    var decs = header.match(/\d/g);

    return decs ? Math.min.apply(null, decs) : 1;
};

var jumpBack = function(currentWrapper, offset) {
    while (offset--) {
        currentWrapper = currentWrapper.parentElement;
    }

    return currentWrapper;
};

var buildTOC = function(options) {
    var ret = document.createElement('ul');
    var wrapper = ret;
    var lastLi = null;
    var selector = '.markdown-section ' + options.headings
    var headers = getHeaders(selector).filter(h => h.id);

    headers.reduce(function(prev, curr, index) {
        var currentLevel = getLevel(curr.tagName);
        var offset = currentLevel - prev;

        wrapper = (offset > 0)
            ? createList(lastLi || ret, offset)
            : jumpBack(wrapper, -offset * 2)

        wrapper = wrapper || ret;

        var li = document.createElement('li');

        wrapper.appendChild(li).appendChild(aTag(curr));

        lastLi = li;

        return currentLevel;
    }, getLevel(options.headings));

    return ret;
};

var goTopFunction = function(e) {
    e.stopPropagation();
    var step = window.scrollY / 50;
    var scroll = function() {
        window.scrollTo(0, window.scrollY - step);
        if(window.scrollY > 0) {
            setTimeout(scroll, 10);
        }
    };
    scroll();
};

// Docsify plugin functions
function plugin(hook, vm) {
    var userOptions = vm.config.jxtoc;

    hook.mounted(function () {
        var mainElm = document.querySelector("main");
        var content = window.Docsify.dom.find(".content");
        if (content) {
            var jxtoc = window.Docsify.dom.create("div", "");
            jxtoc.id = "jx-toc"
            window.Docsify.dom.before(mainElm, jxtoc);

            const topSVG = `
            <svg xmlns="http://www.w3.org/2000/svg"  width="20px" height="25px" viewBox="0 0 300 250">
                <path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285   C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854   c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848   c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566   C284.929,199.378,283.984,197.188,282.082,195.285z"/>
            </svg>`;

            var jxGoTop = window.Docsify.dom.create("span", topSVG);
            jxGoTop.id = "jx-toc-gotop";
            jxGoTop.onclick = goTopFunction;
            window.Docsify.dom.before(mainElm, jxGoTop);
        }
    });

    hook.doneEach(function () {
        var jxtoc = document.getElementById('jx-toc');

        if (!jxtoc) {
            return;
        }
        jxtoc.innerHTML = null

        var TocAnchor = document.createElement('svg');
        jxtoc.appendChild(TocAnchor);
        TocAnchor.outerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="25px" viewBox="0 0 45 40">
            <path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal" d="M 43 7 A 1.0001 1.0001 0 0 0 42 8 L 42 12 A 1.0001 1.0001 0 0 0 43 13 L 47 13 A 1.0001 1.0001 0 0 0 48 12 L 48 8 A 1.0001 1.0001 0 0 0 47 7 L 43 7 z M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 37 11 A 1.0001 1.0001 0 1 0 37 9 L 3 9 z M 44 9 L 46 9 L 46 11 L 44 11 L 44 9 z M 43 17 A 1.0001 1.0001 0 0 0 42 18 L 42 22 A 1.0001 1.0001 0 0 0 43 23 L 47 23 A 1.0001 1.0001 0 0 0 48 22 L 48 18 A 1.0001 1.0001 0 0 0 47 17 L 43 17 z M 3 19 A 1.0001 1.0001 0 1 0 3 21 L 37 21 A 1.0001 1.0001 0 1 0 37 19 L 3 19 z M 44 19 L 46 19 L 46 21 L 44 21 L 44 19 z M 43 27 A 1.0001 1.0001 0 0 0 42 28 L 42 32 A 1.0001 1.0001 0 0 0 43 33 L 47 33 A 1.0001 1.0001 0 0 0 48 32 L 48 28 A 1.0001 1.0001 0 0 0 47 27 L 43 27 z M 3 29 A 1.0001 1.0001 0 1 0 3 31 L 37 31 A 1.0001 1.0001 0 1 0 37 29 L 3 29 z M 44 29 L 46 29 L 46 31 L 44 31 L 44 29 z M 43 37 A 1.0001 1.0001 0 0 0 42 38 L 42 42 A 1.0001 1.0001 0 0 0 43 43 L 47 43 A 1.0001 1.0001 0 0 0 48 42 L 48 38 A 1.0001 1.0001 0 0 0 47 37 L 43 37 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 37 41 A 1.0001 1.0001 0 1 0 37 39 L 3 39 z M 44 39 L 46 39 L 46 41 L 44 41 L 44 39 z"/>
        </svg>
        `;

        const toc = buildTOC(userOptions);

        if (!toc.innerHTML) {
            return;
        }

        jxtoc.appendChild(toc);
    });
}

// Docsify plugin options
window.$docsify['jx-toc'] = Object.assign(defaultOptions, window.$docsify['jx-toc']);
window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins);