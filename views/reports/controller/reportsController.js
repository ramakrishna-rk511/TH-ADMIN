function reportsListController($scope, baseURL, filterLink, processReqFactory, dataTablesInitService){
	var formLink = [];	
	$scope.submitReports = function(rdata){
		var orderUrl = '';
		for(rd in rdata){
			if(rd&&rdata[rd]){
				if (rd=='fd' || rd=='td') {
					rdata[rd] = rdata[rd].split('/')[2]+'-'+rdata[rd].split('/')[0]+'-'+rdata[rd].split('/')[1];
				}
				formLink.push(rd+'='+rdata[rd]);
			}
		}
		formLink.push('branch='+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']);


		orderUrl += filterLink.getLink(formLink)

		processReqFactory.processReq(baseURL.IP+"/sale/sold"+orderUrl,"GET",'',function(response){ 
			dataTablesInitService.initDataTables('','','#reportsTable','',$scope);
			var formLink = [];	
			$scope.reportsObj = {};
	      var columns = [
		      { "data": "productName" },
		      { "data": "barcode" },
		      { "data": "categoryName" },
		      { "data": "brandName" },
		      { "data": "units", 
		         "render": function(data,type,row,meta){
		          return data +' '+ row.unitName
		        }
		      }
		    ];
		    dataTablesInitService.initDataTables(response,columns,'#reportsTable','',$scope);
	    },function(error){
	      notifyAlertMessage.notify("Something went Wrong","alert-danger");
	    });
	}

	$scope.selectOption = function(option){
		if (option=='Brand') {
			processReqFactory.processReq(baseURL.IP+"/brand/all","GET",'',function(response){ 
				$scope.reportsBrandsList = response;
			},function(error){
		      notifyAlertMessage.notify("Something went Wrong","alert-danger");
		    });
	    }

	    if (option=='Category') {
			processReqFactory.processReq(baseURL.IP+"/category/all","GET",'',function(response){ 
				$scope.reportsCategoryList = response;
			},function(error){
		      notifyAlertMessage.notify("Something went Wrong","alert-danger");
		    });
	    }

	  //   if (option=='Brand') {
			// processReqFactory.processReq(baseURL.IP+"/brand/all","GET",'',function(response){ 

			// },function(error){
		 //      notifyAlertMessage.notify("Something went Wrong","alert-danger");
		 //    });
	  //   }
	}
}

function taxReportsListController($scope, baseURL, filterLink, processReqFactory, dataTablesInitService, $state, notifyAlertMessage){
	if (!JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']) {
        sessionStorage.setItem('token', '');
        sessionStorage.setItem('sessionOn', JSON.stringify({'sessionId': '', 'status': false}));
		$state.go('login');
		notifyAlertMessage.notify("Something went Wrong!!! Please Login","alert-danger");
	}
	var formLink = [];	
	$scope.submitReports = function(rdata){
		var orderUrl = '';
		for(rd in rdata){
			if(rd&&rdata[rd]){
				if (rd=='fd' || rd=='td') {
					rdata[rd] = rdata[rd].split('/')[2]+'-'+rdata[rd].split('/')[0]+'-'+rdata[rd].split('/')[1];
				}
				formLink.push(rd+'='+rdata[rd]);
			}
		}
		formLink.push('branch='+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']);


		orderUrl += filterLink.getLink(formLink)

		processReqFactory.processReq(baseURL.IP+"/tax/report"+orderUrl,"GET",'',function(response){ 
			var formLink = [];	
			$scope.reportsObj = {};
	      var columns = [
		      { "data": "productName" },
		      { "data": "barcode" },
		      { "data": "quantity", 
		         "render": function(data,type,row,meta){
		          return data +' '+ row.unitName
		        }
		      },
		      { "data": "subTotal" },
		      { "data": "cgstPer" },
		      { "data": "sgstPer" },
		      { "data": "cgstVal" },
		      { "data": "sgstVal" },
		      { "data": "total" },
		      { "data": "orderDate" }
		    ];
		    dataTablesInitService.initDataTables(response,columns,'#taxReportsTable','',$scope);


		    // new $.fn.dataTable.Buttons( $('#taxReportsTable').dataTable(), {
      //       buttons: [
      //           'copy', 'excel', 'pdf'
      //       ]
      //   } );

      			var table = $('#taxReportsTable').DataTable();
 
				new $.fn.dataTable.Buttons( table, {
				    buttons: [
				        'excel', 'pdf'
				    ]
				} );
				 
				table.buttons().container().appendTo( $('.col-sm-6:eq(0)', table.table().container() ) );
				$('.buttons-excel.buttons-html5').addClass('btn btn-primary m-l-sm')
	    },function(error){
	      notifyAlertMessage.notify("Something went Wrong","alert-danger");
	    });



		// $('#taxReportsTable').dataTable().buttons().container().insertBefore('#reportSectionButtons');
	}

	$scope.selectOption = function(option){
		// if (option=='Brand') {
		// 	processReqFactory.processReq(baseURL.IP+"/brand/all","GET",'',function(response){ 
		// 		$scope.reportsBrandsList = response;
		// 	},function(error){
		//       notifyAlertMessage.notify("Something went Wrong","alert-danger");
		//     });
	 //    }

	 //    if (option=='Category') {
		// 	processReqFactory.processReq(baseURL.IP+"/category/all","GET",'',function(response){ 
		// 		$scope.reportsCategoryList = response;
		// 	},function(error){
		//       notifyAlertMessage.notify("Something went Wrong","alert-danger");
		//     });
	 //    }

	  //   if (option=='Brand') {
			// processReqFactory.processReq(baseURL.IP+"/brand/all","GET",'',function(response){ 

			// },function(error){
		 //      notifyAlertMessage.notify("Something went Wrong","alert-danger");
		 //    });
	  //   }
	}

}


function analyticsListController($scope, baseURL, filterLink, processReqFactory, $state, notifyAlertMessage){
	processReqFactory.processReq(baseURL.IP+"/analytics/list/devices","GET",'',function(response){ 

	},function(error){
      notifyAlertMessage.notify("Something went Wrong","alert-danger");
    });
}


angular
  .module('distapp')
  .controller('reportsListController',reportsListController)
  .controller('taxReportsListController',taxReportsListController)
  .controller('analyticsListController',analyticsListController)