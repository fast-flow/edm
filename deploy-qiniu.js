var opn = require('opn')
var domain = '' || process.env.EDM_QINIU_DOMAIN
fis.match('**', {
    domain: domain,
    deploy: fis.plugin('qiniu', {
        accessKey: '' || process.env.EDM_QINIU_AK,
        secretKey: '' || process.env.EDM_QINIU_SK,
        bucket: 'edm-fis' || process.env.EDM_QINIU_BUCKET
    })
})
fis.match('**.html', {
    parser: [
        function (content, file) {
            if (file.isHtmlLike) {
                if (/index_.*\.html$/.test(file.subpath)) {
                    var url = domain + file.subpath
                    var commentsURL = '<!--EDM_URL_INFO-- ' + url + ' -->'
                    console.log(url)
                    opn(url)
                    if (!/EDM_URL_INFO/.test(content)) {
                        content = content.replace(/<\/body>/, commentsURL + '</body>')
                    }
                }
            }
            return content
        }
    ]
})
