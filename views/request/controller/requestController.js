


function requestHeaderTypeListController($scope, $rootScope, processReqFactory, baseURL, notifyAlertMessage, loadingView, dataTablesInitService, $state){

  processReqFactory.processReq(baseURL.IP+"/requestHeaderType/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        { "data": "name" },
        { "data": "requestsTypeName" },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateRequestHeaderType(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#requestHeaderTypeTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        if (error.status==401) {
          $state.go('login');
        }
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });

    // processReqFactory.processReq(baseURL.IP+"/requestsType/all","GET",'',function(response){
    //   $scope.requestTypeObj = response;
    // ),function(error){

    //   )}
    processReqFactory.processReq(baseURL.IP+"/requestsType/all","GET",'',function(response){ 
        $scope.requestTypeObj = response;
      },function(error){
      });

    $scope.addOrUpdateRequestHeaderType = function(id){
      // delete $scope.companyCreationObj
      if (id) {
        processReqFactory.processReq(baseURL.IP+"/requestHeaderType/"+id,"GET",'',function(response){
          $scope.requestheadertypeObj = response;
          $('#addRequestHeaderTypeModal').appendTo('body').modal();
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
        $('#addRequestHeaderTypeModal').appendTo('body').modal();
      }
    }


    $scope.requestheadertypeObj = {};
    $scope.addRequestHeaderType = function(requestheadertypeObj){
      if (requestheadertypeObj.id) {
        processReqFactory.processReq(baseURL.IP+"/requestHeaderType/"+requestheadertypeObj.id+"/edit","PUT",requestheadertypeObj,function(response){
         // setTimeout(function(){
         //    location.reload();
         //  },2000);
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });

      }else{
        // if (requestheadertypeObj.name && requestheadertypeObj.entityName) {

          requestheadertypeObj.isActive = requestheadertypeObj.isActive?true:false;
          processReqFactory.processReq(baseURL.IP+"/requestHeaderType/create","POST",requestheadertypeObj,function(key,response){
            setTimeout(function(){
              location.reload();
            },2000);
          },function(error){
             if (error.status==401) {
              $state.go('login');
            }
          });
        // }else{
          // notifyAlertMessage.notify("company name or entity name cannot be null","alert-danger")
        // }
      }
    }
}



function requestTypeListController($scope, $rootScope, processReqFactory, baseURL, notifyAlertMessage, loadingView, dataTablesInitService, $state){

  processReqFactory.processReq(baseURL.IP+"/requestsType/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        { "data": "typeName" },
        { "data": "description" },
        { "data": "isActive" },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateRequestType(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#requestTypeTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        if (error.status==401) {
          $state.go('login');
        }
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });

    $scope.addOrUpdateRequestType = function(id){
      // delete $scope.companyCreationObj
      if (id) {
        processReqFactory.processReq(baseURL.IP+"/requestType/"+id,"GET",'',function(response){
          $scope.requestTypeObj = response;
          $('#addRequestTypeModal').appendTo('body').modal();
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
        $('#addRequestTypeModal').appendTo('body').modal();
      }
    }


    $scope.requestTypeObj = {};
    $scope.addRequestType = function(requestTypeObj){
      if (requestTypeObj.id) {
        processReqFactory.processReq(baseURL.IP+"/requestType/"+requestTypeObj.id+"/edit","PUT",requestTypeObj,function(response){
         setTimeout(function(){
            location.reload();
          },2000);
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });

      }else{
        // if (requestTypeObj.name && requestTypeObj.entityName) {

          requestTypeObj.isActive = requestTypeObj.isActive?true:false;
          processReqFactory.processReq(baseURL.IP+"/requestsType/create","POST",requestTypeObj,function(key,response){
            setTimeout(function(){
              location.reload();
            },2000);
          },function(error){
             if (error.status==401) {
              $state.go('login');
            }
          });
        // }else{
          // notifyAlertMessage.notify("company name or entity name cannot be null","alert-danger")
        // }
      }
    }
}

function requestListController($scope, $rootScope, processReqFactory, baseURL, notifyAlertMessage, loadingView, dataTablesInitService, $state){

  processReqFactory.processReq(baseURL.IP+"/requests/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        { "data": "requestHeader" },
        { "data": "requestRefFile" },
        { "data": "createdUsername" },
        { "data": "isActive" },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateRequest(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#requestTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        if (error.status==401) {
          $state.go('login');
        }
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });

    $scope.addOrUpdateRequest = function(id){
      $scope.requestObj = {};
      // delete $scope.companyCreationObj
      if (id) {
        processReqFactory.processReq(baseURL.IP+"/requests/"+id,"GET",'',function(response){
          $scope.requestObj = response;
          $('#addRequestModal').appendTo('body').modal();
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
        $('#addRequestModal').appendTo('body').modal();
      }
    }


    $scope.requestObj = {};
        $scope.addRequest = function(requestObj){
      var requestObjData = {
                          "requestHeader": requestObj.requestHeader,
                          "reguestText": requestObj.reguestText,
                          "isActive": requestObj.isActive,
                          "requestRefFile": requestObj.requestRefFile
                        }
                        requestObjData.requestsStatusModel = [];
                        var requestStatusModelObj = {
                          "status": requestObj.status,
                          "ownerId": requestObj.ownerId,
                          "isActive": requestObj.isActive
                        }
                        requestObjData.requestsStatusModel.push(requestStatusModelObj);

      if (requestObj.id) {
        processReqFactory.processReq(baseURL.IP+"/company/"+requestObj.id+"/edit","PUT",requestObjData,function(response){
         // setTimeout(function(){
         //    location.reload();
         //  },2000);
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });

      }else{
        // if (requestObj.name && requestObj.entityName) {

          requestObj.isActive = requestObj.isActive?true:false;
          processReqFactory.processReq(baseURL.IP+"/requests/create","POST",requestObjData,function(key,response){
            setTimeout(function(){
              location.reload();
            },2000);
          },function(error){
             if (error.status==401) {
              $state.go('login');
            }
          });
        // }else{
          // notifyAlertMessage.notify("company name or entity name cannot be null","alert-danger")
        // }
      }
    }
}

function companyBranchUserListController($scope, $rootScope, processReqFactory, baseURL, notifyAlertMessage, loadingView, dataTablesInitService, $state){


      processReqFactory.processReq(baseURL.IP+"/companybranchuser/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        // { "data": "name" },
        // { "data": "companyName" },
        { "data": "companyBranchName" },
        { "data": "userName" },
        { "data": "phoneNo" },
        { "data": "email" },
        { "data": "type" },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateBranchUser(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#companyBranchUserTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
         if (error.status==401) {
          $state.go('login');
        }
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });


    

    $scope.getBranchList = function(id){
      processReqFactory.processReq(baseURL.IP+"/companybranch/all?companyId="+JSON.parse(sessionStorage.getItem('sessionOn'))['companyId'],"GET",'',function(response){ 
        $scope.companyBranchList = response;
      },function(error){
         if (error.status==401) {
            $state.go('login');
          }
      });
    }


    $scope.addOrUpdateBranchUser = function(id){
      delete $scope.companyBranchCreationUserObj
      processReqFactory.processReq(baseURL.IP+"/company/all","GET",'',function(response){ 
        $scope.companyList = response;
      },function(error){
         if (error.status==401) {
            $state.go('login');
          }
      });
      processReqFactory.processReq(baseURL.IP+"/role/all","GET",'',function(response){
          $scope.rolesList = response;
      },function(error){
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });

      $scope.getBranchList();
      if (id) {
        processReqFactory.processReq(baseURL.IP+"/companybranchuser/"+id,"GET",'',function(response){
          $scope.companyBranchCreationUserObj = response;
          $('#addCompanyBranchUserModal').modal();
          $scope.getBranchList(response['companyId'])
          processReqFactory.processReq(baseURL.IP+"/userroles/all?uid="+response['userId'],"GET",'',function(response1){
            $scope.userRolesList = response1;
            if (response1.length>0) {
              $scope.companyBranchCreationUserObj['roleId'] = response1[0]['roleId'];
            }
            // console.log(response1);
          },function(error){
            notifyAlertMessage.notify("Something went Wrong","alert-danger")
          });
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });

      }else{
        $('#addCompanyBranchUserModal').modal();
      }
    }


    // $scope.changebranchuserrole = function(roleObj){
    //   if (roleObj.type) {
    //     var changeUserRole = {
    //       "roleId": roleObj.type,
    //       "status": true,
    //       "userId": roleObj.userId,
    //     }
    //     processReqFactory.processReq(baseURL.IP+"/userroles/"+roleObj.type+"/edit","PUT",changeUserRole,function(key,response){ 
    //       // console.log(response+'----'+key);
    //       if (response==201) {
    //         notifyAlertMessage.notify("User Role Updated Successfully","alert-danger");
    //         location.reload();
    //       }
    //     },function(error){
    //       notifyAlertMessage.notify("Something went Wrong","alert-danger");
    //     });

    //   }else{
    //     notifyAlertMessage.notify("user type cannot be null","alert-danger");
    //   }
    // }

    $scope.companyBranchUserCreation = function(branchUserObj){
      if (branchUserObj.id) {
          if (branchUserObj.userId) {

            var editbranchUserRep = {
              "id": branchUserObj.id,
              "companyBranchId": branchUserObj.companyBranchId,
              "userModel":{
                "id": branchUserObj.userId,
                // "userId": branchUserObj.userId,
                "name": branchUserObj.name,
                "email": branchUserObj.email,
                "phoneNo": branchUserObj.phoneNo,
                "type": branchUserObj.type,
                "userRolesModels":[
                  {
                    "roleId": branchUserObj.roleId
                  }
                ]
              }
            }

            // console.log(editbranchUserRep)
            processReqFactory.processReq(baseURL.IP+"/companybranchuser/"+branchUserObj.id+"/edit","PUT",editbranchUserRep,function(key,response){ 
              // console.log(response+'----'+key);
              if (response==200 && key['userId']) {
                notifyAlertMessage.notify("Branch User Updated Successfully","alert-danger");
                setTimeout(function(){
                  location.reload();
                },3000);
              }
            },function(error){
              notifyAlertMessage.notify("Something went Wrong","alert-danger");
            });

          }else{
            notifyAlertMessage.notify("user name cannot be null","alert-danger");
          }
      }else{
          if (branchUserObj.name) {

            var branchUserRep = {
              "companyId": JSON.parse(sessionStorage.getItem('sessionOn'))['companyId'],
              "companyBranchId": branchUserObj.companyBranchId,
              "userModel":{
                "name": branchUserObj.name,
                "email": branchUserObj.email,
                "phoneNo": branchUserObj.phoneNo,
                "type": branchUserObj.type,
                "userRolesModels":[
                  {
                    "roleId": branchUserObj.roleId
                  }
                ]
              }
            }

            // userRoleObj.isActive = userRoleObj.isActive=='true'?true:false;
            
            processReqFactory.processReq(baseURL.IP+"/companybranchuser/create","POST",branchUserRep,function(key,response){ 
                
                    notifyAlertMessage.notify("Branch User Created Successfully","alert-danger");
              setTimeout(function(){
                location.reload();
              },2000);
                    
            },function(error){
                notifyAlertMessage.notify("Something went Wrong","alert-danger");
            });

          }else{
            notifyAlertMessage.notify("user name cannot be null","alert-danger");
          }
      }
    }
}














angular
  .module('distapp')
  .controller('requestHeaderTypeListController',requestHeaderTypeListController)
  .controller('requestTypeListController',requestTypeListController)
  .controller('requestListController',requestListController)
  .controller('companyBranchUserListController', companyBranchUserListController);