
function walletListController($rootScope, $scope, $http, baseURL, processReqFactory, dataTablesInitService, notifyAlertMessage, loadingView){
	loadingView.startLoading('show');
    processReqFactory.processReq(baseURL.IP+"/consumerWalletTypes/all","GET",'',function(response){
        loadingView.startLoading('hide');
        //$rootScope.show_load = false;
        var columns = [
        { "data": "name" },
        { "data": "type"},
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="btn btn-primary btn-xs" ng-click="addOrUpdateWallet(\''+data+'\')">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#walletTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });

    $scope.addOrUpdateWallet = function(id){
	    // $scope.updateSave = (id?false:true);
	    loadingView.startLoading('show');
	    if(id){
	      processReqFactory.processReq(baseURL.IP+"/consumerWalletTypes/"+id,"GET",'',function(data){
	        loadingView.startLoading('hide');
	        $scope.walletCreationObj = data;

	        $('#addWalletModal').appendTo('body').modal();
	      },function(error){
	          loadingView.startLoading('hide');
	          // notifyAlertMessage.notify("Something went Wrong","alert-danger")
	        });
	    }else{
	      // $scope.denominationData = {};
	      loadingView.startLoading('hide');
	      $('#addWalletModal').appendTo('body').modal();
	    }
	  }

		$scope.createOrUpdateWallet = function(data){
		  // $scope.denominationData = data;
		  // $scope.denominationData.isActive = JSON.parse(data.isActive);
		  var url = baseURL.IP + (data.id?"/consumerWalletTypes/"+data.id+"/edit":"/consumerWalletTypes/create")
		  var method = (data.id?"PUT":"POST")
		  processReqFactory.processReq(url,method,data,function(response){
		    loadingView.startLoading('hide');
		    // var response = response;
		    var alertMessage = (data.id?"Wallet updated ":"Wallet created ");
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
function walletSendMoneyController($rootScope, $scope, $http, baseURL, processReqFactory, dataTablesInitService, notifyAlertMessage, loadingView, $state){

	processReqFactory.processReq(baseURL.IP+"/consumerWalletTypes/all","GET",'',function(response){ 
        $scope.walletTypeObj = response;
        },function(error){
      });
	$scope.sendMoney = function(sendData){

		var sendObj = {
	        // "userData" : {
	          "coins" : sendData.coins,
	          "walletTypeName" : sendData.walletTypeName,
	          "mobileNo" : sendData.mobileNo,
	          "desc" : sendData.desc
	        // }
	        // "branchs" : sendData.branchs,
	        // "moblileNumbers" : sendData.moblileNumbers,
	        
	      }

		

		processReqFactory.processReq(baseURL.IP+"/consumerwallets/addmoney","PUT",sendObj,function(response){ 
	        notifyAlertMessage.notify("Money Sent successfully","alert-sucess");
	        setTimeout(function(){
		      location.reload();
		    },100);
	        // $state.go('settings.wallet');
	  	},function(error){
	        notifyAlertMessage.notify("Something went Wrong","alert-danger")
	  	});
	}
}

angular
	.module('distapp')
	.controller('walletSendMoneyController',walletSendMoneyController)
	.controller('walletListController',walletListController);