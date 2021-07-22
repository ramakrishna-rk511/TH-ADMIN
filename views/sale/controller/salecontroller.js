function saleInvoiceListController($rootScope, $scope, $http, baseURL, processReqFactory, dataTablesInitService, loadingView) {
	
	processReqFactory.processReq(baseURL.IP+"/saleInvoice/all","GET",'',function(response){
        loadingView.startLoading('hide');
        //$rootScope.show_load = false;
        var columns = [
        { "data": "name" },
        { "data": "isActive" },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-success btn-xs" ng-click=\"addOrUpdateSaleInvoice(\''+data+'\')\">View</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#brandTable','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        //$rootScope.show_load = false;
        // notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });
}


function dailyLogsController($rootScope, $scope, $http, baseURL, processReqFactory, dataTablesInitService, loadingView, filterLink){
  $scope.submitDailyLogs = function(dailyObj){
    loadingView.startLoading('show');
    if (dailyObj.fd.search('/')>0 && dailyObj.td.search('/')>0) {
        var formLink = [];
        var orderUrl = '';
        for(rd in dailyObj){
         if(rd&&dailyObj[rd]){
           if (rd=='fd' || rd=='td') {
             dailyObj[rd] = dailyObj[rd].split('/')[2]+'-'+dailyObj[rd].split('/')[0]+'-'+dailyObj[rd].split('/')[1];
           }
           formLink.push(rd+'='+dailyObj[rd]);
         }
        }
        formLink.push('branch='+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']);


        orderUrl += filterLink.getLink(formLink);
      processReqFactory.processReq(baseURL.IP+"/posSession/sale"+orderUrl,"GET",'',function(response){
            loadingView.startLoading('hide');
        var columns = [
          { "data": "cashierUserName" },
          { "data": "openingBalance" },
          { "data": "closingBalance" },
          { "data": "", 
            "render": function(data, type, row, meta) {
                return parseFloat(row.closingBalance) - parseFloat(row.openingBalance)
            }
          },
          { "data": "sessionOpenTime" },
          { "data": "sessionCloseTime", 
             "render": function(data, type, row, meta) {
                return data ? data : '---'
            }
          },
          { "data": "adjustmentAmount" },
          { "data": "id",
            "orderable": false,
            "searchable": false,   
            "render": function(data,type,row,meta) {
              var a = '<a class="rd dtview btn btn-success btn-xs" href="./#/sale/singledailylogs/'+row.cashierUserName+'/'+data+'">View</a>'
              return a;
            }
          }
        ];
        dataTablesInitService.initDataTables(response,columns,'#dailyLogsList','' ,$scope);
      },function(error){
            loadingView.startLoading('hide');
      });

    }else{
       dailyObj.fd = '';
       dailyObj.td = '';
       notifyAlertMessage.notify("Something went Wrong","alert-danger")
    }
  }
}


function dailyLogsViewController($rootScope, $scope, $http, baseURL, processReqFactory, loadingView, filterLink, $stateParams){
  $scope.cashierName = $stateParams.logName;
  loadingView.startLoading('show');
  processReqFactory.processReq(baseURL.IP+"/posSessionDenomination/all?possid="+$stateParams.logId,"GET",'',function(response){
    
    var sessionObj = {};
    for(var sd in response){
      if(sessionObj[response[sd].sessionDenominationType]==undefined){
        sessionObj[response[sd].sessionDenominationType] = {};
        sessionObj[response[sd].sessionDenominationType]['status'] = response[sd].sessionDenominationType;
        sessionObj[response[sd].sessionDenominationType]['list'] = [];
        sessionObj[response[sd].sessionDenominationType]['amount'] = 0;
      }

      response[sd]['calAmount'] = (parseFloat(response[sd]['denominationAmount']) * parseFloat(response[sd]['units']))
      sessionObj[response[sd].sessionDenominationType]['amount'] += (parseFloat(response[sd]['denominationAmount']) * parseFloat(response[sd]['units']))

      sessionObj[response[sd].sessionDenominationType]['list'].push(response[sd]);
    }

    $scope.sessionDenominationList = sessionObj;

    console.log($scope.sessionDenominationList);

        loadingView.startLoading('hide');
  },function(error){
        loadingView.startLoading('hide');
  });
}



angular
  .module('distapp')
  .controller('saleInvoiceListController', saleInvoiceListController)
  .controller('dailyLogsController', dailyLogsController)
  .controller('dailyLogsViewController', dailyLogsViewController)