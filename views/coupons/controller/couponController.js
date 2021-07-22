


function couponListController($scope, $rootScope, processReqFactory, baseURL, notifyAlertMessage, loadingView, dataTablesInitService, $state){

  processReqFactory.processReq(baseURL.IP+"/coupon/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        { "data": "couponCode" },
        { "data": "startDate" },
        { "data": "endDate" },
        { "data": "amount" },
        { "data": "isActive" },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateCoupon(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#couponTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        if (error.status==401) {
          $state.go('login');
        }
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });

    $scope.addOrUpdateCoupon = function(id){
      delete $scope.couponObj
      if (id) {
        processReqFactory.processReq(baseURL.IP+"/coupon/"+id,"GET",'',function(response){
          $scope.couponObj = response;
          $('#addCouponModal').appendTo('body').modal();
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
        $('#addCouponModal').appendTo('body').modal();
      }
    }


    // $scope.couponCreationObj = {};
    $scope.addCoupon = function(couponObj){
      if (couponObj.id) {
        processReqFactory.processReq(baseURL.IP+"/coupon/edit","PUT",couponObj,function(response){
         setTimeout(function(){
            location.reload();
          },2000);
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });

      }else{
        if (couponObj.couponCode && couponObj.amount) {

          // couponObj.status = couponObj.status?true:false;
          processReqFactory.processReq(baseURL.IP+"/coupon/create","POST",couponObj,function(key,response){
            setTimeout(function(){
              location.reload();
            },2000);
          },function(error){
             if (error.status==401) {
              $state.go('login');
            }
          });
        }else{
          notifyAlertMessage.notify("coupon name or entity name cannot be null","alert-danger")
        }
      }
    }
}


function referandearnListController($scope, $rootScope, processReqFactory, baseURL, notifyAlertMessage, loadingView, dataTablesInitService, $state){

      processReqFactory.processReq(baseURL.IP+"/referandearn/all","GET",'',function(response){
        loadingView.startLoading('hide');
        //$rootScope.show_load = false;
        var columns = [
        { "data": "offerType" },
        { "data": "startDate" },
        { "data": "endDate" },
        { "data": "referrAmount" },
        // { "data": "isActive" },
        // { "data": "" },
        { "data": "isActive",
          "render": function(data,type,row,meta) {
            return (data == true)?'ACTIVE':'INACTIVE'
          }
         },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateReferandearn(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#referAndEarnTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
         if (error.status==401) {
          $state.go('login');
        }
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });


    $scope.addOrUpdateReferandearn = function(id){
      delete $scope.referandearnObj;
      processReqFactory.processReq(baseURL.IP+"/company/all","GET",'',function(response){ 
        $scope.companyList = response;
      },function(error){});

      if (id) {
        processReqFactory.processReq(baseURL.IP+"/referandearn/"+id,"GET",'',function(response){
          $scope.referandearnObj = response;
          $('#addReferAndEarnModal').modal();
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
        $('#addReferAndEarnModal').modal();
      }
    }


    // $scope.referandearnObj = {};
    $scope.addReferandearn = function(branchObj){
      if (branchObj.id) {
        processReqFactory.processReq(baseURL.IP+"/referandearn/"+branchObj.id+"/edit","PUT",branchObj,function(response){

          notifyAlertMessage.notify("Company Branch Updated Successfully","alert-danger");
          setTimeout(function(){
            location.reload();
          },2000);
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
        // branchObj['franchiseCompanyId'] = branchObj['companyId'];
        // branchObj.isActive = branchObj.isActive + '';
        $scope.referandearnObj.isActive = branchObj.isActive?branchObj.isActive == 'True'?true:false:'';
        processReqFactory.processReq(baseURL.IP+"/referandearn/create","POST",branchObj,function(key,response){
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
  .controller('couponListController',couponListController)
  .controller('referandearnListController',referandearnListController)
  .controller('companyBranchUserListController', companyBranchUserListController);