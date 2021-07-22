
function stockController($rootScope, $scope, processReqFactory, baseURL, loadingView, dataTablesInitService, notifyAlertMessage, $state){

    var childRows = function format ( d ) {
      // `d` is the original data object for the row
      // return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
      //     '<tr>'+
      //         '<td>Stock Point:</td>'+
      //         '<td class="fwb p-l-sm"> '+d.stockPointName+'</td>'+
      //     '</tr>'+
      //     '<tr>'+
      //         '<td>Batch:</td>'+
      //         '<td class="fwb p-l-sm"> '+d.batch.batchCode+'</td>'+
      //     '</tr>'+
      //     '<tr>'+
      //         '<td>Quantity</td>'+
      //         '<td class="fwb p-l-sm"> '+d.units+' '+d.uomShortName+'</td>'+
      //     '</tr>'+
      // '</table>';
      var childList = '';
      for(var cl in d.list){
        var expiryDateCheck = d.list[cl].expiryDate?d.list[cl].expiryDate.split('T')[0]:"NA";
        var childRecursiveList =  '<div class="col-lg-3">'+
                                    '<div class="p-lr-10" style="display:block;">'+
                                      '<label>Stock Point:</label>'+
                                      '<div class="pdl10" style="display:inline-block;">'+d.list[cl].stockPointName +'</div>'+
                                    '</div>'+
                                    '<div class="p-lr-10" style="display:block;">'+
                                      '<label>Batch Code:</label>'+
                                      '<div class="pdl10" style="display:inline-block;">'+d.list[cl].batch.batchCode+'</div>'+
                                    '</div>'+
                                    '<div class="p-lr-10" style="display:block;">'+
                                      '<label>Units:</label>'+
                                      '<div class="pdl10" style="display:inline-block;">'+d.list[cl].units+' '+d.list[cl].uomShortName+'</div>'+
                                    '</div>'+
                                    '<div class="p-lr-10" style="display:block;">'+
                                      '<label>Expiry Date:</label>'+
                                      '<div class="pdl10" style="display:inline-block;">'+expiryDateCheck+'</div>'+
                                    '</div>'+
                                  '</div>'
          childList += childRecursiveList
      }
      // console.log(childList)
      return childList
    }

    processReqFactory.processReq(baseURL.IP+"/productSkuBranchBatchStockPoint/all","GET",'',function(response){
      $scope.stockRep = {};
      $scope.stockRep['tableContent'] = {};
      $scope.stockRep['finalContent'] = [];
      // $scope.stockTableObj = {};
      loadingView.startLoading('hide');
      //$rootScope.show_load = false;
    //   var columns = [
    //   { "data": "productSkuName" },
    //   { "data": "barcode", 
    //     "render": function(data,type,row,meta){
    //       return data ? data : 'NA'
    //     }
    //   },
    //   { "data": "units", 
    //      "render": function(data,type,row,meta){
    //       return data +' '+ row.uomShortName
    //     }
    //   },
    //   {
    //     "className":      'details-control',
    //     "orderable":      false,
    //     "data":           null,
    //     "defaultContent": ''
    //   }
    // ];
    // dataTablesInitService.initDataTables(response,columns,'#stockTable',childRows,$scope);
    $scope.stockRep['data'] = response;
    $scope.stockRep['mrpTotal'] = 0.0;
    $scope.stockRep['spTotal'] = 0.0;
    for(var sr in response){
      $scope.stockRep['mrpTotal'] += response[sr]['mrp'];
      $scope.stockRep['spTotal'] += response[sr]['sellingPrice'];
      if ($scope.stockRep['tableContent'][response[sr].barcode]==undefined) {
        $scope.stockRep['tableContent'][response[sr].barcode] = {};
        $scope.stockRep['tableContent'][response[sr].barcode]['productSkuName'] = response[sr]['productSkuName'];
        $scope.stockRep['tableContent'][response[sr].barcode]['barcode'] = response[sr]['barcode'];
        $scope.stockRep['tableContent'][response[sr].barcode]['brandName'] = response[sr]['brandName'];
        $scope.stockRep['tableContent'][response[sr].barcode]['categoryName'] = response[sr]['categoryName'];
        $scope.stockRep['tableContent'][response[sr].barcode]['list'] = [];
      }
      $scope.stockRep['tableContent'][response[sr].barcode]['list'].push(response[sr]);
    }
    for(var rc in $scope.stockRep['tableContent']){
      $scope.stockRep['finalContent'].push($scope.stockRep['tableContent'][rc]);
    }


      var columns = [
      { "data": "productSkuName" },
      { "data": "barcode", 
        "render": function(data,type,row,meta){
          return data ? data : 'NA'
        }
      },
      { "data": "categoryName", 
         "render": function(data,type,row,meta){
          return data ? data : 'NA'
        }
      },
      { "data": "brandName", 
         "render": function(data,type,row,meta){
          return data ? data : 'NA'
        }
      },
      {
        "className":      'details-control',
        "orderable":      false,
        "data":           null,
        "defaultContent": ''
      }
    ];
    dataTablesInitService.initDataTables($scope.stockRep['finalContent'],columns,'#stockTable',childRows,$scope);
    // console.log($scope.stockRep);
  },function(error){
      loadingView.startLoading('hide');
      //$rootScope.show_load = false;
      if (error.status==401) {
        $state.go('login');
      }
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
  });

}

function stockConversionController($rootScope, $scope, processReqFactory, baseURL, loadingView, dataTablesInitService, notifyAlertMessage, $state){
  $scope.getStockConversionList = function(data){
    // loadingView.startLoading('show');
    $scope.branch = data.companyBranchId;
      processReqFactory.processReq(baseURL.IP+"/stockLogs/all?tobranch=" + $scope.branch + "&type="+data.type  ,"GET",'',function(response){
        // /stockLogs/all?tobranch=" + " $scope.branch" + "&type=STOCKCONVERION
        loadingView.startLoading('hide');
        var columns = [
        {"data": "createdDate"},
        { "data": "modifiedDate"},
        // { "data": "orderType" }, 
        // { "data": "hoursPriorToOrder" },
        // { "data": "id",
        //   "orderable": false,
        //   "searchable": false,   
        //   "render": function(data,type,row,meta) {
        //     var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateStockConversion(\''+data+'\')\">VIEW</a>'
        //     return a;
        //   }
        // }
      ];
      dataTablesInitService.initDataTables(response,columns,'#stockConversionList','',$scope);
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  }

// for add and update expenses type modal

  $scope.getcompanyBranchList = function(id){
      processReqFactory.processReq(baseURL.IP+"/companybranch/all","GET",'',function(response){ 
        $scope.companyBranchList = response;
      },function(error){
         if (error.status==401) {
            $state.go('login');
          }
      });
    }
    //For Stock Point
    // $scope.getcompanyBranchList = function(id){
      // processReqFactory.processReq(baseURL.IP+"/stockPoint/all","GET",'',function(response){ 
      //   $scope.stockPointList = response;
      // },function(error){
      //    if (error.status==401) {
      //       $state.go('login');
      //     }
      // });
    // }

$scope.addOrUpdateStockConversion = function(id){






// PRODUCTS SKU LIST

  loadingView.startLoading('show');
  processReqFactory.processReq(baseURL.IP+"/productSku/all?branchId="+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'],"GET",'',function(response){
    $scope.stockConversionProducts = response;
    loadingView.startLoading('hide');
  },function(error){
    loadingView.startLoading('hide');
    if (error.status==401) {
      $state.go('login');
    }
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  // BATCH LIST

  loadingView.startLoading('show');
  processReqFactory.processReq(baseURL.IP+"/batch/all","GET",'',function(response){
    $scope.stockConversionBatches = response;
    loadingView.startLoading('hide');
  },function(error){
    loadingView.startLoading('hide');
    if (error.status==401) {
      $state.go('login');
    }
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  
  // UnitOfMeasurement LIST

  loadingView.startLoading('show');
  processReqFactory.processReq(baseURL.IP+"/unitOfMeasurement/all","GET",'',function(response){
    $scope.stockConversionUOMs = response;
    loadingView.startLoading('hide');
  },function(error){
    loadingView.startLoading('hide');
    if (error.status==401) {
      $state.go('login');
    }
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });



  // STOCK POINT LIST

  loadingView.startLoading('show');
  processReqFactory.processReq(baseURL.IP+"/stockPoint/all","GET",'',function(response){
    $scope.stockConversionStockPoint = response;
    loadingView.startLoading('hide');
  },function(error){
    loadingView.startLoading('hide');
    if (error.status==401) {
      $state.go('login');
    }
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  $scope.conversionListArr = [];

  var conversionRep = {
    "fromBatch": "",
    "fromBranch": "",
    "fromSku": "",
    "fromSkuQty": "",
    "fromSkuUom": "",
    "fromStockPoint": "",
    "fromUnits": "",
    "toBatch": "",
    "toBranch": "",
    "toSku": "",
    "toSkuQty": "",
    "toSkuUom": "",
    "toStockPoint": "",
    "toUnits": "",
  }


  $scope.newRowAdded = function(){
    $scope.conversionListArr.push(angular.copy(conversionRep));
  }

  $scope.newRowAdded();

  $scope.removeRow = function(index){
    // console.log($scope.conversionListArr[index])
    $scope.conversionListArr.splice(index, 1);
  }

  $scope.saveConversion = function(){
    loadingView.startLoading('show');
    processReqFactory.processReq(baseURL.IP+"/stockconversion/create","POST",$scope.conversionListArr,function(response){
      console.log(response);
    loadingView.startLoading('hide');
    },function(error){
      loadingView.startLoading('hide');
      if (error.status==401) {
        $state.go('login');
      }
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }





$('#addStockConversionModal').appendTo('body').modal();


  // $scope.updateSave = (id?false:true);
  // // loadingView.startLoading('show');
  // if($scope.updateSave == false){
  //   var url = baseURL.IP+"/orderstockpoint/"+id
  //     processReqFactory.processReq(url,"GET",'',function(data){
  //       loadingView.startLoading('hide');
  //       // data.isActive = data.isActive + '';
  //       $scope.orderStockData = data
  //     // $scope.modalInstance = $modal.open({
  //     //   templateUrl: 'views/settings/addOrderStockPointModalTemplate.html',
  //     //   controller: ModalInstanceCtrl,
  //     //   size: 'md',
  //     //   scope:$scope
  //     // });
  //     $('#addStockConversionModal').appendTo('body').modal();
  //   },function(error){
  //     loadingView.startLoading('hide');
  //     notifyAlertMessage.notify("Something went Wrong","alert-danger")
  //   });
  // }else{
  //   $scope.orderStockData = {}
  //   loadingView.startLoading('hide');
  //   $('#addStockConversionModal').appendTo('body').modal();
  //   // $scope.modalInstance = $modal.open({
  //   //   templateUrl: 'views/settings/addOrderStockPointModalTemplate.html',
  //   //   controller: ModalInstanceCtrl,
  //   //   size: 'md',
  //   //   scope:$scope
  //   // });
  // }
}

$scope.createOrUpdateOrderStockPoint = function(data){
  $scope.orderStockData = data;
  // $scope.orderStockData.isActive = JSON.parse(data.isActive);
  var url = baseURL.IP + (data.id?"/orderstockpoint/"+data.id+"/edit":"/stockconversion/create")
  var method = (data.id?"PUT":"POST")
    processReqFactory.processReq(url,method,$scope.orderStockData,function(response){
      loadingView.startLoading('hide');
      var response = response;
      var alertMessage = (data.id?"Stock Conversion updated ":"Stock Conversion created ")
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


function stockPointController($rootScope, $scope, processReqFactory, baseURL, loadingView, dataTablesInitService, notifyAlertMessage, $state){

  
    processReqFactory.processReq(baseURL.IP+"/stockPoint/all","GET",'',function(response){
      loadingView.startLoading('hide');
      //$rootScope.show_load = false;
      var columns = [
      // { "data": "name" },
      // { "data": "companyId" },
      { "data": "branchName" },
      { "data": "name" },
      { "data": "isActive" },
      { "data": "id",
        "orderable": false,
        "searchable": false,   
        "render": function(data,type,row,meta) {
          var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateStockPoint(\''+data+'\')\">VIEW</a>'
          return a;
        }
      }
    ];
    dataTablesInitService.initDataTables(response,columns,'#stockPointTable','' ,$scope);
  },function(error){
      loadingView.startLoading('hide');
      //$rootScope.show_load = false;
      if (error.status==401) {
        $state.go('login');
      }
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
  });

    // processReqFactory.processReq(baseURL.IP+"/company/all","GET",'',function(response){ 
    //   $rootScope.companyList = response;
    // },function(error){
    //   notifyAlertMessage.notify("Something went Wrong","alert-danger");
    // });

    // $scope.getCompanyBranch = function(id){
    // }

    // For Category List
    processReqFactory.processReq(baseURL.IP+'/category/all','GET','',function(success){
      $scope.categoriesObj = success;
    },function(error){
      notifyAlertMessage.notify("Category List Not Available","alert-danger")
    })
  // for Brand list
    processReqFactory.processReq(baseURL.IP+'/brand/all','GET','',function(response){
      $scope.brandsListObj = response;
    },function(error){
      notifyAlertMessage.notify("city List Not Available","alert-danger")     
    })


    $scope.addOrUpdateStockPoint = function(id){

      processReqFactory.processReq(baseURL.IP+"/companybranch/all?companyid="+JSON.parse(sessionStorage.getItem('sessionOn'))['companyId'],"GET",'',function(response){ 
        $rootScope.companyBranchList = response;
      },function(error){
        notifyAlertMessage.notify("Something went Wrong","alert-danger");
      });

      if (id) {
        processReqFactory.processReq(baseURL.IP+"/stockPoint/"+id,"GET",'',function(response){ 
          $scope.stockObj = response;
          // $scope.getCompanyBranch($scope.stockObj['companyId']);
          $('#addStockPointModal').modal();
        },function(error){
          notifyAlertMessage.notify("Something went Wrong","alert-danger");
        });
      }else{
        $('#addStockPointModal').modal();
      }
    }


    $scope.saveStockPoint = function(obj){
      if (obj.id) {
        if (obj.companyBranchId && obj.description) {
          // var stockPointObj = {
          //   "companyBranchId":obj.companyBranchId,
          //   "companyId": obj.companyId,
          //   "name": obj.name,
          //   "description": obj.description,
          // }
          processReqFactory.processReq(baseURL.IP+"/stockPoint/update","PUT",obj,function(key,response){ 
            if (response==201) {
              notifyAlertMessage.notify("Stock Point Updated Successfully","alert-danger");
              location.reload();
            }
          },function(error){
            notifyAlertMessage.notify("Something went Wrong","alert-danger")
          });

        }else{
          notifyAlertMessage.notify("Company Branch cannot be null","alert-danger")
        }
      }else{
        if (obj.companyBranchId && obj.description) {
          var stockPointObj = {
            "companyBranchId":obj.companyBranchId,
            "companyId": obj.companyId,
            "name": obj.name,
            "description": obj.description,
          }
          processReqFactory.processReq(baseURL.IP+"/stockPoint/create","POST",stockPointObj,function(key,response){ 
            if (response==201) {
              notifyAlertMessage.notify("Stock Point Created Successfully","alert-danger");
              location.reload();
            }
          },function(error){
            notifyAlertMessage.notify("Something went Wrong","alert-danger")
          });
        }else{
          notifyAlertMessage.notify("Company Branch cannot be null","alert-danger")
        }
      }
    }
    
}







function stockTransferController($rootScope, $scope, processReqFactory, baseURL, loadingView, dataTablesInitService, $state){
   // var url = ;
  processReqFactory.processReq(baseURL.IP+"/stockLogs/all?type=STOCKTRANSFER","GET",'',function(response){
    loadingView.startLoading('hide');

    var columns = [
      { "data": "code" },
      { "data": "fromBranchName" },
      { "data": "toBranchName" },
      { "data": "status" },
      { "data": "stockLogItemsModels",
        "render": function(data,type,row,meta) {
          return data.length;
        }
      },
      { "data": "createdDate" },
      { "data": "receivedDate",
        "render": function(data,type,row,meta){
          return data?data:row.modifiedDate;
        }
      },
      { "data": "id",
        "orderable": false,
        "searchable": false,   
        "render": function(data,type,row,meta) {
          var a = '<a class="rd dtview btn btn-success btn-xs" href="./#/inventory/stocktransferview/'+row.code+'/'+data+'">View</a>'
          return a;
        }
      }
    ];
    dataTablesInitService.initDataTables(response,columns,'#stockTransferTable','' ,$scope);
  },function(error){
      loadingView.startLoading('hide');
      //$rootScope.show_load = false;
      if (error.status==401) {
        $state.go('login');
      }
      // notifyAlertMessage.notify("Something went Wrong","alert-danger")notifyAlertMessage
  });

  $scope.bulkTransferUpload = function(){
    $('#transferUpload').modal();
  }
}


function stockTransferCreationController($rootScope, $scope, processReqFactory, baseURL, loadingView, $state, notifyAlertMessage){

  processReqFactory.processReq(baseURL.IP+"/productSku/list/ap?branch="+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'],"GET",'',function(data){
      $scope.skuProductSearchData = data;
  },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  
    processReqFactory.processReq(baseURL.IP+"/batch/all","GET",'',function(response){
      $scope.stockTransferBatches = response;
    },function(error){
      if (error.status==401) {
        $state.go('login');
      }
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  
  $scope.branchChange = function(branchId){
    processReqFactory.processReq(baseURL.IP+"/stockPoint/all?branch="+branchId,"GET",'',function(response){
      $scope.stockTransferStockPoint = response;
    },function(error){
      if (error.status==401) {
        $state.go('login');
      }
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }
  // processReqFactory.processReq(baseURL.IP+"/unitOfMeasurement/all","GET",'',function(response){
  //   $scope.stockTransferUOMs = response;
  // },function(error){
  //   if (error.status==401) {
  //     $state.go('login');
  //   }
  //     notifyAlertMessage.notify("Something went Wrong","alert-danger")
  // });


  $scope.selectedProduct = function(ev,index,key,view){
      // $scope.stockTransferItemsList[index]['productSkuId'] = ev.id;
      $scope.stockTransferItemsList[index][key] = ev.id;
      $scope.stockTransferItemsList[index]['fromProductSkuName'] = ev.name;
      $scope.stockTransferItemsList[index]['unitName'] = ev.measurableType;
      $scope.stockTransferItemsList[index]['uomId'] = ev.uomId;
      $scope.stockTransferItemsList[index]['toProductSku'] = ev.id;
      $('.product_transfer_list_'+view).addClass('hide');
  }

  $scope.productsSearch =  function(search,index,oindex){
    $('.product_transfer_list_'+index).removeClass('hide');
    if (oindex+1 == $scope.stockTransferItemsList.length) {
      $scope.newItemAdded();
    }
  }

  var transferItemRep = {
      "fromBatch": "",
      "fromProductSku": "",
      "fromSkuQty": "",
      "fromSkuUom": "",
      "fromStockPoint": "",
      // "quantit y": "",
      "units": "",
      "uomId": "",
  }
  $scope.stockTransferItemsList = [];
  $scope.newItemAdded = function(){
      $scope.stockTransferItemsList.push(angular.copy(transferItemRep));

      // setTimeout(function(){
        // $(".product_purchase_view").select2({placeholder: "Select a Product",allowClear: true});
      // },500)
      
  }

  $scope.removeProduct = function(index){
      if($scope.stockTransferItemsList.length>1){
        $scope.stockTransferItemsList.splice(index, 1);
      }
  }
  $scope.newItemAdded();

  processReqFactory.processReq(baseURL.IP+"/companybranch/all","GET",'',function(response){
    $scope.companyBranchResponse = response;
    // loadingView.startLoading('hide');
  },function(error){
    // loadingView.startLoading('hide');
    if (error.status==401) {
      $state.go('login');
    }
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });


  $scope.saveTransfer = function(transferObj){

    $scope.stockTransferItemsList = $.each($scope.stockTransferItemsList,function(k,v){
      Object.keys(v).forEach(function(key) {
        v['quantity'] = v['fromSkuQty']?v['fromSkuQty']:'1';
        v['units'] = v['units']?v['units']:'1';
        delete v['fromProductSkuName']
        delete v['unitName']
        if (v[key]=="" || v[key]==null|| !v[key]) {
          delete v[key]
        }
      })
    })
    if ($scope.stockTransferItemsList.length>1) {
      $scope.stockTransferItemsList = $scope.stockTransferItemsList.slice(0,-1);
    }
    transferObj['stockLogItemsModels'] = $scope.stockTransferItemsList;
    // console.log(transferObj);

    processReqFactory.processReq(baseURL.IP+"/stocktransfer/create","POST",transferObj,function(response){
      if (response.code) {

          notifyAlertMessage.notify("Stock Transfer Created Successfully","alert-danger");
          setTimeout(function(){
            location.reload();
          },1000);
        
      }
    },function(error){
      if (error.status==401) {
        $state.go('login');
      }
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }
}

function stockTransferViewController($rootScope, $scope, processReqFactory, baseURL, loadingView, $state, notifyAlertMessage, $stateParams){


  loadingView.startLoading('show');
  processReqFactory.processReq(baseURL.IP+"/stockLogs/"+$stateParams.id,"GET",'',function(response){
    $scope.singleStockTransferList = response;
    loadingView.startLoading('hide');
  },function(error){
    loadingView.startLoading('hide');
    if (error.status==401) {
      $state.go('login');
    }
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });
}



function stockConversionCreationController($rootScope, $scope, processReqFactory, baseURL, loadingView, $state, notifyAlertMessage){

  // PRODUCTS SKU LIST

  loadingView.startLoading('show');
  processReqFactory.processReq(baseURL.IP+"/productSku/all?branchId="+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'],"GET",'',function(response){
    $scope.stockConversionProducts = response;
    loadingView.startLoading('hide');
  },function(error){
    loadingView.startLoading('hide');
    if (error.status==401) {
      $state.go('login');
    }
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  // BATCH LIST

  // loadingView.startLoading('show');
  // processReqFactory.processReq(baseURL.IP+"/batch/all","GET",'',function(response){
  //   $scope.stockConversionBatches = response;
  //   loadingView.startLoading('hide');
  // },function(error){
  //   loadingView.startLoading('hide');
  //   if (error.status==401) {
  //     $state.go('login');
  //   }
  //     notifyAlertMessage.notify("Something went Wrong","alert-danger")
  // });

  
  // UnitOfMeasurement LIST

  loadingView.startLoading('show');
  processReqFactory.processReq(baseURL.IP+"/unitOfMeasurement/all","GET",'',function(response){
    $scope.stockConversionUOMs = response;
    loadingView.startLoading('hide');
  },function(error){
    loadingView.startLoading('hide');
    if (error.status==401) {
      $state.go('login');
    }
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });


  //COMPANY BRANCH

  processReqFactory.processReq(baseURL.IP+"/companybranch/all","GET",'',function(response){ 
        $scope.companyBranchList = response;

        // $scope.stockConveObj.fromBranch = JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'];
      },function(error){
         if (error.status==401) {
            $state.go('login');
          }
      });

  // STOCK POINT LIST

  // loadingView.startLoading('show');
  // processReqFactory.processReq(baseURL.IP+"/stockPoint/all","GET",'',function(response){
  //   $scope.stockConversionStockPoint = response;
  //   loadingView.startLoading('hide');
  // },function(error){
  //   loadingView.startLoading('hide');
  //   if (error.status==401) {
  //     $state.go('login');
  //   }
  //     notifyAlertMessage.notify("Something went Wrong","alert-danger")
  // });


  $scope.branchChange = function(branchId){
    if ($scope.stockConveObj.fromBranch != JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']) {
      notifyAlertMessage.notify("Other Branch is selected , Plese be aware of it","alert-danger")
      return false
    }
    $scope.stockConveObj.toBranch = branchId;
    processReqFactory.processReq(baseURL.IP+"/stockPoint/all?branch="+branchId,"GET",'',function(response){
      $scope.stockConverStockPoint = response;
    },function(error){
      if (error.status==401) {
        $state.go('login');
      }
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }



  $scope.getFromSkuProdData = function(skuFrmProdData,indx){
    skuFrmProdData = JSON.parse(skuFrmProdData)
    $scope.stockConveObj.stockLogItemsModels[indx].fromSkuUom = skuFrmProdData.uomId
  }

  $scope.getToSkuProdData = function(skuToProdData,indx){
    skuToProdData = JSON.parse(skuToProdData)
    $scope.stockConveObj.stockLogItemsModels[indx].toSkuUom = skuToProdData.uomId
  }


  $scope.productsSearch =  function(search,index){
    $('.stock_conversion_list_'+index).removeClass('hide');
    if (index+1 == $scope.stockConveObj.stockLogItemsModels.length) {
      $scope.newRowAdded();
    }
    if (!search) {
      $('.stock_conversion_list_'+index).addClass('hide');
    }
  }

  // $scope.productsSearch = function(search,index){
  //     $('.product_purchase_list_'+index).removeClass('hide');
  //     if (index+1 == $scope.purchaseOrderArra.length) {
  //       $scope.newItemAdded();
  //     }
  //   }


    $scope.selectedProduct = function(ev,index,type,parentIndex){
      $scope.stockConveObj.stockLogItemsModels[index]['productSkuName'] = ev.name +' - '+ (ev.outOffStock?'0.0': ev.stockAvb +' '+ ev.stockAvbUnitName);
      $scope.stockConveObj.stockLogItemsModels[index]['quantity'] = ev.quantity;
      if (parseFloat(ev.stockAvb)>0) {
        if (type=='fromProductSku') {
          $scope.stockConveObj.stockLogItemsModels[index]['fromSkuUom'] = ev.uomId;
          $scope.stockConveObj.stockLogItemsModels[index]['fromProductSku'] = ev.id;
          $scope.stockConveObj.stockLogItemsModels[index]['fromProductSkuName'] = ev.name;
          $scope.stockConveObj.stockLogItemsModels[index]['fromStock'] = (ev.outOffStock?'0.0': ev.stockAvb +' '+ ev.stockAvbUnitName);
        }else{
          $scope.stockConveObj.stockLogItemsModels[index]['toSkuUom'] = ev.uomId;
          $scope.stockConveObj.stockLogItemsModels[index]['toProductSku'] = ev.id;
          $scope.stockConveObj.stockLogItemsModels[index]['toProductSkuName'] = ev.name;
          $scope.stockConveObj.stockLogItemsModels[index]['toStock'] = (ev.outOffStock?'0.0': ev.stockAvb +' '+ ev.stockAvbUnitName);
        }
      }else{
        notifyAlertMessage.notify("Stock must be greaterthan 1","alert-danger")
        return false
      }
      
      // $scope.stockConveObj.stockLogItemsModels[index]['mrp'] = ev.mrp;
      // $scope.stockConveObj.stockLogItemsModels[index]['units'] = '1';
      // $scope.stockConveObj.stockLogItemsModels[index]['prodSkuType'] = type;
      // $scope.purchaseOrderArra[index]['sellingPrice'] = ev.sellingPrice;
      // $scope.purchaseOrderArra[index]['sellingPrice'] = ev.taxGroupName
      $scope.batchChange(ev.id,type)
      $('.stock_conversion_list_'+parentIndex).addClass('hide');
    }

    $scope.batchChange = function(skuId,type){
      processReqFactory.processReq(baseURL.IP+"/batch/product/batchs?branchid="+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']+'&skuid='+skuId,"GET",'',function(response){
        if (type=='fromProductSku') {
          $scope.fromstockConversionBatches = response;
        }else{
          $scope.tostockConversionBatches = response;
        }
      },function(error){
        if (error.status==401) {
          $state.go('login');
        }
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
    }


  // $scope.conversionListArr = [];

  $scope.stockConveObj = {}
  $scope.stockConveObj.stockLogItemsModels =[];

  var conversionRep = {
    "fromBatch": "",
    "fromProductSku":"",
    // "fromBranch": "",
    "fromSkuUnits": "",
    "fromSkuQty": "1",
    "fromSkuUom": "",
    "fromStockPoint": "",
    "fromSkuUnits": "",
    "toBatch": "",
    // "toBranch": "",
    "toProductSku": "",
    "toSkuQty": "1",
    "toSkuUom": "",
    "toStockPoint": "",
    "toSkuUnits": "",
  }
  // $scope.stockConveObj.stockLogItemsModels.push(conversionRep);


  $scope.newRowAdded = function(){
    $scope.stockConveObj.stockLogItemsModels.push(angular.copy(conversionRep));
  }

  $scope.newRowAdded();

  $scope.removeRow = function(index){
    // console.log($scope.stockLogItemsModels[index])
    $scope.stockConveObj.stockLogItemsModels.splice(index, 1);
  }


  $scope.saveConversion = function(){
    for (var i = 0; i < $scope.stockConveObj.stockLogItemsModels.length; i++) {
      // $scope.stockConveObj.stockLogItemsModels[i].fromProductSku = JSON.parse($scope.stockConveObj.stockLogItemsModels[i].fromProductSku).id
      // // $scope.stockConveObj.stockLogItemsModels[i].fromProductSku = frmProdSku
      // $scope.stockConveObj.stockLogItemsModels[i].toProductSku = JSON.parse($scope.stockConveObj.stockLogItemsModels[i].toProductSku).id
      // // $scope.stockConveObj.stockLogItemsModels[i].toProductSku = toProdSku
      // if (!$scope.stockConveObj.stockLogItemsModels[i].fromSkuUnits) {delete $scope.stockConveObj.stockLogItemsModels[i].fromSkuUnits}
      // if (!$scope.stockConveObj.stockLogItemsModels[i].toSkuUnits) {delete $scope.stockConveObj.stockLogItemsModels[i].toSkuUnits}
      delete $scope.stockConveObj.stockLogItemsModels[i].productSkuName
      delete $scope.stockConveObj.stockLogItemsModels[i].fromStock
      delete $scope.stockConveObj.stockLogItemsModels[i].toStock
      if (!$scope.stockConveObj.stockLogItemsModels[i].fromBatch) {
        // delete $scope.stockConveObj.stockLogItemsModels[i]
        $scope.removeRow(i)
      }
    }

    // console.log($scope.stockConveObj)
    loadingView.startLoading('show');
    processReqFactory.processReq(baseURL.IP+"/stockconversion/create","POST",$scope.stockConveObj,function(response){
      // console.log(response);
    loadingView.startLoading('hide');
    notifyAlertMessage.notify("Stock converted successfully","alert-danger");
    setTimeout(function(){
      location.reload()
    },2000);
    },function(error){
      loadingView.startLoading('hide');
      if (error.status==401) {
        $state.go('login');
      }
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }
}

function stockMovementController($rootScope, $scope, processReqFactory, baseURL, loadingView, dataTablesInitService, $state, notifyAlertMessage){
  processReqFactory.processReq(baseURL.IP+"/stockmovement/all","GET",'',function(response){
    loadingView.startLoading('hide');
    var columns = [
      { "data": "name" },
      { "data": "batchCode" },
      { "data": "id",
        "orderable": false,
        "searchable": false,   
        "render": function(data,type,row,meta) {
          var a = '<a class="rd dtview btn btn-success btn-xs" ng-click=\"addOrUpdateBatch(\''+data+'\')\">View</a>'
          return a;
        }
      }
    ];
    dataTablesInitService.initDataTables(response,columns,'#stockMovement','' ,$scope);
  },function(error){
      loadingView.startLoading('hide');
      if (error.status==401) {
        $state.go('login');
      }
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });
}

function stockMovementCreationController($rootScope, $scope, processReqFactory, baseURL, loadingView, $state, notifyAlertMessage){
   // PRODUCTS SKU LIST

  loadingView.startLoading('show');
  processReqFactory.processReq(baseURL.IP+"/productSku/all","GET",'',function(response){
    $scope.stockMovementProducts = response;
    loadingView.startLoading('hide');
  },function(error){
    loadingView.startLoading('hide');
    if (error.status==401) {
      $state.go('login');
    }
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  // BATCH LIST

  loadingView.startLoading('show');
  processReqFactory.processReq(baseURL.IP+"/batch/all","GET",'',function(response){
    $scope.stockMovementBatches = response;
    loadingView.startLoading('hide');
  },function(error){
    loadingView.startLoading('hide');
    if (error.status==401) {
      $state.go('login');
    }
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  
  // UnitOfMeasurement LIST

  loadingView.startLoading('show');
  processReqFactory.processReq(baseURL.IP+"/unitOfMeasurement/all","GET",'',function(response){
    $scope.stockMovementUOMs = response;
    loadingView.startLoading('hide');
  },function(error){
    loadingView.startLoading('hide');
    if (error.status==401) {
      $state.go('login');
    }
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  // STOCK POINT LIST

  loadingView.startLoading('show');
  processReqFactory.processReq(baseURL.IP+"/stockPoint/all","GET",'',function(response){
    $scope.stockMovementStockPoint = response;
    loadingView.startLoading('hide');
  },function(error){
    loadingView.startLoading('hide');
    if (error.status==401) {
      $state.go('login');
    }
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  $scope.movementListArr = [];

  var movementRep = {
    "fromBatch": "",
    "fromBranch": "",
    "fromSku": "",
    "fromSkuQty": "",
    "fromSkuUom": "",
    "fromStockPoint": "",
    "fromUnits": "",
    "toBatch": "",
    "toBranch": "",
    "toSku": "",
    "toSkuQty": "",
    "toSkuUom": "",
    "toStockPoint": "",
    "toUnits": "",
  }


  $scope.newRowAdded = function(){
    $scope.movementListArr.push(angular.copy(movementRep));
  }

  $scope.newRowAdded();

  $scope.removeRow = function(index){
    // console.log($scope.conversionListArr[index])
    $scope.movementListArr.splice(index, 1);
  }
}


function batchListController($rootScope, $scope, processReqFactory, baseURL, loadingView, dataTablesInitService, $state, notifyAlertMessage){
  var url = baseURL.IP+"/batch/all";
  processReqFactory.processReq(url,"GET",'',function(response){
      loadingView.startLoading('hide');
      //$rootScope.show_load = false;
    var columns = [
      { "data": "name" },
      { "data": "batchCode" },
      { "data": "id",
        "orderable": false,
        "searchable": false,   
        "render": function(data,type,row,meta) {
          var a = '<a class="rd dtview btn btn-success btn-xs" ng-click=\"addOrUpdateBatch(\''+data+'\')\">View</a>'
          return a;
        }
      }
    ];
    dataTablesInitService.initDataTables(response,columns,'#batchTable','' ,$scope);
  },function(error){
      loadingView.startLoading('hide');
      //$rootScope.show_load = false;
      if (error.status==401) {
        $state.go('login');
      }
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });


  $scope.addOrUpdateBatch = function(id){
    if (id) {
      processReqFactory.processReq(baseURL.IP+"/batch/"+id,"GET",'',function(response){ 
        $scope.batchObj = response;
        $('#addBatchModal').modal();
      },function(error){
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
    }else{
      $('#addBatchModal').modal();
    }
  }


  $scope.saveBatch = function(batchJson){
    if (batchJson.id) {
      processReqFactory.processReq(baseURL.IP+"/batch/update","PUT",batchJson,function(key,response){ 
        // console.log(response+'----'+key);
        if (response==201) {
          notifyAlertMessage.notify("Batch Updated Successfully","alert-danger");
          location.reload();
        }
      },function(error){
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
    }else{
      batchJson['companyId'] = "4028aa90726059a201726063470d0000";
      processReqFactory.processReq(baseURL.IP+"/batch/create","POST",batchJson,function(key,response){ 
        // console.log(response+'----'+key);
        if (response==201) {
          notifyAlertMessage.notify("Batch Created Successfully","alert-danger");
          location.reload();
        }
      },function(error){
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
    }
  }

  $scope.close = function(){
    $('#addBatchModal').modal('hide');
  }
}


function grnListController($rootScope, $scope, processReqFactory, baseURL, loadingView, dataTablesInitService, $state, notifyAlertMessage){

    processReqFactory.processReq(baseURL.IP+"/goodsReceiptNote/all","GET",'',function(response){
      loadingView.startLoading('hide');
      //$rootScope.show_load = false;
      var columns = [
      // { "data": "name" },
      { "data": "grnNo", 
        "render": function(data,type,row,meta){
          return data ? data : '123';
        }
      },
      // { "data": "grnType", 
      //   "render": function(data,type,row,meta){
      //     return data ? data : '123';
      //   }
      // },
      { "data": "grnType", 
        "render": function(data,type,row,meta){
          return data ? data : 'ABC';
        }
      },
      { "data": "subTotal" },
      { "data": "discount", 
         "render": function(data,type,row,meta){
          return data ? data : '0';
        }
      },
      { "data": "taxAmount" },
      { "data": "totalAmount" },
      { "data": "createdDate", 
        "render": function(data,type,row,meta){
          return data ? data : new Date().toDateString();
        }
      },
      // { "data": "id",
      //   "orderable": false,
      //   "searchable": false,   
      //   "render": function(data,type,row,meta) {
      //     var a = '<a class="btn btn-primary btn-xs" href="./#/purchase/purchaseorderupdate/'+row.partyName+'/'+data+'">VIEW</a>'
      //     return a;
      //   }
      // }
    ];
    dataTablesInitService.initDataTables(response,columns,'#grnListTable','' ,$scope);
  },function(error){
      loadingView.startLoading('hide');
      //$rootScope.show_load = false;
      if (error.status==401) {
        $state.go('login');
      }
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
  });

}


function grnCreationController($rootScope, $scope, processReqFactory, baseURL, loadingView, notifyAlertMessage){

  $scope.grnProductsListArr = [];

  $scope.selectedProduct = function(ev,index,mode){
      $scope.grnProductsListArr[index]['productSkuId'] = mode?ev.fromProductSku:ev.id;
      $scope.grnProductsListArr[index]['productSkuName'] = ev.name?ev.name:ev.fromProductSkuName;
      $scope.grnProductsListArr[index]['orderedUnits'] = ev.quantity;
      $scope.grnProductsListArr[index]['units'] = ev.units;
      $scope.grnProductsListArr[index]['uomId'] = ev.uomId;
      $scope.grnProductsListArr[index]['damagedUnits'] = '0';
      $scope.grnProductsListArr[index]['mrp'] = ev.mrp;
      $scope.grnProductsListArr[index]['purchasePrice'] = ev.purchasePrice;
      $scope.grnProductsListArr[index]['expiryDate'] = ev.expiryDate;
      $scope.grnProductsListArr[index]['isTaxInclusive'] = ev.isTaxInclude;
      $('.product_grn_list_'+index).addClass('hide');
      // $scope.$apply();
  }

  $scope.grncreationObj = {};
  $scope.getProductPrice = function(index,obj){
    $scope.grncreationObj['totalAmount'] = 0.0;
    $scope.grnProductsListArr[index]['finalPrice'] = (Number(obj.receivedUnits) * Number(obj.purchasePrice))+'';
    for (var gpla in $scope.grnProductsListArr){
      if ($scope.grnProductsListArr[gpla]['finalPrice']) {
        $scope.grncreationObj['totalAmount'] += Number($scope.grnProductsListArr[gpla]['finalPrice']);
      }
    }
  }

  $scope.productsSearch =  function(search,index){
    $('.product_grn_list_'+index).removeClass('hide');
    if (index+1 == $scope.grnProductsListArr.length) {
      $scope.addgrnRowAdded();
    }
  }

  $scope.receiverMode = function(mode){
    if (mode.grnType == 'ADHOC') {
      $scope.grnProductsListArr = [];
      mode.purchase_order_id = "";
      mode.stockTransfer_id = "";
    }else{

    }
  }


  var grnProductsRep = {
    "productSkuId": "",
    "quantity": "",
    "mrp": "",
    "units": "",
    "expiryDate": ""
  }


  $scope.addgrnRowAdded = function(){
    $scope.grnProductsListArr.push(angular.copy(grnProductsRep));

    setTimeout(function(){

        $('input[name="datepickerexpirydate"]').daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          minYear: 1901,
          maxYear: parseInt(moment().format('YYYY'),10)
        }, function(start, end, label) {
            var years = moment().diff(start, 'years');
            // alert("You are " + years + " years old!");
        });
    },1000);

    // $scope.$apply();
  }

  // $scope.addgrnRowAdded();

  $scope.removeRow = function(index){
    if ($scope.grnProductsListArr.length>1) {
      $scope.grnProductsListArr.splice(index, 1);
    }
  }


    processReqFactory.processReq(baseURL.IP+"/stockLogs/all?type=STOCKTRANSFER&status=TRANSIT","GET",'',function(response){ 
      $scope.stockTransferList = response;
    },function(error){
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
    });

    processReqFactory.processReq(baseURL.IP+"/purchaseorder/all","GET",'',function(response){ 
      $scope.purchaseOrderList = response;
    },function(error){
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
    });

    processReqFactory.processReq(baseURL.IP+"/stockPoint/all","GET",'',function(response){ 
      $scope.stockPointList = response;
    },function(error){
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
    });

    processReqFactory.processReq(baseURL.IP+"/unitOfMeasurement/all","GET",'',function(response){ 
      $scope.unitOfMeasurementList = response;
    },function(error){
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
    });

    processReqFactory.processReq(baseURL.IP+"/productSku/all","GET",'',function(data){
      $scope.skuProductSearchData = data;
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });

    processReqFactory.processReq(baseURL.IP+"/batch/all","GET",'',function(data){
      $scope.batchData = data;
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

    processReqFactory.processReq(baseURL.IP+"/companybranchuser/all","GET",'',function(data){
        $scope.branchUserListObj = data
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });


    $scope.getReceiverData = function(id,mode){
      if(mode=='PURCHASE'){
        processReqFactory.processReq(baseURL.IP+"/purchaseorder/"+id,"GET",'',function(data){
          $scope.purchaseOrderListObj = data;
          if (data['purchaseOrderItemsModels'].length>0) {
            // for(var poim in data['purchaseOrderItemsModels']){
            //   $scope.addgrnRowAdded();
            //   // $scope.purchaseOrderArra[poim] = ;
            //   $scope.selectedProduct(data['purchaseOrderItemsModels'][poim],poim);
            // }
            $scope.filterItemsList(data,'purchaseOrderItemsModels',id,mode);
          }

        },function(error){
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }
      if (mode=='TRANSFER') {
        $scope.filterItemsList($scope.stockTransferList,'stockLogItemsModels',id,mode);
      }
    }


    $scope.filterItemsList = function(array,arrayName,id,mode){
      if (array) {
        for(var poim in array){
          if (array[poim].id == id && array[poim][arrayName].length>0) {
            // $scope.purchaseOrderArra[poim] = ;
            for(var arrayitems in array[poim][arrayName]){
              $scope.addgrnRowAdded();
              $scope.selectedProduct(array[poim][arrayName][arrayitems],arrayitems,mode);
            }
          }
        }
      }
    }


    $scope.saveGrn = function(obj){
      
      // console.log(obj)
      var saveGrnProducts = [];
      for(var gpl in $scope.grnProductsListArr){
        if ($scope.grnProductsListArr[gpl]['productSkuId']) {
          var grnObj = {
            "productSkuId": $scope.grnProductsListArr[gpl]['productSkuId'],
            "orderedUnits":  $scope.grnProductsListArr[gpl]['orderedUnits'],
            "receivedUnits":  $scope.grnProductsListArr[gpl]['receivedUnits'],
            "damagedUnits":  $scope.grnProductsListArr[gpl]['damagedUnits'],
            "stockPointId":  obj['stockPointId'],
            "uomId":  $scope.grnProductsListArr[gpl]['uomId'],
            "mrp":  parseFloat($scope.grnProductsListArr[gpl]['mrp']),
            // "units":  $scope.grnProductsListArr[gpl]['units']?$scope.grnProductsListArr[gpl]['units']:'1',
            "purchasePrice":  parseFloat($scope.grnProductsListArr[gpl]['purchasePrice']),
            "finalPrice":  parseFloat($scope.grnProductsListArr[gpl]['finalPrice']),
            "remarks":  $scope.grnProductsListArr[gpl]['remarks'],
            // "batch": {
            //   "id": $scope.grnProductsListArr[gpl]['batchId'],
            //   'name': $scope.grnProductsListArr[gpl]['batchName']
            // },
            
          }

          if ($scope.grnProductsListArr[gpl]['expiryDate']) {
            grnObj["expiryDate"] = $scope.grnProductsListArr[gpl]['expiryDate'].split('/')[0]+'-'+$scope.grnProductsListArr[gpl]['expiryDate'].split('/')[1]+'-'+$scope.grnProductsListArr[gpl]['expiryDate'].split('/')[2] 
          }else{
            notifyAlertMessage.notify("Please Select Expiry Date","danger");
            return false;
          }

          if ($scope.grnProductsListArr[gpl]['batchId'] || $scope.grnProductsListArr[gpl]['batchName']) {
            grnObj["batchModel"] = {};
            grnObj["batchModel"]["id"] = $scope.grnProductsListArr[gpl]['batchId'];
            grnObj["batchModel"]["name"] = $scope.grnProductsListArr[gpl]['batchName'];
          }

          saveGrnProducts.push(grnObj)
        }
      }

      if (obj.purchase_order_id || obj.stockTransfer_id) {
        var grnRep = {
          "poId": obj.purchase_order_id,
          "stackTransferId": obj.stockTransfer_id,
          "grnItemsModels": saveGrnProducts,
          "grnType": obj.grnType,
          "companyBranchId": JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']
        }
      }else{
        var grnRep = {
          "partyId": obj.partyId,
          "grnItemsModels": saveGrnProducts,
          "totalAmount": obj.totalAmount,
          "paidAmount": obj.paidAmount,
          "dueAmount": obj.dueAmount,
          "receivedBy": obj.receivedBy,
          "companyBranchId": JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']
        }

        if (!grnRep['partyId']) {
          notifyAlertMessage.notify("Please Select Party","danger");
          return false;
        }
      }



      console.log(JSON.stringify(grnRep));

      loadingView.startLoading('show');
      processReqFactory.processReq(baseURL.IP+"/goodsReceiptNote/create","POST",grnRep,function(response){ 
        loadingView.startLoading('hide');
        if (response.id) {
          setTimeout(function(){
            location.reload();
          },2000);
          notifyAlertMessage.notify("Purchase Order Created Successfully","alert-success");
        }
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger");
      });
    }

      

      
    // }

}









angular
  .module('distapp')
  .controller('stockController',stockController)
  .controller('stockConversionController',stockConversionController)
  .controller('stockPointController',stockPointController)
  .controller('stockTransferController',stockTransferController)
  .controller('stockTransferCreationController',stockTransferCreationController)
  .controller('stockTransferViewController',stockTransferViewController)
  .controller('stockConversionCreationController',stockConversionCreationController)
  .controller('stockMovementController',stockMovementController)
  .controller('stockMovementCreationController',stockMovementCreationController)
  .controller('batchListController',batchListController)
  .controller('grnListController',grnListController)
  .controller('grnCreationController',grnCreationController);
