$("#tendencia_titulo").empty();
$('#tendencia_titulo').append($('<h1>' + tituloGlobal + '</h1>'));
// Put description
$("#tendencia_desc").empty();
$('#tendencia_desc').append($('<p>' + descGlobal + '</p>'));
// Input JSON
var info = new Object();
info.taxonomia = taxTendencias;
// Execute service to bring all tendences available
// Uncomment to test with real service
$.ajax({
	type: "POST",
	url: urlServ,
	dataType: "json",
	contentType: "application/json; charset=utf-8",
	data: JSON.stringify(info),
	success: function (obj) {
		svrResult = obj;
		mostrarTendencias();
	},
});
var dictLetras = [];
//mostrarTendencias();	// Comment when testing with real service
function mostrarTendencias() {
	svrResult.forEach(function(item) {
		var letra = item.substring(0, 1).toUpperCase();
		if (dictLetras[letra] === undefined) {
			dictLetras[letra] = [];
		}
		dictLetras[letra].push(item);
	});

	var dropDownContent = "";
	for(var letraUsada in dictLetras) {
		document.getElementById("letra" + letraUsada).classList.remove("noUsada");
		document.getElementById("letra" + letraUsada).href = "javascript:mostrarLetra('" + letraUsada + "', 1)";
		dropDownContent += "<li><a href='javascript:mostrarLetra(\"" + letraUsada + "\", 1)'>" + letraUsada + "</a></li>"
		mostrarLetra('A',1)
	}

	$(".noUsada").each(function(index) {
		var i = $(this).attr('id')
		document.getElementById(i).classList.remove("noUsada")
		document.getElementById(i).href = "javascript:mostrarLetraVancia('" + $(this).html()  + "', 1)";
	})

	$("#ddLetras").empty();
	$("#ddLetras").append(dropDownContent);
}
function mostrarLetra(letra, pageNumber) {
	var tendenciaContent = "";
	var temp = Object.keys(dictLetras[letra]);
	if (window.innerWidth < maxWidthSm || temp.length <= maxItemsPerPage) {
		for(var item in dictLetras[letra]) {
			tendenciaContent += "<div class='col-xs-6 col-sm-4 no-wrap'><a href='"+ urlLinkBase + dictLetras[letra][item] + "'>" + tildes(dictLetras[letra][item]) + "</a></div>";
		}
		$("#tendencia_paginacion").empty();
	}
	else {
		var len = maxItemsPerPage * (pageNumber);
		if (len > temp.length) {
			len = temp.length;
		}
		for(var item = maxItemsPerPage * (pageNumber - 1); item < len; item++) {
			//tendenciaContent += "<div class='col-xs-6 col-sm-4 no-wrap'><a href='" + urlLinkBase + "\"" + dictLetras[letra][item] + "\"" + "'>" + dictLetras[letra][item] + "</a></div>";
			tendenciaContent += "<div class='col-xs-6 col-sm-4 no-wrap'><a href='" + urlLinkBase + dictLetras[letra][item] + "'>" + tildes(dictLetras[letra][item]) + "</a></div>";
		}
		var howManyPages = parseInt(temp.length / maxItemsPerPage);
		if (temp.length % maxItemsPerPage != 0) {
			howManyPages++;
		}
		var pagination = "<nav aria-label='Page navigation' style='display:flex;align-items:center;justify-content:center;'><ul class='pagination'><li><a href='javascript:mostrarLetra(\"" + letra + "\", 1)' aria-label='Previous'><span aria-hidden='true'>Primero</span></a></li><li><a href='javascript:mostrarLetra(\"" + letra + "\", " + (pageNumber === 1 ? 1 : (pageNumber - 1)) + ")'>&nbsp;</a></li>";
		for (var idx = 0; idx < howManyPages; idx++) {
			var extra = "";
			if ((idx + 1) === pageNumber) {
				extra = "class='active' "
			}
			pagination += "<li " + extra + "><a href='javascript:mostrarLetra(\"" + letra + "\", " + (idx + 1) + ")'>" + (idx + 1) + "</a></li>";
		}
		pagination += "<li><a href='javascript:mostrarLetra(\"" + letra + "\", " + (pageNumber === howManyPages ? howManyPages : (pageNumber + 1)) + ")'>&nbsp;</a></li><li><a href='javascript:mostrarLetra(\"" + letra + "\", " + howManyPages + ")' aria-label='Next'><span aria-hidden='true'>Último</span></a></li></ul></nav>";
		$("#tendencia_paginacion").empty();
		$("#tendencia_paginacion").append(pagination);
	}
	$("#tendencia_letra").empty();
	$("#tendencia_letra").append("<h2>" + letra + "</h2>");
	$("#tendenciaContenido").empty();
	$("#tendenciaContenido").append(tendenciaContent);
}
function mostrarLetraVancia(a,b) {
	$("#tendencia_letra").empty();
	$("#tendencia_letra").append("<h2>" + a + "</h2>");
	$("#tendenciaContenido").empty();
	$("#tendenciaContenido").append('<p>' + txtSinletra + '</p>');	
}
