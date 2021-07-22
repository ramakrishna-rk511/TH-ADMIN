
/*Tax Rate Controller*/
function taxController($rootScope, $scope, $http, $modal, baseURL, notifyAlertMessage,processReqFactory,dataTablesInitService,loadingView){
  $scope.getTaxRateList = function(){
    loadingView.startLoading('show');
      processReqFactory.processReq(baseURL.IP+"/taxRate/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        { "data": "name" },
        { "data": "rate" },
        { "data": "isActive" },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateTaxRate(\''+data+'\')\">VIEW</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#taxRateTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  }
  
  // for add and update tax rate modal
  $scope.addOrUpdateTaxRate = function(id){
    $scope.updateSave = (id?false:true);
    loadingView.startLoading('show');
      if($scope.updateSave == false){
        var url = baseURL.IP+"/taxRate/"+id
          processReqFactory.processReq(url,"GET",'',function(data){
            loadingView.startLoading('hide');
            data.isActive = data.isActive + '';
            $scope.taxRateData = data
          $scope.modalInstance = $modal.open({
            templateUrl: 'views/settings/addTaxRateModalTemplate.html',
            controller: ModalInstanceCtrl,
            size: 'md',
            scope:$scope
          });
        },function(error){
          loadingView.startLoading('hide');
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
      	loadingView.startLoading('hide');
        $scope.taxRateData = {}
        $scope.modalInstance = $modal.open({
          templateUrl: 'views/settings/addTaxRateModalTemplate.html',
          controller: ModalInstanceCtrl,
          size: 'md',
          scope:$scope
        });
      }
  }

  $scope.createUpdateTaxRate = function(data){
    $scope.taxRateData = data;
    $scope.taxRateData.isActive = JSON.parse(data.isActive);
    var url = baseURL.IP + (data.id?"/taxRate/"+data.id+"/edit":"/taxRate/create")
    var method = (data.id?"PUT":"POST")
      processReqFactory.processReq(url,method,$scope.taxRateData,function(response){
        loadingView.startLoading('hide');
        var response = response;
        var alertMessage = (data.id?"Tax Rate updated ":"Tax Rate created ")
        notifyAlertMessage.notify(alertMessage + " successfully","alert-sucess")
        setTimeout(function(){
          location.reload();
        },1000);
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  }

// }

// function taxGroupController($rootScope,$scope,$http,$modal,baseURL,ip,notifyAlertMessage,processReqFactory,dataTablesInitService,loadingView){
  $scope.taxGroupData = {};
  // $scope.getTaxGroupList = function(){
    loadingView.startLoading('show');
      processReqFactory.processReq(baseURL.IP+"/taxGroup/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        { "data": "taxGroupName" },
        { "data": "amountType",
          "render": function(data,type,row,meta){
            return data=='p'?'PERCENTAGE': 'AMOUNT'
          }
        },
        { "data": "isActive" },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-success btn-xs" ng-click=\"editViewTaxGrop(\''+data+'\')\">View</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#taxGroupTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  // }

  $scope.taxGroupData.isSlabBased = 'NO';
  $scope.taxGroupData.amountType = 'p';
  $scope.slabsArray = []
    
  $scope.addSlab = function(){
    var slabObj = {
      "amountFrom" : '',
      "amountTo" : '',
      "cgst" : '',
      "sgst" : '',
      "igst" : '',
      "cess" : ''
    }
    $scope.slabsArray.push(slabObj)
  }
  $scope.addSlab();

  $scope.removeSlab = function(indx){
    $scope.slabsArray.splice(indx,1)
  }

  processReqFactory.processReq(baseURL.IP+"/taxRate/all","GET",'',function(response){
      $scope.taxRateList = response
  },function(error){
    loadingView.startLoading('hide');
    notifyAlertMessage.notify("Something went Wrong","alert-danger")
  });
  $scope.addTaxGroupModalTemplate = function(){
    // $scope.modalInstance = $modal.open({
    //   templateUrl: 'views/settings/addTaxGroupModalTemplate.html',
    //   controller: ModalInstanceCtrl,
    //   size: 'lg',
    //   scope: $scope
    // });
    $('#addTaxGroupModal').appendTo('body').modal();
  };

  $scope.modalClose = function(){
    $('#addTaxGroupModal').modal('hide');
  }

  $scope.editViewTaxGrop = function(id){
    $scope.updateSave = false;
    loadingView.startLoading('show');
      processReqFactory.processReq(baseURL.IP+"/taxGroup/"+id,"GET",'',function(data){
        loadingView.startLoading('hide');
        $scope.taxGroupData = data;
        $scope.taxGroupData['isSlabBased'] = data['isSlabBased']==true?'YES':'NO';
        $scope.updateSave = false;

      $('#addTaxGroupModal').appendTo('body').modal();
      
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  }

  $scope.createTaxGroup = function(groupData){
    var taxGroupDataObj = {
      "taxGroupName" : groupData.taxGroupName,
      "isActive" : groupData.isActive,
      "isSlabBased" : groupData.isSlabBased== 'YES'? true: false,
      "amountType" : groupData.amountType
    }
    taxGroupDataObj.taxGroupRateModels = [];
    if(groupData.isSlabBased == 'YES' && $scope.slabsArray.length>0){
      for(var indx=0; indx < $scope.slabsArray.length;indx++){
        var slabBaseObj = {
          "taxRateId" : $scope.slabsArray[indx].taxRateId,
          "isActive" : $scope.slabsArray[indx].isActive,
          "isOptional" : $scope.slabsArray[indx].isOptional,
        }
        taxGroupDataObj.taxGroupRateModels.push(slabBaseObj)
      }
    }else{
      if (groupData.cgst) {
        taxGroupDataObj.taxGroupRateModels.push({'taxRateId': groupData.cgst,"isOptional": false,"isActive": true});
      }
      if (groupData.sgst) {
        taxGroupDataObj.taxGroupRateModels.push({'taxRateId': groupData.sgst,"isOptional": false,"isActive": true});
      }
      if (groupData.igst) {
        taxGroupDataObj.taxGroupRateModels.push({'taxRateId': groupData.igst,"isOptional": true,"isActive": true});
      }
      if (groupData.cess) {
        taxGroupDataObj.taxGroupRateModels.push({'taxRateId': groupData.cess,"isOptional": false,"isActive": true});
      }
    }
    taxGroupDataObj.isActive = JSON.parse(taxGroupDataObj.isActive);

    if (groupData.id) {
      taxGroupDataObj['id'] = groupData.id;
      for(var tgm in groupData.taxGroupRateModels){
        groupData.taxGroupRateModels[tgm]['id'] = groupData.taxGroupRateModels[tgm]['id'];
        groupData.taxGroupRateModels[tgm]['taxRateId'] = groupData.taxGroupRateModels[tgm]['taxRateModel']['id'];
        // taxGroupDataObj['taxGroupRateModels'].push(groupData.taxGroupRateModels[tgm])
        delete groupData.taxGroupRateModels[tgm]['taxRateModel']
      }
      if (groupData.taxGroupRateModels.length>1) {
        taxGroupDataObj['taxGroupRateModels'] = groupData.taxGroupRateModels;
      }
      // console.log(taxGroupDataObj)
      processReqFactory.processReq(baseURL.IP+"/taxGroup/"+groupData.id+"/edit","PUT",taxGroupDataObj,function(response){
        loadingView.startLoading('hide');
        // var response = response;
        notifyAlertMessage.notify("Tax Group updated successfully","alert-sucess")
        setTimeout(function(){
          location.reload();
        },2000);
      },function(error){
        loadingView.startLoading('hide');
      });
    }else{
      processReqFactory.processReq(baseURL.IP+"/taxGroup/create","POST",taxGroupDataObj,function(response){
        loadingView.startLoading('hide');
        // var response = response;
        notifyAlertMessage.notify("Tax Group created successfully","alert-sucess")
        setTimeout(function(){
          location.reload();
        },2000);
      },function(error){
        loadingView.startLoading('hide');
      });
    }
  }


  $scope.deleteTaxGroupRate = function(id,indx){
    processReqFactory.processReq(baseURL.IP+"/taxGroupRate/delete/"+id,"DELETE",'',function(response){
      loadingView.startLoading('hide');
      // var response = response;
      notifyAlertMessage.notify("Tax Group Rate deleted successfully","alert-sucess");
      // setTimeout(function(){
      //   location.reload();
      // },2000);
      // $('#addTaxGroupModal').appendTo('body').modal('hide');

      delete $scope.taxGroupData.taxGroupRateModels[indx]
      // $scope.$apply();
    },function(error){
      loadingView.startLoading('hide');
    });
  }
// }
// function taxHsnController($rootScope,$scope,$http,$modal,baseURL,ip,notifyAlertMessage,processReqFactory,dataTablesInitService,loadingView){
  $scope.hsnCodeData = {};
  $scope.getHsnCodeList = function(){
    loadingView.startLoading('show');
      processReqFactory.processReq(baseURL.IP+"/hsnCode/all","GET",'',function(response){
        loadingView.startLoading('hide');
        var columns = [
        { "data": "hsncode" },
        { "data": "isActive" },
        { "data": "isActive" },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-success btn-xs" ng-click=\"addOrUpdateHsnCode(\''+data+'\')\">View</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#hsnCodeTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  }

  $scope.hsnTaxGrpList = function(){
    var taxGrpUrl = baseURL.IP+"/taxGroup/all"
      processReqFactory.processReq(taxGrpUrl,"GET",'',function(data){
        $scope.taxGrpArray = data
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
  }

  $scope.addOrUpdateHsnCode = function(id){
    $scope.updateSave = (id?false:true);
    loadingView.startLoading('show');
      if($scope.updateSave == false){
        var url = baseURL.IP+"/hsnCode/"+id
          processReqFactory.processReq(url,"GET",'',function(data){
            loadingView.startLoading('hide');
            data.isActive = data.isActive + '';
            $scope.hsnCodeData = data
            $scope.hsnCodeData.taxGroupId = data.taxGroupId
          $scope.modalInstance = $modal.open({
            templateUrl: 'views/settings/addHSNCodeModalTemplate.html',
            controller: ModalInstanceCtrl,
            size: 'md',
            scope:$scope
          });
        },function(error){
          loadingView.startLoading('hide');
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
      	 loadingView.startLoading('hide');
        $scope.hsnCodeData = {}
        $scope.modalInstance = $modal.open({
          templateUrl: 'views/settings/addHSNCodeModalTemplate.html',
          controller: ModalInstanceCtrl,
          size: 'md',
          scope:$scope
        });
      }
  }

  $scope.createOrUpdateHsnCode = function(data){
    $scope.hsnCodeData = data;
    $scope.hsnCodeData.isActive = JSON.parse(data.isActive);
    var url = baseURL.IP + (data.id?"/hsnCode/"+data.id+"/edit":"/hsnCode/create")
    var method = (data.id?"PUT":"POST")
      processReqFactory.processReq(url,method,$scope.hsnCodeData,function(response){
        loadingView.startLoading('hide');
        var response = response;
        var alertMessage = (data.id?"HSN Code updated ":"HSN Code created ")
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
angular
  .module('distapp')
  .controller('taxController',taxController)
  // .controller('taxGroupController',taxGroupController)
  // .controller('taxHsnController',taxHsnController)