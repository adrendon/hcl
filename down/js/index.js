const fs = require('fs');
const {dataFilter, seach_db, replace_db, mkdir_fs} = require('./src/config/modules')
const {configHeadersLocal, app_paths, headers_wcm} = require('./src/config/config');
const {restGet, restPut} = require('./src/service/service_wcm');

(async () => {
    let urlBase = `${app_paths.urlWcm.hostDev}/caass?current=true&urile=wcm:path:negociosmigracion/ascaas/contIdsAlx&mime-type=application/json`
    let {data} = await restGet(urlBase)
    let dataContent = dataFilter(data)
    let cookie = undefined
    //Lista de contenidos a modificar

    for (const dataContentKey in dataContent) {
        let pathWcmApi = app_paths.wcm_api.contructorUrl(app_paths.urlWcm.hostDev, false, dataContent[dataContentKey], app_paths.wcm_api.content, false)
        let {data, headers} = await restGet(pathWcmApi, headers_wcm(cookie)); //configHeaders
        cookie = headers['set-cookie']

        //Borramos el Id porque no se debe enviar esta propiedad para actualizar
        delete data.entry.id;

        //Buscamos si realmente debemos modificar algo o no en el contenido
        let db_replace = seach_db(data)

        if (db_replace.length > 0) {

            //Creando el Backup de la data
            //let backFolder = `${app_paths.logs.mkLog}201/${dataContent[dataContentKey]}`
            //mkdir_fs(backFolder)
            //fs.writeFileSync(`${backFolder}/Org_${dataContent[dataContentKey]}.json`, JSON.stringify(data), {flag: 'w'})

            //Cambio segun el archivo db.json
            let dataChange = replace_db(data, db_replace)
            //fs.writeFileSync(`${backFolder}/Mod_${dataContent[dataContentKey]}.json`, JSON.stringify(JSON.parse(dataChange)), {flag: 'w'})
            let {href} = data.entry.link.find(url => url.rel === 'edit')
            let uriWcm = app_paths.urlWcm.hostDev + href + app_paths.wcm_api.minitype

            //Llamado el Put de Api del portal
            let configHeadersPut = headers_wcm(cookie)
            let status = await restPut(uriWcm, JSON.parse(dataChange), configHeadersPut)

            let flag = 0
            if (status >= 200 && status < 300) {
                for (let i = 0; i < 3; i++) {
                    status = await restPut(uriWcm, JSON.parse(dataChange), configHeadersPut)
                    flag++
                    console.log(`Intento # ${flag} id contenido ${dataContent[dataContentKey]}  fallo de actualizacion`)
                }
            }
            if (flag > 2) {
                console.log(`Fallo general revisar logs`)
                break
            } else {
                console.log(`Cambio realizado para el contenido ${dataContent[dataContentKey]} #${dataContentKey} de ${dataContent.length}`)
            }

        } else {
            console.log(`Sin cambio para el contenido ${dataContent[dataContentKey]} #${dataContentKey} de ${dataContent.length}`)
        }

    }

    console.log('listo')
})()
