function denominationController($rootScope,$scope,$http,$modal,baseURL,processReqFactory,dataTablesInitService,notifyAlertMessage,loadingView, $compile){
  $scope.getDepartmentList = function(){
    // dataTablesInitService.initDataTables('','','#deptlist','' ,'');
    loadingView.startLoading('show');
      processReqFactory.processReq(baseURL.IP+"/denominationAmount/all","GET",'',function(response){
        loadingView.startLoading('hide');
        //$rootScope.show_load = false;
        var columns = [
        { "data": "amount" },
        { "data": "isActive",
          "render": function(data,type,row,meta) {
            return (data == true)?'ACTIVE':'INACTIVE'
          }
         },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="btn btn-primary btn-xs" ng-click="addOrUpdateDenominationModal(\''+data+'\')">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#denominationlist','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  };
   
  $scope.addOrUpdateDenominationModal = function(id){
    $scope.updateSave = (id?false:true);
    loadingView.startLoading('show');
    if($scope.updateSave == false){
      var url = baseURL.IP+"/denominationAmount/"+id
      processReqFactory.processReq(url,"GET",'',function(data){
        loadingView.startLoading('hide');
        data.isActive = data.isActive + '';
        $scope.denominationData = data
        $scope.modalInstance = $modal.open({
          templateUrl: 'views/settings/addDenominationModalTemplate.html',
          controller: ModalInstanceCtrl,
          size: 'md',
          scope:$scope
        });
      },function(error){
          loadingView.startLoading('hide');
          // notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
    }else{
      $scope.denominationData = {};
      loadingView.startLoading('hide');
      $scope.modalInstance = $modal.open({
        templateUrl: 'views/settings/addDenominationModalTemplate.html',
        controller: ModalInstanceCtrl,
        size: 'md'
      });
    }
  }

$scope.createOrUpdateDenomination = function(data){
  $scope.denominationData = data;
  $scope.denominationData.isActive = JSON.parse(data.isActive);
  var url = baseURL.IP + (data.id?"/denominationAmount/"+data.id+"/edit":"/denominationAmount/create")
  var method = (data.id?"PUT":"POST")
  processReqFactory.processReq(url,method,$scope.denominationData,function(response){
    loadingView.startLoading('hide');
    var response = response;
    var alertMessage = (data.id?"Denomination updated ":"Denomination created ");
    notifyAlertMessage.notify(alertMessage + " successfully","alert-sucess");

    $('#denominationlist tbody').html('');
    setTimeout(function(){
      location.reload();
    },1000);
    $scope.modalInstance.close();
  },function(error){
    loadingView.startLoading('hide');
    notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });
}
}

angular
.module('distapp')
.controller('denominationController',denominationController)
