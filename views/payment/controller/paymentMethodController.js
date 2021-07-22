function paymentMethodController($rootScope,$scope,$http,$modal,baseURL,processReqFactory,dataTablesInitService,notifyAlertMessage,loadingView, $compile){
    // $scope.getpaymentMethodList = function(){
      // dataTablesInitService.initDataTables('','','#deptlist','' ,'');
      loadingView.startLoading('show');
      //$rootScope.show_load = true;
        var url = baseURL.IP+"/paymentMethod/all"
        processReqFactory.processReq(url,"GET",'',function(response){
          loadingView.startLoading('hide');
          //$rootScope.show_load = false;
          var columns = [
          { "data": "name" },
          { "data": "type" },
          { "data": "isActive" },
          { "data": "id",
            "orderable": false,
            "searchable": false,
            "render": function(data,type,row,meta) {
              var a = '<a class="btn btn-primary btn-xs" ng-click="addOrUpdatePaymentMthdModal(\''+data+'\')">VIEW</a>'
              
              return a;
            }
          }
        ];
        dataTablesInitService.initDataTables(response,columns,'#payMethodtlist','' ,$scope);
      },function(error){
          loadingView.startLoading('hide');
          //$rootScope.show_load = false;
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
    // };
     
     $scope.imagesUploadObj = [];
	// for upload image
		$scope.uploadPaymentMthdImage = function(el,index,Type) {
			$scope.bytes = el.files[0];
				var imageType=$scope.bytes.type;
				var imgType=imageType.substring(0,5);
				var formData = new FormData();
				formData.append('file', $scope.bytes);
				formData.append('entityType',Type);
				if(imgType == "image"){
					$.ajax({
					type: "POST",
					url:baseURL.IP+'/uploadfile/image',
					data:formData,
					processData: false,
					contentType: false,
					success: function(response) {
						for(var re in response.entities){
							$scope.imagesUploadObj.push(response.entities[re]);
						}
						var responseData = response['properties'].uploadStatus.split(':::')
							if(response['properties'].uploadStatus[0] != "SUCCESS"){
								notifyAlertMessage.notify(responseData[1],"alert-danger")
							}else{
								notifyAlertMessage.notify(responseData[1],"alert-success")
							}
					},
					error:function(){
							notifyAlertMessage.notify("Image Not Uploaded","alert-danger")
					}
				});
			}else{
				notifyAlertMessage.notify("Please Upload Image","alert-danger")
			}
		}

    $scope.addOrUpdatePaymentMthdModal = function(id){
      $scope.updateSave = (id?false:true);
      loadingView.startLoading('show');
      if($scope.updateSave == false){
        var url = baseURL.IP+"/paymentMethod/"+id
        processReqFactory.processReq(url,"GET",'',function(data){
          loadingView.startLoading('hide');
          data.isActive = data.isActive + '';
          $scope.paymethodData = data
          // $scope.modalInstance = $modal.open({
          //   templateUrl: 'views/payment/addPaymentMethodModalTemplate.html',
          //   controller: ModalInstanceCtrl,
          //   size: 'md',
          //   scope:$scope
          // });
          $('#addPaymentMethodModal').appendTo('body').modal();
        },function(error){
            loadingView.startLoading('hide');
            // notifyAlertMessage.notify("Something went Wrong","alert-danger")
          });
      }else{
        $scope.paymethodData = {};
        loadingView.startLoading('hide');
        // $scope.modalInstance = $modal.open({
        //   templateUrl: 'views/payment/addPaymentMethodModalTemplate.html',
        //   controller: ModalInstanceCtrl,
        //   size: 'md'
        // });
        $('#addPaymentMethodModal').appendTo('body').modal();
      }
    }

  $scope.createOrUpdatePaymentMeth = function(data){
    data.imageUrl = '';
    $scope.paymethodData = data;
    $scope.paymethodData.isActive = JSON.parse(data.isActive);
    var url = baseURL.IP + (data.id?"/paymentMethod/"+data.id+"/edit":"/paymentMethod/create")
    var method = (data.id?"PUT":"POST")
    processReqFactory.processReq(url,method,$scope.paymethodData,function(response){
      loadingView.startLoading('hide');
      var response = response;
      var alertMessage = (data.id?"Payment Method updated ":"payment Method created ");
      notifyAlertMessage.notify(alertMessage + " successfully","alert-sucess")
      $('#deptlist tbody').html('')
      setTimeout(function(){
        location.reload()
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
  .controller('paymentMethodController',paymentMethodController)
