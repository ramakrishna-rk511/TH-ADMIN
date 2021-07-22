

function purchaseOrderListController($rootScope, $scope, processReqFactory, baseURL, loadingView, dataTablesInitService, $state, notifyAlertMessage,rolesView){
//  notifyAlertMessage,

  $scope.purchaseRole = rolesView.controlRole($state.current.name);
  console.log($scope.purchaseRole);

	processReqFactory.processReq(baseURL.IP+"/purchaseorder/all","GET",'',function(response){
      loadingView.startLoading('hide');
      //$rootScope.show_load = false;
      var columns = [
      // { "data": "name" },
      { "data": "orderedDate" },
      // { "data": "code" },
      { "data": "partyName" },
      { "data": "estimatedDeliveryDate" },
      { "data": "totalAmount" },
      // { "data": "paidAmount" },
      // { "data": "dueAmount" },
      { "data": "stateOfOrigin" },
      { "data": "status" },
      { "data": "id",
        "orderable": false,
        "searchable": false,   
        "render": function(data,type,row,meta) {
          var a = '<a class="rd dtview btn btn-primary btn-xs" href="./#/purchase/purchaseorderupdate/'+row.partyName+'/'+data+'">VIEW</a>'
          return a;
        }
      }
    ];
    dataTablesInitService.initDataTables(response,columns,'#purchaseOrderTable','' ,$scope);
  },function(error){
      loadingView.startLoading('hide');
      //$rootScope.show_load = false;
      if (error.status==401) {
        $state.go('login');
      }
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
  });

  $scope.bulkPurchaseUpload = function(){
    $('#purchaseUpload').modal();
  }

}



function purchaseOrderCreationController($scope, processReqFactory, baseURL, loadingView, notifyAlertMessage) {
	var purchaseItemRep = {
	    "productSkuId": "",
	    "mrp": "",
	    "quantity": "",
      "units": "",
      "purchasePrice": "",
	    "isTaxInclude": "",
	}

	$scope.purchaseOrderArra = [];
	$scope.newItemAdded = function(){
    $scope.purchaseOrderArra.push(angular.copy(purchaseItemRep));

	    // setTimeout(function(){
	    // 	$(".product_purchase_view").select2({placeholder: "Select a Product",allowClear: true});
	    // },500)
	    
	}

  $scope.goBack = function(){
      window.history.back();
  }

	$scope.removeProduct = function(index){
	    if($scope.purchaseOrderArra.length>1){
	    	$scope.purchaseOrderArra.splice(index, 1);
	    }
	}
	$scope.newItemAdded();


    processReqFactory.processReq(baseURL.IP+"/party/all","GET",'',function(data){
        $scope.partyListObj = data
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });

    processReqFactory.processReq(baseURL.IP+"/state/all","GET",'',function(data){
        $scope.stateListObj = data
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });

    processReqFactory.processReq(baseURL.IP+"/productSku/all","GET",'',function(data){
		// $scope.skuProductSearchData = '';
        $scope.skuProductSearchData = data;

        // $(".product_purchase_view").select2({allowClear: true});
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });


    processReqFactory.processReq(baseURL.IP+"/unitOfMeasurement/all","GET",'',function(response){ 
      $scope.unitOfMeasurementList = response;
    },function(error){
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
    });

    // processReqFactory.processReq(baseURL.IP+"/taxGroup/all","GET",'',function(data){
    //     $scope.taxGroupArray = data;
    //   },function(error){
    //     loadingView.startLoading('hide');
    //     notifyAlertMessage.notify("Something went Wrong","alert-danger")
    // });

    $scope.productsSearch = function(search,index){
    	$('.product_purchase_list_'+index).removeClass('hide');
      if (index+1 == $scope.purchaseOrderArra.length) {
        $scope.newItemAdded();
      }
    }


    $scope.selectedProduct = function(ev,index){
    	$scope.purchaseOrderArra[index]['productSkuId'] = ev.id;
      $scope.purchaseOrderArra[index]['productSkuName'] = ev.name;
      $scope.purchaseOrderArra[index]['quantity'] = ev.quantity;
      $scope.purchaseOrderArra[index]['uomId'] = ev.uomId;
      $scope.purchaseOrderArra[index]['mrp'] = ev.mrp;
      $scope.purchaseOrderArra[index]['units'] = '1';
    	// $scope.purchaseOrderArra[index]['sellingPrice'] = ev.sellingPrice;
      // $scope.purchaseOrderArra[index]['sellingPrice'] = ev.taxGroupName
    	$('.product_purchase_list_'+index).addClass('hide');
    }


    $scope.createPurchaseOrder = function(purchaseObj){

    	// purchaseObj['dueAmount'] = purchaseObj['dueAmount']+'';
    	// purchaseObj['paidAmount'] = purchaseObj['paidAmount']+'';
    	// purchaseObj['subTotal'] = purchaseObj['subTotal']+'';
    	// purchaseObj['taxAmount'] = purchaseObj['taxAmount']+'';
    	// purchaseObj['totalAmount'] = purchaseObj['totalAmount']+'';
    	purchaseObj['purchaseOrderItemsModels'] = $scope.purchaseOrderArra;

    	console.log(purchaseObj);
    	processReqFactory.processReq(baseURL.IP+"/purchaseorder/create","POST",purchaseObj,function(response){ 
        if (response.id) {
          setTimeout(function(){
            location.reload();
          },4000);
          notifyAlertMessage.notify("Purchase Order Created Successfully","alert-success");
        }
      },function(error){
        notifyAlertMessage.notify("Something went Wrong","alert-danger");
      });
    }


}


function purchaseOrderUpdationController($scope, processReqFactory, baseURL, loadingView, notifyAlertMessage, $stateParams){
  
  processReqFactory.processReq(baseURL.IP+"/purchaseorder/"+$stateParams.id,"GET",'',function(data){
    $scope.purchaseorderUpdationObj = data;
    if (data['purchaseOrderItemsModels'].length>0) {
      for(var poim in data['purchaseOrderItemsModels']){
        $scope.newItemAdded();
        // $scope.purchaseOrderArra[poim] = ;
        $scope.selectedProduct(data['purchaseOrderItemsModels'][poim],poim);
      }
    }
  },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  processReqFactory.processReq(baseURL.IP+"/party/all","GET",'',function(data){
        $scope.partyListObj = data
  },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  processReqFactory.processReq(baseURL.IP+"/state/all","GET",'',function(data){
      $scope.stateListObj = data
  },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  processReqFactory.processReq(baseURL.IP+"/productSku/all","GET",'',function(data){
  // $scope.skuProductSearchData = '';
      $scope.skuProductSearchData = data;

      // $(".product_purchase_view").select2({allowClear: true});
  },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });


  processReqFactory.processReq(baseURL.IP+"/unitOfMeasurement/all","GET",'',function(response){ 
    $scope.unitOfMeasurementList = response;
  },function(error){
    notifyAlertMessage.notify("Something went Wrong","alert-danger");
  });


  $scope.productsSearch = function(search,index){
      $('.product_purchase_list_'+index).removeClass('hide');
      if (index+1 == $scope.purchaseOrderArra.length) {
        $scope.newItemAdded();
      }
    }


    $scope.selectedProduct = function(ev,index){
      $scope.purchaseOrderArra[index]['productSkuId'] = ev.id;
      $scope.purchaseOrderArra[index]['productSkuName'] = ev.name;
      $scope.purchaseOrderArra[index]['quantity'] = ev.quantity;
      $scope.purchaseOrderArra[index]['uomId'] = ev.uomId;
      $scope.purchaseOrderArra[index]['mrp'] = ev.mrp;
      $scope.purchaseOrderArra[index]['units'] = ev.units;
      $scope.purchaseOrderArra[index]['purchasePrice'] = ev.purchasePrice;
      $scope.purchaseOrderArra[index]['hsnCode'] = ev.hsnCode;
      $scope.purchaseOrderArra[index]['taxAmount'] = ev.taxAmount;
      $scope.purchaseOrderArra[index]['taxPercent'] = ev.taxPercent;
      $('.product_purchase_list_'+index).addClass('hide');
    }


  var purchaseItemRep = {
      "productSkuId": "",
      "mrp": "",
      "quantity": "",
      "units": "",
      "purchasePrice": "",
      "isTaxInclude": "",
  }

  $scope.purchaseOrderArra = [];
  $scope.newItemAdded = function(){
    $scope.purchaseOrderArra.push(angular.copy(purchaseItemRep));
  }

  $scope.removeProduct = function(index){
      if($scope.purchaseOrderArra.length>1){
        $scope.purchaseOrderArra.splice(index, 1);
      }
  }

  $scope.updatePurchaseOrder = function(){
    processReqFactory.processReq(baseURL.IP+"/purchaseorder/create","POST",purchaseObj,function(response){ 
      if (response.id) {
        setTimeout(function(){
          location.reload();
        },4000);
        notifyAlertMessage.notify("Purchase Order Created Successfully","alert-success");
      }
    },function(error){
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
    });
  }
  // $scope.newItemAdded();
}













angular
	.module('distapp')
	.controller('purchaseOrderListController',purchaseOrderListController)
	.controller('purchaseOrderCreationController',purchaseOrderCreationController)
  .controller('purchaseOrderUpdationController',purchaseOrderUpdationController);