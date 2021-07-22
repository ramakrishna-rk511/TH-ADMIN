function subscriptionController($rootScope, $scope, $http, $modal, baseURL, notifyAlertMessage, processReqFactory, dataTablesInitService, loadingView) {
    $scope.getStockPointList = function() {
        // loadingView.startLoading('show');
        processReqFactory.processReq(baseURL.IP + "/subscriptiontype/list", "GET", '', function(response) {
            $scope.subscriptiontypeObjData = response;
            loadingView.startLoading('hide');
            var columns = [
                { "data": "subscriptionName" },
                { "data": "subscriptionValue" },
                { "data": "isActive" },
                // { "data": "hoursPriorToOrder" },
                {
                    "data": "id",
                    "orderable": false,
                    "searchable": false,
                    "render": function(data, type, row, meta) {
                        var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateSubscription(\'' + data + '\')\">VIEW</a>'
                        return a;
                    }
                }
            ];
            dataTablesInitService.initDataTables(response, columns, '#timingSlotList', '', $scope);
        }, function(error) {
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong", "alert-danger")
        });
    }

    // for add and update expenses type modal

    $scope.getcompanyBranchList = function(id) {
        processReqFactory.processReq(baseURL.IP + "/companybranch/all", "GET", '', function(response) {
            $scope.companyBranchList = response;
        }, function(error) {
            if (error.status == 401) {
                $state.go('login');
            }
        });
    }
        // }
        //For Stock Point
        // $scope.getcompanyBranchList = function(id){
        //   processReqFactory.processReq(baseURL.IP+"/stockPoint/all","GET",'',function(response){ 
        //     $scope.stockPointList = response;
        //   },function(error){
        //      if (error.status==401) {
        //         $state.go('login');
        //       }
        //   });
        // }

        $scope.addOrUpdateSubscription = function(id) {

            $scope.updateSave = (id ? false : true);
            // loadingView.startLoading('show');
            if ($scope.updateSave == false) {
                for(var sd in $scope.subscriptiontypeObjData){
                    if($scope.subscriptiontypeObjData[sd].id == id){
                        $scope.subscription = $scope.subscriptiontypeObjData[sd]
                    }
                }
                // var url = baseURL.IP+"/subscriptiontype/edit/"+id
                // var url = baseURL.IP+"/subscriptiontype/edit"
                // processReqFactory.processReq(url,"GET",'',function(data){
                // loadingView.startLoading('hide');
                // data.isActive = data.isActive + '';
                // $rootScope.subscriptionkData = data
                // $scope.modalInstance = $modal.open({
                //   templateUrl: 'views/settings/addOrderStockPointModalTemplate.html',
                //   controller: ModalInstanceCtrl,
                //   size: 'md',
                //   scope:$scope
                // });
                $('#addSubscriptionModal').appendTo('body').modal();
                // },function(error){
                // loadingView.startLoading('hide');
                // notifyAlertMessage.notify("Something went Wrong","alert-danger")
                // });
            } else {
                $scope.subscriptionkData = {}
                loadingView.startLoading('hide');
                $('#addSubscriptionModal').appendTo('body').modal();
                // $scope.modalInstance = $modal.open({
                //   templateUrl: 'views/settings/addOrderStockPointModalTemplate.html',
                //   controller: ModalInstanceCtrl,
                //   size: 'md',
                //   scope:$scope
                // });
            }
        }

        $scope.createOrUpdateSubscription = function(data) {
            $scope.subscriptionkData = data;
            $scope.subscriptionkData.subscriptionValue = JSON.parse(data.subscriptionValue);
            // $scope.subscriptionkData.branchId = JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'];
            $scope.subscriptionkData.isActive = JSON.parse(data.isActive);
            delete $scope.subscriptionkData.createdDate;
            delete $scope.subscriptionkData.modifiedDate;
            var url = baseURL.IP + (data.id ? "/subscriptiontype/edit" : "/subscriptiontype/create")
            var method = (data.id ? "PUT" : "POST")
            processReqFactory.processReq(url, method, $scope.subscriptionkData, function(response) {
                loadingView.startLoading('hide');
                var response = response;
                var alertMessage = (data.id ? "Subscription updated " : "Subscription created ")
                notifyAlertMessage.notify(alertMessage + " successfully", "alert-sucess")
                setTimeout(function() {
                    location.reload();
                }, 1000);
            }, function(error) {
                loadingView.startLoading('hide');
                notifyAlertMessage.notify("Something went Wrong", "alert-danger")
            });
        }

    // }
}
function branchProductSubscriptionController($rootScope, $scope, $http, $modal, baseURL, notifyAlertMessage, processReqFactory, dataTablesInitService, loadingView) {
    $scope.getStockPointList = function() {
        // loadingView.startLoading('show');
        processReqFactory.processReq(baseURL.IP + "/branchproductsubscription/list", "GET", '', function(response) {
            $scope.subscriptiontypeObjData = response;
            loadingView.startLoading('hide');
            var columns = [
                { "data": "subTypeName" },
                { "data": "subTypeValue" },
                { "data": "skuName" },
                { "data": "isActive" },
                // { "data": "hoursPriorToOrder" },
                {
                    "data": "id",
                    "orderable": false,
                    "searchable": false,
                    "render": function(data, type, row, meta) {
                        var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateSubscription(\'' + data + '\')\">VIEW</a>'
                        return a;
                    }
                }
            ];
            dataTablesInitService.initDataTables(response, columns, '#timingSlotList', '', $scope);
        }, function(error) {
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong", "alert-danger")
        });
    }

    // for add and update expenses type modal

    $scope.getcompanyBranchList = function(id) {
        processReqFactory.processReq(baseURL.IP + "/companybranch/all", "GET", '', function(response) {
            $scope.companyBranchList = response;
        }, function(error) {
            if (error.status == 401) {
                $state.go('login');
            }
        });
    }
        // }
        //For Stock Point
        // $scope.getcompanyBranchList = function(id){
        //   processReqFactory.processReq(baseURL.IP+"/stockPoint/all","GET",'',function(response){ 
        //     $scope.stockPointList = response;
        //   },function(error){
        //      if (error.status==401) {
        //         $state.go('login');
        //       }
        //   });
        // }

        $scope.addOrUpdateSubscription = function(id) {
            $scope.updateSave = (id ? false : true);
            // loadingView.startLoading('show');
            if ($scope.updateSave == false) {
                // var url = baseURL.IP+"/subscriptiontype/edit/"+id
                // var url = baseURL.IP+"/subscriptiontype/edit"
                // processReqFactory.processReq(url,"GET",'',function(data){
                // loadingView.startLoading('hide');
                // data.isActive = data.isActive + '';
                // $rootScope.subscriptionkData = data
                // $scope.modalInstance = $modal.open({
                //   templateUrl: 'views/settings/addOrderStockPointModalTemplate.html',
                //   controller: ModalInstanceCtrl,
                //   size: 'md',
                //   scope:$scope
                // });
                $('#addSubscriptionModal').appendTo('body').modal();
                // },function(error){
                // loadingView.startLoading('hide');
                // notifyAlertMessage.notify("Something went Wrong","alert-danger")
                // });
            } else {
                $scope.subscriptionkData = {}
                loadingView.startLoading('hide');
                $('#addSubscriptionModal').appendTo('body').modal();
                // $scope.modalInstance = $modal.open({
                //   templateUrl: 'views/settings/addOrderStockPointModalTemplate.html',
                //   controller: ModalInstanceCtrl,
                //   size: 'md',
                //   scope:$scope
                // });
            }
        }

        $scope.createOrUpdateSubscription = function(data) {
            $scope.subscriptionkData = data;
            $scope.subscriptionkData.subscriptionValue = JSON.parse(data.subscriptionValue);
            // $scope.subscriptionkData.isActive = JSON.parse(data.isActive);
            var url = baseURL.IP + (data.id ? "/subscriptiontype/" + data.id + "/edit" : "/subscriptiontype/create")
            var method = (data.id ? "PUT" : "POST")
            processReqFactory.processReq(url, method, $scope.subscriptionkData, function(response) {
                loadingView.startLoading('hide');
                var response = response;
                var alertMessage = (data.id ? "Subscription updated " : "Subscription created ")
                notifyAlertMessage.notify(alertMessage + " successfully", "alert-sucess")
                setTimeout(function() {
                    location.reload();
                }, 1000);
            }, function(error) {
                loadingView.startLoading('hide');
                notifyAlertMessage.notify("Something went Wrong", "alert-danger")
            });
        }

    // }
}
function branchSubscriptionTypeController($rootScope, $scope, $http, $modal, baseURL, notifyAlertMessage, processReqFactory, dataTablesInitService, loadingView) {
    $scope.getStockPointList = function() {
        // loadingView.startLoading('show');
        processReqFactory.processReq(baseURL.IP + "/branchsubscriptiontype/list", "GET", '', function(response) {
            $scope.subscriptiontypeObjData = response;
            loadingView.startLoading('hide');
            var columns = [
                { "data": "subscriptionTypeName" },
                { "data": "subscriptionTypeValue" },
                // { "data": "skuName" },
                { "data": "isActive" },
                // { "data": "hoursPriorToOrder" },
                {
                    "data": "id",
                    "orderable": false,
                    "searchable": false,
                    "render": function(data, type, row, meta) {
                        var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateSubscription(\'' + data + '\')\">VIEW</a>'
                        return a;
                    }
                }
            ];
            dataTablesInitService.initDataTables(response, columns, '#branchSubTypeList', '', $scope);
        }, function(error) {
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong", "alert-danger")
        });
    }

    // for add and update expenses type modal

    $scope.getcompanyBranchList = function(id) {
        processReqFactory.processReq(baseURL.IP + "/companybranch/all", "GET", '', function(response) {
            $scope.companyBranchList = response;
        }, function(error) {
            if (error.status == 401) {
                $state.go('login');
            }
        });
    }


        processReqFactory.processReq(baseURL.IP + "/subscriptiontype/list", "GET", '', function(response) {
            $scope.subscriptionList = response;
        }, function(error) {
            if (error.status == 401) {
                $state.go('login');
            }
        });
        // }
        //For Stock Point
        // $scope.getcompanyBranchList = function(id){
        //   processReqFactory.processReq(baseURL.IP+"/stockPoint/all","GET",'',function(response){ 
        //     $scope.stockPointList = response;
        //   },function(error){
        //      if (error.status==401) {
        //         $state.go('login');
        //       }
        //   });
        // }

        $scope.addOrUpdateSubscription = function(id) {
            $scope.updateSave = (id ? false : true);
            // loadingView.startLoading('show');
            if ($scope.updateSave == false) {
                for(var sd in $scope.subscriptiontypeObjData){
                    if($scope.subscriptiontypeObjData[sd].id == id){
                        $scope.branchsubscriptiontype = $scope.subscriptiontypeObjData[sd]
                    }
                }
                // var url = baseURL.IP+"/subscriptiontype/edit/"+id
                // var url = baseURL.IP+"/subscriptiontype/edit"
                // processReqFactory.processReq(url,"GET",'',function(data){
                // loadingView.startLoading('hide');
                // data.isActive = data.isActive + '';
                // $rootScope.branchsubscriptiontypeData = data
                // $scope.modalInstance = $modal.open({
                //   templateUrl: 'views/settings/addOrderStockPointModalTemplate.html',
                //   controller: ModalInstanceCtrl,
                //   size: 'md',
                //   scope:$scope
                // });
                $('#addBranchSubscriptionTypeModal').appendTo('body').modal();
                // },function(error){
                // loadingView.startLoading('hide');
                // notifyAlertMessage.notify("Something went Wrong","alert-danger")
                // });
            } else {
                $scope.branchsubscriptiontypeData = {}
                loadingView.startLoading('hide');
                $('#addBranchSubscriptionTypeModal').appendTo('body').modal();
                // $scope.modalInstance = $modal.open({
                //   templateUrl: 'views/settings/addOrderStockPointModalTemplate.html',
                //   controller: ModalInstanceCtrl,
                //   size: 'md',
                //   scope:$scope
                // });
            }
        }

        $scope.createOrUpdateBranchSubscriptionType = function(data) {
            $scope.branchsubscriptiontypeData = data;
            // $scope.branchsubscriptiontypeData.subscriptionTypeValue = JSON.parse(data.subscriptionTypeValue);
            $scope.branchsubscriptiontypeData.isActive = JSON.parse(data.isActive);
            delete $scope.branchsubscriptiontypeData.createdDate;
            delete $scope.branchsubscriptiontypeData.modifiedDate;
            var url = baseURL.IP + (data.id ? "/branchsubscriptiontype/edit" : "/branchsubscriptiontype/create")
            var method = (data.id ? "PUT" : "POST")
            processReqFactory.processReq(url, method, $scope.branchsubscriptiontypeData, function(response) {
                loadingView.startLoading('hide');
                var response = response;
                var alertMessage = (data.id ? "Branch Subscription Type updated " : "Branch Subscription Type created ")
                notifyAlertMessage.notify(alertMessage + " successfully", "alert-sucess")
                setTimeout(function() {
                    location.reload();
                }, 1000);
            }, function(error) {
                loadingView.startLoading('hide');
                notifyAlertMessage.notify("Something went Wrong", "alert-danger")
            });
        }

    // }
}
angular
    .module('distapp')
    .controller('subscriptionController', subscriptionController)
    .controller('branchSubscriptionTypeController', branchSubscriptionTypeController)
    .controller('branchProductSubscriptionController', branchProductSubscriptionController);