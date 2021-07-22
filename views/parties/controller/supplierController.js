function supplierController($rootScope, $scope, $http, $modal, baseURL, notifyAlertMessage, processReqFactory, dataTablesInitService, loadingView) {

    $scope.getSupplierList = function() {
        loadingView.startLoading('show');
        processReqFactory.processReq(baseURL.IP + "/party/all", "GET", '', function(response) {
            loadingView.startLoading('hide');
            var columns = [
                // { "data": "companyId" },
                {
                    "data": "phoneNo" ,
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },
                {
                    "data": "name" ,
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },
                {
                    "data": "emailId" ,
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },
                {
                    "data": "address" ,
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },
                {
                    "data": "state" ,
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },
                {
                    "data": "creditPeriod" ,
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },
                {
                    "data": "creditLimit" ,
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },
                {
                    "data": "isActive",
                    "render": function(data, type, row, meta) {
                        return (data == true) ? 'ACTIVE' : 'INACTIVE'
                    }
                },
                {
                    "data": "id",
                    "orderable": false,
                    "searchable": false,
                    "render": function(data, type, row, meta) {
                        var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateSupplier(\'' + data + '\')\">VIEW</a>'
                        return a;
                    }
                }
            ];
            dataTablesInitService.initDataTables(response, columns, '#partyTable', '', $scope);
        }, function(error) {
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong", "alert-danger")
        });
    }

    $scope.getCompanyList = function() {
        var companyUrl = baseURL.IP + "/company/all"
        processReqFactory.processReq(companyUrl, "GET", '', function(data) {
            $scope.companyArray = data
        }, function(error) {
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong", "alert-danger")
        });
    }();

    $scope.addOrUpdateSupplier = function(id) {
        $scope.updateSave = (id ? false : true);
        loadingView.startLoading('show');
        if ($scope.updateSave == false) {
            var url = baseURL.IP + "/party/" + id
            processReqFactory.processReq(url, "GET", '', function(data) {
                loadingView.startLoading('hide');
                data.isActive = data.isActive + '';
                $scope.supplierNewObj = data
                $scope.supplierNewObj.companyId = data.companyId
                $scope.modalInstance = $modal.open({
                    templateUrl: 'views/parties/addSupplierTemplate.html',
                    controller: ModalInstanceCtrl,
                    size: 'lg',
                    scope: $scope
                });
            }, function(error) {
                loadingView.startLoading('hide');
                notifyAlertMessage.notify("Something went Wrong", "alert-danger")
            });
        } else {
            loadingView.startLoading('hide');
            $scope.supplierNewObj = {}
            $scope.modalInstance = $modal.open({
                templateUrl: 'views/parties/addSupplierTemplate.html',
                controller: ModalInstanceCtrl,
                size: 'lg',
                scope: $scope
            });
        }
    }

    $scope.getAllNextDueAmountList = function() {
        var modalInstance = $modal.open({
            templateUrl: 'views/parties/allSupplierDueAmountList.html',
            controller: ModalInstanceCtrl,
            size: 'lg'

        });
    }

    $scope.createOrUpdateSupplier = function(data) {
        $scope.supplierNewObj = data;
        $scope.supplierNewObj.isActive = JSON.parse(data.isActive);
        var url = baseURL.IP + (data.id ? "/party/" + data.id + "/edit" : "/party/create")
        var method = (data.id ? "PUT" : "POST")
        processReqFactory.processReq(url, method, $scope.supplierNewObj, function(response) {
            loadingView.startLoading('hide');
            var response = response;
            var alertMessage = (data.id ? "Supplier updated " : "Supplier created ")
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
    .controller('supplierController', supplierController)