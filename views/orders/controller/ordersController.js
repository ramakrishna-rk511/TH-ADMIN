function orderController($scope, $rootScope, processReqFactory, baseURL, $state, $http, notifyAlertMessage, chatService){

	// chatService.receive().then(null, null, function(message) {

	// 	console.log(message)
	//     // $scope.messages.push(message);
	// });

	$scope.showDeliveryList = false;
	$scope.selectedDeliveryBoy = "";
	$scope.orderStatus = [
		{'name': 'Placed','count': ''},
		{'name': 'Confirmed','count': ''},
		{'name': 'Packed','count': ''},
		{'name': 'Shipped','count': ''},
		{'name': 'Delivered','count': ''},
		{'name': 'Cancelled','count': ''},
		{'name': 'Pending','count': ''}
	]

	// $scope.selectedOrderStatus = $scope.orderStatus[0].name;

	$scope.getorderCount = function(){
		processReqFactory.processReq(baseURL.IP+"/branchOrder/count?branchid="+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'],"GET",'',function(data){
			// $scope.getOrdersList(data['statusWiseOrdersCount'][0][1]);
			$scope.getOrdersList($scope.orderStatus[0].name);
			for(var cl in $scope.orderStatus){
				for(var cs in data['statusWiseOrdersCount']){
					if (data['statusWiseOrdersCount'][cs][1] == ($scope.orderStatus[cl].name.toUpperCase())) {
						$scope.orderStatus[cl]['count'] = data['statusWiseOrdersCount'][cs][0];
					}
				}
			}
		},function(error){
			if (error.status==401) {
				localStorage.setItem('token','');
				$state.go('login');
			}
		});
	}
	$scope.getorderCount();

	$scope.getOrdersList = function(status){
		$scope.tab_status = status;
		$scope.statusOrders = {};
		$scope.selectedOrderStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
		// $scope.selectedOrderStatus = status.toUpperCase();
		processReqFactory.processReq(baseURL.IP+"/branchOrder/list?branchid="+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']+'&status='+status,"GET",'',function(data){
			$scope.statusOrders = data.branchOrders;
			$scope.singleOrderView = {};
		},function(error){
			if (error.status==401) {
				localStorage.setItem('token','');
				$state.go('login');
			}
		});
	}


	$scope.getSingleOrder = function(id){
		$scope.singleOrderView = {};
		$scope.singeOrderId = id;
		processReqFactory.processReq(baseURL.IP+"/consumerorder/view?id="+id,"GET",'',function(data){
			$scope.singleOrderView = data;
		},function(error){
			if (error.status==401) {
				localStorage.setItem('token','');
				$state.go('login');
			}
		});
	}

	$scope.changeOrderStatus = function(order,status){
		if (status != 'CANCELLED' && status != 'PACKED' && status != 'SHIPPED') {

			$scope.renderOrderStatus(status);
		}else{
			$scope.showDeliveryList = false;
			if (status == 'CANCELLED' || status == 'PACKED'){
				swal({
				  title: "Are you sure?",
				  text: "Want to "+status+" the bill!",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonClass: "btn-danger",
				  confirmButtonText: "Yes, "+status+" it!",
				  closeOnConfirm: true
				  // class: hold_bill
				},
				function(){	
					$scope.renderOrderStatus(status);
				});
			}else{
				if(status == 'SHIPPED'){
					processReqFactory.processReq(baseURL.IP+"/companybranchuser/all?cbid="+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']+'&ut=DELIVERYBOY',"GET",'',function(data){
						$scope.deliveryBoysList = data;
						if (data.length == 1) {
							$scope.selectedDeliveryBoy = data[0].userId;
						}
					},function(error){
						if (error.status==401) {
							localStorage.setItem('token','');
							$state.go('login');
						}
					});

					$scope.showDeliveryList = true;
				}
			}
		}
	}

	$scope.changeDelivery = function(list){
		$scope.selectedDeliveryBoy = list.userId; 
	}

	$scope.closeWindow = function(){
		$scope.showDeliveryList = false;
	}

	$scope.renderOrderStatus = function(status){
		var orderObj = {
				'id': $scope.singeOrderId,
				'orderStatus': status
		}
		if (status=='SHIPPED') {
			orderObj['deliveryBoyId'] = $scope.selectedDeliveryBoy;
		}
		processReqFactory.processReq(baseURL.IP+"/consumerorder/change/status","PUT",orderObj,function(data){
			$scope.singleOrderView = data;
			if (data['orderStatus'] == status) {
				$scope.getorderCount();
				$scope.getSingleOrder($scope.singeOrderId);
			}

		},function(error){
			if (error.status==401) {
				localStorage.setItem('token','');
				$state.go('login');
			}
		});
	}

}


angular
  .module('distapp')
  .controller('orderController',orderController);