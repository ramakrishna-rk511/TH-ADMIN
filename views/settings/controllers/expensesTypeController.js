
/*Expenses Controller*/

function expenseTypeController($rootScope,$scope,$http,$modal,baseURL,notifyAlertMessage,processReqFactory,dataTablesInitService,loadingView){
    $scope.getExpensesTypeList = function(){
      loadingView.startLoading('show');
        processReqFactory.processReq(baseURL.IP+"/expenseType/all","GET",'',function(response){
          loadingView.startLoading('hide');
          var columns = [
          { "data": "name" },
          { "data": "description" },
          { "data": "isActive" },
          { "data": "id",
            "orderable": false,
            "searchable": false,   
            "render": function(data,type,row,meta) {
              var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateExpensesType(\''+data+'\')\">VIEW</a>'
              return a;
            }
          }
        ];
        dataTablesInitService.initDataTables(response,columns,'#expenseTypelist','',$scope);
      },function(error){
          loadingView.startLoading('hide');
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
    }

  // for add and update expenses type modal
  $scope.addOrUpdateExpensesType = function(id){
    $scope.updateSave = (id?false:true);
    loadingView.startLoading('show');
      if($scope.updateSave == false){
        var url = baseURL.IP+"/expenseType/"+id
          processReqFactory.processReq(url,"GET",'',function(data){
            loadingView.startLoading('hide');
            data.isActive = data.isActive + '';
            $scope.expensesTypeData = data
          $scope.modalInstance = $modal.open({
            templateUrl: 'views/settings/addExpenseTypeModalTemplate.html',
            controller: ModalInstanceCtrl,
            size: 'md',
            scope:$scope
          });
        },function(error){
          loadingView.startLoading('hide');
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
        $scope.expensesTypeData = {}
        loadingView.startLoading('hide');
        $scope.modalInstance = $modal.open({
          templateUrl: 'views/settings/addExpenseTypeModalTemplate.html',
          controller: ModalInstanceCtrl,
          size: 'md',
          scope:$scope
        });
      }
  }

  $scope.createOrUpdateExpenseType = function(data){
    $scope.expensesTypeData = data;
    $scope.expensesTypeData.isActive = JSON.parse(data.isActive);
    var url = baseURL.IP + (data.id?"/expenseType/"+data.id+"/edit":"/expenseType/create")
    var method = (data.id?"PUT":"POST")
      processReqFactory.processReq(url,method,$scope.expensesTypeData,function(response){
        loadingView.startLoading('hide');
        var response = response;
        var alertMessage = (data.id?"Expense type updated ":"Expense type created ")
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
  .controller('expenseTypeController',expenseTypeController)