fbook.factory('recipeService',function($firebaseArray) {
    var fb = new Firebase( "https://test2-6776b.firebaseio.com/");
    var recs = $firebaseArray(fb);
    var recipeService = {
        all: recs,
        get: function(recId) {
            return recs.$getRecord(recId);
        },
		select: function(){
			
			fb.orderByChild("possible").equalTo("celiac").on("child_added", function(snapshot) {
			
				//typeof (snapshot.val()) ;
			return snapshot.val();
		});
		}
			
    };
    return recipeService;
});



/*fbook.factory('recipeService',function($firebaseArray) {
    var fb = new Firebase( "https://test2-6776b.firebaseio.com/");
    var recs = $firebaseArray(fb);
    var recipeService = {
        all: recs,
        get: function(recId) {
            return recs.$getRecord(recId);
        }        
    };
    return recipeService;
});*/