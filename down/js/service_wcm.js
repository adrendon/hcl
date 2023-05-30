const axios = require('axios');
const fs = require('fs');
const {configHeaders, app_paths} = require('../config/config');

/**
 * @function restPost
 * @param  {string} urlBase  Url de conexión al Api del poral
 * @param  {object} dataWcm Objecto con la información que se enviara al api del portal
 * @return {object}
 */

let restGet = async (urlBase, configHeaders) => {
    try {
        let {data, headers} = await axios.get(urlBase, configHeaders);
        return {data, headers}
    } catch (e) {
        let {status, statusText} = e.response
        console.log(statusText)
        return status
    }
}

let restDelete = async (urlBase, configHeaders) => {
    let data = await axios.delete(urlBase, configHeaders)
    return data.data;
}

let restPost = async (urlBase, dataWcm, configHeaders) => {
    let data = await axios.post(`${urlBase}`, dataWcm, configHeaders)
    return data.data
}
let restPut = async (urlBase, dataWcm, configHeaders) => {
    try {
        let {status} = await axios.put(`${urlBase}`, dataWcm, configHeaders)
        return status
    } catch (e) {
        let {status, statusText} = e.response
        console.log(statusText)
        return status
    }
}

module.exports = {restGet, restDelete, restPost, restPut}
