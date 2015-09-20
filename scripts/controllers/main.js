'use strict';

/**
 * @ngdoc function
 * @name bfsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bfsApp
 */
angular.module('bfs2App')
  .controller('MainCtrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
 console.log("Blog Main Controller begins");
  var i;
  var posts = [];
  var resposts = [];
  var post;
  
  $http.get('http://jsonplaceholder.typicode.com/posts/').then(function(resposts) {
    console.log("I got the data I requested"+resposts.data);
	//posts = resposts;
	$scope.results = resposts.data;
	$scope.postlist = [];	
	angular.forEach($scope.results, function(respost) {
		console.log('-->In loop ID: '+respost.id );		
		$http.get('http://jsonplaceholder.typicode.com/posts/'+respost.id+'/comments/').success(function(rescomments) {		
		post = {id:respost.id,title:respost.title,body:respost.body,comments:rescomments};
		console.log("I got the string post"+JSON.stringify(post));
		console.log("I got the comments"+rescomments);
		console.log("I got the resposts"+respost.id);
		//posts[respost.id] = post;
		$scope.postlist.push(post);
		});		
	});	
  });
});
