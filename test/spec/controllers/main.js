describe('Controller: MainCtrl', function () {

  beforeEach(module('bfs2App'));

  var MainCtrl,
    scope;
	

  beforeEach(inject(function ($controller, $rootScope,$httpBackend, $routeParams) {
    scope = $rootScope.$new();
	routeParams = $routeParams;
	routeParams.postid = 1;	
    httpMock = $httpBackend;
    httpMock.expectGET(
	  "http://jsonplaceholder.typicode.com/posts/").respond(
	 [{
	  "userId": 1,
	  "id": 1,
	  "title": "post title 1",
	  "body": "post body 1"
	},
	{
	  "userId": 1,
	  "id": 2,
	  "title": "post title 2",
	  "body": "post body 2"
	}]
    );
	
	
    httpMock.expectGET(
	  "http://jsonplaceholder.typicode.com/posts/1/comments/").respond(
	 [
	  {
		"postId": 1,
		"id": 1,
		"name": "Eliseo",
		"email": "Eliseo@gardner.biz",
		"body": "comments 1"
	  },
	  {    
		"postId": 1,
		"id": 2,
		"name": "Angel",
		"email": "angel@gardner.biz",
		"body": "comments 2"
	  }]
    );
	
	
    httpMock.expectGET(
	  "http://jsonplaceholder.typicode.com/posts/2/comments/").respond(
	 [
	  {
		"postId": 2,
		"id": 1,
		"name": "Eliseo2",
		"email": "Eliseo2@gardner.biz",
		"body": "comments 21"
	  },
	  ]
    );
		
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
	  $routeParams : routeParams
    });
	httpMock.flush();

  }));
    
  // Test cases	
  it('should attach a list of posts to the scope', function () {
    expect(scope.postlist.length).toBe(2);
  });
    
  it('should retrieve the post details and its comments', function () {
    expect(scope.postlist[0].title).toBe("post title 1");
	expect(scope.postlist[0].comments[0].name).toBe("Eliseo");	
	expect(scope.postlist[0].comments.length).toBe(2);
  });
});
