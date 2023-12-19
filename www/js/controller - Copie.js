//add controller
fbook.controller('addController',function($scope,$firebaseArray,$state,recipeService){
    $scope.submitRecipe = function(){
        $scope.newRec = recipeService.all;
        $scope.newRec.$add({
            recipeName: $scope.recName,
            recipeIngredients: $scope.recIngredients,
            recipeDirections: $scope.recDirections
        });
        $state.go('home');
    };
});


/**------------------------- MyController ------------------------**/

fbook.controller('MyController', function($scope, $ionicModal ,$cordovaNetwork,$rootScope) {/*, $rootScope*/
	
	
	document.addEventListener("deviceready", function () {

        $scope.network = $cordovaNetwork.getNetwork();
        $scope.isOnline = $cordovaNetwork.isOnline();
        $scope.$apply();
		console.log(" here");
        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
			console.log(" online");
            $scope.isOnline = true;
			$scope.notOnline = false;
            $scope.network = $cordovaNetwork.getNetwork();

            $scope.$apply();
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("got offline");
            $scope.isOnline = false;
			$scope.notOnline = true;
            $scope.network = $cordovaNetwork.getNetwork();

            $scope.$apply();
        })

  }, false);
	
  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });



  
  
  
  
  
  
});
/**-------------------------listController------------------------**/

fbook.controller('listController',function($scope,recipeService){
    $scope.recipes = recipeService.all;

});
 
/**-------------------------recipeController------------------------**/
fbook.controller('recipeController',function($scope,recipeService,$stateParams,$state){
    $scope.singleRecipe = recipeService.get($stateParams.id);
    $scope.ingList =  $scope.singleRecipe.ingredients;
   //$scope.prep = $scope.singleRecipe.steps;
});


/**-------------------------SearchController------------------------**/


fbook.controller('SearchController',function($scope,recipeService,$stateParams,$state,$ionicLoading,$ionicPopup,$cordovaNetwork,$rootScope,$http,$ionicPlatform){
   
});

/**-------------------------SingleSearchController------------------------**/

fbook.controller('SingleSearchController',function($scope,recipeService,$stateParams,$state, StorageService,$ionicPopup,$http){
    
	if ($scope.isOnline) {
		
		
	// get DATA FROM FIREBASE		
	$scope.singleRecipe = recipeService.get($stateParams.val);
	
	}else{
	// get DATA WITH ID from JSON	
	//$scope.singleRecipe = StorageService.get($stateParams.val);
	
	$http.get('data/data.json').success(function(data) {
				
			
			var localData= data;
			var test =[];
			for( var i = 0; i < localData.length ; i++ ){
			
			if (localData[i].id == $stateParams.val){
			$scope.singleRecipe = localData[i];
			}
			}
			
			
			});	
	/*var localData= data;
			var test =[];
			for( var i = 0; i < localData.length ; i++ ){
			
			if (localData[i].id == $stateParams.val)
			test.push(localData[i]);
			$scope.singleRecipe = localData[i];
			}
			
			$scope.recipes = test;
			$ionicLoading.hide();
			console.log('AFTER HTTP');
			
			});	*/
		
	}
	
	 $scope.things = StorageService.getAll();

	  $scope.add = function (newThing) {
		
		var objectInlocal = StorageService.get(newThing.id);
		
		console.log(objectInlocal);
		
		
		if (objectInlocal != null){
    

			$ionicPopup.alert({
            title: ' هذه الوجبة توجد في وجباتك المفضلة ',
			scope: $scope,
			buttons: [
			  
			  {
				text: '<b>أغلق</b>',
				type: 'button-dark',
				
			  }
			]
			
        });
	
	
			}else{
		
		$ionicPopup.alert({
            title: 'أضف إلى المفضلة',
			scope: $scope,
			buttons: [
			  { text: 'لا' },
			  {
				text: '<b>نعم</b>',
				type: 'button-dark',
				onTap: function(e) {
				  StorageService.add(newThing);
				}
			  }
			]
        });
		
		
	
	  }
		};
		
		
		
	  $scope.remove = function (thing) {
		  
		  
		  $ionicPopup.alert({
            title: 'إحذف من المفضلة',
			scope: $scope,
			buttons: [
			  { text: 'لا' },
			  {
				text: '<b>نعم</b>',
				type: 'button-assertive',
				onTap: function(e) {
				  StorageService.remove(thing);
				}
			  }
			]
        });
		  
		
	  };
	
	
	
});



fbook.controller('MainCtrl', function($scope,$stateParams,$state,$location,$ionicFilterBar,$ionicLoading,$ionicPopup,$cordovaNetwork,$rootScope,$http) {
	
	var UserAllergie = '';

 var test =[];
 $scope.recipes =[];
	$scope.showFilterBar = function () {
			filterBar = $ionicFilterBar.show({
			  items: $scope.recipes,
			  update: function (filteredItems) {
				$scope.recipes = filteredItems
			  },
			  filterProperties : 'title'
			});
		  }
	/*	var foo = $stateParams.foo;
		
		console.log(foo);*/
 
	 
    //alert(user.answer);
	
	/*
	
	$scope.submitSearch = function(){
		
	$scope.recipes =[];
	var ref = new Firebase("https://test2-6776b.firebaseio.com/");
	
		ref.orderByChild("possible").equalTo($scope.allergieName).on("child_added", function(snapshot) {
		//  console.log(snapshot.val());
		
		 test.push(snapshot.val());
		  
			$scope.recipes = test;

		});
	
		$state.go('searchList', {recipes: test});
		
	};	
		*/
		
	if ($scope.isOnline) {
		
		var ref = new Firebase("https://test2-6776b.firebaseio.com/");
	
		ref.orderByChild("possible").equalTo($scope.allergieName).on("child_added", function(snapshot) {
		//  console.log(snapshot.val());
		
		 test.push(snapshot.val());
		  
			$scope.recipes = test;

		});
		
	}else{
	$ionicLoading.show();	
	$http.get('data/data.json').success(function(data) {
				
			
			var localData= data;
			var test =[];
			for( var i = 0; i < localData.length ; i++ ){
			
			if (localData[i].possible == $stateParams.foo){
			test.push(localData[i]);
			}
			}
			
			$scope.recipes = test;
			$ionicLoading.hide();
			console.log('AFTER HTTP');
			
			});	
		
		
	}
	
	
	
	$scope.selectables = [
    'مخبوزات', 'حلويّات', 'غداء','حساء'
	];
	
	
	$scope.selectables2 = [
    'تونسيّة', 'جزائريّة', 'مصريّة','إمراتيّة','سعوديّة','عامة'
	];
	
	$scope.assignSearch = function(val){
		
		$scope.search=val;
	};
	
	$scope.assignSearch2 = function(val){
		
		$scope.search2=val;
	};
	
  
  });

/**-------------------------Info controller------------------------**/
fbook.controller('infoController', function($scope,recipeService,$stateParams,$state,$location,$ionicFilterBar) {
	
	
$scope.items = [
{ name: " الرند أو ورق لورا",
  info: "أوارق الرند والمعروفة بورق الغار، هي الأوراق الخضراء أو المجفّفة التي نستخدمها في مطابخنا بشكل أساسيّ كنوع من أنواع التوابل والمنكهات الرئيسية للطعام،  ولها رائحة مميّزة",
  imgURL: "img/ingredients/1.png"
},   
{ name: "الملسوقة",
  info: "تمثل الملسوقة مكونا رئيسيا في المطبخ التونسي خاصة في شهر رمضان الفضيل و هي عبارة عن ورقات من العجين تستعمل لعدة أطعمة و خاصة البريك",
  imgURL: "img/ingredients/2.png"
},
{ name: "فلفل زينة",
  info: "فلفل أحمر مجفف وهو نوعان حار أو حلو يستعمل الأول لتفويح الأطعمة و الثاني لتلوينها",
  imgURL: "img/ingredients/3.png"
},
{ name: "الهريسة",
  info: " في المطبخ التونسي هي نوعان هريسة السوق تصنع بالفلفل الأحمر الحار الطازج يرحى و يفوح و يحفظ و  الهريسة الدياري تصنع في المنزل بالفلفل تاحار المجفف مع مقادير مناسبة من الكروية و الثوم و الملح",
  imgURL: "img/ingredients/4.png"
},
{ name: "البروكلو أو البروكلي",
  info: "يتم استخدامها في عمل السلطات او اكلها بمفردها تعتبر من اكثر الاطعمة الصحية المفيدة للانسان ، وفوائد البروكلي الكثيرة تجعله ضمن قائمة الخضروات الاكثر فائدة للانسان",
  imgURL: "img/ingredients/5.png"
},
{ name: "المعدنوس",
  info: "من اشهر انواع النباتات العطرية المعروفة والمستخدمة بشكل شعبي كبير الا ان اسمه الحقيقي هو “المقدونس” الا انه اشتهر اكثر باسم البقدونس كما يطلق عليه فى بعض الدول العربية اسم المعدونس",
  imgURL: "img/ingredients/6.png"
},
{ name: "الجلبانة أو البسلة",
  info: "البازلاء نبات عشبي حولي يتبع الفصيلة البقولية و اسمها العلمي وهي معروفة أيضاً باسم الجلبانة في تونس , الجزائر و المغرب و باسم بسلة في مصر وبعض البلدان الأخرى",
  imgURL: "img/ingredients/7.png"
},
{ name: "السكر المحور",
  info: "هو سكر مرحي ناعم",
  imgURL: "img/ingredients/8.png"
},
{ name: "المرقاز",
  info: "هو نوع من أنواع النقانق يصنع من لحم الخروف أو لحم البقر ومتبل بالهريسة ",
  imgURL: "img/ingredients/9.png"
},
{ name: "لحم العلوش",
  info: "هو لحم الخاروف",
  imgURL: "img/ingredients/10.png"
},

{ name: "الكسكاس",
  info: "الكسكاس هو الجزء العلوي من ماعون إعداد الكسكسي، ويسمى الجزء السفلي منه بـالمقفول. والكسكاس كثير الثقب، بما يسمح بتسرب البخار من المقفول ليتخلل الكسكسي حتى ينضج",
  imgURL: "img/ingredients/11.png"
},
{ name: "السمن",
  info: "هو عباره عن مستخرج من لبن الغنم أو البقر بعد الغلي بطريقة معينة ، او السمن الصناعي أو النباتي المستخرج من النبات من زيت الذرة والسمن عادة نستخرجه من الزبده بعد غليه جيدا وتبخر الماء منه",
  imgURL: "img/ingredients/12.png"
},
{ name: "الجلجلان أو السمسم",
  info: "نبات السّمسم نبات عشبي حولي يعرف بأسم سمسم أو جلجلان وسجلت اسماء عربية أخرى كسليط وشيراج",
  imgURL: "img/ingredients/13.png"
},
{ name: " ورق البوراك او الديول ",
  info: "  ورق البوراك او الديول هو ورق خفيق جدا شفاف و دائرى  ",
  imgURL: "img/ingredients/14.png"
},
{ name: "فريك القمح",
  info: "الفريك  او الفريكة هي حبوب القمح الخضراء (القمح الأخضر) قبل جفافها تحصد سنابلها وهي خضراء وتعرض للحرارة عن طرق حرقها، ثم تجرش لتكون مثل البرغل، وتطبخ كما يطبخ البرغل على ماء اللحم وتوضع فوقها قطع اللحم الكبيرة. تؤكل عادة مع اللبن وتدخل في تحضير الشوربة وفي حشو بعض انواع الدواجن",
  imgURL: "img/ingredients/15.png"
},
{ name: " الجلاش ",
  info: "الجلاش من المأكولات الخفيفة الشهية المحببة للكثيرين والتي اشتهرت في بلاد الشام ومصر. والجلاش هو عبارة عن رقائق عجين تحضّر بطريقة معينة ويتم حشو هذه العجينة بحشوات مختلفة؛ فيمكن حشوها بالمكسرات، أو الجبن، أو القشطة؛",
  imgURL: "img/ingredients/16.png"
},
{ name: " الكزبرة أو الكسبرة ",
  info: " تعرف في تونس بالتابل و هو نبات عشبي من فصيلة الخيميات بذوره كروية الشكل في حجم حبوب الفلفل الاسود لونها أصفر داكن لها رائحة عطرية مميزة ",
  imgURL: "img/ingredients/17.png"
},
{ name: " الزعفران",
  info: " يعتبر الزعفران من النباتات العطرية الزكية حيث أنه يكون على شكل صبغة صفراء اللون يوضع على الاكل ليعطيه نكهه طيبة",
  imgURL: "img/ingredients/19.png"
},
{ name: " قوانص الدجاج",
  info: "  هي الجزء الداخلي من الدجاج أي هي معدة وقلب وكبد الدجاج كل هذه الأجزاء يطلق عليها قوانص الدجاح",
  imgURL: "img/ingredients/20.png"
},
{ name: "السجق",
  info: "هو اللحم المبهر الموضوع في الأمعاء الدقيقة لهذا الحيوان ويتم تحضير السجق من اللحم المفروم بعد إضافة الملح والتوابل",
  imgURL: "img/ingredients/21.png"
},
{ name: "بايكغ باودر أو بيكنغ باودر",
  info: "هو عبارة عن كربونات الصوديوم الهيدروجينية، الذي يتأثر بالحرارة ليعطي عند ذلك غاز ثاني أكسيد الكربون الذي يعمل على انتفاخ العجين، ويتم استخدام البيكنج باودر بحوالي نصف ملعقة صغيرة منه في ثلث كوب من الماء",
  imgURL: "img/ingredients/22.png"
},
{ name: "جوزة الطيب",
  info: "تعتبر جوزة الطيب أو ما يسمى أيضاً بجوز الطيب العطرّي على أنها نوع نباتات من فصيلة الطيبية ،وأسمها العلمي (Myristica fragrans) ، وهي عبارة عن بذور تساعد في تنشيط الدورة الدموية عند الإنسان . وتساعد في تقليل التهابات المفاصل الناتجة عن مرض النقرس ، ولكن أخذها بكمية كبيرة خطير ويسبب الهلوسة وزغللة في العين وخطرة على الأم الحامل بقدرتها على إختراق المشيمة وتزيد من ضربات قلب الجنين",
  imgURL: "img/ingredients/23.png"
},
{ name: "الشبت",
  info: "نبات عشبي شبيه بالبسباس من الفصيلة الخيمية يحتوي مكونات عطرية عديدة تعطيه رائحة طيبة و طعما لذيذا يستعمل عندنا لتفويح مرق  الخضرة و بعض الخضر المصبرة",
  imgURL: "img/ingredients/24.png"
},
{ name: "دقيق التوبيكا",
  info: " دقيق نشوى وابيض ويحافظ علي تماسك الخبز والحلوي من التفتيت وايضا يجعل المخبوزات خفيفه ويزيد من مضغها.. مناسب جدا للحلويات",
  imgURL: "img/ingredients/25.png"
},
{ name: "صمغ الزنثان",
  info: " جيد لتماسك  المخبوزات ويعطي المخبوزات تمضع وعجين ناعم.. هذا المسحوق الابيض نباتى في الاصل ,, والذي يكون شبيه بالغلوتين",
  imgURL: "img/ingredients/26.png"
},
{ name: "المهلبيّة",
  info: " هو أحد الأطباق الحلوة التي تشتهر بها الوطن العربي، تصنع من لب شجرة المحلب وهي ذات أنواع : إما ان تكون مع الأرز (في مصر مع الأرز اسمه أرز باللبن) أو مع القشطة أو السميد أو البسكويت، وإما أن تكون عبارة عن حليب مطبوخ مع النشا حتى يتكثف المزيج ويصبح له قوام أغلظ ثم تصب في أطباق وتزين بالمكسرات أو القرفة.",
  imgURL: "img/ingredients/27.png"
},
{ name: "البقسماط",
  info: "هو نوع من أنواع الخبز يتم تجفيفه وتحميصه بالفرن ويقلب على جميع الجهات حتى يكتسب لونا ذهبيا وطعما مقرمشا يستخدم البقسماط لتغليف اللحوم والدجاج والأسماك قبل شويها بالفرن أو قليها لتكسب الأطعمة قرمشة لذيذة ونكهة غنية ولتحافظ على عصارتها وإبقائها لينة حتى لا تجف أثناء عملية الشواء أو التحمير",
  imgURL: "img/ingredients/28.png"
},
{ name: "الهيل بذور الحبهان",
  info: "حب الهيل هو ثمر نبات معمر زاحف ينتمي إلى الفصيلة الزنجبيلية وهو من وحيدات الفلقه",
  imgURL: "img/ingredients/29.png"
},
{ name: "البرام",
  info: "البرام فى مصر هو وعاء من الفخار لونه بنى",
  imgURL: "img/ingredients/30.png"
},
{ name: "البرام",
  info: "البرام فى مصر هو وعاء من الفخار لونه بنى",
  imgURL: "img/ingredients/30.png"
},
{ name: "اللومي",
  info: "اللومي هو حبة الليمون السوداء أو الصفراء المجففة ، ذات شكلٍ دائري، صغيرة الحجم ، ومغطاة بقشرة رقيقة صلبة ، ذات نكهةٍ ورائحةٍ مميزةٍ ومنعشة",
  imgURL: "img/ingredients/31.png"
},
{ name: "الشيرة",
  info: "الشيرة هي القطر أو الشربات وهي عبارة عن سائل محلى قد يكون غليظ القوام أو مائل إلى السيولة حسب طريقة وصفته والحلوى التي سيضاف عليها ، تستخدم الشيرة لبعض أنواع الحلويات الشرقية وفي بعض الحلويات الغربية ويسموه الغرب شراب العسل لتشبهه بالعسل في قوامه ولونه",
  imgURL: "img/ingredients/32.png"
},
{ name: "الساقو",
  info: "وهو عبارة حبوب على شكل كرات صغيرة يتم نقعها وطبخها مع إضافات خاصة لتصبح حلوى لذيذة",
  imgURL: "img/ingredients/33.png"
},
{ name: "الجريش",
  info: "جريش هو عبارة عن قمّح مجروش وليس بالمطحون ، ومنّه نوعان مجروش خشن ومجروش ناعم أي تقوم بإحضار القمح وتكون حباتّه كاملة ويكسر الى عدة كسّر من خلال معدّات خاصة لذّلك",
  imgURL: "img/ingredients/34.png"
},
{ name: "ينسون",
  info: "يعرف اليانسون بعدة اسماء فيعرف باسم ينكون وتقده وكمون حلو وفي المغرب يسمونه الحبة الحلوة وفي الشام ينسون",
  imgURL: "img/ingredients/35.png"
},
{ name: "مايزينا",
  info: "هو نشاء الذرة",
  imgURL: "img/ingredients/36.png"
},
];	
	
$scope.toggleItem= function(item) {
    if ($scope.isItemShown(item)) {
      $scope.shownItem = null;
    } else {
      $scope.shownItem = item;
    }
  };
  $scope.isItemShown = function(item) {
    return $scope.shownItem === item;
  };
	
});	



/**-------------------------Local Storage controller------------------------**/
fbook.controller('localController', function($scope,recipeService,$stateParams,$state, StorageService,$ionicPopup) {
	$scope.name='taha';
	console.log($stateParams.val);
	
	
	$scope.singleRecipe = StorageService.get($stateParams.val);
	
	
	

});		



/* 


document.addEventListener("deviceready", function () {
 
        $scope.network = $cordovaNetwork.getNetwork();
        $scope.isOnline = $cordovaNetwork.isOnline();
        $scope.safeApply(function() {
		console.log('apply');
		});
        
        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
			console.log("LIIIIIIIIIIIIIINE");
            $scope.isOnline = true;
            $scope.network = $cordovaNetwork.getNetwork();
            $scope.taha = 'ONLINE';
            $scope.safeApply(function() {
			console.log('apply');
			});
			
			
			
        })
 
        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("OFFFFFFFFFFF");
            $scope.isOnline = false;
            $scope.network = $cordovaNetwork.getNetwork();
            $scope.taha = 'OFF LINE';
			
			console.log('before HTTP');
			$http.get('data/data.json').success(function(data) {
				
			
			var localData= data;
			var test =[];
			for( var i = 0; i < localData.length ; i++ ){
			
			if (localData[i].possible == $stateParams.foo)
			test.push(localData[i]);
			
			}
			
			$scope.recipes = test;
			
			console.log('AFTER HTTP');
			
			});
			
			
			
            $scope.safeApply(function() {
			console.log('apply');
			});
			
			
			
			   
		   
			
			
			
        })
 
	}, false);


$scope.safeApply = function(fn) {
	  var phase = this.$root.$$phase;
	  if(phase == '$apply' || phase == '$digest') {
		if(fn && (typeof(fn) === 'function')) {
		  fn();
		}
	  } else {
		this.$apply(fn);
	  }
	};
  
  
	
	








*/