function deliverySlotController($rootScope, $scope, $http, $modal, baseURL, notifyAlertMessage, processReqFactory, dataTablesInitService, loadingView) {
    $scope.getDeliverySlotList = function() {
        // loadingView.startLoading('show');

        processReqFactory.processReq(baseURL.IP + "/deliverySlot/all?branch=" + JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'], "GET", '', function(response) {
            loadingView.startLoading('hide');
            //$rootScope.show_load = false;
            var columns = [
                {
                    "data": "name",
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },{
                    "data": "daysDelivery",
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },
                { "data": "daysPriorToOrder" },
                {
                    "data": "hoursPriorToOrder",
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },
                { "data": "startTime" },
                {
                    "data": "endTime",
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },
                {
                    "data": "specificHourCutOff",
                    "render": function(data, type, row, meta) {
                        return data ? data : 'N/A'
                    }
                },
                // { "data": "daysPriorToOrder" },
                // { "data": "hoursPriorToOrder" },
                // { "data": "name" },
                {
                    "data": "id",
                    "orderable": false,
                    "searchable": false,
                    "render": function(data, type, row, meta) {
                        var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateDeliverySlot(\'' + data + '\')\">View</a>'
                        return a;
                    }
                }
            ];
            dataTablesInitService.initDataTables(response, columns, '#deliverySlotList', '', $scope);
        }, function(error) {
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong", "alert-danger")
        });
    }


    // for add and update expenses type modal
    // $scope.getcompanyBranchList = function(id){
    processReqFactory.processReq(baseURL.IP + "/companybranch/all", "GET", '', function(response) {
        $scope.companyBranchList = response;
    }, function(error) {
        if (error.status == 401) {
            $state.go('login');
        }
    });
    // }

    $scope.addOrUpdateDeliverySlot = function(id) {
        $scope.updateSave = (id ? false : true);
        loadingView.startLoading('show');
        if ($scope.updateSave == false) {
            var url = baseURL.IP + "/deliverySlot/" + id
            processReqFactory.processReq(url, "GET", '', function(data) {
                loadingView.startLoading('hide');
                // data.isActive = data.isActive + '';
                $scope.deliverySlotData = data
                // $scope.modalInstance = $modal.open({
                //   templateUrl: 'views/settings/addTimingslotModalTemplate.html',
                //   controller: ModalInstanceCtrl,
                //   size: 'md',
                //   scope:$scope
                // });
                $('#addDeliverySlotModal').appendTo('body').modal();
            }, function(error) {
                loadingView.startLoading('hide');
                notifyAlertMessage.notify("Something went Wrong", "alert-danger")
            });
        } else {
            $scope.deliverySlotData = {}
            loadingView.startLoading('hide');
            // $scope.modalInstance = $modal.open({
            //   templateUrl: 'views/settings/addTimingslotModalTemplate.html',
            //   controller: ModalInstanceCtrl,
            //   size: 'md',
            //   scope:$scope
            // });
            $('#addDeliverySlotModal').appendTo('body').modal();
        }
    }

    $scope.createOrUpdateDeliverySlot = function(deliverydata) {

        if (typeof (deliverydata.daysDelivery) == 'object') {
            deliverydata.daysDelivery = (deliverydata.daysDelivery).join()
        }
        // $scope.deliverySlotData = data;
        // $scope.deliverySlotData.isActive = JSON.parse(data.isActive);
        var url = baseURL.IP + (deliverydata.id ? "/deliverySlot/" + deliverydata.id + "/edit" : "/deliverySlot/create")
        var method = (deliverydata.id ? "PUT" : "POST")
        processReqFactory.processReq(url, method, deliverydata, function(response) {
            loadingView.startLoading('hide');
            var response = response;
            var alertMessage = (deliverydata.id ? "Delivery Slot updated " : "Delivery Slot created ")
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
    .controller('deliverySlotController', deliverySlotController)