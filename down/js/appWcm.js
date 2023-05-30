var appListaArt = angular.module('appLisArt', ['ui.bootstrap','angular-loading-bar']);
appListaArt.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner"></div>';
  }])

appListaArt.controller('mainCtrl',['$http','$filter','server',
	function($http,$filter,server) {
					
		var self = this;

		self.showPaginador = false
		var sector = decodeURIComponent(getUrlVars()["sector"]);
		var domParametro = decodeURIComponent(getUrlVars()["dom"])
		
		self.filtroUrlDom = domLabel(domParametro,sector);

		var objServ= new Object()
		objServ.sector = sector

		if (sector != "undefined" && sector !== "") {
			server.serverPost(parametrosListArt.urlfiltro,objServ,estadoOk,estadoFail)
		}else{

			self.data = actAllArt
			self.visualInfo = true			
			for (var i = 0; i < self.data.length; i++) {
				self.data[i].ordeday = (moment(self.data[i].fechaPublicacion,"DD-MM-YYYY").format("YYYYMMDD")/1)
				self.data[i].nombreArticulo = nHtml(self.data[i].nombreArticulo)
				self.data[i].fechaPublicacion = moment(self.data[i].fechaPublicacion,"DD-MM-YYYY").format("MMMM DD,YYYY")
				self.data[i].resumenContenido = nHtml(self.data[i].resumenContenido)
			}

			ordenDom(self.data)
			configPagina(self.data)
			self.showPaginador = true
			self.filtroUrlDom=domLabel(" "," ")
		}

		function domLabel(a,b) {
			let out = b
			if(a !="undefined" && a !== ""){
				out = a
			}
			return out
		}

		function estadoOk(data) {
			self.data = data
			self.visualInfo = true
			if (data.length === undefined || data.length < 1) {
					self.data = actAllArt
					configPagina(self.data)					
					ordenDom(self.data)
					self.showPaginador = true
					self.filtroUrlDom=domLabel(" "," ")
			}else{
				for (var i = 0; i < data.length; i++) {
					self.data[i].ordeday = (moment(self.data[i].fechaPublicacion,"DD-MM-YYYY").format("YYYYMMDD")/1)
					self.data[i].fechaPublicacion = moment(self.data[i].fechaPublicacion,"DD-MM-YYYY").format("MMMM DD,YYYY")
				}
				configPagina(self.data)
				ordenDom(self.data)
				self.showPaginador = true
			}

		}
		function estadoFail(data) {			
		}

		function ordenDom(data) {
			var propertyName = 'ordeday';
			var reverse = true;
			self.dataDom = $filter('orderBy')(data, propertyName,reverse);			
		}

        function nHtml(a){
              var html = $.parseHTML(a)
              return  html[0].textContent
        }
	
         function configPagina(data) {
             self.currentPage = 1;
             self.numPerPage = 4;
             self.totalItems = data.length
         }

		function categorias (arryData,nmCampo) {
		 var tmp_categoria = []
		 for (var i = 0; i < arryData.length; i++) {
		      var len = arryData[i][nmCampo].length
		      var categoAct = arryData[i][nmCampo]
		      if (len > 0 ) {
		          for (var j = 0; j < categoAct.length; j++) {
		               tmp_categoria.push(categoAct[j])
		          }
		      }
		 }
		 var out = tmp_categoria.unique()
		 return out
		}

		self.paginateObjects = function(value) {
		 if (value === undefined || value.length < 1){value = []}
		 return paginate(value,self.currentPage,self.numPerPage,self.dataDom);
		};

		self.fndom = function (a) {
			return tildes(a)
		};

		self.imagen = function (a,b) {
			var out
			a === "" ? out = b : out = a
			return out
		};

}]);

appListaArt.factory('server', function($http) {
	var config = {};
	return {
		serverGet: function(url,success,error){
			global = $http.get(url).success(success).error(error);
			return global;
		},
		serverPost : function(url,data,success,error){
			var prop = Object.getOwnPropertyNames(data)
			for (var i = 0; i < prop.length; i++) {
				prop[i] == "sector" ? data[prop[i]] = getCleanedString(data[prop[i]]) : "" 
			}
			global = $http.post(url,data).success(success).error(error);
			return global;
		}
	}
});


function tildes(a) {
	var out = a
	for (var i = 0; i < parametrosTilde.listatilde.length; i++) {
		if (parametrosTilde.listatilde[i].wcm === a ){
			out = parametrosTilde.listatilde[i].dom
		}
	}
	return out
}

paginate = function(value,currentPage, numPerPage,objects) {
    var begin, end, index;
    begin = (currentPage - 1) * numPerPage;
    end = begin + numPerPage;
    index = objects.indexOf(value);
    return (begin <= index && index < end);
};

Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};

function getCleanedString(cadena){
	cadena = cadena.replace(/á/gi,"a");
	cadena = cadena.replace(/é/gi,"e");
	cadena = cadena.replace(/í/gi,"i");
	cadena = cadena.replace(/ó/gi,"o");
	cadena = cadena.replace(/ú/gi,"u");
	cadena = cadena.replace(/ñ/gi,"n");
    return cadena;
}