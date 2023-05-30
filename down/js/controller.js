/**
 * Main application controller
*/
;(function() {

	angular
		.module('preferenciasApp',['angular-loading-bar'])
		.constant('CONSTANTS', {
			//'API_URL': 'https://qtrack.qdata.io:443/api/',
			'API_URL': 'https://qtrack.bcol.genera.sh/api/',
			'LOGIN_URL' : 'https://digital.sanchobbdoapp.com/bancolombia-auth/public/login'
		})
		.factory('QueryService', ['$http', '$q', 'CONSTANTS',function($http, $q, CONSTANTS) {

			var service = {
				query: query,
				queryBearer: queryBearer,
				returnArray: returnArray,
				getUrlParams: getUrlParams

			};

			return service;

			function query(method, url, params, data) {

				var deferred = $q.defer();

				$http({
					headers: {
						"content-type": "application/x-www-form-urlencoded",
						"cache-control": "no-cache",
						"Access-Control-Allow-Origin": '*'
					},
					method: method,
					url: url,
					//url: CONSTANTS.API_URL + url,
					params: params,
					data: data
				}).then(function(data) {
					if (!data.config) {
						console.log('Server error occured.');
					}
					deferred.resolve(data);
				}, function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			}


			function queryBearer( method, url, params, data, token) {

				var deferred = $q.defer();
				var authorization = "Bearer " + token;

				$http({
					headers: {
						"content-type": "application/json",
						//"content-type": "application/x-www-form-urlencoded",
						"cache-control": "no-cache",
						"authorization": authorization,
					},
					method: method,
					//url: url,
					url: CONSTANTS.API_URL + url,
					params: params,
					data: data
				}).then(function(data) {
					if (!data.config) {
						console.log('Server error occured.');
					}
					deferred.resolve(data);
				}, function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			}


			function returnArray (data) {

				var array = [];

				angular.forEach( data, function(value, key) {
					if (value === true)
						array.push(key);
				});

				return array;
			}


			function getUrlParams() {

				qs = document.location.search;
				qs = qs.split('+').join(' ');

				var params = {},
				tokens,
				re = /[?&]?([^=]+)=([^&]*)/g;

				while (tokens = re.exec(qs)) {
				params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
				}

				return params;
			}



		}])
		.factory('getDataFromAPI', ['$http', '$q', 'CONSTANTS','QueryService',function($http, $q, CONSTANTS,QueryService) {;

			var service = {
				getData: getData

			};

			return service;


			function getData() {


				var token;
				var parentId;
				var defered = $q.defer();
				var promise = defered.promise;
				var finalData = {};
				var subcategorieId = '';
				var allJson = {};


				QueryService.query('GET', CONSTANTS.LOGIN_URL, {} , {})
					.then(function(ovocie) {

						token = ovocie.data['access_token'];

						QueryService.queryBearer('GET', 'emailcategories?filter={"where":{"title":"General"}}', {} , {}, token)
							.then(function(ovocie) {

								parentId = ovocie.data.data[0].id;

								QueryService.queryBearer('GET', 'emailcategories?filter={"where":{"parentId":"'+parentId+'"}}', {} , {}, token)
									.then(function(ovocie) {

										finalData = ovocie.data.data;
										
										finalData.forEach(function(thread, i) {

											QueryService.queryBearer('GET', 'emailcategories?filter={"where":{"parentId":"'+thread.id+'"}}' , {} , {}, token)
											.then(function(ovocie) {  

											finalData[i].child = ovocie.data.data;
											finalData[i].numberChild = ovocie.data.data.length;

											}).catch(function(response){
											// Error
											});

										});	

										defered.resolve(ovocie.data.data);
										//ssconsole.log(promise);
										

									}).catch(function(response) {

									});					

							}).catch(function(response) {

							});

					}).catch(function(response) {

					});
					return promise;


			}


		}])
		.controller('MainController', ['$scope','CONSTANTS','getDataFromAPI','$q', 'QueryService','cfpLoadingBar', function($scope, CONSTANTS, getDataFromAPI, $q, QueryService, cfpLoadingBar) {

			var params = QueryService.getUrlParams();

			$scope.user = {};
			$scope.dataReason = {
				"toFrequent": false,
				"notInterested": false,
				"notOnEmail": false
			};
			$scope.contact = params['email'];

			getData();


			function getData() {


				var token;
				var parentId;
				var defered = $q.defer();
				var promise = defered.promise;
				var finalData = {};
				var subcategorieId = '';
				var allJson = {};
				var allCategories = {};



				QueryService.query('GET', CONSTANTS.LOGIN_URL, {} , {})
					.then(function(ovocie) {

						token = ovocie.data['access_token'];

						/* -------- */
									
						QueryService.queryBearer('GET', 'emailcategories/attempt', {} , {}, token)
							.then(function(ovocie) {				
								
							}).catch(function(response) {
								console.log('error'+response);
							}); 

						/* -------- */


						QueryService.queryBearer('GET', 'emailcategories?filter={"where":{"title":"General"}}', {} , {}, token)
							.then(function(ovocie) {

								parentId = ovocie.data.data[0].id;

								QueryService.queryBearer('GET', 'emailcategories?filter={"where":{"parentId":"'+parentId+'"}}', {} , {}, token)
									.then(function(ovocie) {

										finalData = ovocie.data.data;
										
										finalData.forEach(function(thread, i) {

											QueryService.queryBearer('GET', 'emailcategories?filter={"where":{"parentId":"'+thread.id+'"}}' , {} , {}, token)
											.then(function(ovocie) {  

											finalData[i].child = ovocie.data.data;
											finalData[i].numberChild = ovocie.data.data.length;




											}).catch(function(response){
											// Error
											});

										});	

										defered.resolve(ovocie.data.data);
										$scope.categories = ovocie.data.data;
										

									}).catch(function(response) {

									});					

							}).catch(function(response) {

							});

					}).catch(function(response) {

					});

			}

			$scope.closeModal = function() {

				$('#modal').removeClass('show');
				$('body').removeClass('open-modal');

			}

			$scope.openModal = function() {

				$('#modal').addClass('show');
				$('body').addClass('open-modal');

			}

			$scope.ctrlClickHandler = function(user, reason) {

				$('.save-button').attr('disabled', true);

				var userI = angular.copy($scope.user);
				var data = {};
				var dataReason = {}

				data.email = $scope.contact;
				data.categories = QueryService.returnArray(userI);

				dataReason.email = $scope.contact;
				dataReason.unsubscribeReason = reason;

				QueryService.query('GET', CONSTANTS.LOGIN_URL, {} , {})
				  .then(function(ovocie) {  

					token = ovocie.data['access_token'];

					QueryService.queryBearer('POST', 'emailcategories/subscribe' , {} , data, token)
					  .then(function(ovocie) {

					  	QueryService.queryBearer('GET', 'emailuser?filter={"where":{"email":"'+dataReason.email+'"}}', {} , {}, token)	
					  	  .then(function(ovocie) {

					  	  	var arraySize = ovocie.data.data.length;

					  	  	if (arraySize > 0 ) {

					  	  		var userId = ovocie.data.data[0].id;

					  	  		QueryService.queryBearer('PATCH', 'emailuser/'+userId, {} , dataReason, token)	
					  	  		  .then(function(ovocie) {

					  	  		  	$scope.openModal();
					  	  		  	$('.save-button').attr('disabled', false);

					  	  		  }).catch(function(response){

					  	  		  }); 

					  	  	} else {
					  	  		
					  	  		QueryService.queryBearer('POST', 'emailuser', {} , dataReason, token)	
					  	  		  .then(function(ovocie) {

					  	  		  	$scope.openModal();

					  	  		  }).catch(function(response){

					  	  		  });
					  	  	}

					  	  }).catch(function(response){

					  	  }); 
					  	

					  }).catch(function(response){


					  });


				  }).catch(function(response){

				  });

			}

			$scope.checkCategory = function(parentId, user) {


				$scope.user[parentId] = true;

				var totalChild = 0, checkCategories = 0;
				$('#'+parentId).removeClass('ng-pristine');
				$('#'+parentId).addClass('ng-dirty');

				$('.'+parentId).each(function(){
					totalChild++;
					if ($('#'+this.id).is(':checked')) {
						checkCategories++;
					}
				});

				if (totalChild == checkCategories) {
					$scope.user[parentId] = true;
				} else {
					$scope.user[parentId] = false;
				}

			}


		}])
		.controller('HeaderController', ['QueryService','$scope', function( QueryService, $scope) {
			var params = QueryService.getUrlParams();
			$scope.param = params['email'];

		}]);


})();