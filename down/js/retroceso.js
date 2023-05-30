/*Funcionalidad: Si los ids de los contenidos de capital inteligente tienen asociado un menú, Modifique el id del menu referenciado por el 
contenido por 8a48e51b-d064-458f-a965-d784a21f2b28,
Se lee el archivo(idsContenidos.json) el cual contiene todos los ids de los contenidos existentes en capital inteligente.*/

'use strict';

const http = require("http");
var request = require("request");
const buffer = require("buffer");
var fs = require('fs');

async function idsMenuRefConten() {
    fs.writeFileSync('idMenuRelacionIdContenidos2.txt', '');
    var username = "yentobon";
    var pass = "Y3NniFFTobY4Tes21*";
    var auth = 'Basic ' + Buffer.from(username + ':' + pass).toString('base64');
    var cont = 0;

    /*=================================================
    == Leer archivo .txt con los idsContenidos
    ===================================================*/

    let rawdata = fs.readFileSync('Salida2Lineal.txt', 'utf8');
    let arrayRef = [];
    arrayRef = (rawdata).split(";");
    let numContenidos = arrayRef.length;
    console.log("numContenidos: ", numContenidos);
    /*====================================================================
    == Ciclo con espera de 70 mileseg, toma cada idContenido de idsContenidos
    ===================================================*/
    let indice = 0;
    let interval = setInterval(() => {
        let newArray = (arrayRef[indice]).split(",");
        let idContenido = newArray[0];
        let idMenuViejo = newArray[1];

        /*===============================================================================
        == consumir la Api con cada uno de los ids contenidos
        =================================================================================*/
        var url = "http://10.170.129.123:10039/mycontenthandler/negocio/!ut/p/digest!ZTCG4ZS24GzBsObcpSQq9Q/wcmrest/Content/" + idContenido;
        request.get({
            url: url,
            headers: {
                "Authorization": auth
            },
            'mime-type': 'application/json',
        }, (error, response) => {
            getAPI(error, response, idContenido, url, auth, idMenuViejo);
        });

        indice += 1;
        if (indice >= numContenidos) {
            clearInterval(interval);
        }
    }, 700);

}

/*=================================================
== Funcion para leer el response
===================================================*/

function getAPI(error, response, idContenido, url, auth, idMenuViejo) {
    if (response) {
        const varJSON = JSON.parse(response.body);
        /*=================================================
        == Extraer la data y la recorre
        ===================================================*/
        const data = varJSON["entry"]["content"]["content"]["elements"]["element"];
        var ref;

        /*=================================================
            == Def Metodo para guardar en archivo 
            ===================================================*/
        var logger = fs.createWriteStream('idMenuRelacionIdContenidos2.txt', {
            flags: 'a'
        });

        for (var j = 0; j < data.length; j++) {
            /*=================================================
            == Si existe reference extraer el idContenido
            ===================================================*/
            if (data[j]["data"]["reference"]) {
                let dataRef = data[j]["data"]["reference"];
                ref = (data[j]["data"]["reference"]).split("/");
                /*=========================================================================================
                == si idContenido es = LibraryMenuComponent Modificar idMenu por 8a48e51b-d064-458f-a965-d784a21f2b28
                ===========================================================================================*/
                
                if (ref[ref.length - 2] == 'LibraryMenuComponent') {
                    
                    let putData  = (response.body).replace(idMenuViejo, idMenuViejo);
                    request.put({
                        url: url,
                        headers: {
                            "Authorization": auth,
                            "Content-Type": "application/json"
                        },
                        body: putData
                    }, (error, response) => {
                        logger.write("El id contenido: " + idContenido + "con menú " + ref[ref.length - 1] + "por el: " + idMenuViejo + '\n');
                    });
                }
            }
        }
        logger.end();
    }
}

idsMenuRefConten();