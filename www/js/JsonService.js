angular.module('foodbook').service('MyData', function($http){
	
	this.getData = () => {

		/*return $http.get('../data/data.json').success(function(data) {
					
				 return data;
                 
					})*/
					
					
		return $http.get('data/data.json').then(function(response){
            return response.data;
        })
	};
	
	


})	