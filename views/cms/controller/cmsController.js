function cmsController($scope, $rootScope, processReqFactory, baseURL, bootstrapWizard, notifyAlertMessage, $stateParams, loadingView, dataTablesInitService, $state) {
    // bootstrapWizard.wizard('#categorywizard','#categoryForm','2')
    $scope.blockList = [];
    $scope.selectedModelType = "";
    $scope.blockNumber = 0;
    $scope.cms = {};
    $scope.page = {};
    if($stateParams.cmsViewId){
        loadSinglePage();
    }
    if (!JSON.parse(sessionStorage.getItem('sessionOn'))) {
      $state.go('login');
      sessionStorage.setItem('token', '');
      sessionStorage.setItem('sessionOn', JSON.stringify({'sessionId': '', 'status': false, 'branchId': '', 'role': ''}));
    }
    //FOR CMS LIST 
    $scope.getCmsList = function() {
        loadingView.startLoading('show');
        processReqFactory.processReq(baseURL.IP + "/page/all", "GET", '', function(response) {
            loadingView.startLoading('hide');
            var columns = [
                {   "data": "name" },
                {   "data": "type" },
                {   "data": "viewPort" },
                {   "data": "id",
                    "orderable": false,
                    "searchable": false,
                    "render": function(data, type, row, meta) {
                        // var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"cmsupdatepageview(\'' + data + '\')\">View</a>'
                        return '<a class="rd dtview btn btn-primary btn-xs" href="./#/cms/cmsviewpage/'+data+'">VIEW</a>';
                        // return a;
                    }
                }
            ];
            dataTablesInitService.initDataTables(response, columns, '#cmsList', '', $scope);
        }, function(error) {
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong", "alert-danger")
        });
    }


    function loadSinglePage(){
         $scope.pageId = $stateParams.cmsViewId

        processReqFactory.processReq(baseURL.IP+"/page/" + $scope.pageId,"GET",'',function(data){
            $scope.page = data;
            $scope.page.isActive = data.isActive + '';
            for(var bl in $scope.page.blockModels){
                $scope.page.blockModels[bl]['place'] = $scope.page.blockModels[bl]['orderOfPlace'];
                for(var bil in $scope.page.blockModels[bl]['blockItemModels']){
                    $scope.page.blockModels[bl]['blockItemModels'][bil]['place'] = $scope.page.blockModels[bl]['blockItemModels'][bil]['orderOfPlace'];
                }
            }
            $scope.blockList = $scope.page.blockModels;
        },function(error){
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
    }

    //BLOCK LAYOUT LIST
    $scope.getBlockLayoutList = function() {
        loadingView.startLoading('show');
        processReqFactory.processReq(baseURL.IP + "/blockLayout/all", "GET", '', function(response) {
            loadingView.startLoading('hide');
            //$rootScope.show_load = false;
            var columns = [
                {   "data": "name" },
                {   "data": "code" },
                {   "data": "viewPort" },
                {   "data": "isActive",
                    "render": function(data, type, row, meta) {
                        return (data == true) ? 'ACTIVE' : 'INACTIVE'
                    }
                },
                {
                    "data": "id",
                    "orderable": false,
                    "searchable": false,
                    "render": function(data, type, row, meta) {
                        var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addorupdateblocklayout(\'' + data + '\')\">View</a>'
                        return a;
                    }
                }
            ];
            dataTablesInitService.initDataTables(response, columns, '#blockLayoutList', '', $scope);
        }, function(error) {
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong", "alert-danger")
        });
    }

    $scope.showBlockLayoutModal = function() {
        $('#addblock').modal();
        processReqFactory.processReq(baseURL.IP + "/blockLayout/all?vp=MOBILE", "GET", '', function(response) {
            $scope.pageBlockLayoutList = response;
        }, function(error) {});
        // $scope.blockList ="";
    }

    $scope.changeBlockType = function(selectedLayout) {
        $scope.selectedModelType = selectedLayout;
    }

    $scope.loadFiles = function(wizardId,formId){
        bootstrapWizard.wizard(wizardId,formId,'2')
    }

    $scope.cmscreationpageview = function() {
        $state.go("cms.cmscreation");
    }
    $scope.cmsupdatepageview = function(id) {
        $state.go("cms.cmsviewpage");
        processReqFactory.processReq(baseURL.IP+"/page/" + id  ,"GET",'',function(data){
        $scope.page = data;
        $scope.page.isActive = data.isActive + '';
        $scope.blockList = $scope.page.blockModels;
        }, function(error) {});

    }
    
    $scope.selectImg = function(blockno,blockItemNo){
        var uploadFile = angular.element(document.querySelector('#cms_'+blockno+'_'+blockItemNo))
        uploadFile.click();
    }

    $scope.addBlockToPage = function(selectedLayout) {
        var singleblock = {};
        singleblock["blockType"] = $scope.selectedModelType;
        singleblock["blockCode"] = $scope.selectedModelType;
        singleblock["orderOfPlace"] = $scope.blockList.length;
        // singleblock["orderOfPlace"] = $scope.blockNumber;
        singleblock["isActive"] = true;
        singleblock["blockItemModels"] = [];
        singleblock["blockItemModels"].push({'orderOfPlace': 1,'place': 1});
        // singleblock['imageModels'] = [];
        $scope.blockNumber = $scope.blockNumber + 1;
        $scope.blockList.push(singleblock);
        $('#addblock').modal('hide');
    }

    $scope.addorupdateblocklayout = function(id) {
        delete $scope.blockLayoutCreationObj;
        processReqFactory.processReq(baseURL.IP + "/blockLayout/all", "GET", '', function(response) {
            $scope.blockLayoutList = response;
        }, function(error) {});

        if (id) {
            processReqFactory.processReq(baseURL.IP + "/blockLayout/" + id, "GET", '', function(response) {
                $scope.blockLayoutCreationObj = response;
                $('#addBlockLayoutModal').modal();
            }, function(error) {
                notifyAlertMessage.notify("Something went Wrong", "alert-danger")
            });
        } else {
            $('#addBlockLayoutModal').modal();
        }
    }

    $scope.addBlockLayout = function(blocklayoutObj) {
        if (blocklayoutObj.id) {
            processReqFactory.processReq(baseURL.IP + "/blockLayout/" + blocklayoutObj.id + "/edit", "PUT", blocklayoutObj, function(response) {

                notifyAlertMessage.notify("Company Branch Updated Successfully", "alert-danger");
                setTimeout(function() {
                    location.reload();
                }, 2000);
            }, function(error) {
                notifyAlertMessage.notify("Something went Wrong", "alert-danger")
            });
        } else {
            // blocklayoutObj['franchiseCompanyId'] = blocklayoutObj['companyId'];
            processReqFactory.processReq(baseURL.IP + "/blockLayout/create", "POST", blocklayoutObj, function(key, response) {
                notifyAlertMessage.notify("Block Layout Created Successfully", "alert-danger");
                setTimeout(function() {
                    // location.reload();
                    $scope.getBlockLayoutList();
                    $('#addBlockLayoutModal').modal("hide");
                }, 2000);
            }, function(error) {
                if (error.status == 401) {
                    $state.go('login');
                }
            });
        }
    }

    
    $scope.blocklayout = function() {
        $state.go("cms.blocklayout");
    }

    $scope.variantImage = function(el, index, Type, blockNumber, blockItemNumber) {
        var str = blockNumber.split("_");
        blockNumber = str[1];
        blockItemNumber = str[2]
        var bino = blockItemNumber;
        if(blockItemNumber!='header')
        blockItemNumber = blockItemNumber-1;
        var imageType = el.files[0].type;
        var imgType = imageType.substring(0, 5);
        var formData = new FormData();
        formData.append('file', el.files[0]);
        formData.append('entityType', 'cms');
        // console.log(index);

        // loadingView.startLoading('show');

        if (imgType == "image") {
            $.ajax({
                type: "POST",
                url: baseURL.IP + '/uploadfile/image',
                data: formData,
                headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
                processData: false,
                contentType: false,
                success: function(response) {
                    loadingView.startLoading('hide');
                    var responseData = response['uploadStatus'].split(':::')[0];
                    notifyAlertMessage.notify(response['uploadStatus'].split(':::')[1], "alert-sucess");
                    if (responseData == 'SUCCESS') {
                        // $scope.varientsArray[index.split('_')[1]]['imageModels'] = [];
                        var imageUrl = "";
                        var imageFolderUrl = "";
                        for (var im in response['imageModels']) {
                            /*var cmsBlockImg = {
                                "imageFoler": response['imageModels'][im]['imageFolder'],
                                "imageName": response['imageModels'][im]['imageName'],
                                "imageType": response['imageModels'][im]['imageType'],
                                "orderOfPlace": index.split('_')[1],
                                "imageurl": ,
                                "isActive": 'true',
                            }*/
                            imageUrl = response['imageModels'][im]['imageUrl'] + '' + response['imageModels'][im]['imageFolder'] + '/' + response['imageModels'][im]['imageName']
                            imageFolderUrl = response['imageModels'][im]['imageFolder'] + '/' + response['imageModels'][im]['imageName'];
                        }
                    }
                    // blockHeaderAbsoluteImageUrl
                    // imageAbsoluteUrl
                    // blockNumber = blockNumber-1
                    // $("#img_"+blockNumber+"_"+bino).attr("src",imageUrl);
                    if(blockItemNumber!='header'){
                    sendObjectKeyValue(blockNumber,blockItemNumber,"imageUrl",imageFolderUrl);
                    sendObjectKeyValue(blockNumber,blockItemNumber,"imageAbsoluteUrl",imageUrl);
                }
                else{
                    sendObjectKeyValue(blockNumber,blockItemNumber,"blockHeaderImage",imageFolderUrl);
                    sendObjectKeyValue(blockNumber,blockItemNumber,"blockHeaderAbsoluteImageUrl",imageUrl);

                }

                    // console.log(response)
                },
                error: function() {
                    loadingView.startLoading('hide');
                    notifyAlertMessage.notify("Image Not Uploaded", "alert-danger")
                }
            });
        }
    }

    //For Category list 
    loadingView.startLoading('show');
    processReqFactory.processReq(baseURL.IP+"/category/all","GET",'',function(data){
        loadingView.startLoading('hide');
        $scope.categoryData = data;
    });
    //For Custom Page list 
    loadingView.startLoading('show');
    processReqFactory.processReq(baseURL.IP+"/page/all","GET",'',function(data){
        loadingView.startLoading('hide');
        $scope.customPageData = data;
    });

    //For Single Block Grid 

    $scope.initializeBlock = function(blockNumber, blockItemCount) {
        if($scope.pageId==undefined || $scope.pageId==null){
        var singleBlock = $scope.blockList[blockNumber];
        singleBlock["blockItemModels"] = [];

        for (var i = 0; i < blockItemCount; i++) {
            singleBlock["blockItemModels"].push({});
        }
        $scope.blockList[blockNumber] = singleBlock;
        }
    }

    $scope.addOption = function(selectedBlockNumber, selectedBlockItemNumber) {
        // $scope.cms = {};
        if(selectedBlockItemNumber!="header"){
        $scope.selectedBlockNumber = selectedBlockNumber;
        $scope.selectedBlockItemNumber = selectedBlockItemNumber - 1;
        if($scope.blockList){
        $scope.cms = $scope.blockList[selectedBlockNumber]['blockItemModels'][$scope.selectedBlockItemNumber];
        $scope.cms.clickable = JSON.stringify($scope.cms.isClickable);
        if($scope.cms.criteriaModels!=null && $scope.cms.criteriaModels.length > 0){
        $scope.cms.category = $scope.cms.criteriaModels[0].keyValue;
        delete $scope.cms.criteriaModels;
        delete $scope.cms.isClickable;
    }
        }
        $('#addOptionModal').modal();

    }
    }

    //FOR UPDATING BLOCK ITEM

    $scope.updateBlockItemSetting = function(cms) {
        var blockNumber = $scope.selectedBlockNumber;
        var blockItemNumber = $scope.selectedBlockItemNumber;
        var singleBlock = $scope.blockList[blockNumber];
        var singleBlockItem = $scope.blockList[blockNumber]["blockItemModels"][blockItemNumber];
        if(cms.clickable)
        singleBlockItem["isClickable"] = JSON.parse(cms.clickable);
        if(cms.name)
        singleBlockItem["name"] = cms.name;
        if(cms.blockText)
        singleBlockItem["blockText"] = cms.blockText;
        singleBlockItem["onClickTarget"] = cms.onClickTarget;
        singleBlockItem["orderOfPlace"] = blockItemNumber;
        singleBlockItem["isActive"] = true;
        if(cms.onClickTarget=="CATEGORYPAGE"){
            singleBlockItem["criteriaString"] = cms.category
        }
        if(cms.onClickTarget=="CUSTOMPAGE"){
            singleBlockItem["criteriaString"] = cms.category
        }
        if(cms.onClickTarget == "SINGLEPAGE"){
            singleBlockItem["criteriaString"] = $scope.selectedCriteriaString;
        }
        delete singleBlockItem["criteriaModels"];
        $scope.blockList[blockNumber]["blockItemModels"][blockItemNumber] = singleBlockItem
        // console.log($scope.blockList);
        $('#addOptionModal').modal('hide');
    }
    function sendObjectKeyValue(blockNumber,blockItemNumber,key,value){

        var singleBlock = $scope.blockList[blockNumber];
        if(blockItemNumber!='header'){
        var singleBlockItem = $scope.blockList[blockNumber]["blockItemModels"][blockItemNumber];
        singleBlockItem[key] = value;
        $scope.blockList[blockNumber]["blockItemModels"][blockItemNumber] = singleBlockItem
    }else{
        $scope.blockList[blockNumber][key] = value;
    }
        
        // $scope.blockList[blockNumber]["blockItemModels"][blockItemNumber]['imageUrl'] = singleBlockItem.imageUrl;

        // console.log($scope.blockList);
    }

    //CMS CREATION 

    $scope.cmsCreation = function(pagedata) {
        $scope.page['blockModels'] = $scope.blockList;
        $scope.page['isActive'] = JSON.parse($scope.page.isActive);


        // console.log(JSON.stringify($scope.page))
        // console.log(JSON.stringify($scope.page))
        // console.log(JSON.stringify($scope.blockList))

        loadingView.startLoading('show');
        processReqFactory.processReq(baseURL.IP+"/page/create","POST",$scope.page,function(key,response){
            loadingView.startLoading('hide');
        notifyAlertMessage.notify("CMS page created","alert-danger");
        // $scope.pageList = response;
        $state.go('cms.cmslist');
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
    }

    $scope.singleProductSearch = function(key){
         $( "#singleProductSearch" ).autocomplete({
      source: function(request,response){
        $.ajax({
            url: baseURL.IP + "/productSku/search/product?key="+key,
            dataType:"json",
            headers:{
                "Accept":"application/JSON"
            },
            success:function(data){
               response(data);
                
            }

        })
    },
      minLength: 2,
      focus: function( event, ui ) {
        $( "#singleProductSearch" ).val( ui.item.productName );
        return false;
      },
      select: function( event, ui ) {
        $scope.spName = ui.item.productName;
        $scope.selectedCriteriaString = "PRODUCT:::"+ui.item.productName+":::"+ui.item.skuId;
        return false;
      }
    }).autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<div>" + item.productName +'( '+ item.brandName+')' + "</div>" )
        .appendTo( ul );
    };
}

    //ADD BLOCK ITEM
    $scope.addBlockItem =function(blockno){
        $scope.blockList[blockno]["blockItemModels"].push({'orderOfPlace': $scope.blockList[blockno]["blockItemModels"].length+1,'place': $scope.blockList[blockno]["blockItemModels"].length+1});
    }
    


    $scope.delblockitem = function(blockNo, itemNo){
        // console.log($scope.blockList[blockNo]["blockItemModels"][itemNo]);
        swal({
          title: 'Are you sure?',
          text: "Are you sure want to Delete?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Close',
          confirmButtonText: 'Yes, '+status+' it!'
        },function(result){
          if (result) {
            var blockItemsList = $scope.blockList[blockNo]["blockItemModels"];

            if(blockItemsList[itemNo]){
                if(blockItemsList[itemNo].id){
                    $scope.blockItemDelete(blockItemsList[itemNo].id,blockNo,itemNo);
                }else{
                    blockItemsList.splice(itemNo,1);

                    $scope.blockList[blockNo]["blockItemModels"] = [];
                    $scope.blockList[blockNo]["blockItemModels"] = blockItemsList;
                    $scope.$apply();
                }
                }else{
                    blockItemsList.splice(itemNo,1);
                    $scope.blockList[blockNo]["blockItemModels"] = blockItemsList;
                }
          }
        })
        
    }
    $scope.deleteBlock = function(blockNo){
        // console.log($scope.blockList[blockNo]["blockItemModels"][itemNo]);
        swal({
          title: 'Are you sure?',
          text: "Are you sure want to Delete?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Close',
          confirmButtonText: 'Yes, '+status+' it!'
        },function(result){
          if (result) {
            var blockList = $scope.blockList;

            if(blockList[blockNo]){
                if(blockList[blockNo].id){
                    $scope.blockDelete(blockList[blockNo].id,blockNo);
                    // blockList.splice(blockNo,1);
                    $scope.$apply();
                }else{
                    blockList.splice(blockNo,1);

                    // $scope.blockList[blockNo] = [];
                    // $scope.blockList[blockNo] = blockList;
                    $scope.blockList = blockList;
                    $scope.$apply();
                }
                }else{
                    blockList.splice(blockNo,1);
                    $scope.blockList[blockNo] = blockList;
                }
          }
        })
        
    }
    // $scope.deleteBlock = function(blockno){

    //     var blockList = $scope.blockList;
    //     if(blockList[blockno].id){
    //         console.log(blockList[blockno].id);
    //     }
    //     blockList.splice(blockNo,1)
    //     $scope.blockList = blockList;
    // }

    //CMS EDIT
    $scope.cmsEdit = function(cms){
        $scope.page['isActive'] = JSON.parse($scope.page['isActive']);
        for(var pm in $scope.page['blockModels']){
            if ($scope.page['blockModels'][pm]['place']>=0) {
                for(var pim in $scope.page['blockModels'][pm]['blockItemModels']){
                    if ($scope.page['blockModels'][pm]['blockItemModels'][pim]['place']>=0) {
                        delete $scope.page['blockModels'][pm]['blockItemModels'][pim]['place']   
                    }
                }
                delete $scope.page['blockModels'][pm]['place']
            }
        }
        loadingView.startLoading('show');
        processReqFactory.processReq(baseURL.IP+"/page/"+$scope.pageId+"/edit","PUT",$scope.page,function(key,response){
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("CMS page Changed","alert-danger");
            $state.go('cms.cmslist');
        },function(error){
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
    }


    // CMS BLOCKITEM DELETE
    $scope.blockItemDelete = function(id,blockNo,itemNo){
        loadingView.startLoading('show');
        processReqFactory.processReq(baseURL.IP+"/blockItems/delete/"+id,"DELETE",'',function(key,response){
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("BLOCKITEM DELETED","alert-danger");
            var blockItemsList = $scope.blockList[blockNo]["blockItemModels"];
            blockItemsList.splice(itemNo,1);
            $scope.blockList[blockNo]["blockItemModels"] = [];
            $scope.blockList[blockNo]["blockItemModels"] = blockItemsList;
            // $state.go('cms.cmslist');
        },function(error){
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
    }

    $scope.blockDelete = function(id,blockNo){
        loadingView.startLoading('show');
        processReqFactory.processReq(baseURL.IP+"/block/delete/"+id,"DELETE",'',function(key,response){
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("BLOCKITEM DELETED","alert-danger");
            var blocksList = $scope.blockList;
            blocksList.splice(blockNo,1);
            $scope.blockList[blockNo] = [];
            $scope.blockList[blockNo] = blocksList;
            // $state.go('cms.cmslist');
        },function(error){
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
    }


    $scope.saveBlocksOrdering = function(blocksData){
        var orderBlocksJson = {};
        for(var obj in blocksData){
            orderBlocksJson[blocksData[obj]['id']] = parseInt(blocksData[obj]['place']);
        }
        
        console.log(orderBlocksJson)
        processReqFactory.processReq(baseURL.IP+"/block/change/order","PUT",orderBlocksJson,function(data){

            loadSinglePage();

        },function(error){
            notifyAlertMessage.notify("Something went Wrong","alert-danger");
        });
    }


    $scope.changeBlockOrder = function(blockno,blockItemNo){
        var orderBlocksItemsJson = {};
        for(var obj in $scope.blockList){
            for(var objI in $scope.blockList[obj]['blockItemModels']){
                orderBlocksItemsJson[$scope.blockList[obj]['blockItemModels'][objI]['id']] = parseInt($scope.blockList[obj]['blockItemModels'][objI]['place']);
            }
        }
        
        console.log(orderBlocksItemsJson)
        processReqFactory.processReq(baseURL.IP+"/blockItems/change/order","PUT",orderBlocksItemsJson,function(data){

            loadSinglePage();

        },function(error){
            notifyAlertMessage.notify("Something went Wrong","alert-danger");
        });
    }


    
}

// function cmsViewUpdateController($scope, $stateParams, bootstrapWizard, processReqFactory, baseURL, loadingView, notifyAlertMessage, $state){
//     $scope.loadFiles = function(){
//         bootstrapWizard.wizard('#cmswizard','#cmsForm','1')
//     }

//     $scope.pageId = $stateParams.cmsviewId

//     processReqFactory.processReq(baseURL.IP+"/page/" + $scope.pageId,"GET",'',function(data){
//         $scope.page = data;
//         $scope.page.isActive = data.isActive + '';
//         $scope.blockList = $scope.page.blockModels;
//     },function(error){
//         loadingView.startLoading('hide');
//         notifyAlertMessage.notify("Something went Wrong","alert-danger")
//     });


// }


angular
    .module('distapp')
    .controller('cmsController', cmsController);
    // .controller('cmsViewUpdateController', cmsViewUpdateController);