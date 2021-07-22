
function productSkuDeliverySlotController($rootScope,$scope,$http,$modal,baseURL,notifyAlertMessage,processReqFactory,dataTablesInitService,loadingView){
  $scope.getProductSkuDelierySlotList = function(){
    // loadingView.startLoading('show');
      processReqFactory.processReq(baseURL.IP+"/productSkuDeliverySlot/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        // { "data": "companyBranchName" ,
        //   "render" : function(data,type,row,meta){
        //     return data?data:'N/A'
        //   }
        // },
        { "data": "deliveryType" ,
        "render" : function(data,type,row,meta){
            return data?data:'N/A'
          }
      },
        { "data": "isSpecificToSlots" ,
        "render" : function(data,type,row,meta){
            return data?data:'N/A'
          }
      },
        { "data": "isActice" ,
        "render" : function(data,type,row,meta){
            return data?data:'N/A'
          }
      },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-success btn-xs" ng-click=\"addOrUpdateExpensesType(\''+data+'\')\">View</a>'
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
    }

$scope.addOrUpdateExpensesType = function(id){
  $scope.updateSave = (id?false:true);
  // loadingView.startLoading('show');
    if($scope.updateSave == false){
      var url = baseURL.IP+"/timingSlots/"+id
        processReqFactory.processReq(url,"GET",'',function(data){
          loadingView.startLoading('hide');
          data.isActive = data.isActive + '';
          $scope.timingSlotData = data
        // $scope.modalInstance = $modal.open({
        //   templateUrl: 'views/settings/addTimingslotModalTemplate.html',
        //   controller: ModalInstanceCtrl,
        //   size: 'md',
        //   scope:$scope
        // });
        $('#addPSDSlotModal').appendTo('body').modal();
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
    }else{
      $scope.timingSlotData = {}
      loadingView.startLoading('hide');
      $('#addPSDSlotModal').appendTo('body').modal();
      // $scope.modalInstance = $modal.open({
      //   templateUrl: 'views/settings/addTimingslotModalTemplate.html',
      //   controller: ModalInstanceCtrl,
      //   size: 'md',
      //   scope:$scope
      // });
    }
}

$scope.createOrUpdateTimingSlot = function(data){
  $scope.timingSlotData = data;
  $scope.timingSlotData.isActive = JSON.parse(data.isActive);
  var url = baseURL.IP + (data.id?"/timingSlots/"+data.id+"/edit":"/timingSlots/create")
  var method = (data.id?"PUT":"POST")
    processReqFactory.processReq(url,method,$scope.timingSlotData,function(response){
      loadingView.startLoading('hide');
      var response = response;
      var alertMessage = (data.id?"Timings Slot updated ":"Timings Slot created ")
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
.controller('productSkuDeliverySlotController',productSkuDeliverySlotController)