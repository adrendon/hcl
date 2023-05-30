async function getContent(){
    try{
        sessionStorage.getItem("CategoriaFaq")?categoria = sessionStorage.getItem("CategoriaFaq"): categoria = 'catPersonas;';
        sessionStorage.getItem("TemaFaq")? tema= sessionStorage.getItem("TemaFaq") : tema = 'catTarjetasdecredito';
        const responsePromise = await fetch(`/caass?current=true&urile=wcm:path:preguntasfrecuentes/ascaas/contFiltroCategorias&mimetype=application/json&catFiltro=/PreguntasFrecuentes/taxoCategoria/${categoria},/PreguntasFrecuentes/taxoTemasPreguntas/${tema.split(",")[0]}`);
        let response = await responsePromise.json();
        let relacionadas = "";
        if(response.length>4){
            response = response.slice(response.length - 4,response.length);
            for(i=0;i<4;i++){
                if(i+1 == 4){
                    relacionadas+= `<div class="elementRelacionada bc-flex bc-direction-row lastRelacionada">
                                        <div>
                                            <i class="bc-icon" aria-hidden="true" aria-label="prueba" role="img">news</i>
                                        </div>
                                        <div class="divTextoRelacionada">
                                            <div class="divlinkSpace">
                                                <a href="${response[i].url}">${response[i].titulo}</a>
                                            </div>
                                        </div>
                                    </div>`
                }
                else{
                    relacionadas+= `<div class="elementRelacionada bc-flex bc-direction-row">
                                        <div>
                                            <i class="bc-icon" aria-hidden="true" aria-label="prueba" role="img">news</i>
                                        </div>
                                        <div class="divTextoRelacionada">
                                            <div class="divlinkSpace">
                                                <a href="${response[i].url}">${response[i].titulo}</a>
                                            </div>
                                        </div>
                                    </div>`
                }
            }
        }
        else{
            response.forEach((element,index) => {
                if(index == response.length){
                    relacionadas+= `<div class="elementRelacionada bc-flex bc-direction-row lastRelacionada">
                                        <div>
                                            <i class="bc-icon" aria-hidden="true" aria-label="prueba" role="img">news</i>
                                        </div>
                                        <div class="divTextoRelacionada">
                                            <div class="divlinkSpace">
                                                <a href="${element.url}">${element.titulo}</a>
                                            </div>
                                        </div>
                                    </div>`
                }
                else{
                    relacionadas+= `<div class="elementRelacionada bc-flex bc-direction-row">
                                        <div>
                                            <i class="bc-icon" aria-hidden="true" aria-label="prueba" role="img">news</i>
                                        </div>
                                        <div class="divTextoRelacionada">
                                            <div class="divlinkSpace">
                                                <a href="${element.url}">${element.titulo}</a>
                                            </div>
                                        </div>
                                    </div>`
                }
            });
        }
        relacionadas+= `<div class="elementConsultar">
                            <a href="/centro-de-ayuda/preguntas-frecuentes/resultados?cat=${(response[0].temasPregunta.wcmnombre[0].split("/")[3])}">
                            Otras preguntas sobre ${response[0].temasPregunta.wcmtexto[0]}</a> 
                            <i class="bc-icon" aria-hidden="true" aria-label="prueba" role="img">arrow2-right</i>
                        </div>`

        document.getElementById("contenidoRelacionadas").innerHTML = relacionadas
    }catch(error){
        console.log("error en consulta...");
        console.log(error);
    }
}
getContent();




