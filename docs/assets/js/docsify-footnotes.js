($docsify = $docsify || {}).plugins = [].concat(function (o) {
    o.beforeEach(function (o) {
        return o = /\[\^([A-Za-z0-9]+)\][^:]/.test(o) ? o.replace(/\[\^([A-Za-z0-9]+)\][^:]/gm, '<sup class="footnote-symbol" id="fn-$1">[[$1]](#fnref-$1)</sup>').replace(/\[\^([A-Za-z0-9]+)\]\: /gm, '<strong class="footnote-reference-symbol" id="fnref-$1">[[$1]](#fn-$1)</strong>:leftwards_arrow_with_hook: ') : o
    })
}, $docsify.plugins || []);