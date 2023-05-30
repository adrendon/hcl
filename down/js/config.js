const https = require('https');
const http = require('http')
const fs = require('fs');

const configHeaders = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic Z2NhbGRlcm86R2NhbGRlcm8yMDE3Lg=='
    }
};

const configHeadersLocal = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic Z2NhbGRlcm86Z2NhbGRlcm8='
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        keepAlive: true
    })
}

const headers_wcm = (cookie) => {
    let headers = {}
    let auth = {}
    let config = {}
    headers['Content-Type'] = 'application/json'
    headers.httpAgent = new http.Agent({
        rejectUnauthorized: false,
        keepAlive: true
    })

    cookie ? headers['cookie'] = cookie : ''
    auth.username= 'bigbangadm'
    auth.password= 'B1gb.2019*'

    config.headers = headers
    config.auth = auth
    config.httpAgent = new http.Agent({keepAlive: true})
    return config
}


//Standard de nombramiento Log's
const date = new Date();
const today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-${date.getTime()}`

const app_paths = {}
app_paths.logs = {}
app_paths.shared = {}
app_paths.urlWcm = {}
app_paths.wcm_api = {}
app_paths.logs.mkLog = './src/logs/'
if (!fs.existsSync(`${app_paths.logs.mkLog}201`)) {
    fs.mkdir(`${app_paths.logs.mkLog}201`, {recursive: true}, (err) => {
        if (err) throw err;
    });
}
if (!fs.existsSync(`${app_paths.logs.mkLog}400`)) {
    fs.mkdir(`${app_paths.logs.mkLog}400`, {recursive: true}, (err) => {
        if (err) throw err;
    });
}
//Log's Success
app_paths.logs.successCategoria = `.${app_paths.logs.mkLog}201/success_categoria_${today}.json`;
//Log's Fail
app_paths.logs.failCategoria = `${app_paths.logs.mkLog}400/fail_Categoria_${today}.log`;
//Objecto Auditoria
app_paths.logs.objAuditoria = {}
app_paths.logs.objAuditoria.header = '{'
app_paths.logs.objAuditoria.footer = '}'
//Url Dllo - Propiedades Wcm
app_paths.urlWcm.hostDev = 'http://dev.grupobancolombia.com:10039'
app_paths.urlWcm.hostClone = 'http://10.170.129.123:10039'
app_paths.urlWcm.hostLocal = 'http://localhost:10039'
//Modelo de Api WCM
app_paths.wcm_api.wps = '/wps';
app_paths.wcm_api.handler = '/mycontenthandler/'
app_paths.wcm_api.content = '/wcmrest/Content/'
app_paths.wcm_api.categoria = '/mycontenthandler/wcmrest/Category/'
app_paths.wcm_api.minitype = '?mime-type=application/json'
app_paths.wcm_api.contructorUrl = function (dominio, vp, id, typeWcm, wps) {
    let reg = new RegExp('//', 'g')
    let url = `${!!wps ? +app_paths.wcm_api.wps : ''}${app_paths.wcm_api.handler}${!!vp ? vp : ''}${typeWcm}${id}${app_paths.wcm_api.minitype}`.replace(reg, '/')
    return `${!!dominio ? dominio : app_paths.urlWcm.hostLocal}${url}`
}

module.exports = {configHeaders, configHeadersLocal, app_paths, headers_wcm}