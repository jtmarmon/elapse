var elapse = angular.module('elapse', ['ngRoute', 'ngAnimate']);
elapse.config(function($routeProvider)
{
	$routeProvider
	.when('/',
	{
		controller:'ScheduleController',
		templateUrl: 'views/schedule.html'
	})
	.when('/timers',
	{
		controller:'TimerController',
		templateUrl:'views/timers.html'
	})
	.when('/end',
	{
		controller:'EndController',
		templateUrl:'views/end.html'
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
/*
	1) Use total duration of event to determine intervals

*/

elapse.controller('TimerController', function($scope, $timeout, $location, schedule){
	$scope.events = schedule.getData();
	var currentEventIndex = 0;
	$scope.currentEvent = $scope.events[currentEventIndex];
	$scope.currentStyle = {
		background:$scope.currentEvent.color
	}
	$scope.timer = function()
	{
		var start = new Date().getTime(),
		elapsed = '0.0';
		var seconds, minutes= 0;
		var storedHours = $scope.currentEvent.duration.hours;
		var storedMinutes = $scope.currentEvent.duration.minutes;
		var interval = window.setInterval(function()
		{
			if($scope.currentEvent.duration.hours == 0 && $scope.currentEvent.duration.minutes == 0)
			{
				window.clearInterval(interval);
				$scope.nextEvent();
				seconds,minutes = 0;
				elapsed = '0.0';
				start = new Date().getTime();
			}
	 	   var time = new Date().getTime() - start;
		    elapsed = Math.floor(time / 100) / 10;
		    if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }
			    document.title = elapsed;
			    seconds = elapsed;
			    minutes = seconds/1;
			    $scope.currentEvent.duration.minutes = storedMinutes - Math.floor(minutes);
			    $scope.$apply();
				}, 100);
	}
	$scope.nextEvent = function()
	{
		currentEventIndex++;
		if(currentEventIndex < $scope.events.length)
			$scope.currentEvent = $scope.events[currentEventIndex];
		else
			$location.path('end');
		console.log("CURRENT EVENT:::::: " + $scope.currentEvent);
		$scope.currentStyle = {
		background:$scope.currentEvent.color
	}
		console.log($scope.currentEvent.color);
		$scope.timer();
	}
	$(document).ready(function(){
		$scope.timer();
	});
});


elapse.controller('EndController', function($scope, $timeout, $location, schedule){
		
});
