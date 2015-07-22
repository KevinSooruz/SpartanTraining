var app=angular.module("app",["ngRoute","ngTouch","services"]),services=angular.module("services",[]);app.config(["$routeProvider",function($routeProvider){$routeProvider.when("/",{templateUrl:"app/views/home.php",controller:"HomeController"}).when("/profil",{templateUrl:"app/views/profil.php",controller:"ProfilController"}).otherwise({redirectTo:"/"})}]),app.controller("AllController",function($scope,Log){$scope.logout=function(){Log.out()}}),app.controller("HomeController",function($scope){$scope.modalInscription=!1,$scope.showModalInscription=function(){$scope.modalInscription=!0}}),app.controller("ProfilController",function(Session){Session.get()}),services.factory("Api",function($http){var api={};return api.post=function(url,data){return $http({method:"POST",url:url,headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8;"},data:api.urlSerialize(data)}).success(function(response){return response}).error(function(data,status,headers,config){var response="error";return console.log(data,status,headers,config),response})},api.get=function(url){return $http({method:"GET",url:url}).success(function(response){return response}).error(function(data,status,headers,config){var response="error";return console.log(data,status,headers,config),response})},api.urlSerialize=function(data){var obj=data,dataUrl="",max=Object.keys(obj).length,i=0;for(var prop in obj)obj.hasOwnProperty(prop)&&(i++,dataUrl+=max>i?prop+"="+obj[prop]+"&":prop+"="+obj[prop]);return dataUrl},api}),services.factory("Log",function(Api,$location){var log={};return log["in"]=function(url){$location.path(url)},log.out=function(){var data={logout:!0};Api.post("back/controls/logoutCtrl.php",data).then(function(response){"logout"===response.data&&$location.path("/")})},log}),services.factory("Session",function(Api,$location){var session={};return session.get=function(){Api.get("back/controls/sessionCtrl.php").then(function(response){"session"!==response.data&&$location.path("/")})},session}),app.directive("inscription",function(Api,Log){var inscription={restrict:"E",replace:!0,templateUrl:"app/views/inscriptionModal.php",link:function(scope){scope.focusInputModal=function(inputId){var label=document.getElementById("label"+inputId);label.classList.add("move")},scope.blurInputModal=function(inputId){var input=document.getElementById(inputId),value=input.value,label=document.getElementById("label"+inputId);(""===value||void 0===value)&&label.classList.remove("move")},scope.hideModal=function(){scope.modalInscription=!1},scope.userExist=!1,scope.wrongMail=!1,scope.confirmInscription=function(){var data=this.user;Api.post("back/controls/authUserCtrl.php",data).then(function(response){if("error"===response);else switch(response.data){case"userExist":scope.userExist=!0;break;case"wrongMail":scope.wrongMail=!0;break;case"userAdded":scope.modalInscription=!1,Log["in"]("/profil")}})}}};return inscription});