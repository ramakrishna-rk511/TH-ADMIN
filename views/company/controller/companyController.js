


function companyListController($scope, $rootScope, processReqFactory, baseURL, notifyAlertMessage, loadingView, dataTablesInitService, $state){

  processReqFactory.processReq(baseURL.IP+"/company/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        { "data": "name" },
        { "data": "entityName" },
        { "data": "gstNo" },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateCompany(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#companyTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        if (error.status==401) {
          $state.go('login');
        }
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });

    $scope.addOrUpdateCompany = function(id){
      delete $scope.companyCreationObj
      if (id) {
        processReqFactory.processReq(baseURL.IP+"/company/"+id,"GET",'',function(response){
          $scope.companyCreationObj = response;
          $('#addCompanyModal').appendTo('body').modal();
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
        $('#addCompanyModal').appendTo('body').modal();
      }
    }


    // $scope.companyCreationObj = {};
    $scope.addCompany = function(companyObj){
      if (companyObj.id) {
        processReqFactory.processReq(baseURL.IP+"/company/"+companyObj.id+"/edit","PUT",companyObj,function(response){
         setTimeout(function(){
            location.reload();
          },2000);
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });

      }else{
        if (companyObj.name && companyObj.entityName) {

          companyObj.status = companyObj.status?true:false;
          processReqFactory.processReq(baseURL.IP+"/company/create","POST",companyObj,function(key,response){
            setTimeout(function(){
              location.reload();
            },2000);
          },function(error){
             if (error.status==401) {
              $state.go('login');
            }
          });
        }else{
          notifyAlertMessage.notify("company name or entity name cannot be null","alert-danger")
        }
      }
    }
}


function companyBranchListController($scope, $rootScope, processReqFactory, baseURL, notifyAlertMessage, loadingView, dataTablesInitService, $state){

      processReqFactory.processReq(baseURL.IP+"/companybranch/all","GET",'',function(response){
        loadingView.startLoading('hide');
        //$rootScope.show_load = false;
        var columns = [
        // { "data": "name" },
        { "data": "entityName" },
        { "data": "gstNo" },
        { "data": "branchType" },
        { "data": "status",
          "render": function(data,type,row,meta) {
            return (data == true)?'ACTIVE':'INACTIVE'
          }
         },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateCompanyBranch(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#companyBranchTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
         if (error.status==401) {
          $state.go('login');
        }
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });


    $scope.addOrUpdateCompanyBranch = function(id){
      delete $scope.companyBranchCreationObj;
      processReqFactory.processReq(baseURL.IP+"/company/all","GET",'',function(response){ 
        $scope.companyList = response;
      },function(error){});

      if (id) {
        processReqFactory.processReq(baseURL.IP+"/companybranch/"+id,"GET",'',function(response){
          $scope.companyBranchCreationObj = response;
          $('#addCompanyBranchModal').modal();
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
        $('#addCompanyBranchModal').modal();
      }
    }


    // $scope.companyBranchCreationObj = {};
    $scope.addCompanyBranch = function(branchObj){
      if (branchObj.id) {
        processReqFactory.processReq(baseURL.IP+"/companybranch/"+branchObj.id+"/edit","PUT",branchObj,function(response){

          notifyAlertMessage.notify("Company Branch Updated Successfully","alert-danger");
          setTimeout(function(){
            location.reload();
          },2000);
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
        branchObj['franchiseCompanyId'] = branchObj['companyId'];
        processReqFactory.processReq(baseURL.IP+"/companybranch/create","POST",branchObj,function(key,response){
          notifyAlertMessage.notify("Company Branch Created Successfully","alert-danger");
          setTimeout(function(){
            location.reload();
          },2000);
        },function(error){
           if (error.status==401) {
            $state.go('login');
          }
        });
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
  .controller('companyListController',companyListController)
  .controller('companyBranchListController',companyBranchListController)
  .controller('companyBranchUserListController', companyBranchUserListController);