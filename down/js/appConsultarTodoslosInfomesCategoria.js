var app = angular
    .module('appConsultarTodoslosInfomesCategoria', ['ui.bootstrap'])
    .controller(
        'consultarTodoslosInfomesCategoriaController', [
        '$filter',
        '$http',
        function ($filter, $http) {
            var self = this;
            self.mensajesValidacion = mensajesValidacion;
            self.parametros = parametros;

            // inicializacion de variables
            self.numPerPage = parametros.numPerPage;
            self.currentPage = 1;


            self.visualizarErrorCombo = false;
            self.visualizarErrorDetalle = false;

            self.visualizarResultado = false;
            self.errorConexion = self.mensajesValidacion.errorConexionCombo;

            var urlCategoriasAll = self.parametros.urlListaCategoria;
            var urlDetalleCagerotia = self.parametros.urlDetalleCategoria;



            self.busqueda = function (parametro) {
                var nmCategoria = convierteAlias(parametro);
                // var limiteRespuesta = self.parametros.LimiteRespuesta;
                // var urlFull = urlDetalleCagerotia + nmCategoria + '/' + limiteRespuesta
                self.detalleCategoria = [];
                var j = 50;
                for (var i = 50; i <= 450; i += 50) {
                    var limiteRespuesta = i.toString();
                    var urlFull = urlDetalleCagerotia + nmCategoria + '/' + limiteRespuesta; //se generan 50 URLs
                    $http.get(urlFull)
                        .success(
                            
                            function (detalleCategoria) {
                                
                                self.detalleCategoria = self.detalleCategoria.concat(sinExte(detalleCategoria.slice(j - 50, j)));
                                self.totalItems = detalleCategoria.length;
                                self.visualizarResultado = true;
                                self.visualizarErrorDetalle = false;
                                // self.currentPage += 1;
                                j += 50;

                            }).error(
                                function (data, status, headers, config) {
                                    if(self.detalleCategoria == []){
                                        self.visualizarResultado = false;
                                        self.visualizarErrorDetalle = true;
                                    }
                                });
                }
 
            };

            function convierteAlias(nuevoAlias) {
                especiales = new Array('á', 'é', 'í', 'ó', 'ú', 'ñ', ' ', '´', ':', ',', ';', '.');
                normales = new Array('a', 'e', 'i', 'o', 'u', 'n', '_', '_', '_', '_', '_', '_');
                nuevoAlias = nuevoAlias.toLowerCase();
                i = 0;
                while (i < especiales.length) {
                    nuevoAlias = nuevoAlias.split(especiales[i]).join(normales[i]);
                    i++
                }
                return nuevoAlias;
            };

            self.paginateObjects = function (value) {
                return paginate(value, self.currentPage, self.numPerPage, self.detalleCategoria);

            };

            function sinExte(dato) {
                var arrayDatos = [];
                for (var i = 0; i < dato.length; i++) {
                    var newTitulo = dato[i].titulo.replace(".pdf", "");
                    var fecha = formatoFecha(dato[i].fechaUltimaActualizacion);
                    arrayDatos.push({ "titulo": newTitulo, "fechaUltimaActualizacion": fecha, "descripcion": dato[i].descripcion, "sourceLink": dato[i].sourceLink })
                };
                return arrayDatos;
            };

            function formatoFecha(dato) {

                var ano = dato.substring((dato.length - 4), dato.length);
                var mes = dato.substring(4, 7);
                var dia = dato.substring(8, 10);

                var month_names_short = parametros.month_names_short
                var month_names_short_esp = parametros.month_names_short_esp;

                for (var i = 0; i < month_names_short.length; i++) {
                    (month_names_short[i]).toLowerCase() == mes.toLowerCase() ? nmes = month_names_short_esp[i].toUpperCase() : '';
                };

                var ndato = ano + ' ' + nmes + ' ' + dia;
                return ndato
            }

        }
    ]);