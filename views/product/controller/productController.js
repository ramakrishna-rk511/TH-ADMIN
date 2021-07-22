// product controller start
function productListController($rootScope,$scope,$http,$modal,baseURL,notifyAlertMessage,processReqFactory,dataTablesInitService,loadingView, $state){
  // $scope.getProductList = function(){
    // loadingView.startLoading('show');
    //$rootScope.show_load = true;
    processReqFactory.processReq(baseURL.IP+"/brand/all","GET",'',function(data){
      $scope.brandArrayList = data
    },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });

    $scope.getProductList = function(brand){
      // if (!sessionStorage.getItem('ProductListData')) {

        if (!JSON.parse(sessionStorage.getItem('sessionOn'))) {
          $state.go('login');
          sessionStorage.setItem('token', '');
          sessionStorage.setItem('sessionOn', JSON.stringify({'sessionId': '', 'status': false, 'branchId': '', 'role': ''}));
        }
        var prodParams = '';
        if (brand) {
          prodParams = "&bid="+brand
        }

        loadingView.startLoading('show');

        processReqFactory.processReq(baseURL.IP+"/productSku/all?branchId="+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']+prodParams,"GET",'',function(response){
            loadingView.startLoading('hide');

          sessionStorage.setItem('ProductListData', '');
          sessionStorage.setItem('ProductListData', JSON.stringify(response));

          $scope.renderProductsList(response);
           
        },function(error){
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong","alert-danger");
        });

      // }else{
      //   $scope.renderProductsList(JSON.parse(sessionStorage.getItem('ProductListData')));
      // }

    }


    $scope.renderProductsList = function(productsData){

       var columns = [
          { "data": "name", 
            "render": function(data,type,row,meta){
              return '<a href="./#/catalogue/productviewupdate/'+data+'/'+row.productId+'"><b class="fc2">'+data+'</b></a>'
            }
          },
          { "data": "barcode" },
          { "data": "skuCode" },
          { "data": "categoryName" },
          // { "data": "department" },
          { "data": "brandName" },
          { "data": "mrp",
            "render": function(data, type, row, meta) {
                return data ? data : 'N/A'
            }
           },
          { "data": "sellingPrice",
            "render": function(data, type, row, meta) {
                return data ? data : 'N/A'
            }
           },
          { "data": "hsnCode" },
          { "data": "isStockable" },
          { "data": "taxGroupName" },
          // { "data": "taxType",
          //   "render": function(data,type,row,meta){
          //     return data? data: 'NA'
          //   } 
          // },
          { "data": "createdDate",
            "render": function(data,type,row,meta){
              return row.createdDate? row.createdDate : 'N/A' 
            }
          },
          { "data": "productId",
            "orderable": false,
            "searchable": false,   
            "render": function(data,type,row,meta) {
              var a = '<a class="rd dtview btn btn-primary btn-xs" href="./#/catalogue/singleproductview/'+row.name+'/'+data+'">View</a>'
              return a;
            }
          }
        ];
      dataTablesInitService.initDataTables(productsData,columns,'#productListTable','' ,$scope);
    }
  // };

  $scope.bulkProdUpload = function(type){
    setTimeout(function(){
      $('#productUpload').appendTo('body').modal();
    },100)
  }


  $scope.refreshProducts = function(){
    sessionStorage.setItem('ProductListData', '');
    $scope.getProductList();
  }
  // $scope.getProductList();

  // $scope.dropExcel = function(el,index){

  //   if (el[0].name.split('.')[1]=='xlsx' || el[0].name.split('.')[1]=='xls') {
  //   // if (el.dataTransfer.files[0].name.split('.')[1]=='xlsx' || el.dataTransfer.files[0].name.split('.')[1]=='xls') {
  //     var formData = new FormData();
  //     formData.append('file', el[0]);

  //       $.ajax({
  //         type: "POST",
  //         url: baseURL.IP+'/bulkupload/productsku',
  //         data:formData,
  //         headers: {'Authorization': 'Bearer '+sessionStorage.getItem('token')},
  //         processData: false,
  //         contentType: false,
  //         success: function(key,response) {
  //           if (key==202) {
  //             console.log(key+'--'+response)
  //           }
  //         },
  //         error:function(error){
  //           console.log(error)
  //         }
  //       });
  //   }else{
  //     notifyAlertMessage.notify("Please upload valid excel file","alert-danger")
  //   }
  // }


  // $scope.allowDrop = function(ev,list){
  //   console.log(ev+'--'+list);
  // }
}
function productCreationController($rootScope,$scope,$http,$modal,baseURL,notifyAlertMessage,$state,processReqFactory,dataTablesInitService,loadingView){
  $scope.productNewObj = {}
  $scope.categoryList = function(){
    var categoryUrl = baseURL.IP+"/category/list"
      processReqFactory.processReq(categoryUrl,"GET",'',function(data){
        $scope.categoryArray = data
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }();
  $scope.brandList = function(){
    var brandUrl = baseURL.IP+"/brand/all"
      processReqFactory.processReq(brandUrl,"GET",'',function(data){
        $scope.brandArray = data
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }();
  $scope.departmntList = function(){
    var departsUrl = baseURL.IP+"/department/all"
      processReqFactory.processReq(departsUrl,"GET",'',function(data){
        $scope.departsArray = data
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }();
  $scope.goBack = function(){
      window.history.back();
  }
  $scope.uomList = function(){
    var unitOfMeasurementUrl = baseURL.IP+"/unitOfMeasurement/all"
      processReqFactory.processReq(unitOfMeasurementUrl,"GET",'',function(data){
        $scope.uomArray = data
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }();

  $scope.taxGroupList = function(){
    var taxGroupUrl = baseURL.IP+"/taxGroup/all"
      processReqFactory.processReq(taxGroupUrl,"GET",'',function(data){
        $scope.taxGroupArray = data
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }();

  $scope.hsnCodeList = function(){
    var hsnCodeUrl = baseURL.IP+"/hsnCode/all"
      processReqFactory.processReq(hsnCodeUrl,"GET",'',function(data){
        $scope.hsnCodeArray = data
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }();

  $scope.batchList = function(){
      processReqFactory.processReq(baseURL.IP+"/batch/all?cid="+JSON.parse(sessionStorage.getItem('sessionOn'))['companyId'],"GET",'',function(data){
        $scope.batchArray = data;
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }();


  $scope.variantImage = function(el,index,Type){

    var imageType = el.files[0].type;
    var imgType = imageType.substring(0,5);
    var formData = new FormData();
    formData.append('file', el.files[0]);
    formData.append('entityType','productsku');

    loadingView.startLoading('show');

    if(imgType == "image"){
      $.ajax({
        type: "POST",
        url: baseURL.IP+'/uploadfile/image',
        data:formData,
        headers: {'Authorization': 'Bearer '+sessionStorage.getItem('token')},
        processData: false,
        contentType: false,
        success: function(response) {
          loadingView.startLoading('hide');
          var responseData = response['uploadStatus'].split(':::')[0];
          notifyAlertMessage.notify(response['uploadStatus'].split(':::')[1],"alert-sucess");
          if (responseData == 'SUCCESS') {
            // $scope.varientsArray[index.split('_')[1]]['imageModels'] = [];
            var skuImage;
            for(var im in response['imageModels']){
              if ($scope.varientsArray[index.split('_')[1]]['imageModels'].length==0) {
                skuImage = {
                  "imageFolder": response['imageModels'][im]['imageFolder'],
                  "imageName": response['imageModels'][im]['imageName'],
                  "imageType": response['imageModels'][im]['imageType'],
                  "orderOfPlace": 1,
                  // "imageurl": response['imageModels'][im]['imageFolder']+'/'+response['imageModels'][im]['imageName'],
                  "imageurl": response['imageModels'][im]['imageUrl'],
                  "isActive": true
                }
                $scope.varientsArray[index.split('_')[1]]['imageModels'].push(skuImage);
              }else{


                // skuImage = {
                  $scope.varientsArray[index.split('_')[1]]['imageModels'][$scope.varientsArray[index.split('_')[1]]['imageModels'].length-1]["imageFolder"] = response['imageModels'][im]['imageFolder'];
                  $scope.varientsArray[index.split('_')[1]]['imageModels'][$scope.varientsArray[index.split('_')[1]]['imageModels'].length-1]["imageName"] = response['imageModels'][im]['imageName'];
                  $scope.varientsArray[index.split('_')[1]]['imageModels'][$scope.varientsArray[index.split('_')[1]]['imageModels'].length-1]["imageType"] = 'SINGLEIMAGE';
                  $scope.varientsArray[index.split('_')[1]]['imageModels'][$scope.varientsArray[index.split('_')[1]]['imageModels'].length-1]["orderOfPlace"] = $scope.varientsArray[index.split('_')[1]]['imageModels'].length;
                  // "imageurl" = response['imageModels'][im]['imageFolder']+'/'+response['imageModels'][im]['imageName'];
                  $scope.varientsArray[index.split('_')[1]]['imageModels'][$scope.varientsArray[index.split('_')[1]]['imageModels'].length-1]["imageurl"] = response['imageModels'][im]['imageUrl'];
                  $scope.varientsArray[index.split('_')[1]]['imageModels'][$scope.varientsArray[index.split('_')[1]]['imageModels'].length-1]["isActive"] = true;
                  // delete $scope.varientsArray[index.split('_')[1]]['imageModels'][$scope.varientsArray[index.split('_')[1]]['imageModels'].length-1]['$$hashKey']
                // }
              }
            }
          }
          console.log(response)
        },error: function(){
          loadingView.startLoading('hide');
          notifyAlertMessage.notify("Image Not Uploaded","alert-danger")
        }
      });
    }
  }

  $scope.addSubImg = function(index){
    $scope.varientsArray[index]['imageModels'].push({"imageType" : "SINGLEIMAGE"})
  }
 

  
  $scope.varientsArray = [];
  $scope.getAttrVarients = function(){
    if($scope.productNewObj.attrType){
      var final_diff = '';
      function arr_diff (a1, a2) {
        var a = [], diff = [];
          for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
          }
          for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
          }
          for (var k in a) {
            diff.push(k);
          }
          final_diff = diff;
        return final_diff;
        
      }
      if($scope.varientsArray.length > 0){
        if($scope.productNewObj.selectedAttrVal.length > $scope.varientsArray.length){
          var oldArray = $scope.productNewObj.selectedAttrVal.map(function(item){
            return item;
          })
          var newArray = $scope.varientsArray.map(function(item){
            return item.attrValue;
          })
          arr_diff(oldArray,newArray)
          if(final_diff[0]){
            for(var indx=0; indx < $scope.productNewObj.selectedAttrVal.length;indx++){
              if($scope.productNewObj.selectedAttrVal[indx] == final_diff[0]){
                var sampObj = {
                  "attrValue" : $scope.productNewObj.selectedAttrVal[indx]
                }
                $scope.varientsArray.push(sampObj);
              }
            }
          }
        }else if($scope.productNewObj.selectedAttrVal.length < $scope.varientsArray.length){
          var oldArray = $scope.productNewObj.selectedAttrVal.map(function(item){
            return item;
          })
          var newArray = $scope.varientsArray.map(function(item){
            return item.attrValue;
          })
          arr_diff(oldArray,newArray)
          if(final_diff[0]){
            for(var vIndx=0; vIndx < $scope.varientsArray.length;vIndx++){
              if(final_diff[0] == $scope.varientsArray[vIndx].attrValue){
                $scope.varientsArray.splice(vIndx,1)
              }
            }
          }
        }
      }else{
        var sampObj = {
          "attrValue" : $scope.productNewObj.selectedAttrVal[0]
        }
        sampObj['imageModels'] = [];
        $scope.varientsArray.push(sampObj);
      }
    }else{
      $scope.productNewObj.selectedAttrVal = [];
      notifyAlertMessage.notify("Select Attribute","alert-warning")
    }
  }


  $scope.selectMultipleUnits = function(index,obj){
    // console.log($scope.varientsArray[index]);
    $scope.varientsArray[index]['psupModel'] = [];
    $scope.varientsArray[index]['psupModel'].push({"isActive": "","name": "","mrp": '',"sellingPrice": "","quantity": "","maxBuyableUnits": ""});
  }

  $scope.addNewUnit = function(index){
    $scope.varientsArray[index]['psupModel'].push({"isActive": "","name": "","mrp": '',"sellingPrice": "","quantity": "","maxBuyableUnits": ""});
  }

  $scope.createSaveProduct = function(){
    var prodObj = {
      "name": $scope.productNewObj.name,
      "categoryId": $scope.productNewObj.categoryId,
      "brandId": $scope.productNewObj.brandId,
      "isActive": JSON.parse($scope.productNewObj.isActive),
      "companyId": JSON.parse(sessionStorage.getItem('sessionOn'))['companyId']
    }
    prodObj.skuProductModels = []
    if($scope.varientsArray.length>0){
      for(var vaIndx=0; vaIndx < $scope.varientsArray.length;vaIndx++){
        var varientObj = {
          "name": $scope.varientsArray[vaIndx].name,
          "description": $scope.varientsArray[vaIndx].description,
          "disclaimer": $scope.varientsArray[vaIndx].disclaimer,
          "shortDescription": $scope.varientsArray[vaIndx].shortDescription,
          "skuCode": $scope.varientsArray[vaIndx].skuCode,
          "barcode": $scope.varientsArray[vaIndx].barcode,
          "hsnCode": $scope.varientsArray[vaIndx].hsnCode,
          "taxGroupId": $scope.varientsArray[vaIndx].taxGroupId,
          "activeBatch": $scope.varientsArray[vaIndx].activeBatch,
          "isMultipleUnit": $scope.varientsArray[vaIndx].isMultipleUnit,
          "isTaxInclude": $scope.varientsArray[vaIndx].isTaxInclude,
          "uomId": $scope.varientsArray[vaIndx].uomId,
          "keywords": $scope.varientsArray[vaIndx].keywords,
          "companyId": JSON.parse(sessionStorage.getItem('sessionOn'))['companyId'],
          "quantity": $scope.varientsArray[vaIndx].quantity,
          "isStockable": $scope.varientsArray[vaIndx].is_stockable,
          "isEcommerceVisible": $scope.varientsArray[vaIndx].is_ecommerce_visible,
          "measurableType": $scope.varientsArray[vaIndx].measurable_type,
          "isPosVisible": $scope.varientsArray[vaIndx].isPosVisible,
          "isCarrybag": $scope.varientsArray[vaIndx].isCarrybag,
          "maxBuyableUnits": parseInt($scope.varientsArray[vaIndx].maxBuyableUnits),
          "mrp": $scope.varientsArray[vaIndx].mrp,
          "sellingPrice": $scope.varientsArray[vaIndx].sellingPrice,
          "isActive": true,
          "seoModel":{
            "seoDescription": $scope.varientsArray[vaIndx].seoTitle,
            "seoKeyword": $scope.varientsArray[vaIndx].seoKeyword,
            "seoTitle": $scope.varientsArray[vaIndx].seoDescription,
          },
          "productImagesModels": $scope.varientsArray[vaIndx]['imageModels']
        }
        varientObj.productAttributeModels = [];
        for(var sav in $scope.productNewObj['selectedAttrVal']){
          if ($scope.varientsArray[vaIndx].attrValue == $scope.productNewObj['selectedAttrVal'][sav]) {
            varientObj.productAttributeModels.push({'attributeName': $scope.productNewObj.attrType, 'attributeValue': $scope.productNewObj['selectedAttrVal'][sav], 'attributeType': 'VARIANT', 'isActive': true })
          }
        }
        // varientObj.psupModel = [];
        // for(var psmodel in $scope.varientsArray[vaIndx]['psupModel']){
        //   if ($scope.varientsArray[vaIndx]['psupModel'][psmodel]['quantity'] && $scope.varientsArray[vaIndx]['psupModel'][psmodel]['sellingPrice'] && $scope.varientsArray[vaIndx]['psupModel'][psmodel]['maxBuyableUnits']) {
        //     varientObj.psupModel.push($scope.varientsArray[vaIndx]['psupModel'][psmodel]);
        //   }
        // }
        prodObj.skuProductModels.push(varientObj);    
      }
    }else{
      notifyAlertMessage.notify("Please add atleast one varient","alert-warning")
      return false;
    }
    console.log(JSON.stringify(prodObj))
    loadingView.startLoading('show');
    processReqFactory.processReq(baseURL.IP+"/product/create","POST",prodObj,function(response){
      loadingView.startLoading('hide');
      // var response = response;
      notifyAlertMessage.notify("Product creation successfully","alert-sucess");

      if (response['id']) {
        $state.go('catalogue.productlist');
      }
      // $state.go('product.productcreation')
    },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }
}

function productViewUpdateController($scope, $stateParams, processReqFactory, baseURL, loadingView, notifyAlertMessage, $state){
  $scope.prodName = $stateParams.prodName
  $scope.prodId = $stateParams.prodId

    // var prodUrl = 
    processReqFactory.processReq(baseURL.IP+"/product/" + $scope.prodId,"GET",'',function(data){
        $scope.singleProductData = data;
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });


  $scope.editProductView = function(){
    $state.go('catalogue.singleproductview',{prodName: $stateParams.prodName,prodId: $stateParams.prodId});
  }



}

function singleProductUpdationController($scope, $stateParams, processReqFactory, baseURL, loadingView, notifyAlertMessage, $state, $q){

  $scope.showProductStockTrack = false;

  if (!JSON.parse(sessionStorage.getItem('sessionOn'))) {
    $state.go('login');
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('sessionOn', JSON.stringify({'sessionId': '', 'status': false, 'branchId': '', 'role': ''}));
  }
   
  //For Company Branch
  processReqFactory.processReq(baseURL.IP+"/companybranch/" + JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'],"GET",'',function(response){ 
    $scope.companyBranchList = response;
    // $scope.companyBranchList.id = response.id
  },function(error){
     if (error.status==401) {
        $state.go('login');
      }
  });

  //For Delivery Slot
  processReqFactory.processReq(baseURL.IP+"/deliverySlot/all?branch=" + JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'],"GET",'',function(response){ 
    $scope.deliverySlotList = response;
  },function(error){
     if (error.status==401) {
        $state.go('login');
      }
  });

  //  batch list
  processReqFactory.processReq(baseURL.IP+"/batch/all?cid="+JSON.parse(sessionStorage.getItem('sessionOn'))['companyId'],"GET",'',function(data){
      $scope.batchSingleArray = data;
    },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  // stock point
  processReqFactory.processReq(baseURL.IP+"/stockPoint/all?branch="+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'],"GET",'',function(data){
      $scope.stockPointArray = data;
    },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });





  $scope.variantUpdateImage = function(el,index,Type){

    var imageType = el.files[0].type;
    var imgType = imageType.substring(0,5);
    var formData = new FormData();
    formData.append('file', el.files[0]);
    formData.append('entityType','productsku');

    loadingView.startLoading('show');

    if(imgType == "image"){
      $.ajax({
        type: "POST",
        url: baseURL.IP +'/uploadfile/image',
        data:formData,
        headers: {'Authorization': 'Bearer '+sessionStorage.getItem('token')},
        processData: false,
        contentType: false,
        success: function(response) {
          loadingView.startLoading('hide');
          var responseData = response['uploadStatus'].split(':::')[0];
          notifyAlertMessage.notify(response['uploadStatus'].split(':::')[1],"alert-sucess");
          if (responseData == 'SUCCESS') {

            
            // $scope.skuVarientsArray[index.split('_')[1]]['imageModels'] = [];

            // for(var im in response['imageModels']){
              var skuImage = {
                "imageFolder": response['imageModels'][0]['imageFolder'],
                "imageName": response['imageModels'][0]['imageName'],
                "imageType": response['imageModels'][0]['imageType'],
                // "orderOfPlace": index.split('_')[1],
                "imageurl": response['imageModels'][0]['imageFolder']+'/'+response['imageModels'][0]['imageName'],
                "isActive": 'true',
              }
            //   $scope.skuVarientsArray[index.split('_')[1]]['imageModels'].push(skuImage);
            // }
            $scope.newImageUpdate = skuImage;

          }
          console.log(response)
        },error: function(){
          loadingView.startLoading('hide');
          notifyAlertMessage.notify("Image Not Uploaded","alert-danger")
        }
      });
    }
  }

  $scope.uploadProductImage = function(imageLen,skudata,type){
    if (type && $scope.newImageUpdate.imageName) {
      $scope.newImageUpdate['orderOfPlace'] = imageLen;
      $scope.newImageUpdate['productSkuId'] = skudata.id;
      $scope.newImageUpdate['imageType'] = type;
      processReqFactory.processReq(baseURL.IP+"/productImages/create","POST",$scope.newImageUpdate,function(data){
        // $scope.categoryArray = data;
        notifyAlertMessage.notify("Image Added successfully", "alert-sucess");
        location.reload();
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger");
      });
    }else{
      notifyAlertMessage.notify("Please select image type","alert-danger");
    }
  
  }

  //Product Sku Delevery Create And Update
  $scope.addOrUpdatePsd = function(id){
  $scope.updateSave = (id?false:true);
  // loadingView.startLoading('show');
    if($scope.updateSave == false){
        processReqFactory.processReq(baseURL.IP+"/productSkuDeliverySlot/"+id,"GET",'',function(data){
          loadingView.startLoading('hide');
          data.isActive = data.isActive + '';
          $scope.psdData = data
        // $scope.modalInstance = $modal.open({
        //   templateUrl: 'views/settings/addpsdModalTemplate.html',
        //   controller: ModalInstanceCtrl,
        //   size: 'md',
        //   scope:$scope
        // });
        $('#addPSDSlotModal').appendTo('body').modal();
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
    }else{
      $scope.psdData = {}
      loadingView.startLoading('hide');
      $('#addPSDSlotModal').appendTo('body').modal();
      // $scope.modalInstance = $modal.open({
      //   templateUrl: 'views/settings/addpsdModalTemplate.html',
      //   controller: ModalInstanceCtrl,
      //   size: 'md',
      //   scope:$scope
      // });
    }   
}
      $scope.psdData = {};

$scope.changeDeliverySlot = function(id){
  for(var ds in $scope.deliverySlotList){
    if(id==$scope.deliverySlotList[ds].id){
      $scope.psdData.isSpecificToSlots = $scope.deliverySlotList[ds].isSpecificToSlots;
    }
  }
}

$scope.createOrUpdatePsd = function(psddata,skudata){
  psddata.productSkuId = skudata.id;
  psddata.isActive = JSON.parse(psddata.isActive);
  psddata.companyBranchId = JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'];
  console.log(psddata);
  // $scope.productSkuId = id
  // $scope.psdData = data;
    processReqFactory.processReq(baseURL.IP + "/productSkuDeliverySlot/create","POST",psddata,function(response){
      loadingView.startLoading('hide');
      var response = response;
      var alertMessage = (psddata.id?"Timings Slot updated ":"Timings Slot created ")
      notifyAlertMessage.notify(alertMessage + " successfully","alert-sucess")
      setTimeout(function(){
        location.reload();
      },1000);
    },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }

  $scope.delProductImg = function(data){
    processReqFactory.processReq(baseURL.IP+"/productImages/delete?id=" + data.id,"DELETE",'',function(data){
    // $scope.categoryArray = data;
    notifyAlertMessage.notify("Image Deleted", "alert-sucess");
  },function(error){
    loadingView.startLoading('hide');
    notifyAlertMessage.notify("Something went Wrong","alert-danger");
  });
  }




  $scope.priceUpdate = function(obj){
    var updatePriceObj = {
        "branchId": JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'],
        "id": obj.productId,
        "mrp": obj.mrp,
        "productSkuId": obj.id,
        "sellingPrice": obj.sellingPrice
      }
    processReqFactory.processReq(baseURL.IP+"/productprice/update/price","PUT",updatePriceObj,function(data){
        // $scope.singleProductData = data;
        notifyAlertMessage.notify('price updated successfully',"alert-danger");
        setTimeout(function(){
          location.reload();
        },2000);
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }



  processReqFactory.processReq(baseURL.IP+"/category/list","GET",'',function(data){
    $scope.categoryArray = data;
  },function(error){
    loadingView.startLoading('hide');
    notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  processReqFactory.processReq(baseURL.IP+"/brand/all","GET",'',function(data){
    $scope.brandArray = data;
  },function(error){
    loadingView.startLoading('hide');
    notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  processReqFactory.processReq(baseURL.IP+"/department/all","GET",'',function(data){
      $scope.departsArray = data;
  },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  processReqFactory.processReq(baseURL.IP+"/unitOfMeasurement/all","GET",'',function(data){
    $scope.uomArray = data;
  },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  processReqFactory.processReq(baseURL.IP+"/taxGroup/all","GET",'',function(data){
    $scope.taxGroupArray = data
  },function(error){
    loadingView.startLoading('hide');
    notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  // processReqFactory.processReq(baseURL.IP+"/hsnCode/all","GET",'',function(data){
  //   $scope.hsnCodeArray = data
  // },function(error){
  //   loadingView.startLoading('hide');
  //   notifyAlertMessage.notify("Something went Wrong","alert-danger")
  // });

  $scope.prodName = $stateParams.prodName;
  $scope.prodId = $stateParams.prodId;


  processReqFactory.processReq(baseURL.IP+"/product/" + $stateParams.prodId,"GET",'',function(proddata){
    $scope.productData = proddata;
    processReqFactory.processReq(baseURL.IP+"/productSku/all?pid=" + $stateParams.prodId +"&branchId="+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'],"GET",'',function(skudata){
      $scope.productData['skuProductModels'] = skudata;
      for(var skuindex in skudata){
            $scope.productData['skuProductModels'][skuindex]['deliverySlot'] = [];
            $scope.productData['skuProductModels'][skuindex]['stock'] = [];
            $scope.productData['skuProductModels'][skuindex]['changeIcon'] = false;
      }

      // console.log($scope.productData)
    },function(error){
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  },function(error){
    notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  $scope.getSkuProductFeatures = function(ind,prod){
    if ($scope.productData['skuProductModels'][ind]['deliverySlot'].length==0) {
      // product sku delivery slot
      $scope.productSkuDeliverySlot(ind,prod);
    }

    if ($scope.productData['skuProductModels'][ind]['stock'].length==0) {
      // product stock point
      $scope.productSkuStock(ind,prod);  
    }
  }


    $scope.productStockData = {};
  // for sku product stock

  $scope.stockTracking = function(skuindex,skudata){
    $scope.showProductStockTrack = !$scope.showProductStockTrack;

    processReqFactory.processReq(baseURL.IP+"/stocklogstrack/trace?fb=" + JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']+"&skuid=" + skudata.id,"GET",'',function(skudeliverylogs){
      $scope.productStockData['prodName'] = skudeliverylogs[0].productName;
      $scope.productStockData['prodLogs'] = skudeliverylogs;
    },function(error){
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
      // deferred.reject();
    });
    processReqFactory.processReq(baseURL.IP+"/sale/sold/" + skudata.id+"?branch=" + JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'],"GET",'',function(skusolddata){
      $scope.productStockData['prodSoldLogs'] = skusolddata;
    },function(error){
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
      // deferred.reject();
    });
  }


  // product sku delivery slot
  $scope.productSkuDeliverySlot = function(skuindex,skudata){
    // var deferred = $q.defer();
    processReqFactory.processReq(baseURL.IP+"/productSkuDeliverySlot/findbysku?skuid=" + skudata.id+"&cbid=" + JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'],"GET",'',function(skudeliverydata){
      skudeliverydata = Object.keys(skudeliverydata).length>2? [skudeliverydata]: skudeliverydata;
      for(var skuslot in skudeliverydata){
            $scope.productData['skuProductModels'][skuindex]['deliverySlot'].push(skudeliverydata[skuslot]);
      }
    },function(error){
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
      // deferred.reject();
    });

    // return deferred.promise;
  }

    // product stock point
  $scope.productSkuStock = function(skuindex,skudata){
    processReqFactory.processReq(baseURL.IP+"/productSkuBranchBatchStockPoint/list?branch="+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']+'&barcode='+skudata['barcode'],"GET",'',function(data){
       $scope.productData['skuProductModels'][skuindex]['stock'] = data?data:[];

       // console.log($scope.productData);
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }

  $scope.goBack = function(){
      window.history.back();
  }

  $scope.productUpdate = function(prodData){
    delete prodData['skuProductModels']
    processReqFactory.processReq(baseURL.IP+"/product/" + $stateParams.prodId +'/edit',"PUT",prodData,function(skudata){
      // $scope.productData['skuProductModels'] = skudata;
      setTimeout(function(){
        location.reload();
      },2000);
      notifyAlertMessage.notify("Product updated successfully","alert-sucess");
    },function(error){
      // loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
    });
  }

  $scope.seoUpdate = function(prodData){
    if (prodData["seoModel"].id) {
      processReqFactory.processReq(baseURL.IP+"/seo/"+prodData["seoModel"].id+"/edit","PUT",prodData["seoModel"],function(skudata){
        // $scope.productData['skuProductModels'] = skudata;
        setTimeout(function(){
          location.reload();
        },2000);
        notifyAlertMessage.notify("Product Sku SEO updated successfully","alert-sucess");
      },function(error){
        // loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger");
      });
    }
  }

  $scope.delProductSlot = function(delSlot){
    processReqFactory.processReq(baseURL.IP+"/productSkuDeliverySlot/" + delSlot.id +'/delete',"DELETE",'',function(skudata){
      // $scope.productData['skuProductModels'] = skudata;
      setTimeout(function(){
        location.reload();
      },2000);
      notifyAlertMessage.notify("Product Sku Deleted successfully","alert-sucess");
    },function(error){
      // loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
    });
  }

  $scope.productSkuUpdate = function(prodData){
    if (prodData["seoModel"]) {
      if (prodData["seoModel"].id){
        delete prodData["seoModel"]
      }
    }
    delete prodData['createdDate']
    delete prodData['seoKeyword']
    delete prodData['seoDescription']
    delete prodData['seoTitle']
    delete prodData['productImagesModels']
    delete prodData['deliverySlot']
    delete prodData['newstock']
    delete prodData['stock']
    delete prodData['changeIcon']
    processReqFactory.processReq(baseURL.IP+"/productSku/" + prodData.id +'/edit',"PUT",prodData,function(key,skudata){
      // $scope.productData['skuProductModels'] = skudata;
      setTimeout(function(){
        location.reload();
      },2000);
      notifyAlertMessage.notify("Product Sku updated successfully","alert-sucess");
    },function(error){
      // loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
    });
    // }    
  }


  $scope.createOrUpdateProductStock = function(response){
    response['newstock']['batch'] = {};
    response['newstock']['batch']['id'] = response['newstock']['batchId'];
    response['newstock']['productSkuId'] = response['id'];
    response['newstock']['expiryDate'] = response['newstock']['expiryDate'].split('/')[2]+'-'+response['newstock']['expiryDate'].split('/')[0]+'-'+response['newstock']['expiryDate'].split('/')[1];;
    response['newstock']['companyBranchId'] = JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'];
    delete response['newstock']['batchId']
    // delete response['newstock']['expiryDate']
    console.log(response);
    processReqFactory.processReq(baseURL.IP+"/productSkuBranchBatchStockPoint/create","POST",response['newstock'],function(dataresponse){
      loadingView.startLoading('hide');
      // var response = response;
      notifyAlertMessage.notify("Product stock creation successfully","alert-sucess")

      if (dataresponse['id']) {
        // $state.go('catalogue.productlist');
        location.reload();
      }
      // $state.go('product.productcreation')
    },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }
}


function skuproductCreationController($scope, $stateParams, processReqFactory,baseURL,loadingView,notifyAlertMessage){


    processReqFactory.processReq(baseURL.IP+"/product/all","GET",'',function(response){
      $scope.productsList = response;
    },function(error){
        loadingView.startLoading('hide');
        //$rootScope.show_load = false;
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });

     //  batch list
  processReqFactory.processReq(baseURL.IP+"/batch/all?cid="+JSON.parse(sessionStorage.getItem('sessionOn'))['companyId'],"GET",'',function(data){
      $scope.batchSkuArray = data;
    },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });

  $scope.uomList = function(){
    var unitOfMeasurementUrl = baseURL.IP+"/unitOfMeasurement/all"
      processReqFactory.processReq(unitOfMeasurementUrl,"GET",'',function(data){
        $scope.uomArray = data
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }();

  $scope.taxGroupList = function(){
    var taxGroupUrl = baseURL.IP+"/taxGroup/all"
      processReqFactory.processReq(taxGroupUrl,"GET",'',function(data){
        $scope.taxGroupArray = data
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }();
  $scope.goBack = function(){
      window.history.back();
  }
  $scope.hsnCodeList = function(){
    var hsnCodeUrl = baseURL.IP+"/hsnCode/all"
      processReqFactory.processReq(hsnCodeUrl,"GET",'',function(data){
        $scope.hsnCodeArray = data
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }();


  $scope.skuVarientsArray = []
  $scope.getAttrVarients = function(){
    if($scope.skuProductNewObj.attrType){
      var final_diff = '';
      function arr_diff (a1, a2) {
        var a = [], diff = [];
          for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
          }
          for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
          }
          for (var k in a) {
            diff.push(k);
          }
          final_diff = diff;
        return final_diff;
        
      }
      if($scope.skuVarientsArray.length > 0){
        if($scope.skuProductNewObj.selectedAttrVal.length > $scope.skuVarientsArray.length){
          var oldArray = $scope.skuProductNewObj.selectedAttrVal.map(function(item){
            return item;
          })
          var newArray = $scope.skuVarientsArray.map(function(item){
            return item.attrValue;
          })
          arr_diff(oldArray,newArray)
          if(final_diff[0]){
            for(var indx=0; indx < $scope.skuProductNewObj.selectedAttrVal.length;indx++){
              if($scope.skuProductNewObj.selectedAttrVal[indx] == final_diff[0]){
                var sampObj = {
                  "attrValue" : $scope.skuProductNewObj.selectedAttrVal[indx]
                }
                $scope.skuVarientsArray.push(sampObj);
              }
            }
          }
        }else if($scope.skuProductNewObj.selectedAttrVal.length < $scope.skuVarientsArray.length){
          var oldArray = $scope.skuProductNewObj.selectedAttrVal.map(function(item){
            return item;
          })
          var newArray = $scope.skuVarientsArray.map(function(item){
            return item.attrValue;
          })
          arr_diff(oldArray,newArray)
          if(final_diff[0]){
            for(var vIndx=0; vIndx < $scope.skuVarientsArray.length;vIndx++){
              if(final_diff[0] == $scope.skuVarientsArray[vIndx].attrValue){
                $scope.skuVarientsArray.splice(vIndx,1)
              }
            }
          }
        }
      }else{
        var sampObj = {
          "attrValue" : $scope.skuProductNewObj.selectedAttrVal[0]
        }
        $scope.skuVarientsArray.push(sampObj);
      }
    }else{
      $scope.skuProductNewObj.selectedAttrVal = [];
      notifyAlertMessage.notify("Select Attribute","alert-warning")
    }
  }

  $scope.variantImage = function(el,index,Type){

    var imageType = el.files[0].type;
    var imgType = imageType.substring(0,5);
    var formData = new FormData();
    formData.append('file', el.files[0]);
    formData.append('entityType','productsku');

    loadingView.startLoading('show');

    if(imgType == "image"){
      $.ajax({
        type: "POST",
        url: baseURL.IP +'/uploadfile/image',
        data:formData,
        headers: {'Authorization': 'Bearer '+sessionStorage.getItem('token')},
        processData: false,
        contentType: false,
        success: function(response) {
          loadingView.startLoading('hide');
          var responseData = response['uploadStatus'].split(':::')[0];
          notifyAlertMessage.notify(response['uploadStatus'].split(':::')[1],"alert-sucess");
          if (responseData == 'SUCCESS') {
            $scope.skuVarientsArray[index.split('_')[1]]['imageModels'] = [];

            for(var im in response['imageModels']){
              var skuImage = {
                "imageFolder": response['imageModels'][im]['imageFolder'],
                "imageName": response['imageModels'][im]['imageName'],
                "imageType": response['imageModels'][im]['imageType'],
                "orderOfPlace": index.split('_')[1],
                "imageurl": response['imageModels'][im]['imageFolder']+'/'+response['imageModels'][im]['imageName'],
                "isActive": 'true',
              }
              $scope.skuVarientsArray[index.split('_')[1]]['imageModels'].push(skuImage);
            }
          }
          console.log(response)
        },error: function(){
          loadingView.startLoading('hide');
          notifyAlertMessage.notify("Image Not Uploaded","alert-danger")
        }
      });
    }
  }


  $scope.createSkuProduct = function(){
    var skuprodObj = {
      
    }
    if ($scope.skuProductNewObj) {
      // skuprodObj.skuProductModels = []
      if($scope.skuVarientsArray.length>0){
        for(var vaIndx=0; vaIndx < $scope.skuVarientsArray.length;vaIndx++){
          var skuProductObj = {
            "name": $scope.skuVarientsArray[vaIndx].name,
            "productId": $scope.skuProductNewObj.productId,
            "skuCode": $scope.skuVarientsArray[vaIndx].skuCode,
            "barcode": $scope.skuVarientsArray[vaIndx].barcode,
            "hsnCode": $scope.skuVarientsArray[vaIndx].hsnCode,
            "taxGroupId": $scope.skuVarientsArray[vaIndx].taxGroupId,
            "activeBatch": $scope.skuVarientsArray[vaIndx].activeBatch,
            "mrp": $scope.skuVarientsArray[vaIndx].mrp,
            "sellingPrice": $scope.skuVarientsArray[vaIndx].sellingPrice,
            "uomId": $scope.skuVarientsArray[vaIndx].uomId,
            "description": $scope.skuVarientsArray[vaIndx].uomId.description,
            "quantity": $scope.skuVarientsArray[vaIndx].quantity,
            "isStockable": $scope.skuVarientsArray[vaIndx].is_stockable,
            "isEcommerceVisible": $scope.skuVarientsArray[vaIndx].is_ecommerce_visible,
            "measurableType": $scope.skuVarientsArray[vaIndx].measurable_type,
            "isPosVisible": $scope.skuVarientsArray[vaIndx].isPosVisible,
            "isActive": true,
            "description": $scope.skuVarientsArray[vaIndx].description,
            "disclaimer": $scope.skuVarientsArray[vaIndx].disclaimer,
            "shortDescription": $scope.skuVarientsArray[vaIndx].shortDescription,
            "isMultipleUnit": $scope.skuVarientsArray[vaIndx].isMultipleUnit,
            "isTaxInclude": $scope.skuVarientsArray[vaIndx].isTaxInclude,
            "keywords": $scope.skuVarientsArray[vaIndx].keywords,
            "companyId": JSON.parse(sessionStorage.getItem('sessionOn'))['companyId'],
            "isCarrybag": $scope.skuVarientsArray[vaIndx].isCarrybag,
            "maxBuyableUnits": parseInt($scope.skuVarientsArray[vaIndx].maxBuyableUnits),
            "seoModel":{
              "seoDescription": $scope.skuVarientsArray[vaIndx].seoTitle,
              "seoKeyword": $scope.skuVarientsArray[vaIndx].seoKeyword,
              "seoTitle": $scope.skuVarientsArray[vaIndx].seoDescription,
            },
            "productImagesModels": $scope.skuVarientsArray[vaIndx]['imageModels']
          }
          skuProductObj.productAttributeModels = [];
          for(var sav in $scope.skuProductNewObj['selectedAttrVal']){
            if ($scope.skuVarientsArray[vaIndx].attrValue == $scope.skuProductNewObj['selectedAttrVal'][sav]) {
              skuProductObj.productAttributeModels.push({'attributeName': $scope.skuProductNewObj.attrType, 'attributeValue': $scope.skuProductNewObj['selectedAttrVal'][sav], 'attributeType': 'VARIANT', 'isActive': true })
            }
          }
          // skuprodObj.skuProductModels.push(skuProductObj);    
        }
      }else{
        notifyAlertMessage.notify("Please add atleast one varient","alert-warning")
        return false;
      }
    }else{
      notifyAlertMessage.notify("Please select product","alert-warning")
      return false;
    }
    console.log(skuProductObj);
    processReqFactory.processReq(baseURL.IP+"/productSku/create","POST",skuProductObj,function(key,response){
      loadingView.startLoading('hide');
      // var response = response;
      notifyAlertMessage.notify("Product creation successfully","alert-sucess")

      if (key['id']) {
        // $state.go('catalogue.productlist');
        location.reload();
      }
      // $state.go('product.productcreation')
    },function(error){
      loadingView.startLoading('hide');
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }


  $scope.productsSkuSearch =  function(search,index,oindex){
    $('.product_sku_list').removeClass('hide');
    if (search.length==0) {
      $('.product_sku_list').addClass('hide');
    }
  }

  $scope.selectedSkuProduct = function(prod){
    $scope.skuProductNewObj.productId = prod.id;
    $scope.skuProductNewObj.productName = prod.name;
    $('.product_sku_list').addClass('hide');
  }

}

function productPriceController($scope, $stateParams, processReqFactory, baseURL, loadingView, notifyAlertMessage, filterLink){


    processReqFactory.processReq(baseURL.IP+"/category/all","GET",'',function(data){
        $scope.productcategoryArray = data
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });

    processReqFactory.processReq(baseURL.IP+"/brand/all","GET",'',function(data){
        $scope.productbrandArray = data
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });

    processReqFactory.processReq(baseURL.IP+"/companybranch/all","GET",'',function(data){
        $scope.productBranchArray = data;
        $scope.productBranchArray.push({'id': 'ALL','entityName': 'ALL'});
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });

  var formLink = [];  
  $scope.applyPriceFilter = function(){

    var orderUrl = '';
    for(rd in $scope.priceFilter){
      if(rd&&$scope.priceFilter[rd]){
        if (rd=='fd' || rd=='td') {
          $scope.priceFilter[rd] = $scope.priceFilter[rd].split('/')[2]+'-'+$scope.priceFilter[rd].split('/')[0]+'-'+$scope.priceFilter[rd].split('/')[1];
        }
        formLink.push(rd+'='+$scope.priceFilter[rd]);
      }
    }

    formLink.push('cbid='+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']);
    orderUrl += filterLink.getLink(formLink)

    processReqFactory.processReq(baseURL.IP+"/productSku/prices"+orderUrl,"GET",'',function(response){
      $scope.productPriceFilterJSON = response;
    },function(error){
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }


  $scope.applyPriceUpdate = function(){
    // console.log($scope.productPriceFilterJSON);
    var skuProductPriceUpdate = {};
    skuProductPriceUpdate["priceModels"] = [];

    for(var ppf in $scope.productPriceFilterJSON){
      if ($scope.productPriceFilterJSON[ppf]['branchIds']) {
        var ppObj = {
          "branchIds": $scope.productPriceFilterJSON[ppf]['branchIds'].indexOf('ALL')>=0? $scope.moreBranchId(ppf) : $scope.productPriceFilterJSON[ppf]['branchIds'],
          "mrp": $scope.productPriceFilterJSON[ppf]['mrp'],
          "productSkuId": $scope.productPriceFilterJSON[ppf]['id'],
          "sellingPrice": $scope.productPriceFilterJSON[ppf]['sellingPrice']
        }
        skuProductPriceUpdate["priceModels"].push(ppObj);
      }
    }

    console.log(skuProductPriceUpdate);

    processReqFactory.processReq(baseURL.IP+"/productprice/bulk/update","PUT",skuProductPriceUpdate,function(response){
      if(response.length>0){
        notifyAlertMessage.notify("Product price update successfully","alert-sucess");

        setTimeout(function(){
          location.reload();
        },2000)
      }
    },function(error){
      notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }


  $scope.moreBranchId = function(indx){
    delete $scope.productPriceFilterJSON[indx]['branchIds']
    $scope.productPriceFilterJSON[indx]['branchIds'] = [];
    for(var bids in $scope.productBranchArray){
      if ($scope.productBranchArray[bids].id!='ALL') {
        $scope.productPriceFilterJSON[indx]['branchIds'].push($scope.productBranchArray[bids]['id'])
      }
    }

    return $scope.productPriceFilterJSON[indx]['branchIds']
  }
}



angular
  .module('distapp')
  // .value('ip','http://172.105.38.210:8080')
  .controller('productListController',productListController)
  .controller('productCreationController',productCreationController)
  .controller('productViewUpdateController',productViewUpdateController)
  .controller('singleProductUpdationController',singleProductUpdationController)
  .controller('skuproductCreationController',skuproductCreationController)
  .controller('productPriceController',productPriceController);
