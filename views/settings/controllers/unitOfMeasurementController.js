
/*Expenses Controller*/

function unitOfMeasurementController($rootScope, $scope, $http, $modal, baseURL, notifyAlertMessage, processReqFactory, dataTablesInitService, loadingView){
  $scope.getUOMList = function(){
    loadingView.startLoading('show');
      processReqFactory.processReq(baseURL.IP+"/unitOfMeasurement/all","GET",'',function(data){
        $scope.unitOfMeasurementList = data;
        loadingView.startLoading('hide');
        var columns = [
        { "data": "unitName" },
        { "data": "parentUnitId",
          "render": function(data,type,row,meta){
            return data? data : row.unitName
          }
        },
        { "data": "shortName" },
        { "data": "conversionValue" },
        { "data": "isActive",
          "render": function(data,type,row,meta) {
            return (data == true)?'ACTIVE':'INACTIVE'
          }
         },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateUnitOfMeasurementModal(\''+data+'\')\">VIEW</a>'
          return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(data,columns,'#UOMTable','' ,$scope);
    },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }

// for add and update Unit of measurement modal
$scope.addOrUpdateUnitOfMeasurementModal = function(id){
  $scope.updateSave = (id?false:true);
  loadingView.startLoading('show');
    if($scope.updateSave == false){
      var url = baseURL.IP+"/unitOfMeasurement/"+id
        processReqFactory.processReq(url,"GET",'',function(data){
          loadingView.startLoading('hide');
          data.isActive = data.isActive + '';
          data.isFixed = data.isFixed + '';
          $scope.uomData = data
        $scope.modalInstance = $modal.open({
          templateUrl: 'views/settings/addUnitOfMeasurementTemplate.html',
          controller: ModalInstanceCtrl,
          size: 'md',
          scope:$scope
        });
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
    }else{
      $scope.uomData = {}
      loadingView.startLoading('hide');
      $scope.modalInstance = $modal.open({
        templateUrl: 'views/settings/addUnitOfMeasurementTemplate.html',
        controller: ModalInstanceCtrl,
        size: 'md',
        scope:$scope
      });
    }
  }

  $scope.createOrUpdateUom = function(data){
    if (data.isFixed) {
      delete data.isFixed
    }
    $scope.uomData = data;
    $scope.uomData.isActive = JSON.parse(data.isActive);
    var url = baseURL.IP + (data.id?"/unitOfMeasurement/"+data.id+"/edit":"/unitOfMeasurement/create")
    var method = (data.id?"PUT":"POST")
      processReqFactory.processReq(url,method,$scope.uomData,function(response){
        loadingView.startLoading('hide');
        var response = response;
        var alertMessage = (data.id?"Unit of measurement updated ":"Unit of measurement created ")
        notifyAlertMessage.notify(alertMessage + " successfully","alert-sucess")
        setTimeout(function(){
          location.reload();
        },2000);
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  }

}

angular
  .module('distapp')
  .controller('unitOfMeasurementController',unitOfMeasurementController)