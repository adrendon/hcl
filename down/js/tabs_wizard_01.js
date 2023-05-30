var menu;
var todasCategorias = [];
var urlServ = "https://www.bancolombia.com/consultarInformesInveco/rest/servicio/publicarInformesInvecoPorCategorias/"
var numResul = 2
var listaInformes = ['Informes Diarios', 'Informes Semanales', 'Informes Mensuales', 'Informes Trimestrales', 'Informes Anuales', 'Otros Informes']
var ObjAll = {
    diario: [
        { catego: "Desayuno_con_Bancolombia", url: "/empresas/capital-inteligente/investigaciones-economicas/publicaciones/desayuno-con-bancolombia/", nombreDom: "Desayuno con Bancolombia" },
        { catego: "Breakfast_with_Bancolombia", url: "/empresas/capital-inteligente/investigaciones-economicas/publicaciones/breakfast-with-bancolombia/", nombreDom: "Breakfast with Bancolombia" }
        /*{catego:"Atardecer_con_Bancolombia" , url : "/empresas/capital-inteligente/investigaciones-economicas/publicaciones/atardecer-con-bancolombia/", nombreDom : "Atardecer con Bancolombia"}*/
    ],
    semanal: [
        { catego: "Observador_Semanal", url: "/empresas/capital-inteligente/investigaciones-economicas/publicaciones/observador-semanal/", nombreDom: "Observador Semanal" },
        { catego: "Informe_Semanal_de_Mercados", url: "/empresas/capital-inteligente/investigaciones-economicas/publicaciones/informe-semanal-mercados/", nombreDom: "Informe Semanal de Mercados" }
    ],
    mensual: [
        { catego: "Presentaciones_de_Investigaciones_Economicas", url: "/empresas/capital-inteligente/investigaciones-economicas/publicaciones/presentaciones-investigaciones-economicas/", nombreDom: "Presentaciones de Investigaciones Económicas" },
        { catego: "Informe Económico Mensual", url: "/empresas/capital-inteligente/investigaciones-economicas/publicaciones/informe-economico-mensual/", nombreDom: "Informe Económico Mensual" },
    ],
    trimestrales: [
        { catego: "Informe_Trimestral_de_Actualizacion_de_Proyecciones", url: "/empresas/capital-inteligente/investigaciones-economicas/publicaciones/informe-trimestral-actualizacion-proyecciones/", nombreDom: "Informe Trimestral de Actualización de Proyecciones" },
        { catego: "Tabla Macroeconómicos Proyectados", url: "/empresas/capital-inteligente/investigaciones-economicas/publicaciones/tablas-macroeconomicos-proyectados/", nombreDom: "Tabla Macroeconómicos Proyectados" },
    ],
    anual: [
        { catego: "Informe_Anual_de_Proyecciones", url: "/empresas/capital-inteligente/investigaciones-economicas/publicaciones/informe-anual-proyecciones/", nombreDom: "Informe Anual de Proyecciones" },
        { catego: "Annual_Economic_Forecasts_and_Quarterly_Updates", url: "/empresas/capital-inteligente/investigaciones-economicas/publicaciones/annual-economic-forecasts-quarterly-updates/", nombreDom: "Annual Economic Forecasts and Quarterly Updates" }
    ],
    otros: [
        { catego: "Reporte_de_Companias", url: "/empresas/capital-inteligente/investigaciones-economicas/publicaciones/reporte-companias/", nombreDom: "Reporte de Compañias" },
        { catego: "Informe_Especial", url: "/empresas/capital-inteligente/investigaciones-economicas/publicaciones/informe-especial/", nombreDom: "Informe Especial" },
        { catego: "Company_Report", url: "/empresas/capital-inteligente/investigaciones-economicas/publicaciones/company-report/", nombreDom: "Company Report" },
        { catego: "Special_Report", url: "/empresas/capital-inteligente/investigaciones-economicas/publicaciones/special-report/", nombreDom: "Special Report" },
        { catego: "Now_Cast", url: "/empresas/capital-inteligente/investigaciones-economicas/nowcast/", nombreDom: "NowCast" }
    ]
}
var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var month_names_short_esp = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

function todas(idx) {
    var t;
    if (idx == 1) {
        t = ObjAll['diario'];
    } else if (idx == 2) {
        t = ObjAll['semanal'];
    } else if (idx == 3) {
        t = ObjAll['mensual'];
    } else if (idx == 4) {
        t = ObjAll['trimestrales'];
    } else if (idx == 5) {
        t = ObjAll['anual'];
    } else if (idx == 6) {
        t = ObjAll['otros'];
    }
    t.forEach(function(item) {
        todasCategorias.push(item.nombreDom);
    });
}

function ultimos(idx, menu) {
    var htmlInterDiv = ""
    var strT = "tab" + idx;
    var t, clasActived;
    clasActived = ""
    if (idx == 1) {
        t = ObjAll['diario'];
        clasActived = "active"
    } else if (idx == 2) {
        t = ObjAll['semanal'];
    } else if (idx == 3) {
        t = ObjAll['mensual'];
    } else if (idx == 4) {
        t = ObjAll['trimestrales'];
    } else if (idx == 5) {
        t = ObjAll['anual'];
    } else if (idx == 6) {
        t = ObjAll['otros'];
    }
    var strC;
    if (t.length > 2) {
        strC = "col-md-4"
    } else {
        strC = "col-md-6"
    }

    htmlInterDiv = ("<div id='" + strT + "' class='tab-pane " + clasActived + "'><h2>Consulta nuestros informes</h2><p>Consulta los resultados económicos y la evolución de los mercados monetarios de la jornada</p>") + (azul()) + ('<div><h3>Últimos informes publicados</h3><div class="row text-center"><a href="/empresas/capital-inteligente/investigaciones-economicas/suscribirse" target="_blank" class="btn btn-primary">Suscribirse</a></div></div>') + datos() + "</div>"

    function azul() {
        var z = ""
        var ult = (t.length) - 1
        t.forEach(function(item, index) {
            if (index == 0) { z += "<div class='col-xs-12'>" }
            z += (("<div class='" + strC + "'><div class='biografia-voceros-texto'><div class='leer-mas'><a href='" + item.url + "'>Leer más</a></div><h4 class='cargo-vocero'>Empieza tu día con</h4><div class='row bio-info'><div class='col-md-8 col-xs-12'><h3 class='nombre-vocero'> " + item.nombreDom + " </h3></div></div></div></div>"));
            if (index == ult) { z += "</div>" }
        });
        return z
    };

    function datos() {
        var d = []
        menu.forEach(function(itemMenu) {
            var found = false;
            t.forEach(function(itemT) {
                if (itemT.nombreDom == itemMenu.categoria) {
                    found = true;
                }
            });
            if (found) {
                d.push(("<p><div colspan=3><a href='" + itemMenu.sourceLink + "'>" + itemMenu.titulo + "</a></div><div colspan=3>" + itemMenu.categoria + " | <b>" + formatoFecha(itemMenu.fechaUltimaActualizacion) + "</b></div><div colspan=3>" + itemMenu.descripcion + "</div></p>"));
            }
        });
        var completo = ""
        for (var i = 0; i < d.length; i++) {
            completo += d[i]
        }
        return completo
    }

    function formatoFecha(dato) {

        var ano = dato.substring((dato.length - 4), dato.length);
        var mes = dato.substring(4, 7);
        var dia = dato.substring(8, 10);

        for (var i = 0; i < month_names_short.length; i++) {
            (month_names_short[i]).toLowerCase() == mes.toLowerCase() ? nmes = month_names_short_esp[i].toUpperCase() : '';
        };

        var ndato = dia + ' de ' + nmes.toLowerCase() + ' ' + ano;
        return ndato
    }

    return htmlInterDiv
};
todas(1);
todas(2);
todas(3);
todas(4);
todas(5);
todas(6);
var urlTotal = urlServ + numResul

var info = new Object();
info.categorias = todasCategorias;
$.ajax({
    type: "POST",
    url: urlTotal,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(info),
    success: function(obj) {
        menu = obj;
        htmlAll(menu)
    },
});

function htmlAll(menu) {

    //Contenedor
    var contendor = '<div class="tabs-verticales container-fluid tabs-horizontal tabs-vertSala">'
    var primerRow = '<div class="row">'
    var ul = '<ul class="nav nav-tabs responsive col-sm-3">'
        //Creacion de <li> 's 
    var htmlAllLi = ""
    var counter = 1;
    $.each(listaInformes, function(key, value) {
        if (counter == 1) {
            htmlAllLi += (("<li class='active'><a href='#tab" + counter + "'>" + value + "</a></li>"))
        } else {
            htmlAllLi += (("<li class='none'><a href='#tab" + counter + "'>" + value + "</a></li>"))
        }
        counter += 1;
    });


    //tab-content responsive
    var htmlDivTabs = '<div class="tab-content responsive col-sm-9 hidden-xs hidden-sm" style="min-height: 318px;">'
    var htmlTabsInt = ""
    for (var i = 1; i < 7; i++) {
        htmlTabsInt += ultimos(i, menu);
    }

    htmlDivTabs += htmlTabsInt

    //Cierres
    var ulCierre = '</ul>'
    var htmlDivTabsCierre = '</div>'
    var primerRowCierre = '</div>'
    var contendorCierre = '</div>'

    var all = contendor + primerRow + ul + htmlAllLi + ulCierre + htmlDivTabs + htmlDivTabsCierre + primerRowCierre + contendorCierre
    $("#tabsAll").replaceWith($(all))
    tabsFuncion()
    acordeon()
}

function tabsFuncion() {
    $('.tabs-vertSala .nav-tabs > li > a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
    responsiveTabsNew.init();
}

var responsiveTabsNew = (function($, responsiveTabsNew) {

    responsiveTabsNew.init = function() {

        responsiveTabsNew.currentPosition = 'tabs';

        var tabGroups = $('.nav-tabs.responsive');
        var hidden = '';
        var visible = '';
        var activeTab = '';

        collapseDisplayed = ['xs', 'sm'];

        $.each(collapseDisplayed, function() {
            hidden += ' hidden-' + this;
            visible += ' visible-' + this;
        });

        $.each(tabGroups, function() {
            var $tabGroup = $(this);
            var tabs = $tabGroup.find('li a');
            var collapseDiv = $('<div></div>', {
                'class': 'acordeon ' + visible,
                'id': 'collapse-' + (parseInt(Math.random() * 100))
            });

            $.each(tabs, function() {
                var $this = $(this);
                var oldLinkClass = $this.attr('class') === undefined ? '' : $this.attr('class');
                var newLinkClass = 'accordion-toggle';
                var oldParentClass = $this.parent().attr('class') === undefined ? '' : $this.parent().attr('class');
                var newParentClass = 'panel panel-default';
                var newHash = $this.get(0).hash.replace('#', 'collapse-');

                if (oldLinkClass.length > 0) {
                    newLinkClass += ' ' + oldLinkClass;
                }

                if (oldParentClass.length > 0) {
                    oldParentClass = oldParentClass.replace(/\bactive\b/g, '');
                    newParentClass += ' ' + oldParentClass;
                    newParentClass = newParentClass.replace(/\s{2,}/g, ' ');
                    newParentClass = newParentClass.replace(/^\s+|\s+$/g, '');
                }

                if ($this.parent().hasClass('active')) {
                    activeTab = '#' + newHash;
                }
                var titulo = '<h3 class="titulo_acordeon">' + $this.html() + '<li class="pull-right glyphicon glyphicon-plus"></li></h3>'
                collapseDiv.append(titulo);
                collapseDiv.append('<div class="pane"><div class="row"><div id="' + newHash + '" class="col-xs-12">' + $($(this).parent().find('a').attr('href')).html() + '</div></div></div>');
            });

            $tabGroup.next().after(collapseDiv);
            $tabGroup.addClass(hidden);
            $('.tab-content.responsive').addClass(hidden);
        });

        if (activeTab) {
            $(activeTab).collapse('show');
        }
    };

    return responsiveTabsNew;
}(window.jQuery, responsiveTabsNew || {}));
//replaceWith

/*Acordeon*/
function acordeon() {
    $(".acordeon > h3.titulo_acordeon").click(function() {
        clearCurrentAccordion($(this).parent());
        var alturaTitulo = $(this).outerHeight();

        if (!$(this).hasClass("current") && $(this).next().queue().length === 0) {
            $.when($(this).next().slideDown()).then(function() {
                $("html, body").animate({ scrollTop: $(this).offset().top - alturaTitulo }, 400);
            });
            $(this).addClass("current");
            $(this).find('li').removeClass('glyphicon-plus').addClass('glyphicon-minus');
            $(this).find('span').removeClass('glyphicon-plus').addClass('glyphicon-minus');
        }
    });

    function clearCurrentAccordion(accordion) {
        $(accordion).find("h3.titulo_acordeon").each(function(i, item) {
            $(this).next().slideUp();
            $(item).removeClass("current");
            $(this).find('li').addClass('glyphicon-plus').removeClass('glyphicon-minus');
            $(this).find('span').addClass('glyphicon-plus').removeClass('glyphicon-minus');
        });
    }
};