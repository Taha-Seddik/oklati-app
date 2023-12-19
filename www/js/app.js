// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var fbook = angular.module('foodbook', ['ionic', 'ngCordova','firebase','ui.router','ngStorage', 'jett.ionic.filter.bar','ionic-modal-select']);

fbook.run(function($ionicPlatform, $cordovaNetwork, $rootScope) {
  $ionicPlatform.ready(function() {
	  
	  
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


fbook.filter('isEmpty', [function() {
  return function(object) {
    return angular.equals([], object);
  }
}])


fbook.config(function($stateProvider,$urlRouterProvider) {
  
  $stateProvider.state("home", {
    url: "/",
    templateUrl: "home.html",
	controller: "MyController"
  });
  
  $stateProvider.state("favorite", {
    url: "/favorite",
    templateUrl: "favorite.html",
    controller: "SingleSearchController",
			resolve: {
              
                datas: function(MyData){
				
					
				return MyData.getData();
				 
                }
				
				
				
            }
  });
  $stateProvider.state("info", {
    url: "/info",
    templateUrl: "info.html",
    controller: "infoController"
  });		
  $stateProvider.state("taha", {
    url: "/taha",
    templateUrl: "taha.html",
    controller: "tahaController"
  });
  /*$stateProvider.state("recList", {
    url: "/recList",
    templateUrl: "recList.html",
    controller: "listController"
  });*/
  $stateProvider.state("searchList", {
	cache: false,
    url: "/search/:foo",
    templateUrl: "searchList.html",
    controller: "MainCtrl"//SearchController
	
  });
  /*$stateProvider.state("singleRecipe", {
    url: "/:id",
    templateUrl: "singleRec.html",
    controller: "recipeController"
  });*/
  $stateProvider.state("singleSearch", {
    url: "/:val",
    templateUrl: "singleAfterSearch.html",
    controller: "SingleSearchController",
			resolve: {
              
                datas: function(MyData){
				
					
				return MyData.getData();
				 
                }
				
				
				
            }
  });
  $stateProvider.state("singleLocal", {
    url: "local/:val",
    templateUrl: "singleLocal.html",
    controller: "localController"
  });
  
  
  
  
  
  $urlRouterProvider.otherwise("/");
  
});