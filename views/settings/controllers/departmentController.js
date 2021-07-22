function departmentController($rootScope,$scope,$http,$modal,baseURL,processReqFactory,dataTablesInitService,notifyAlertMessage,loadingView, $compile){
    $scope.getDepartmentList = function(){
      // dataTablesInitService.initDataTables('','','#deptlist','' ,'');
      loadingView.startLoading('show');
        processReqFactory.processReq(baseURL.IP+"/department/all","GET",'',function(response){
          loadingView.startLoading('hide');
          var columns = [
          { "data": "name" },
          { "data": "isActive" },
          { "data": "id",
            "orderable": false,
            "searchable": false,   
            "render": function(data,type,row,meta) {
              var a = '<a class="btn btn-primary btn-xs" ng-click="addOrUpdateDepartmentModal(\''+data+'\')">VIEW</a>'
              // var a = '<a class="btn btn-success btn-xs" ng-click=\"addOrUpdateDepartmentModal(\''+data+'\')\">View</a>'
              return a;
            }
          }
        ];
        dataTablesInitService.initDataTables(response,columns,'#deptlist','' ,$scope);
      },function(error){
          loadingView.startLoading('hide');
          //$rootScope.show_load = false;
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
    };
     
    $scope.addOrUpdateDepartmentModal = function(id){
      $scope.updateSave = (id?false:true);
      loadingView.startLoading('show');
      if($scope.updateSave == false){
        var url = baseURL.IP+"/department/"+id
        processReqFactory.processReq(url,"GET",'',function(data){
          loadingView.startLoading('hide');
          data.isActive = data.isActive + '';
          $scope.deptData = data
          $scope.modalInstance = $modal.open({
            templateUrl: 'views/settings/addDepartmentModalTemplate.html',
            controller: ModalInstanceCtrl,
            size: 'md',
            scope:$scope
          });
        },function(error){
            loadingView.startLoading('hide');
            // notifyAlertMessage.notify("Something went Wrong","alert-danger")
          });
      }else{
        $scope.deptData = {};
        loadingView.startLoading('hide');
        $scope.modalInstance = $modal.open({
          templateUrl: 'views/settings/addDepartmentModalTemplate.html',
          controller: ModalInstanceCtrl,
          size: 'md'
        });
      }
    }

  $scope.createOrUpdateDepartment = function(data){
    $scope.deptData = data;
    $scope.deptData.isActive = JSON.parse(data.isActive);
    var url = baseURL.IP + (data.id?"/department/"+data.id+"/edit":"/department/create")
    var method = (data.id?"PUT":"POST")
    processReqFactory.processReq(url,method,$scope.deptData,function(response){
      loadingView.startLoading('hide');
      var response = response;
      var alertMessage = (data.id?"Department updated ":"Department created ");
      notifyAlertMessage.notify(alertMessage + " successfully","alert-sucess");

      $('#deptlist tbody').html('');
      
      // $('#addorupdatedepartment').modal('hide');
      setTimeout(function(){
        // $scope.getDepartmentList();
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
  .controller('departmentController',departmentController)
