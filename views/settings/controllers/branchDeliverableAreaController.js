
function branchDeliverableAreaController($rootScope,$scope,$http,$modal,baseURL,notifyAlertMessage,processReqFactory,dataTablesInitService,loadingView){
  $scope.getBranchDelierableAreaSlotList = function(){
    // loadingView.startLoading('show');
      processReqFactory.processReq(baseURL.IP+"/branchDeliverableAreas/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        { "data": "companyBranchName" },
        { "data": "areaName" },
        { "data": "isActive",
          "render": function(data,type,row,meta) {
            return (data == true)?'ACTIVE':'INACTIVE'
          }
         },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-success btn-xs" ng-click=\"addOrUpdateBranchDeliverableArea(\''+data+'\')\">View</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#branchDeliverableAreaList','',$scope);
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  }

// for add and update expenses type modal
  $scope.getcompanyBranchList = function(id){
      processReqFactory.processReq(baseURL.IP+"/companybranch/all","GET",'',function(response){ 
        $scope.companyBranchList = response;
      },function(error){
         if (error.status==401) {
            $state.go('login');
          }
      });
    }

    

$scope.addOrUpdateBranchDeliverableArea = function(id){
  $scope.updateSave = (id?false:true);
  // loadingView.startLoading('show');
    if($scope.updateSave == false){
      var url = baseURL.IP+"/branchDeliverableAreas/"+id
        processReqFactory.processReq(url,"GET",'',function(data){
          loadingView.startLoading('hide');
          data.isActive = data.isActive + '';
          $scope.branchDeliverableArea = data
        $scope.modalInstance = $modal.open({
          templateUrl: 'views/settings/addBranchDeliverableAreaModalTemplate.html',
          controller: ModalInstanceCtrl,
          size: 'md',
          scope:$scope
        });
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
    }else{
      $scope.branchDeliverableArea = {}
      loadingView.startLoading('hide');
      $scope.modalInstance = $modal.open({
        templateUrl: 'views/settings/addBranchDeliverableAreaModalTemplate.html',
        controller: ModalInstanceCtrl,
        size: 'md',
        scope:$scope
      });
    }
}

$scope.createOrUpdateBranchDeliverableArea = function(data){
  $scope.branchDeliverableArea = data;
  // $scope.branchDeliverableArea.isActive = JSON.parse(data.isActive);
  var url = baseURL.IP + (data.id?"/branchDeliverableAreas/"+data.id+"/edit":"/branchDeliverableAreas/create")
  var method = (data.id?"PUT":"POST")
    processReqFactory.processReq(url,method,$scope.branchDeliverableArea,function(response){
      loadingView.startLoading('hide');
      var response = response;
      var alertMessage = (data.id?"Branch Deliverable Area updated ":"Branch Deliverable Area created ")
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
.controller('branchDeliverableAreaController',branchDeliverableAreaController)