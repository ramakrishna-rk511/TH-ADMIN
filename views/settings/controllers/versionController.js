function versionListController($rootScope, $scope, $http, baseURL, processReqFactory, dataTablesInitService, notifyAlertMessage, loadingView){

	loadingView.startLoading('show');
    processReqFactory.processReq(baseURL.IP+"/version/all","GET",'',function(response){
        loadingView.startLoading('hide');
        //$rootScope.show_load = false;
        var columns = [
        { "data": "title" },
        { "data": "device" },
        { "data": "versionNo" },
        { "data": "isLatest" },
        { "data": "isMandatory" },
        { "data": "remindMe"},
        { "data": "skip"},
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="btn btn-primary btn-xs" ng-click="addOrUpdateVersion(\''+data+'\')">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#versionTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });


    $scope.addOrUpdateVersion = function(id){
	    // $scope.updateSave = (id?false:true);
	    loadingView.startLoading('show');
	    if(id){
	      processReqFactory.processReq(baseURL.IP+"/version/"+id,"GET",'',function(data){
	        loadingView.startLoading('hide');
	        $scope.versionCreationObj = data;

	        $('#addVersionModal').modal();
	      },function(error){
	          loadingView.startLoading('hide');
	          // notifyAlertMessage.notify("Something went Wrong","alert-danger")
	        });
	    }else{
	      $scope.versionCreationObj = {};
	      loadingView.startLoading('hide');
	      $('#addVersionModal').modal();
	    }
  	}

	$scope.createOrUpdateVersion = function(data){
		console.log(data);
		loadingView.startLoading('hide');
	  // $scope.denominationData = data;
	  // data.isActive = JSON.parse(data.isActive);
	  var url = baseURL.IP + (data.id?"/version/"+data.id+"/edit":"/version/create")
	  var method = (data.id?"PUT":"POST")
	  processReqFactory.processReq(url,method,data,function(response){
	    loadingView.startLoading('hide');
	    // var response = response;
	    var alertMessage = (data.id?"Version updated ":"Version created ");
	    notifyAlertMessage.notify(alertMessage + " successfully","alert-sucess");

	    $('#walletTable tbody').html('');
	    setTimeout(function(){
	      location.reload();
	    },1000);
	    // $scope.modalInstance.close();
	  },function(error){
	    loadingView.startLoading('hide');
	    notifyAlertMessage.notify("Something went Wrong","alert-danger")
	  });
	}
}




angular
	.module('distapp')
	.controller('versionListController',versionListController)