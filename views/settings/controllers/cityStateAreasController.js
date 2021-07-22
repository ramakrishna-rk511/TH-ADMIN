
/*Tax Rate Controller*/
function cityStateAreasController($rootScope, $scope, $http, $modal, baseURL, notifyAlertMessage,processReqFactory,dataTablesInitService,loadingView){
  
  $scope.getStateList = function(){
    loadingView.startLoading('show');
    processReqFactory.processReq(baseURL.IP+"/state/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        { "data": "name" },
        { "data": "shortName" },
        { "data": "isActive",
          "render": function(data,type,row,meta) {
            return (data == true)?'ACTIVE':'INACTIVE'
          }
         },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateState(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#stateTable','' ,$scope);

      $scope.statesList = response;
    },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }
  
  loadingView.startLoading('hide');
  
  // for add and update tax rate modal
  $scope.addOrUpdateState = function(id){
    $scope.updateSave = (id?false:true);
    loadingView.startLoading('show');
      if($scope.updateSave == false){
        var url = baseURL.IP+"/state/"+id
          processReqFactory.processReq(url,"GET",'',function(data){
            loadingView.startLoading('hide');
            data.isActive = data.isActive + '';
            $scope.stateData = data
          // $scope.modalInstance = $modal.open({
          //   templateUrl: 'views/settings/addStateModalTemplate.html',
          //   controller: ModalInstanceCtrl,
          //   size: 'md',
          //   scope:$scope
          // });
          $('#addStateModal').appendTo('body').modal();
        },function(error){
          loadingView.startLoading('hide');
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
      	loadingView.startLoading('hide');
        $scope.stateData = {};
        $('#addStateModal').appendTo('body').modal();
        // $scope.modalInstance = $modal.open({
        //   templateUrl: 'views/settings/addStateModalTemplate.html',
        //   controller: ModalInstanceCtrl,
        //   size: 'md',
        //   scope:$scope
        // });
      }
  }

  $scope.createUpdateState = function(data){
    $scope.stateData = data;
    $scope.stateData.isActive = JSON.parse(data.isActive);
    var url = baseURL.IP + (data.id?"/state/"+data.id+"/edit":"/state/create")
    var method = (data.id?"PUT":"POST")
      processReqFactory.processReq(url,method,$scope.stateData,function(response){
        loadingView.startLoading('hide');
        var response = response;
        var alertMessage = (data.id?"State updated ":"State created ")
        notifyAlertMessage.notify(alertMessage + " successfully","alert-sucess")
        setTimeout(function(){
          location.reload();
        },1000);
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  }

  // $scope.cityData = {};
  $scope.getCityList = function(){
    loadingView.startLoading('show');
    processReqFactory.processReq(baseURL.IP+"/city/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        { "data": "name" },
        { "data": "stateName" },
        { "data": "isActive",
          "render": function(data,type,row,meta) {
            return (data == true)?'ACTIVE':'INACTIVE'
          }
         },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateCity(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#cityTable','' ,$scope);
      $scope.citiesList = response;
    },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }

  // COMPANY BRANCH LIST
    processReqFactory.processReq(baseURL.IP+"/companybranch/all?isActive=true","GET",'',function(data){
      loadingView.startLoading('hide');
      $scope.companyBranchData = data;
    },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });  
  // for add and update tax rate modal
  $scope.addOrUpdateCity = function(id){
    $scope.updateSave = (id?false:true);
    loadingView.startLoading('show');
      if($scope.updateSave == false){

        processReqFactory.processReq(baseURL.IP+"/city/"+id,"GET",'',function(data){
          loadingView.startLoading('hide');
          data.isActive = data.isActive + '';
          $scope.cityData = data;
          $('#addCityModal').appendTo('body').modal();
        },function(error){
          loadingView.startLoading('hide');
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
      	loadingView.startLoading('hide');
        $scope.cityData = {}
        // $scope.modalInstance = $modal.open({
        //   templateUrl: 'views/settings/addCityModalTemplate.html',
        //   controller: ModalInstanceCtrl,
        //   size: 'md',
        //   scope:$scope
        // });
        $('#addCityModal').appendTo('body').modal();
      }
  }

  $scope.createUpdateCity = function(data){
    $scope.cityData = data;
    // delete data.stateId
    $scope.cityData.isActive = JSON.parse(data.isActive);
    var url = baseURL.IP + (data.id?"/city/"+data.id+"/edit":"/city/create")
    var method = (data.id?"PUT":"POST")
      processReqFactory.processReq(url,method,$scope.cityData,function(response){
        loadingView.startLoading('hide');
        var response = response;
        var alertMessage = (data.id?"City updated ":"City created ")
        notifyAlertMessage.notify(alertMessage + " successfully","alert-sucess")
        setTimeout(function(){
          location.reload();
        },1000);
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  }

  $scope.getAreaList = function(){
    loadingView.startLoading('show');
      var url = baseURL.IP+"/areas/all"
      processReqFactory.processReq(url,"GET",'',function(response){
        loadingView.startLoading('hide');
        //$rootScope.show_load = false;
        var columns = [
        { "data": "name" },
        { "data": "cityName",
          "render": function(data,type,row,meta) {
            return data? data:'N/A'
          }
        },
        { "data": "isPickUp", 
          "render": function(data,type,row,meta) {
            return data? data:'N/A'
          }
        },
        { "data": "isActive",
          "render": function(data,type,row,meta) {
            return (data == true)?'ACTIVE':'INACTIVE'
          }
         },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateArea(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#areaTable','' ,$scope);
    },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  }

  // $scope.getCityForArea = function(){
  //     processReqFactory.processReq(baseURL.IP+"/city/all","GET",'',function(data){
  //       $scope.cityList = data
  //     },function(error){
  //       loadingView.startLoading('hide');
  //       notifyAlertMessage.notify("Something went Wrong","alert-danger")
  //   });
  // }
  
  // for add and update tax rate modal
  $scope.addOrUpdateArea = function(id){
    $scope.updateSave = (id?false:true);
    loadingView.startLoading('show');
      if($scope.updateSave == false){
          processReqFactory.processReq(baseURL.IP+"/areas/"+id,"GET",'',function(data){
            loadingView.startLoading('hide');
            data.isActive = data.isActive + '';
            $scope.areaData = data
            // $scope.areaData.cityId = data.cityId
          // $scope.modalInstance = $modal.open({
          //   templateUrl: 'views/settings/addAreasModalTemplate.html',
          //   controller: ModalInstanceCtrl,
          //   size: 'md',
          //   scope:$scope
          // });

          $('#addAreasModal').appendTo('body').modal();
        },function(error){
          loadingView.startLoading('hide');
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
      	loadingView.startLoading('hide');
        $scope.areaData = {}
        // $scope.modalInstance = $modal.open({
        //   templateUrl: 'views/settings/addAreasModalTemplate.html',
        //   controller: ModalInstanceCtrl,
        //   size: 'md',
        //   scope:$scope
        // });
        $('#addAreasModal').appendTo('body').modal();
      }
  }

  $scope.createUpdateArea = function(data){
    data['companyBranchId'] = JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']
    // $scope.areaData = data;
    data['isActive'] = JSON.parse(data.isActive);
    data['isPickUp'] = JSON.parse(data.isPickUp);
    var url = baseURL.IP + (data.id?"/areas/"+data.id+"/edit":"/areas/create")
    var method = (data.id?"PUT":"POST")
      processReqFactory.processReq(url,method,data,function(response){
        loadingView.startLoading('hide');
        var response = response;
        var alertMessage = (data.id?"Area updated ":"Area created ")
        notifyAlertMessage.notify(alertMessage + " successfully","alert-sucess")
        setTimeout(function(){
          location.reload();
        },1000);
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  }

}
angular
  .module('distapp')
  .controller('cityStateAreasController',cityStateAreasController)