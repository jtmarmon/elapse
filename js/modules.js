var elapse = angular.module('elapse', ['ngRoute', 'ngAnimate']);
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
elapse.service('schedule', function(){
	var data = [{}];
	return{
		getData: function(){
			return data;
		},
		setData: function(newData){
			data = newData;
		}
	};
});
var instances = 0;
elapse.controller('ScheduleController', function($scope, $timeout, $location, schedule){

	$scope.events = []
	
	function initPicker(picker)
		{
			$(picker).ColorPicker(
				({
						
						onShow: function (colpkr) {
							$(colpkr).fadeIn(500);
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
		var newEvent = {
			title:"", 
			color:"#FFF000",
			duration:
				{
					hours:0,
					minutes:30
				},
			index:instances++
		}
		$scope.events.push(newEvent);
		$timeout(function() {
	      	$(".preview-circle").each(function(index,ele)
	     	 {
	     	 	console.log(index);
	       	 	initPicker(ele);
	    });
	});

	}
	$scope.startTimers = function()
	{
	 	schedule.setData($scope.events);
		$location.path('timers');
	}
	$(document).ready(function(){
		$scope.addScheduleElement();
	});

	
});
//TIMER CONTROLLER


elapse.controller('TimerController', function($scope, $timeout, $location, schedule){
	$scope.events = schedule.getData();
	$scope.currentEvent = $scope.events[0];
	$scope.currentStyle = {
		background:$scope.currentEvent.color
	}
	console.log("execuer");

});
