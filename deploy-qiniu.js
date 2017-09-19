var domain = '' || process.env.EDM_QINIU_DOMAIN
fis.match('**', {
    domain: domain,
    deploy: fis.plugin('qiniu', {
        accessKey: '' || process.env.EDM_QINIU_AK,
        secretKey: '' || process.env.EDM_QINIU_SK,
        bucket: 'edm-fis' || process.env.EDM_QINIU_BUCKET
    })
})
console.log(domain)
