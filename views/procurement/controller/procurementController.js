function procurementController($scope, $rootScope, processReqFactory, baseURL, bootstrapWizard, notifyAlertMessage, loadingView, dataTablesInitService, $state) {

    $scope.getProcurementData = function(filterData) {
        loadingView.startLoading('show');
        // var fdate = 
        // if(filterData && filterData.selecteddate){

        // }
        processReqFactory.processReq(baseURL.IP + "/procurement/required?date=" + filterData.selecteddate + "&status=" + filterData.status, "GET", '', function(response) {
            loadingView.startLoading('hide');
            $scope.proData = response;
        }, function(error) {
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong", "alert-danger")
        });
    }


};

angular
    .module('distapp')
    .controller('procurementController', procurementController);