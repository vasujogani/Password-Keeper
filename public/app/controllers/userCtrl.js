angular.module('userControllers', ['userServices'])

.controller('regCtrl', function($http, $location, $timeout, User){

  var app = this;
  app.regUser = function(regData){
    app.errorMsg = false;
    app.successMsg = false;
    app.loading = true;

    User.create(app.regData).then(function(data){
      if(data.data.success){
        app.successMsg = data.data.message;
        app.loading = false;
        $timeout(function () {
          $location.path('/');
        }, 1403);
      } else {
        app.errorMsg = data.data.message;
        app.loading = false;
      }
    });

  }
})
