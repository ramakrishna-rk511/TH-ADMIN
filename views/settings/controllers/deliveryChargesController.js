function deliveryChargesController($rootScope, $scope, $http, $modal, baseURL, notifyAlertMessage, processReqFactory, dataTablesInitService, loadingView) {
    $scope.getDeliveryChargesList = function() {
        // loadingView.startLoading('show');

        processReqFactory.processReq(baseURL.IP + "/charges/all?branch=" + JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'], "GET", '', function(response) {
            loadingView.startLoading('hide');
            //$rootScope.show_load = false;
            var columns = [{
                    "data": "name",
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },
                { "data": "amountFrom" },
                {
                    "data": "amountEnd",
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },
                { "data": "charges" },
                {
                    "data": "taxGroupName",
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },
                {
                    "data": "isActive",
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },
                {
                    "data": "id",
                    "orderable": false,
                    "searchable": false,
                    "render": function(data, type, row, meta) {
                        var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateDeliveryCharges(\'' + data + '\')\">View</a>'
                        return a;
                    }
                }
            ];
            dataTablesInitService.initDataTables(response, columns, '#deliveryChargesList', '', $scope);
        }, function(error) {
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong", "alert-danger")
        });
    }

    //Company Branch List
    processReqFactory.processReq(baseURL.IP + "/companybranch/all?branch=" + JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'] , "GET", '', function(response) {
        $scope.companyBranchList = response;
    }, function(error) {
        if (error.status == 401) {
            $state.go('login');
        }
    });

    //Tax Group List
    processReqFactory.processReq(baseURL.IP + "/taxGroup/all", "GET", '', function(response) {
        $scope.taxGroupList = response;
    }, function(error) {
        if (error.status == 401) {
            $state.go('login');
        }
    });

    $scope.addOrUpdateDeliveryCharges = function(id) {
        $scope.updateSave = (id ? false : true);
        loadingView.startLoading('show');
        if ($scope.updateSave == false) {
            var url = baseURL.IP + "/charges/" + id
            processReqFactory.processReq(url, "GET", '', function(data) {
                loadingView.startLoading('hide');
                // data.isActive = data.isActive + '';
                $scope.deliveryChargesData = data
                // $scope.modalInstance = $modal.open({
                //   templateUrl: 'views/settings/addTimingslotModalTemplate.html',
                //   controller: ModalInstanceCtrl,
                //   size: 'md',
                //   scope:$scope
                // });
                $('#addDeliveryChargesModal').appendTo('body').modal();
            }, function(error) {
                loadingView.startLoading('hide');
                notifyAlertMessage.notify("Something went Wrong", "alert-danger")
            });
        } else {
            $scope.deliveryChargesData = {}
            loadingView.startLoading('hide');
            // $scope.modalInstance = $modal.open({
            //   templateUrl: 'views/settings/addTimingslotModalTemplate.html',
            //   controller: ModalInstanceCtrl,
            //   size: 'md',
            //   scope:$scope
            // });
            $('#addDeliveryChargesModal').appendTo('body').modal();
        }
    }

    $scope.deliveryChargesData = {};
    $scope.createOrUpdateDeliveryCharges = function(data) {
        $scope.deliveryChargesData = data;
        delete $scope.deliveryChargesData['createdDate'];
        delete $scope.deliveryChargesData['modifiedDate'];
        delete $scope.deliveryChargesData['taxGroupName'];
        $scope.deliveryChargesData.isActive = JSON.parse(data.isActive);
        var url = baseURL.IP + ($scope.deliveryChargesData.id ? "/charges/" + $scope.deliveryChargesData.id + "/edit" : "/charges/create")
        var method = (data.id ? "PUT" : "POST")
        processReqFactory.processReq(url, method, $scope.deliveryChargesData, function(response) {
            loadingView.startLoading('hide');
            var response = response;
            var alertMessage = (data.id ? "Delivery Charges updated " : "Delivery Charges created ")
            notifyAlertMessage.notify(alertMessage + " successfully", "alert-sucess")
            setTimeout(function() {
                location.reload();
            }, 1000);
        }, function(error) {
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong", "alert-danger")
        });
    }

}

angular
    .module('distapp')
    .controller('deliveryChargesController', deliveryChargesController)