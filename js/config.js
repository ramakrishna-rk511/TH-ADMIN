/**
 * thapp - Responsive Admin Theme
 *
 * thapp theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {
    var cdnUrl = "https://rythublob.blob.core.windows.net/bnv-static/plugins-js"
    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    // $urlRouterProvider.otherwise("/login");

    if (JSON.parse(sessionStorage.getItem('sessionOn'))) {
        $urlRouterProvider.otherwise(location.hash.split('#')[1]);
    } else {
        $urlRouterProvider.otherwise("/login");
    }

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('dashboard', {
            abstract: true,
            url: "/dashboard",
            templateUrl: "views/common/content.html",
        })
        .state('dashboard.home', {
            url: "/home",
            templateUrl: "views/dashboard/dashboard.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js','css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },

                        {
                            name: 'cgNotify',
                            files: ['css/plugins/angular-notify/angular-notify.min.css', 'js/plugins/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('dashboard.profile', {
            url: "/profile",
            templateUrl: "views/dashboard/profile.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            name: 'cgNotify',
                            files: ['css/plugins/angular-notify/angular-notify.min.css', 'js/plugins/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })

        // .state('OnlineOrder', {
        //     abstract: true,
        //     url: "/OnlineOrder",
        //     templateUrl: "views/common/content.html",
        // })

        // .state('OnlineOrder.OnlineOrderlist', {
        //     url: "/procurementlist",
        //     templateUrl: "views/Online Order/OnlineOrderlist.html",
        //     resolve: {
        //         loadPlugin: function($ocLazyLoad) {
        //             return $ocLazyLoad.load([{
        //                     serie: true,
        //                     files: [cdnUrl + '/moment/moment.min.js', cdnUrl + '/daterangepicker/daterangepicker.js', cdnUrl + '/datapicker/daterangepicker/daterangepicker-bs3.css']
        //                 },
        //                 {
        //                     serie: true,
        //                     files: ['css/plugins/dataTables/dataTables.bootstrap.css']
        //                 },
        //                 {
        //                     serie: true,
        //                     files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
        //                 },
        //                 {
        //                     serie: true,
        //                     files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
        //                 },
        //                 {
        //                     files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
        //                 },
        //                 {
        //                     files: ['css/bootstrap-datetimepicker.css', cdnUrl + '/bootstrap/bootstrap-datetimepicker.js', cdnUrl + '/bootstrap/bootstrap-datepicker.js']
        //                 },
        //                 {
        //                     name: 'cgNotify',
        //                     files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
        //                 },
        //                 {
        //                     files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
        //                 },
        //             ])
        //         }
        //     }
        // })

        .state('cms', {
            abstract: true,
            url: "/cms",
            templateUrl: "views/common/content.html",
        })

        .state('cms.cmslist', {
            url: "/cmslist",
            templateUrl: "views/cms/cmsListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ])
                }
            }
        })
        .state('cms.cmscreation', {
            url: "/cmscreation",
            templateUrl: "views/cms/cmsCreationTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            files: [cdnUrl + '/bootstrap-wizard/jquery.bootstrap.wizard.js', cdnUrl + '/jquery/jquery.validate.js', cdnUrl + '/bootstrap-wizard/form-wizard.js']
                        },
                        {
                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + '/sweetalert/sweetalert.min.js', 'css/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: [cdnUrl + '/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('cms.cmsviewpage', {
            url: "/cmsviewpage/:cmsViewId",
            templateUrl: "views/cms/cmsViewTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            files: [cdnUrl + '/bootstrap-wizard/jquery.bootstrap.wizard.js', cdnUrl + '/jquery/jquery.validate.js', cdnUrl + '/bootstrap-wizard/form-wizard.js']
                        },
                        {
                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            files: [cdnUrl + '/sweetalert/sweetalert.min.js', 'css/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: [cdnUrl + '/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('cms.blocklayout', {
            url: "/blocklayout",
            templateUrl: "views/cms/blockLayoutTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ]);
                }
            }
        })
        // .state('cms', {
        //     url: "/cmscreation",
        //     templateUrl: "views/cms/cmsCreationTemplate.html",
        //     resolve: {
        //         loadPlugin: function ($ocLazyLoad) {
        //             return $ocLazyLoad.load([
        //                 {

        //                     serie: true,
        //                     name: 'angular-flot',
        //                     files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
        //                 },
        //                 {
        //                     name: 'angles',
        //                     files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
        //                 },
        //                 {
        //                     name: 'angular-peity',
        //                     files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
        //                 }
        //             ]);
        //         }
        //     }
        // })
        .state('orders', {
            abstract: true,
            url: "/orders",
            templateUrl: "views/common/content.html",
        })

        .state('orders.onlineOrdersList', {
            url: "/onlineOrders",
            templateUrl: "views/orders/onlineOrdersListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                        {
                            files: [cdnUrl + '/sweetalert/sweetalert.min.js', 'css/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: [cdnUrl + '/sweetalert/angular-sweetalert.min.js']
                        }
                    ])
                }
            }
        })
        .state('procurement', {
            abstract: true,
            url: "/procurement",
            templateUrl: "views/common/content.html",
        })

        .state('procurement.procurementlist', {
            url: "/procurementlist",
            templateUrl: "views/procurement/procurementListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: [cdnUrl + '/moment/moment.min.js', cdnUrl + '/daterangepicker/daterangepicker.js', cdnUrl + '/datapicker/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
                        },
                        {
                            files: ['css/bootstrap-datetimepicker.css', cdnUrl + '/bootstrap/bootstrap-datetimepicker.js', cdnUrl + '/bootstrap/bootstrap-datepicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ])
                }
            }
        })

        .state('expenses', {
            abstract: true,
            url: "/expenses",
            templateUrl: "views/common/content.html",
        })

        .state('expenses.list', {
            url: "/list",
            templateUrl: "views/expenses/expensesListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('expenses.types', {
            url: "/types",
            templateUrl: "views/expenses/expensesTypeListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })
        .state('reports', {
            abstract: true,
            url: "/reports",
            templateUrl: "views/common/content.html",
        })
        
        .state('reports.list', {
            url: "/list",
            templateUrl: "views/reports/reportsListTemplate.html",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl+'/dataTables/jquery.dataTables.js',cdnUrl+'/dataTables/dataTables.bootstrap.js',cdnUrl+'/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl+'/dataTables/all.min.js',cdnUrl+'/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl+'/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl+'/angular-notify/angular-notify.min.css',cdnUrl+'/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.buttons.min.js','js/plugins/dataTables/buttons.flash.min.js','js/plugins/dataTables/buttons.print.min.js','js/plugins/dataTables/buttons.html5.min.js','js/plugins/dataTables/jszip.min.js']
                        },
                        {
                            files:[cdnUrl+"/select2/select2.min.css",cdnUrl+"/select2/select2.full.min.js"]
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ])
                }
            }
        })
        .state('reports.taxes', {
            url: "/taxes",
            templateUrl: "views/reports/taxReportsListTemplate.html",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl+'/dataTables/jquery.dataTables.js',cdnUrl+'/dataTables/dataTables.bootstrap.js',cdnUrl+'/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl+'/dataTables/all.min.js',cdnUrl+'/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl+'/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl+'/angular-notify/angular-notify.min.css',cdnUrl+'/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.buttons.min.js','js/plugins/dataTables/buttons.flash.min.js','js/plugins/dataTables/buttons.print.min.js','js/plugins/dataTables/buttons.html5.min.js','js/plugins/dataTables/jszip.min.js']
                        },
                        {
                            files:[cdnUrl+"/select2/select2.min.css",cdnUrl+"/select2/select2.full.min.js"]
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ])
                }
            }
        })
        .state('reports.analytics', {
            url: "/analytics",
            templateUrl: "views/reports/analyticsTemplate.html",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl+'/dataTables/jquery.dataTables.js',cdnUrl+'/dataTables/dataTables.bootstrap.js',cdnUrl+'/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl+'/dataTables/all.min.js',cdnUrl+'/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl+'/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl+'/angular-notify/angular-notify.min.css',cdnUrl+'/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.buttons.min.js','js/plugins/dataTables/buttons.flash.min.js','js/plugins/dataTables/buttons.print.min.js','js/plugins/dataTables/buttons.html5.min.js','js/plugins/dataTables/jszip.min.js']
                        },
                        {
                            files:[cdnUrl+"/select2/select2.min.css",cdnUrl+"/select2/select2.full.min.js"]
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ])
                }
            }
        })
        .state('login', {
            // abstract: true,
            url: "/login",
            templateUrl: "views/common/login.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            name: 'cgNotify',
                            files: ['css/plugins/angular-notify/angular-notify.min.css', 'js/plugins/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('parties', {
            abstract: true,
            url: "/parties",
            templateUrl: "views/common/content.html",
        })
        .state('parties.supplier', {
            url: "/supplier",
            templateUrl: "views/parties/supplierListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })

        .state('parties.supplierview', {
            url: "/supplierview",
            templateUrl: "views/parties/supplierViewTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('parties.customer', {
            url: "/customer",
            templateUrl: "views/parties/customerListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        }

                    ]);
                }
            }
        })
        .state('parties.customerview', {
            url: "/customerview",
            templateUrl: "views/parties/customerDetailsViewTemplate.html",
            data: { pageTitle: 'Customerview Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/dataTables/jquery.dataTables.js', 'css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.bootstrap.js']
                        },
                        {
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })

        .state('request', {
            abstract: true,
            url: "/request",
            templateUrl: "views/common/content.html",
        })
        .state('request.requestheadertypelist', {
            url: "/requestHeaderTypeList",
            templateUrl: "views/request/requestHeaderTypeListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })

        .state('request.requestlist', {
            url: "/requestlist",
            templateUrl: "views/request/requestListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })

        .state('request.requeststatuslist', {
            url: "/requestlist",
            templateUrl: "views/request/requestStatusListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })

        .state('request.requesttypelist', {
            url: "/requesttypelist",
            templateUrl: "views/request/requestTypeListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })

        .state('coupons', {
        abstract: true,
        url: "/coupons",
        templateUrl: "views/common/content.html",
        })
        .state('coupons.couponslist', {
            url: "/couponslist",
            templateUrl: "views/coupons/couponsListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/moment/moment.min.js', cdnUrl + '/daterangepicker/daterangepicker.js', cdnUrl + '/datapicker/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            files: ['css/bootstrap-datetimepicker.css', cdnUrl + '/bootstrap/bootstrap-datetimepicker.js', cdnUrl + '/bootstrap/bootstrap-datepicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })
        .state('coupons.refer&earnlist', {
            url: "/refer&earnlist",
            templateUrl: "views/coupons/referAndEarnListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/moment/moment.min.js', cdnUrl + '/daterangepicker/daterangepicker.js', cdnUrl + '/datapicker/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            files: ['css/bootstrap-datetimepicker.css', cdnUrl + '/bootstrap/bootstrap-datetimepicker.js', cdnUrl + '/bootstrap/bootstrap-datepicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })


        .state('company', {
            abstract: true,
            url: "/company",
            templateUrl: "views/common/content.html",
        })
        .state('company.companylist', {
            url: "/companylist",
            templateUrl: "views/company/companyListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })
        .state('company.companycreation', {
            url: "/companycreation",
            templateUrl: "views/company/companyCreationTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('company.companybranchlist', {
            url: "/companybranchlist",
            templateUrl: "views/company/companyBranchListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('company.companybranchcreation', {
            url: "/companybranchcreation",
            templateUrl: "views/company/companyBranchCreationTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('company.companybranchuserlist', {
            url: "/companybranchuserlist",
            templateUrl: "views/company/companyBranchUserListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('company.companybranchusercreation', {
            url: "/companybranchusercreation",
            templateUrl: "views/company/companyBranchUserCreationTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('subscription', {
            abstract: true,
            url: "/subscription",
            templateUrl: "views/common/content.html",
        })
        .state('subscription.subscriptionlist', {
            url: "/subscriptionlist",
            templateUrl: "views/subscription/subscriptionListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })
        .state('subscription.branchproductsubscriptionlist', {
            url: "/branchproductsubscriptionlist",
            templateUrl: "views/subscription/branchProductSubscriptionListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })
        .state('subscription.branchsubscriptiontypelist', {
            url: "/branchsubscriptiontypelist",
            templateUrl: "views/subscription/branchSubscriptiontypeListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })
        .state('payment', {
            abstract: true,
            url: "/payment",
            templateUrl: "views/common/content.html",
        })
        .state('payment.allpayment', {
            url: "/allpayment",
            templateUrl: "views/payment/allPaymentListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('payment.paymentin', {
            url: "/paymentin",
            templateUrl: "views/payment/paymentInListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                }
            }
        })
        .state('payment.paymentout', {
            url: "/paymentout",
            templateUrl: "views/payment/paymentOutListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('payment.paymentMethod', {
            url: "/paymentMethod",
            templateUrl: "views/payment/paymentMethodListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ]);
                }
            }
        })


        .state('offer', {
            abstract: true,
            url: "/offer",
            templateUrl: "views/common/content.html",
        })
        .state('offer.offerlist', {
            url: "/offerlist",
            templateUrl: "views/offers/templates/OffersListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('offer.offercreation', {
            url: "/offercreation",
            templateUrl: "views/offers/templates/OffersCreationTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            files: [cdnUrl + '/sweetalert/sweetalert.min.js', 'css/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: [cdnUrl + '/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('offer.offerview', {
            url: "/offerview/:offerName/:offerId",
            templateUrl: "views/offers/templates/OffersViewTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })

        .state('offer.offerconfiglist', {
            url: "/offerconfiglist",
            templateUrl: "views/offers/templates/OffersConfigListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('offer.offerconfigcreation', {
            url: "/offerconfigcreation",
            templateUrl: "views/offers/templates/offersConfigCreationTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/moment/moment.min.js', cdnUrl + '/daterangepicker/daterangepicker.js', cdnUrl + '/datapicker/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            files: [cdnUrl + '/bootstrap-wizard/jquery.bootstrap.wizard.js', cdnUrl + '/jquery/jquery.validate.js', cdnUrl + '/bootstrap-wizard/form-wizard.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: ['css/bootstrap-datetimepicker.css', cdnUrl + '/bootstrap/bootstrap-datetimepicker.js', cdnUrl + '/bootstrap/bootstrap-datepicker.js']
                        },

                        {
                            files: [cdnUrl + '/sweetalert/sweetalert.min.js', 'css/sweetalert/sweetalert.css']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: [cdnUrl + '/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('offer.offerconfigview', {
            url: "/offerconfigview",
            templateUrl: "views/offers/templates/OffersConfigViewTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('offer.assortment', {
            url: "/assortment",
            templateUrl: "views/offers/templates/OffersAssortmentViewTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('offer.assortmentcreation', {
            url: "/assortmentcreation",
            templateUrl: "views/offers/templates/OffersAssortmentCreationTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })

        .state('users', {
            abstract: true,
            url: "/users",
            templateUrl: "views/common/content.html",
        })
        .state('users.roles', {
            url: "/roles",
            templateUrl: "views/users/rolesListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })
        .state('users.users', {
            url: "/users",
            templateUrl: "views/users/usersListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })
        .state('users.userMsg', {
            url: "/user/msg",
            templateUrl: "views/users/userMsgTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                    // {
                    //         serie: true,
                    //         files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                    //     },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        // {
                        //     serie: true,
                        //     files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        // },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        }
                        // {
                        //     serie: true,
                        //     files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        // }
                    ]);
                }
            }
        })
        .state('users.userroles', {
            url: "/userroles",
            templateUrl: "views/users/userRolesListTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })

        .state('settings', {
            abstract: true,
            url: "/settings",
            templateUrl: "views/common/content.html",
        })
        .state('settings.stateCityAreas', {
            url: "/stateCityAreas",
            templateUrl: "views/settings/cityStateAreasTemplate.html",

            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ]);
                }
            }
        })
        .state('settings.taxes', {
            url: "/taxes",
            templateUrl: "views/settings/taxlistTemplate.html",

            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ]);
                }
            }
        })
        .state('settings.department', {
            url: "/department",
            templateUrl: "views/settings/departmentlistTemplate.html",

            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ])
                }
            }
        })
        .state('settings.denominations', {
            url: "/denominations",
            templateUrl: "views/settings/denominationslistTemplate.html",

            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ])
                }
            }
        })
        .state('settings.unitofmeasurement', {
            url: "/unitofmeasurement",
            templateUrl: "views/settings/unitOfMeasurementListTemplate.html",

            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ])
                }
            }
        })
        .state('settings.expenseType', {
            url: "/expenseType",
            templateUrl: "views/settings/expenseTypeListTemplate.html",

            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ])
                }
            }
        })
        .state('settings.timingSlots', {
            url: "/timingSlots",
            templateUrl: "views/settings/timingSlotListTemplate.html",

            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ])
                }
            }
        })
        .state('settings.deliverySlot', {
            url: "/deliverySlot",
            templateUrl: "views/settings/deliverySlotListTemplate.html",

            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ])
                }
            }
        })
        .state('settings.deliveryCharges', {
            url: "/deliveryCharges",
            templateUrl: "views/settings/deliveryChargesListTemplate.html",

            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ])
                }
            }
        })
        .state('settings.productSkuDeliverySlot', {
            url: "/productSkuDeliverySlot",
            templateUrl: "views/settings/productSkuDeliverySlotListTemplate.html",

            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ])
                }
            }
        })
        .state('settings.branchDeliverableArea', {
            url: "/branchDeliverableArea",
            templateUrl: "views/settings/branchDeliverableAreaListTemplate.html",

            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ])
                }
            }
        })
        .state('settings.orderStockPoint', {
            url: "/orderStockPoint",
            templateUrl: "views/settings/orderStockPointListTemplate.html",

            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ])
                }
            }
        })
        .state('settings.stockPoint', {
            url: "/stockPoint",
            templateUrl: "views/settings/stockPointListTemplate.html",

            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ])
                }
            }
        })
        .state('settings.wallet', {
            url: "/wallet",
            templateUrl: "views/settings/walletListTemplate.html",

            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ])
                }
            }
        })
        .state('settings.walletSendMoney', {
            url: "/wallet/send",
            templateUrl: "views/settings/walletSendMoneyTemplate.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                    // {
                    //         serie: true,
                    //         files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                    //     },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        // {
                        //     serie: true,
                        //     files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        // },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        }
                        // {
                        //     serie: true,
                        //     files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        // }
                    ]);
                }
            }
        })
        .state('settings.versions', {
            url: "/versions",
            templateUrl: "views/settings/versionListTemplate.html",

            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ])
                }
            }
        })
        .state('sale', {
            abstract: true,
            url: "/sale",
            templateUrl: "views/common/content.html"
        })
        .state('sale.saleinvoicelist', {
            url: "/saleinvoicelist",
            templateUrl: "views/sale/saleInvoiceListTemplate.html",
            data: { pageTitle: 'SaleInvoiceList Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/dataTables/jquery.dataTables.js', 'css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.bootstrap.js']
                        },
                        {
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('sale.salecreation', {
            url: "/salecreation",
            templateUrl: "views/sale/saleCreationTemplate.html",
            data: { pageTitle: "Sale Creation Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([

                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('sale.estimationlist', {
            url: "/estimationlist",
            templateUrl: "views/sale/estimationListTemplate.html",
            data: { pageTitle: 'Estimation ListPage' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/dataTables/jquery.dataTables.js', 'css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.bootstrap.js']
                        },
                        {
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('sale.estimationcreation', {
            url: "/estimationcreation",
            templateUrl: "views/sale/estimationCreationTemplate.html",
            data: { pageTitle: "Estimation Creation Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([

                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('sale.deliverychallan', {
            url: "/deliverychallan",
            templateUrl: "views/sale/deliveryChallanListTemplate.html",
            data: { pageTitle: 'Delivery Challan ListPage' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/dataTables/jquery.dataTables.js', 'css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.bootstrap.js']
                        },
                        {
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('sale.deliverychallancreation', {
            url: "/deliverychallancreation",
            templateUrl: "views/sale/deliveryChallanCreationTemplate.html",
            data: { pageTitle: "DeliveryChallan Creation Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([

                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('sale.salereturn', {
            url: "/salereturn",
            templateUrl: "views/sale/saleReturnListTemplate.html",
            data: { pageTitle: 'Sale Return ListPage' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/dataTables/jquery.dataTables.js', 'css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.bootstrap.js']
                        },
                        {
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('sale.salereturncreation', {
            url: "/salereturncreation",
            templateUrl: "views/sale/saleReturnCreationTemplate.html",
            data: { pageTitle: "Sale Return Creation Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([

                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })

        .state('sale.saleorder', {
            url: "/saleorder",
            templateUrl: "views/sale/saleOrderListTemplate.html",
            data: { pageTitle: 'SaleInvoiceList Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/dataTables/jquery.dataTables.js', 'css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.bootstrap.js']
                        },
                        {
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('sale.saleordercreation', {
            url: "/saleordercreation",
            templateUrl: "views/sale/saleOrderCreationTemplate.html",
            data: { pageTitle: "Sale Creation Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([

                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('sale.dailylogs', {
            url: "/dailylogs",
            templateUrl: "views/sale/dailyLogsListTemplate.html",
            data: { pageTitle: 'Daily Logs List Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('sale.singledailylogs', {
            url: "/singledailylogs/:logName/:logId",
            templateUrl: "views/sale/dailyLogsViewTemplate.html",
            data: { pageTitle: 'Daily Logs View' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('inventory', {
            abstract: true,
            url: "/inventory",
            templateUrl: "views/common/content.html"
        })
        .state('inventory.stockin', {
            url: "/stockin",
            templateUrl: "views/inventory/stockInListTemplate.html",
            data: { pageTitle: 'Stock-In Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/dataTables/jquery.dataTables.js', 'css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.bootstrap.js']
                        },
                        {
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('inventory.stockincreation', {
            url: "/stockincreation",
            templateUrl: "views/inventory/stockInCreationTemplate.html",
            data: { pageTitle: "Stock-In Creation Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([

                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('inventory.stocktransfer', {
            url: "/stocktransfer",
            templateUrl: "views/inventory/stockTransferListTemplate.html",
            data: { pageTitle: 'Stock-Transfer Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('inventory.stocktransfercreation', {
            url: "/stocktransfercreation",
            templateUrl: "views/inventory/stockTransferCreationTemplate.html",
            data: { pageTitle: "StockTransfer Creation Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([

                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('inventory.stocktransferview', {
            url: "/stocktransferview/:code/:id",
            templateUrl: "views/inventory/stockTransferViewTemplate.html",
            data: { pageTitle: "Stock Transfer View Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([

                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('inventory.stock', {
            url: "/stock",
            templateUrl: "views/inventory/stockListTemplate.html",
            data: { pageTitle: 'Stock Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })

        .state('inventory.stockconversion', {
            url: "/stockconversion",
            templateUrl: "views/inventory/stockConversionListTemplate.html",
            data: { pageTitle: 'Stock Conversion Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            files: ['css/clockpicker.css', cdnUrl + '/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ])
                }
            }
        })
        .state('inventory.addstockconversion', {
            url: "/addstockconversion",
            templateUrl: "views/inventory/addStockConversionTemplate.html",
            data: { pageTitle: "purchase Creation Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([

                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('inventory.stockmovementlist', {
            url: "/stockmovementlist",
            templateUrl: "views/inventory/stockMovementListTemplate.html",
            data: { pageTitle: 'Stock Movement Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('inventory.stockmovement', {
            url: "/stockmovement",
            templateUrl: "views/inventory/addStockMovementTemplate.html",
            data: { pageTitle: "Stock Movement Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([

                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })

        .state('inventory.stockpointlist', {
            url: "/stockpointlist",
            templateUrl: "views/inventory/stockPointListTemplate.html",
            data: { pageTitle: 'Stock Points Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })
        .state('inventory.stockdetailsview', {
            url: "/stockdetailsview",
            templateUrl: "views/inventory/stockDetailsViewTemplate.html",
            data: { pageTitle: 'Stock Points Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/dataTables/jquery.dataTables.js', 'css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.bootstrap.js']
                        },
                        {
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })


        .state('inventory.stockreturnlist', {
            url: "/stockreturnlist",
            templateUrl: "views/inventory/stockReturnListTemplate.html",
            data: { pageTitle: 'Stock Return Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/dataTables/jquery.dataTables.js', 'css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.bootstrap.js']
                        },
                        {
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('inventory.stockreturncreation', {
            url: "/stockreturncreation",
            templateUrl: "views/inventory/StockReturnCreationTemplate.html",
            data: { pageTitle: "Stock Return Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([

                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('inventory.stockadjustablelist', {
            url: "/stockadjustablelist",
            templateUrl: "views/inventory/stockAdjustableListTemplate.html",
            data: { pageTitle: 'Stock Return Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('inventory.batch', {
            url: "/batch",
            templateUrl: "views/inventory/BatchListTemplate.html",
            data: { pageTitle: "Batch Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        }
                    ])
                }
            }
        })
        .state('inventory.grn', {
            url: "/grn",
            templateUrl: "views/inventory/GoodsReceiptsListTemplate.html",
            data: { pageTitle: "GRN Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        }
                    ])
                }
            }
        })
        .state('inventory.grncreation', {
            url: "/grncreation",
            templateUrl: "views/inventory/GoodsReceiptsCreationTemplate.html",
            data: { pageTitle: "GRN Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        // {
                        //     serie: true,
                        //     files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        // },
                        // {
                        //     serie: true,
                        //     files: [cdnUrl+'/dataTables/jquery.dataTables.js',cdnUrl+'/dataTables/dataTables.bootstrap.js',cdnUrl+'/dataTables/dataTables.colReorder.js']
                        // },
                        // {
                        //     serie: true,
                        //     files: [cdnUrl+'/dataTables/all.min.js',cdnUrl+'/dataTables/dataTables.scroller.js']
                        // },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ])
                }
            }
        })
        .state('purchase', {
            abstract: true,
            url: "/purchase",
            templateUrl: "views/common/content.html"
        })
        .state('purchase.purchaseinvoicelist', {
            url: "/purchaseinvoicelist",
            templateUrl: "views/purchase/purchaseInvoiceListTemplate.html",
            data: { pageTitle: 'purchaseInvoiceList Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/dataTables/jquery.dataTables.js', 'css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.bootstrap.js']
                        },
                        {
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('purchase.purchasecreation', {
            url: "/purchasecreation",
            templateUrl: "views/purchase/purchaseCreationTemplate.html",
            data: { pageTitle: "purchase Creation Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([

                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/select2/select2.min.js', 'js/plugins/select2/select2.min.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('purchase.purchaseorderreturn', {
            url: "/purchaseorderreturn",
            templateUrl: "views/purchase/purchaseOrderReturnListTemplate.html",
            data: { pageTitle: 'purchase Return ListPage' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/dataTables/jquery.dataTables.js', 'css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/dataTables.bootstrap.js']
                        },
                        {
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('purchase.purchaseorderreturncreation', {
            url: "/purchaseorderreturncreation",
            templateUrl: "views/purchase/purchaseOrderReturnCreationTemplate.html",
            data: { pageTitle: "purchase Return Creation Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([

                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })

        .state('purchase.purchaseorder', {
            url: "/purchaseorder",
            templateUrl: "views/purchase/purchaseOrderListTemplate.html",
            data: { pageTitle: 'purchaseInvoiceList Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })
        .state('purchase.purchaseordercreation', {
            url: "/purchaseordercreation",
            templateUrl: "views/purchase/purchaseOrderCreationTemplate.html",
            data: { pageTitle: "purchase Creation Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([

                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/select2/select2.min.js', 'js/plugins/select2/select2.min.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('purchase.purchaseorderupdateview', {
            url: "/purchaseorderupdate/:name/:id",
            templateUrl: "views/purchase/purchaseOrderUpdationTemplate.html",
            data: { pageTitle: "purchase Updation Page" },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/select2/select2.min.js', 'js/plugins/select2/select2.min.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('catalogue', {
            abstract: true,
            url: "/catalogue",
            templateUrl: "views/common/content.html",
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('catalogue.productlist', {
            url: "/productlist",
            templateUrl: "views/product/productlistTemplate.html",
            data: { pageTitle: 'ProductList Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {

                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        }
                    ]);
                }
            }
        })
        .state('catalogue.productcreation', {
            url: "/productcreation",
            templateUrl: "views/product/productCreationTemplate.html",
            data: { pageTitle: 'Product Creation Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([

                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ]);
                }
            }

        })
        .state('catalogue.skuproductcreation', {
            url: "/skuproductcreation",
            templateUrl: "views/product/skuProductCreationTemplate.html",
            data: { pageTitle: 'SkuProduct Creation Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([

                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ]);
                }
            }
        })
        .state('catalogue.productviewupdate', {
            url: "/productviewupdate/:prodName/:prodId",
            templateUrl: "views/product/productViewUpdateTemplate.html",
            data: { pageTitle: 'Product View Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ]);
                }
            }
        })
        .state('catalogue.singleproductview', {
            url: "/singleproductview/:prodName/:prodId",
            templateUrl: "views/product/singleProductViewTemplate.html",
            data: { pageTitle: 'Single Product View Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                        {
                            serie: true,
                            files: ['js/plugins/moment/moment.min.js', 'js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        }
                    ]);
                }
            }
        })
        .state('catalogue.categorylist', {
            url: "/categorylist",
            templateUrl: "views/product/categorylistTemplate.html",
            data : { pageTitle: 'Category List Page'},
             resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ]);
                },
                // data: function($transition){
                //     console.log($transition)
                // }
            }
        })
        .state('catalogue.brandlist', {
            url: "/brandlist",
            templateUrl: "views/product/brandlistTemplate.html",
            data: { pageTitle: 'Brand Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                    ]);
                }
            }
        })
        .state('catalogue.productprice', {
            url: "/productprice",
            templateUrl: "views/product/productPriceTemplate.html",
            data: { pageTitle: 'Brand Page' },
            resolve: {
                loadPlugin: function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                            serie: true,
                            files: ['css/plugins/dataTables/dataTables.bootstrap.css']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/jquery.dataTables.js', cdnUrl + '/dataTables/dataTables.bootstrap.js', cdnUrl + '/dataTables/dataTables.colReorder.js']
                        },
                        {
                            serie: true,
                            files: [cdnUrl + '/dataTables/all.min.js', cdnUrl + '/dataTables/dataTables.scroller.js']
                        },
                        {
                            name: 'cgNotify',
                            files: [cdnUrl + '/angular-notify/angular-notify.min.css', cdnUrl + '/angular-notify/angular-notify.min.js']
                        },
                        {
                            files: [cdnUrl + "/select2/select2.min.css", cdnUrl + "/select2/select2.full.min.js"]
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        }
                    ]);
                }
            }
        })



}
angular
    .module('thapp')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });