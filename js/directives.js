/**
 * thapp - Responsive Admin Theme
 *
 * Main directives.js file
 * Define directives for used plugin
 *
 *
 * Functions (directives)
 *  - sideNavigation
 *  - iboxTools
 *  - minimalizaSidebar
 *  - vectorMap
 *  - sparkline
 *  - icheck
 *  - ionRangeSlider
 *  - dropZone
 *  - responsiveVideo
 *  - chatSlimScroll
 *  - customValid
 *  - fullScroll
 *  - closeOffCanvas
 *  - clockPicker
 *  - landingScrollspy
 *  - fitHeight

 *
 */
function baseURL(){
    return {
        IP:"http://172.105.38.210:8080/imposweb",
        // IP: "http://183.82.112.83:8085",
        // IP: "https://www.farmersbest.in"
    }
}

function pageRole($http, $q){
    return {
        newserve: function (){
            // var def = $q.defer();
            return $http.get("./json/navigation.json").success(function(response){});

            // return def.promise;
        }
    }
}



var checkStatus = false;
function processReqFactory($http,$state, notifyAlertMessage, loadingView){
    return {
        processReq:function(url,type,data,success,error){
            var headerObj;
            if (sessionStorage.getItem('token')) {
                headerObj = {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': 'Bearer '+sessionStorage.getItem('token')
                }
            }else{
                headerObj = {
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                }
            }
        $http({
            url:url,
            method:type,
            data:data,
            async: false,
            headers:headerObj
            /*,
             eventHandlers: {
        progress: function (e) {
                  if (e.lengthComputable) {
                     $scope.progressBar = (e.loaded / e.total) * 100;
                     $scope.progressCounter = $scope.progressBar;
                  }
        } 
    }*/
        }).success(success)
        .error (function(error){
            loadingView.startLoading('hide');
            if(error){
                if(error.status == 401 && checkStatus == false){
                    checkStatus = true;
                    $state.go('login');
                }
                if (error.message=='Server Error') {
                    notifyAlertMessage.notify(error['details'][0], 'alert-warning');
                }
                if (error == 401) {
                    $state.go('login');
                    sessionStorage.setItem('sessionOn', JSON.stringify({'sessionId': '', 'status': false}));
                }
            }
        }); 
            }
    }
}


function loadingView(){
    this.startLoading = function(text){
        if(text=="show"){
            return $("body").append('<div class="loadingModal"><div class="spiner-example '+text+'"><div class="sk-spinner sk-spinner-wave"><div class="sk-rect1"></div><div class="sk-rect2"></div><div class="sk-rect3"></div><div class="sk-rect4"></div></div></div></div>');
        }else{
            
            return $('.loadingModal').remove()
        }
    }
}
function notifyAlertMessage(notify, $timeout){
    this.notify = function(titleMsg,titleClass){
        notify({
        message: titleMsg,
        classes: titleClass,
        duration : 2000,
        templateUrl:'views/common/notify.html'
        });

        $timeout(function() {
            notify.closeAll();
        },2000);
    }
}



function capitalize(){
    return function(input) {
        // return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        return (input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
}


// Page Back Button
//     function goBack(){
//         window.history.back();
//     }



function dataTablesInitService($compile){
        this.initDataTables  = function(dataset,columns,selector,rowlength, scope){
                    var table = $(selector);

        /* Fixed header extension: http://datatables.net/extensions/keytable/ */

        var oTable = table.dataTable({

            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "Show _MENU_ entries",
                "search": "Search:",
                "sPaginationType": "full_numbers",
                "zeroRecords": "No matching records found"
            },
            "data": dataset,
            "columns": columns,
            "bProcessing": true,
            "bDestroy": true,
            "bSearchable": true,
            /*"aoColumnDefs": customizedColumn,*/
            "lengthMenu": [
                [5, 10, 15],
                // [5, 15, 20, -1],
                [5, 10, 15] // change per page values here
                // [5, 15, 20, "All"] // change per page values here
            ],
            // buttons: [
            //     'copy', 'csv', 'excel', 'pdf', 'print'
            // ],
            "pageLength": 10, // set the initial value,
            "searching": true,
            "columnDefs": [{  // set default column settings
                'orderable': false,
                'targets': [0]
            }, {
                "searchable": true,
                "targets": [0]
            }],
            "order": [
                [0, "asc"]
            ],
            "createdRow": function ( row, data, index ) {
                $compile(row)(scope);  //add this to compile the DOM
            }         
        });

        var oTableColReorder = new $.fn.dataTable.ColReorder( oTable );
        // var oTableButtonReorder = new $.fn.dataTable.Buttons( oTable, {
        //     buttons: [
        //         'copy', 'excel', 'pdf'
        //     ]
        // } );

        // $(oTable).DataTable( {
        //     dom: 'Bfrtip',
        //     buttons: [
        //         'copy', 'csv', 'excel', 'pdf', 'print'
        //     ]
        // });

        var tableWrapper = $(selector+'_wrapper'); 
        var tableHeader = $(''+selector+' tfoot th');

        if (rowlength) {
        	$(''+selector+' tbody').on('click', 'td.details-control', function () {

            var tr = $(this).closest('tr');
            var row = oTable.api().row( tr );

            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child( rowlength(row.data()) ).show();
                tr.addClass('shown');
            }      
  				});
        }
                
}


}


/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'Farmers Best | Admin';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'Farmers Best | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
};

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
// function sideNavigation($timeout) {
//     return {
//         restrict: 'A',
//         link: function(scope, element) {
//             // Call the metsiMenu plugin and plug it to sidebar navigation
//             $timeout(function(){
//                 element.metisMenu();

//             });
//         }
//     };
// };

/**
 * responsibleVideo - Directive for responsive video
 */
function responsiveVideo() {
    return {
        restrict: 'A',
        link:  function(scope, element) {
            var figure = element;
            var video = element.children();
            video
                .attr('data-aspectRatio', video.height() / video.width())
                .removeAttr('height')
                .removeAttr('width')

            //We can use $watch on $window.innerWidth also.
            $(window).resize(function() {
                var newWidth = figure.width();
                video
                    .width(newWidth)
                    .height(newWidth * video.attr('data-aspectRatio'));
            }).resize();
        }
    }
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
};

/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 100);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 300);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
};


function closeOffCanvas() {
    return {
        restrict: 'A',
        template: '<a class="close-canvas-menu" ng-click="closeOffCanvas()"><i class="fa fa-times"></i></a>',
        controller: function ($scope, $element) {
            $scope.closeOffCanvas = function () {
                $("body").toggleClass("mini-navbar");
            }
        }
    };
}

/**
 * vectorMap - Directive for Vector map plugin
 */
function vectorMap() {
    return {
        restrict: 'A',
        scope: {
            myMapData: '=',
        },
        link: function (scope, element, attrs) {
            element.vectorMap({
                map: 'world_mill_en',
                backgroundColor: "transparent",
                regionStyle: {
                    initial: {
                        fill: '#e4e4e4',
                        "fill-opacity": 0.9,
                        stroke: 'none',
                        "stroke-width": 0,
                        "stroke-opacity": 0
                    }
                },
                series: {
                    regions: [
                        {
                            values: scope.myMapData,
                            scale: ["#1ab394", "#22d6b1"],
                            normalizeFunction: 'polynomial'
                        }
                    ]
                },
            });
        }
    }
}


/**
 * sparkline - Directive for Sparkline chart
 */
function sparkline() {
    return {
        restrict: 'A',
        scope: {
            sparkData: '=',
            sparkOptions: '=',
        },
        link: function (scope, element, attrs) {
            scope.$watch(scope.sparkData, function () {
                render();
            });
            scope.$watch(scope.sparkOptions, function(){
                render();
            });
            var render = function () {
                $(element).sparkline(scope.sparkData, scope.sparkOptions);
            };
        }
    }
};

/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'

                }).on('ifChanged', function(event) {
                        if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                            $scope.$apply(function() {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                            return $scope.$apply(function() {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
            });
        }
    };
}

/**
 * ionRangeSlider - Directive for Ion Range Slider
 */
function ionRangeSlider() {
    return {
        restrict: 'A',
        scope: {
            rangeOptions: '='
        },
        link: function (scope, elem, attrs) {
            elem.ionRangeSlider(scope.rangeOptions);
        }
    }
}

/**
 * dropZone - Directive for Drag and drop zone file upload plugin
 */
function dropZone() {
    return function(scope, element, attrs) {
        element.dropzone({
            url: "/upload",
            maxFilesize: 100,
            paramName: "uploadfile",
            maxThumbnailFilesize: 5,
            init: function() {
                scope.files.push({file: 'added'});
                this.on('success', function(file, json) {
                });
                this.on('addedfile', function(file) {
                    scope.$apply(function(){
                        alert(file);
                        scope.files.push({file: 'added'});
                    });
                });
                this.on('drop', function(file) {
                    alert('file');
                });
            }
        });
    }
}

/**
 * chatSlimScroll - Directive for slim scroll for small chat
 */
function chatSlimScroll($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function(){
                element.slimscroll({
                    height: '234px',
                    railOpacity: 0.4
                });

            });
        }
    };
}

/**
 * customValid - Directive for custom validation example
 */
function customValid(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function() {

                // You can call a $http method here
                // Or create custom validation

                var validText = "thapp";

                if(scope.extras == validText) {
                    c.$setValidity('cvalid', true);
                } else {
                    c.$setValidity('cvalid', false);
                }

            });
        }
    }
}


/**
 * fullScroll - Directive for slimScroll with 100%
 */
function fullScroll($timeout){
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function(){
                element.slimscroll({
                    height: '100%',
                    railOpacity: 0.9
                });

            });
        }
    };
}

/**
 * clockPicker - Directive for clock picker plugin
 */
function clockPicker() {
    return {
        restrict: 'A',
        link: function(scope, element) {
                element.clockpicker();
        }
    };
};


/**
 * landingScrollspy - Directive for scrollspy in landing page
 */
function landingScrollspy(){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.scrollspy({
                target: '.navbar-fixed-top',
                offset: 80
            });
        }
    }
}

/**
 * fitHeight - Directive for set height fit to window height
 */
function fitHeight(){
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.css("height", $(window).height() + "px");
            element.css("min-height", $(window).height() + "px");
        }
    };
}

function navigationHeight(){
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.css("height", $(window).height() - 112 + "px");
            element.css("min-height", $(window).height() - 112 + "px");
            element.css("overflow-y", "auto");
            element.css("overflow-x", "hidden");
        }
    };
}

function wrapperHeight(){
    return {
        restrict: 'A',
        link: function(scope, element){
            element.css("height", $(window).height() - 40 + "px");
            element.css("min-height", $(window).height() + "px");
        }
    }
}

function numberToString(){
    return {
        require : 'ngModel',
        link: function(scope, element, attrs, ngModel){
            ngModel.$parsers.push(function(value) {
                return '' + value;
              });
        }
    }
}

// function routepage($state){
//     return {
//         restrict : 'A',
//         // scope: {
//         //     routepage: '&'
//         // },
//         link: function(scope,element,attrs){
//             if(attrs.uiSref == $state.current.name){
//                 console.log('hi')
//             }
//             $(element).on('click', function(e) {
//                   console.log(scope);
//                   console.log(element);
//                   console.log(attrs);
//                });
//         }
//     }
// }

function bootstrapWizard(){
    this.wizard = function(wizardSelector,formId,length,value){
        $('.next.pull-right').addClass('show');
        $(wizardSelector).bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'onTabClick': function(tab, navigation, index) {
                $(formId).valid();
                            return false;
            },
            'onNext': function(tab, navigation, index) {
                        $('.previous').addClass('show');
                var $valid = $(formId).valid();

                if(localStorage.getItem('hidetabs')=='hide'){
                    if(index==2){
                        $(wizardSelector).bootstrapWizard('show',3);
                    }
                }

                if(index==length){
                        if(!$valid) { 
                        return false;
                    }else{
                        $('.confirm').addClass('show');
                        $('.next.pull-right').removeClass('show');
                    }
                }
                if(index==length-1){
                    if(!$valid) { 
                        return false;
                    }else{
                        $('.next.pull-right').addClass('show');
                    }
                    
                }
                if(!$valid) {
                    return false;
                }
            },
            'onPrevious':function(tab, navigation, index){
                if(localStorage.getItem('hidetabs')!='hide'){
                    if(index==length-1 || index==length){
                        $('.confirm').removeClass('show');
                        $('.next.pull-right').addClass('show');
                    }
                    if(index==0 || index==length-1 || index==length){
                        $('.next.pull-right').removeClass('show');
                        $('.next.pull-right').addClass('show');
                    }
                    if(index==0){
                            $('.previous').removeClass('show');
                    }
                }else{
                    if(index==3){
                        $(wizardSelector).bootstrapWizard('show',2);
                        $('.confirm').removeClass('show');
                        $('.next.pull-right').addClass('show');
                    }else{
                        $(wizardSelector).bootstrapWizard('show',index);
                        $('.confirm').removeClass('show');
                        $('.next.pull-right').addClass('show');
                    }
                }
            }
        });
        if (value) {
            $(wizardSelector).bootstrapWizard('display', value);
        }else if(value!=undefined){
            $(wizardSelector).bootstrapWizard('hide', 1);
        }
    }
}




function onFileChange($http, baseURL, notifyAlertMessage){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          // var onChangeHandler = scope.$eval(attrs.onFileChange);

          const dropZoneElement = element.closest('.drop-zone');
          // console.log(dropZoneElement)

          element.bind('change', function() {
            scope.$apply(function() {
                // console.log(attrs.onFileChange)
              var path = attrs.onFileChange.substring(1,attrs.onFileChange.length -1);
              var files = element[0].files[0];
              if (files) {
                upload(files,path);
              }
            });
          });
          dropZoneElement.bind('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.classList.add("drop-zone-over");
          });
          dropZoneElement.bind('dragenter', function(e) {
              e.preventDefault();
              e.stopPropagation();
              e.currentTarget.classList.add("drop-zone-over");
          });
          dropZoneElement.bind('dragend', function(e) {
              e.preventDefault();
              e.stopPropagation();
              e.currentTarget.classList.remove("drop-zone-over");
          });


          dropZoneElement.on('drop', function(e) {
            scope.$apply(function() {
            	e.preventDefault();
              e.stopPropagation();
              // console.log(attrs.onFileChange)
              var path = attrs.onFileChange.substring(1,attrs.onFileChange.length -1);
              var files = e.originalEvent.dataTransfer.files[0];
              if (files) {
                upload(files,path);
              }
              return false;
            });
          });

          var upload = function(files,path) {

          	// console.log(filess)
            if (files.name.split('.')[1]=='xlsx' || files.name.split('.')[1]=='xls') {
                var uploadData = new FormData();
                uploadData.append('file', files);
                // console.log(attrs.to+'----'+baseURL.IP)
                // $http({
                //     method: 'POST',
                //     url: baseURL.IP+path,
                //     data: uploadData,
                //     headers: {'Authorization': 'Bearer '+sessionStorage.getItem('token')},
           					// processData: false,
           					// contentType: false,
                // }).success(function() {
                //     // if (response==202) {
                // 	notifyAlertMessage.notify('upload success','alert-warning');
                //          // }
                // }).error(function() {
                //     console.log("Error");
                // });

                $.ajax({
				           type: "POST",
				           url: baseURL.IP+path,
				           data: uploadData,
				           headers: {'Authorization': 'Bearer '+sessionStorage.getItem('token')},
				           processData: false,
				           contentType: false,
				           success: function(key,response) {
				              notifyAlertMessage.notify('upload success','alert-warning');
				           },
				           error:function(error){
				             // console.log(error)
				             notifyAlertMessage.notify('upload faild','alert-danger');
				           }
				        });
            }else{
                notifyAlertMessage.notify('Please upload files in xlsx/xls format','warning');
            }
          };

        }
    };
}

function upload($http, baseURL, notifyAlertMessage){
    return {
        restrict: 'A',
        replace: true,
        scope: {},
        // require: '?ngModel',
        // template: '<input type="file" class="asset-upload drop-zone-input" name="myFile"/>',
        // template: '<input type="file" class="asset-upload" />Drag here to upload</div>',
        link: function(scope, element, attrs, ngModel) {

            element.on('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.classList.add("drop-zone-over");
            });
            element.on('dragenter', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.classList.add("drop-zone-over");
            });
            element.on('dragend', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.classList.remove("drop-zone-over");
            });

            element.on('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (e.originalEvent.dataTransfer){
                    if (e.originalEvent.dataTransfer.files.length > 0) {
                        upload(e.originalEvent.dataTransfer.files);
                    }
                }
                return false;
            });

            


        }
    };
}

function filterLink(){
    this.getLink = function(data){
        var filterUrl;
        var filterObj = {};
        for(var d in data){
            filterObj[data[d].split('=')[0]] = data[d].split('=')[0]+'='+data[d].split('=')[1]
            if (!data[d].split('=')[1] || data[d].split('=')[1]=="undefined") {
                delete filterObj[data[d].split('=')[0]]
            }
        }
        for( var k = 0; k<Object.keys(filterObj).length ; k++){
            if (k==0) {
                filterUrl = '?'+filterObj[Object.keys(filterObj)[k]]
            }else{
                filterUrl += '&'+filterObj[Object.keys(filterObj)[k]]
            }
        }
        return filterUrl
    }
}

function chatService($q, $timeout, baseURL, $state){
    var service = {}, listener = $q.defer(), socket = {
      client: null,
      stomp: null
    }, messageIds = [];

    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = baseURL.IP+'/ws';
    if(!JSON.parse(sessionStorage.getItem('sessionOn'))){
        $state.go('login');
        sessionStorage.setItem('token', '');
        sessionStorage.setItem('sessionOn', JSON.stringify({'sessionId': '', 'status': false, 'branchId': '', 'role': ''}));

        return false;
    }else{
        service.CHAT_TOPIC = '/topic/neworder/'+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'];
    }
    // service.CHAT_BROKER = "/app/chat";
    
    service.receive = function() {
      return listener.promise;
    };
    
    var getMessage = function(){
        if (Notification.permission === "granted") {
            const notification = new Notification("Farmers Best",{
                body: 'New order is placed.'
            })

            notification.onclick = (e) => {
      window.location.href = "https://www.farmersbest.in/admin/#/orders/onlineOrders";
   };

        }else if(Notification.permission !== "denied"){
            Notification.requestPermission().then(function(permission){
                if (permission === "granted") {
                    const notification = new Notification("Farmers Best",{
                        body: 'New order is placed.'
                    })

                    notification.onclick = (e) => {
      window.location.href = "https://www.farmersbest.in/admin/#/orders/onlineOrders";
   };

                }
            })
        }
    }
    
    var reconnect = function() {
      $timeout(function() {
        initialize();
      }, this.RECONNECT_TIMEOUT);
    };
    
    var startListener = function() {
      socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
        getMessage(data.body);
      });
    };
    
    var initialize = function() {
      socket.client = new SockJS(service.SOCKET_URL);
      socket.stomp = Stomp.over(socket.client);
      socket.stomp.connect({}, startListener);
      socket.stomp.onclose = reconnect;
    };
    
    initialize();
    return service;
}

// function filterLink(){
//     this.getLink = function(data){
//         var filterUrl;
//         var filterObj = {};
//         for(var d in data){
//             filterObj[data[d].split('=')[0]] = data[d].split('=')[0]+'='+data[d].split('=')[1]
//             if (!data[d].split('=')[1] || data[d].split('=')[1]=="undefined") {
//                 delete filterObj[data[d].split('=')[0]]
//             }
//         }
//         for( var k = 0; k<Object.keys(filterObj).length ; k++){
//             if (k==0) {
//                 filterUrl = '?'+filterObj[Object.keys(filterObj)[k]]
//             }else{
//                 filterUrl += '&'+filterObj[Object.keys(filterObj)[k]]
//             }
//         }
//         return filterUrl
//     }
// }

function rolesView(){
    this.controlRole = function(roleName){
        // console.log(sessionStorage.getItem('menuData'))
        var checkingRole;
         // pageRole.newserve().then(function(response){
        for(urldata in JSON.parse(sessionStorage.getItem('menuData'))){
          if (JSON.parse(sessionStorage.getItem('menuData'))[urldata]['route']) {
            if (roleName == JSON.parse(sessionStorage.getItem('menuData'))[urldata]['route']) {
              checkingRole = JSON.parse(sessionStorage.getItem('menuData'))[urldata]['roles']
            }
          }else{
            for(suburldata in JSON.parse(sessionStorage.getItem('menuData'))[urldata]['submenu']){
              if (roleName == JSON.parse(sessionStorage.getItem('menuData'))[urldata]['submenu'][suburldata]['route']) {
                checkingRole = JSON.parse(sessionStorage.getItem('menuData'))[urldata]['submenu'][suburldata]['roles'];
              }
            }
          }
        }

        return checkingRole
    }
}

/**
 *
 * Pass all functions into module
 */
angular
    .module('thapp')
    .service('baseURL',baseURL)
    .service('pageRole',pageRole)
    .factory('processReqFactory',processReqFactory)
    .service('loadingView',loadingView)
    .service('notifyAlertMessage',notifyAlertMessage)
    .service('dataTablesInitService', dataTablesInitService)
    .filter('capitalize',capitalize)
    .service('bootstrapWizard',bootstrapWizard)
    .directive('numberToString',numberToString)
    .directive('pageTitle', pageTitle)
    // .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('vectorMap', vectorMap)
    .directive('sparkline', sparkline)
    .directive('icheck', icheck)
    .directive('ionRangeSlider', ionRangeSlider)
    .directive('dropZone', dropZone)
    .directive('responsiveVideo', responsiveVideo)
    .directive('chatSlimScroll', chatSlimScroll)
    .directive('customValid', customValid)
    .directive('fullScroll', fullScroll)
    .directive('closeOffCanvas', closeOffCanvas)
    .directive('clockPicker', clockPicker)
    .directive('landingScrollspy', landingScrollspy)
    .directive('fitHeight', fitHeight)
    .directive('navigationHeight', navigationHeight)
    .directive('wrapperHeight',wrapperHeight)
    // .service('filterLink',filterLink)
    .directive('onFileChange',onFileChange)
    .directive('upload',upload)
    .service('filterLink',filterLink)
    .service('chatService',chatService)
    .service('rolesView',rolesView);
