var deasync = require('deasync');
var posthtml = require('posthtml')
var posthtmlInlineCss = require('posthtml-inline-css')
let compressInlineCss = deasync(function(content, callback){
    posthtml([
        posthtmlInlineCss(),
        require('posthtml-remove-attributes')([
            'class'
        ]),
        require('posthtml-remove-tags')({
            tags: ['style', 'script']
        })
    ])
    .process(content)
    .then(function (data) {
        callback(data.html)
    })
})

fis.match('**.html', {
    parser: [
        function (html) {
            var result = compressInlineCss(html)
            return result
        },
        function (content) {
            if (fis.project.currentMedia() !== 'dev') {
                return content
            }
            if (content.indexOf('fastbuild-livereload') === -1) {
                var livereloadScriptTag = "<script data-fastbuild-livereload=\"true\">\n  document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] +\n  ':35729/livereload.js?snipver=1\"></' + 'script>')\n</script> ";
                return content.replace(/<\/\s*body>/, livereloadScriptTag + '</body>')
            }
            else {
                return content
            }
        }
    ]
})
fis.match('*.*', {
    release: false
})
fis.match('view/**.**', {
    release: true
})
fis.media('online').match('**', {
    useHash: true
})

if (typeof process.env.v !== 'undefined') {
    fis.match('**', {
        release: false
    })
    fis.match('view/' + process.env.v + '/**', {
        release: true
    })
}
