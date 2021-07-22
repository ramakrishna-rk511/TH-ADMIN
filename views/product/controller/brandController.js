/*Brand Controller*/
function brandController($rootScope,$scope,$http,$modal,baseURL,notifyAlertMessage,processReqFactory,dataTablesInitService,loadingView,rolesView,$state){
  // $scope.brandData = {};
  $scope.getBrandList = function(){
    loadingView.startLoading('show');
      processReqFactory.processReq(baseURL.IP+"/brand/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        { "data": "name" },
        { "data": "isActive",
          "render": function(data,type,row,meta) {
            return (data == true)?'ACTIVE':'INACTIVE'
          }
         },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateBrand(\''+data+'\')\">View</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#brandTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  }

  $scope.brandRole = rolesView.controlRole($state.current.name);
  console.log($scope.brandRole);
  
  // for add and update brand modal
  $scope.addOrUpdateBrand = function(id){
    $scope.updateSave = (id?false:true);
    // loadingView.startLoading('show');
      if($scope.updateSave == false){
          processReqFactory.processReq(baseURL.IP+"/brand/"+id,"GET",'',function(data){
            // loadingView.startLoading('hide');
            data.isActive = data.isActive + '';
            $scope.brandData = data
          // $scope.modalInstance = $modal.open({
          //   templateUrl: 'views/product/addBrandTemplate.html',
          //   controller: ModalInstanceCtrl,
          //   size: 'md',
          //   scope:$scope
          // });
          // setTimeout(function(){
            $('#addBrandModal').appendTo("body").modal();
          // },1000);
        },function(error){
          loadingView.startLoading('hide');
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
        // loadingView.startLoading('hide');
        $scope.brandData = {}
        // $scope.modalInstance = $modal.open({
        //   templateUrl: 'views/product/addBrandTemplate.html',
        //   controller: ModalInstanceCtrl,
        //   size: 'md',
        //   scope:$scope
        // });
        // setTimeout(function(){
            $('#addBrandModal').appendTo("body").modal();
        // },1000);
      }
  }

  $scope.createUpdateBrand = function(data){
    $scope.brandData = data;
    $scope.brandData.isActive = JSON.parse(data.isActive);
    var url = baseURL.IP + (data.id?"/brand/"+data.id+"/edit":"/brand/create")
    var method = (data.id?"PUT":"POST")
    processReqFactory.processReq(url,method,$scope.brandData,function(response){
      loadingView.startLoading('hide');
      var response = response;
      var alertMessage = (data.id?"Brand updated ":"Brand created ")
      notifyAlertMessage.notify(alertMessage + " successfully","alert-sucess")
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
  .controller('brandController',brandController)