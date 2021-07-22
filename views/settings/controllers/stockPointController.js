
function stockPointController($rootScope,$scope,$http,$modal,baseURL,notifyAlertMessage,processReqFactory,dataTablesInitService,loadingView){
  $scope.getStockPointList = function(){
    // loadingView.startLoading('show');
      processReqFactory.processReq(baseURL.IP+"/stockPoint/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        {"data": "companyBranchName"},
        { "data": "stockPointName"},
        { "data": "orderType" },
        // { "data": "hoursPriorToOrder" },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateStockPoint(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#timingSlotList','',$scope);
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
    // }
    //For Stock Point
    // $scope.getcompanyBranchList = function(id){
    //   processReqFactory.processReq(baseURL.IP+"/stockPoint/all","GET",'',function(response){ 
    //     $scope.stockPointList = response;
    //   },function(error){
    //      if (error.status==401) {
    //         $state.go('login');
    //       }
    //   });
    // }

$scope.addOrUpdateStockPoint = function(id){
  $scope.updateSave = (id?false:true);
  // loadingView.startLoading('show');
    if($scope.updateSave == false){
      var url = baseURL.IP+"/stockPoint/"+id
        processReqFactory.processReq(url,"GET",'',function(data){
          loadingView.startLoading('hide');
          // data.isActive = data.isActive + '';
          $scope.stockData = data
        // $scope.modalInstance = $modal.open({
        //   templateUrl: 'views/settings/addOrderStockPointModalTemplate.html',
        //   controller: ModalInstanceCtrl,
        //   size: 'md',
        //   scope:$scope
        // });
        $('#addStockPointModal').appendTo('body').modal();
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
    }else{
      $scope.stockData = {}
      loadingView.startLoading('hide');
      $('#addStockPointModal').appendTo('body').modal();
      // $scope.modalInstance = $modal.open({
      //   templateUrl: 'views/settings/addOrderStockPointModalTemplate.html',
      //   controller: ModalInstanceCtrl,
      //   size: 'md',
      //   scope:$scope
      // });
    }
}

$scope.createOrUpdateStockPoint = function(data){
  $scope.stockData = data;
  // $scope.stockData.isActive = JSON.parse(data.isActive);
  var url = baseURL.IP + (data.id?"/stockPoint/"+data.id+"/edit":"/stockPoint/create")
  var method = (data.id?"PUT":"POST")
    processReqFactory.processReq(url,method,$scope.stockData,function(response){
      loadingView.startLoading('hide');
      var response = response;
      var alertMessage = (data.id?"Order Stock Point updated ":"Order Stock Point created ")
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
}
angular
.module('distapp')
.controller('stockPointController', stockPointController);