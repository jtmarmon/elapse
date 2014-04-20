var elapse = angular.module("elapse", ['ngRoute']);
elapse.config(function($routeProvider)
{
	$routeProvider
	.when('/',
	{
		controller:'ScheduleController',
		templateUrl: 'schedule.html'
	})
	.when('/timers',
	{
		controller:'TimerController',
		templateUrl:'timers.html'
	})
	.otherwise({redirectTo: '/'});
});
var instances = 0;
elapse.controller('ScheduleController', function($scope, $timeout){

	$scope.events = []
	
	function initPicker(picker)
		{
			$(picker).ColorPicker(
				({
						
						onShow: function (colpkr) {
							$(colpkr).fadeIn(500);
							//need to simulate click here //what....for some reason this is an undefined function but still calls the select method WTF
							return false;
						},
						onHide: function (colpkr) {
							$(colpkr).fadeOut(500);
							return false;
						},
						onChange: function (hsb, hex, rgb) {
							
							$scope.$apply(function(){
								$(picker).css('backgroundColor', '#' + hex);
								//picker4
								var pickerIndex = $(picker).attr('id').substring(6, $(picker).attr('id').length);
								console.log(pickerIndex);
								$scope.events[pickerIndex].color = "#" + hex; 
							});
						}
					})
				);
		}
	$scope.addScheduleElement = function()
	{
		var newEvent = {title:"", color:"#FFF000",duration:"30 minutes", index:instances++}
		$scope.events.push(newEvent);
		$timeout(function() {
	      	$(".preview-circle").each(function(index,ele)
	     	 {
	     	 	console.log(index);
	       	 	initPicker(ele);
	    });
	});

	}
	$(document).ready(function(){
		$scope.addScheduleElement();
	});
	
	function randomColor()
	{
		return '#'+Math.floor(Math.random()*16777215).toString(16);
	}
	
});
