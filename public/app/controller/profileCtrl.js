app.controller('profileCtrl', function($scope, $http) {
	var userId = userID ;
	console.log(userID);
	$http.get("/profile/"+userId+"/api/data.json").then(function (response) {
		console.log(response.data);
	});
});