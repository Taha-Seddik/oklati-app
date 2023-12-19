// create a new factory
fbook.factory ('StorageService', function ($localStorage) {

  $localStorage = $localStorage.$default({
    things: []
  });

  var _getAll = function () {
	  
    return $localStorage.things;
  };

  var _add = function (thing) {
    $localStorage.things.push(thing);
  }

  var _remove = function (thing) {
	  console.log(thing);
	for( var i = 0; i < $localStorage.things.length ; i++ ){
		
		if( $localStorage.things[i].id == thing  ){
		console.log($localStorage.things[i]);	
		
		
		$localStorage.things.splice(i, 1);
		
		
		console.log($localStorage.things[i]);	
		
		}
		
	}  
	  
	  
    
  }
  
  
  var _get = function (id) {
    for( var i = 0; i < $localStorage.things.length ; i++ ){
		
		if( $localStorage.things[i].id == id  ){
		console.log($localStorage.things[i]);	
		return $localStorage.things[i];	
		}
		
	}
  }
  

  return {
    getAll: _getAll,
    add: _add,
    remove: _remove,
	get : _get
  };
})







