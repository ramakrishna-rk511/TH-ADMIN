


function usersController($scope, $rootScope, processReqFactory, baseURL, notifyAlertMessage, loadingView, dataTablesInitService, $state){
	processReqFactory.processReq(baseURL.IP+"/users/all","GET",'',function(response){
    // $scope.userList = response;
        loadingView.startLoading('hide');
        var columns = [
        { "data": "name",
          "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
         },
        { "data": "phoneNo",
          "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
         },
        { "data": "email",
          "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
         },
        { "data": "userRolesModels",
          "render": function(data,type,row,meta) {
            if (data) {
              var b = "";
              for(var urm in data){
                b += '<span>'+data[urm]['roleName']+'</span>'+' , '
              }
              return b;
            }
          } 
        },
        { "data": "isActive",
          "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
         },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateUsers(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      localStorage.setItem('usersList',JSON.stringify(response));

    // $scope.getcompanyBranchList = function(id){
      processReqFactory.processReq(baseURL.IP+"/companybranch/all","GET",'',function(response){ 
        $scope.companyBranchList = response;
        localStorage.setItem('companyBranchList',JSON.stringify(response));
        },function(error){
         // if (error.status==401) {
         //    $state.go('login');
         //  }
      });



      dataTablesInitService.initDataTables(response,columns,'#userTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        if (error.status==401) {
          $state.go('login');
        }
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });


    $scope.addOrUpdateUsers = function(id){

      	processReqFactory.processReq(baseURL.IP+"/role/all","GET",'',function(response){
      		$rootScope.rolesList = response;
      	},function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
      	});

    	if (id) {
    		processReqFactory.processReq(baseURL.IP+"/users/"+id,"GET",'',function(response){ 
	          $scope.userUpdationObj = response;
	          $('#addUserModal').modal();
	        },function(error){
	          notifyAlertMessage.notify("Something went Wrong","alert-danger")
	      	});

    	}else{
    		$('#addUserModal').modal();
    	}
    }


    $scope.addUser = function(userObj){
    	if (userObj.id) {
    		//  && userObj.isActive
	        if (userObj.name) {
	          processReqFactory.processReq(baseURL.IP+"/users/"+userObj.id+"/edit","PUT",userObj,function(key,response){ 
	            if (response==200) {
	              notifyAlertMessage.notify("User Updated Successfully","alert-danger");
	              location.reload();
	            }
	          },function(error){
	            notifyAlertMessage.notify("Something went Wrong","alert-danger");
	          });

	        }else{
	          notifyAlertMessage.notify("name cannot be null","alert-danger");
	        }
	    }else{
	        if (userObj.name && userObj.isActive) {
	        	var userCreationObj = {
	        		"name": userObj.name,
	        		"email": userObj.email,
	        		"phoneNo": (userObj.phoneNo)+'',
	        		// "isActive": userObj.isActive=='true'?true:false
	        	}
	        	userCreationObj['userRolesModels'] = [];
	        	userCreationObj['userRolesModels'].push({'roleId': userObj.roleName})
	          
		        processReqFactory.processReq(baseURL.IP+"/users/create","POST",userCreationObj,function(key,response){ 
		            if (response==201) {
		              	notifyAlertMessage.notify("User Created Successfully","alert-danger");
		              	location.reload();
		            }
		        },function(error){
		            notifyAlertMessage.notify("Something went Wrong","alert-danger");
		        });

	        }else{
	          notifyAlertMessage.notify("name cannot be null","alert-danger");
	        }
	    }
    }
}


function rolesController($scope, $rootScope, processReqFactory, baseURL, notifyAlertMessage, loadingView, dataTablesInitService, $state){
	processReqFactory.processReq(baseURL.IP+"/role/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        { "data": "name" },
        { "data": "isActive" },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateRole(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#rolesTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        if (error.status==401) {
          $state.go('login');
        }
        //$rootScope.show_load = false;
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });	


    $scope.addOrUpdateRole = function(id){
      if (id) {
        processReqFactory.processReq(baseURL.IP+"/role/"+id,"GET",'',function(response){ 
          $scope.roleObj = response;
          $('#addRoleModal').modal();
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
      }else{
        $('#addRoleModal').modal();
      }
    }

    $scope.addRole = function(roleObj){
	    if (roleObj.id) {
	        if (roleObj.name && roleObj.isActive) {
	          	processReqFactory.processReq(baseURL.IP+"/role/"+roleObj.id+"/edit","PUT",roleObj,function(key,response){ 
	            if (response==200) {
	              notifyAlertMessage.notify("Role Updated Successfully","alert-danger");
	              location.reload();
	            }
	          },function(error){
	            notifyAlertMessage.notify("Something went Wrong","alert-danger");
	          });

	        }else{
	          notifyAlertMessage.notify("name cannot be null","alert-danger");
	        }
	    }else{
	        if (roleObj.name && roleObj.isActive) {

	        	roleObj.isActive = roleObj.isActive=='true'?true:false;
	          
		        processReqFactory.processReq(baseURL.IP+"/role/create","POST",roleObj,function(key,response){ 
		            if (response==201) {
		              	notifyAlertMessage.notify("Role Created Successfully","alert-danger");
		              	location.reload();
		            }
		        },function(error){
		            notifyAlertMessage.notify("Something went Wrong","alert-danger");
		        });

	        }else{
	          notifyAlertMessage.notify("name cannot be null","alert-danger");
	        }
	    }
    }
}


function userRolesController($scope, $rootScope, processReqFactory, baseURL, notifyAlertMessage, loadingView, dataTablesInitService, $state){


    processReqFactory.processReq(baseURL.IP+"/userroles/all","GET",'',function(response){
        loadingView.startLoading('hide');
        //$rootScope.show_load = false;
        var columns = [
        { "data": "roleName" },
        { "data": "status" },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateUserRole(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#userRolesTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        if (error.status==401) {
          $state.go('login');
        }
        //$rootScope.show_load = false;
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });


    $scope.addOrUpdateUserRole = function(id){
    	delete $scope.userRoleCreationObj
    	processReqFactory.processReq(baseURL.IP+"/role/all","GET",'',function(response){
      		$rootScope.rolesList = response;
      	},function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
      	});
      	processReqFactory.processReq(baseURL.IP+"/users/all","GET",'',function(response){
      		$rootScope.usersList = response;
      	},function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
      	});
      if (id) {
        processReqFactory.processReq(baseURL.IP+"/userroles/"+id,"GET",'',function(response){ 
          $scope.userRoleCreationObj = response;
          $('#addUserRoleModal').modal();
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
      }else{
        $('#addUserRoleModal').modal();
      }
    }




    $scope.addUserRole = function(userRoleObj){
	    if (userRoleObj.id) {
	        if (userRoleObj.userId) {
	          processReqFactory.processReq(baseURL.IP+"/userroles/"+userRoleObj.id+"/edit","PUT",userRoleObj,function(key,response){ 
	            // console.log(response+'----'+key);
	            if (response==201) {
	              notifyAlertMessage.notify("User Role Updated Successfully","alert-danger");
	              location.reload();
	            }
	          },function(error){
	            notifyAlertMessage.notify("Something went Wrong","alert-danger");
	          });

	        }else{
	          notifyAlertMessage.notify("user name cannot be null","alert-danger");
	        }
	    }else{
	        if (userRoleObj.userId) {

	        	// userRoleObj.isActive = userRoleObj.isActive=='true'?true:false;
	          
		        processReqFactory.processReq(baseURL.IP+"/userroles/create","POST",userRoleObj,function(key,response){ 
		            if (response==201) {
		              	notifyAlertMessage.notify("User Role Created Successfully","alert-danger");
		              	location.reload();
		            }
		        },function(error){
		            notifyAlertMessage.notify("Something went Wrong","alert-danger");
		        });

	        }else{
	          notifyAlertMessage.notify("user name cannot be null","alert-danger");
	        }
	    }
    }
}
function usersMsgController($scope, $rootScope, processReqFactory, baseURL, notifyAlertMessage, loadingView, dataTablesInitService, $state){
    // $scope.userList = []
    // processReqFactory.processReq(baseURL.IP+"/users/all","GET",'',function(response){
    //     $scope.userList = response;
    //     // $scope.userList.push({'id': 'ALL','entityName': 'ALL'}); 
    // },function(error){
    //   // notifyAlertMessage.notify("Something went Wrong","alert-danger")
    // // $scope.usrLst = $rootScope.userList;
    // // console.log($scope.usrLst);
    // });

    $scope.userMsgObj = {}
    $scope.userList = JSON.parse(localStorage.getItem('usersList'));
    // $scope.userList.push({'id': 'ALL','entityName': 'ALL'});
    $scope.companyBranchLists = JSON.parse(localStorage.getItem('companyBranchList'));
    // $scope.getcompanyBranchList = function(id){
      // processReqFactory.processReq(baseURL.IP+"/companybranch/all","GET",'',function(response){ 
      //   $scope.companyBranchList = response;
      // },function(error){
      //    // if (error.status==401) {
      //    //    $state.go('login');
      //    //  }
      // });
    // }

    $scope.dataChange = function(typeOfChange,dataObj){
        if(!dataObj || dataObj.length ==0){
            $scope.userMsgObj.branchs = '';
            $scope.userMsgObj.moblileNumbers = '';
        }
    }

    $scope.sendSms = function(sendData){

        if (sendData.moblileNumbers) {
            var mobileNums = sendData.moblileNumbers.join();    
        }
        if (sendData.branchs) {
            var branchList = sendData.branchs.join();    
        }
        
        

      var sendObj = {
        // "userData" : {
          "branchs" : branchList,
          "moblileNumbers" : mobileNums,
          "message" : sendData.message,
          "type" : sendData.type
        // }
        // "branchs" : sendData.branchs,
        // "moblileNumbers" : sendData.moblileNumbers,
        
      }
      // console.log(sendObj);
      processReqFactory.processReq(baseURL.IP+"/send/sms","POST",sendObj,function(response){ 
        notifyAlertMessage.notify("Message Sent successfully","alert-sucess");
        $state.go('users.users');
      },function(error){
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
    }
  }




angular
  .module('distapp')
  .controller('rolesController',rolesController)
  .controller('usersController',usersController)
  .controller('usersMsgController',usersMsgController)
  .controller('userRolesController',userRolesController);