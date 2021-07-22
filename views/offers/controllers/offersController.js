function OfferConfigCreationController($scope, $rootScope, $stateParams, $state, loadingView, bootstrapWizard, processReqFactory, notifyAlertMessage) {
    bootstrapWizard.wizard('#offerConfigwizard', '#offerConfigForm', '2')
    // for offer Fulfillment list
    processReqFactory.processReq('/offerfulfillment/offerFulfillmentlist?status=ACTIVE', 'GET', '', function(response) {
        $scope.offerFulfillmentObj = response.entities
    }, function(error) {
        notifyAlertMessage.notify("OfferFulfillment List Not Available", "alert-danger")
    })
    // for State list
    processReqFactory.processReq('/state/statelist', 'GET', '', function(response) {
        $scope.stateObj = response.entities
    }, function(error) {
        notifyAlertMessage.notify("State List Not Available", "alert-danger")
    })
    // for Seller list
    processReqFactory.processReq('/sellerbranch/branchlist?sellerType=SUPPLIER', 'GET', '', function(response) {
        $scope.sellerbranchObj = response.entities
    }, function(error) {
        notifyAlertMessage.notify("sellerbranch List Not Available", "alert-danger")
    })

    // For Category List
    processReqFactory.processReq('/category/categorylistbylevel', 'GET', '', function(success) {
        $scope.categoriesObj = success.entities
    }, function(error) {
        notifyAlertMessage.notify("Category List Not Available", "alert-danger")
    })
    //For Product List 
    processReqFactory.processReq('/product/productlist', 'GET', '', function(success) {
        $scope.productsObj = success.entities
    }, function(error) {
        notifyAlertMessage.notify("Product List Not Available", "alert-danger")
    })
    //seller Branch List
    processReqFactory.processReq('/sellerbranch/branchlist', 'GET', '', function(response) {
        $scope.sellerbranchExObj = response.entities
    }, function(error) {
        notifyAlertMessage.notify("sellerbranch List Not Available", "alert-danger")
    })
    // for City list
    processReqFactory.processReq('/city/citylist', 'GET', '', function(response) {
        $scope.cityObj = response.entities
    }, function(error) {
        notifyAlertMessage.notify("sellerbranch List Not Available", "alert-danger")
    })

    $scope.filterObj = {};
    $scope.cityLevelArray = {};
    $scope.getCitySelectedValues = function(name, key, value) {
        var cityurl = '';
        if (key && value) {
            if (key == 'stateId=') {
                cityurl = "/city/citylist?stateId=" + value
                processReqFactory.processReq(cityurl, "GET", '', function(data) {
                    $scope.cityEntities = '';
                    // loadingView.startLoading("hide");
                    $rootScope.show_load = false;
                    $scope.cityEntities = data.entities;
                }, function(error) {
                    notifyAlertMessage.notify("Something went wrong", "alert-sucess")
                    // loadingView.startLoading("hide");
                    $rootScope.show_load = false;
                });
            }
            if (key == 'cityId=') {
                if ($scope.cityLevelArray.hasOwnProperty(value) == true && $scope.cityLevelArray[value].length != 0) {
                    notifyAlertMessage.notify("city already selected", "alert-danger")
                    return false;
                } else {
                    $scope.cityLevelArray[value] = [];
                }
            }
        }
    }
    /*Excludes For City level*/
    $scope.sellerBranchExcludesInCityLevel = false;
    $scope.categoryExcludesInCityLevel = false;
    $scope.productsExcludesInCityLevel = false;
    $scope.getExcludesCiytLevelType = function(levelType) {
        switch (levelType) {
            case 'SELLERBRANCH':
                $scope.sellerBranchExcludesInCityLevel = true;
                break;
            case 'CATEGORY':
                $scope.categoryExcludesInCityLevel = true;
                break;
            case 'PRODUCT':
                $scope.productsExcludesInCityLevel = true;
                break;

        }

    }
    $scope.goBack = function() {
        window.history.back();
    }
    $scope.citiesLevelObj = {};
    $scope.getCityLevelObject = function(cityId, citySellerBranchExcludeId, cityCategoryExcludeId, cityProductExcludeId) {
        /*if(Object.values($scope.cityLevelArray)[0].indexOf(cityId)==-1){
        	alert("Yes")
        }else{
        	alert("No")
        }*/
        if ($scope.cityLevelArray.hasOwnProperty(cityId) == true && $scope.cityLevelArray[cityId].length != 0) {
            if ($scope.cityLevelArray[cityId][0]["properties"].cityId == cityId) {
                notifyAlertMessage.notify("City already Available", "alert-danger")
                $scope.cityLevelDetails = false;
                $scope.stateId = '';
                $scope.cityId = '';
                return false;
            } else {
                $scope.citiesLevelObj = {
                    "class": ["offerConfig"],
                    "rel": ["offerConfigRep"]

                }
                $scope.citiesLevelObj['properties'] = {};

                $scope.citiesLevelObj['properties']['stateName'] = angular.element("select[name='stateName'] option:selected").text();
                $scope.citiesLevelObj['properties']['cityName'] = angular.element("select[name='cityName'] option:selected").text();
                $scope.citiesLevelObj['properties']['cityId'] = cityId,

                    $scope.citiesLevelObj['properties']['$siren4j.class'] = "com.arthvedi.bnv.offer.representation.siren.OfferConfigRepresentation"

                $scope.cityLevelArray[$scope.cityId].push($scope.citiesLevelObj);
                $scope.cityLevelArray[cityId][0].entities = [];
                if (citySellerBranchExcludeId != undefined) {
                    $.each(citySellerBranchExcludeId, function(k, v) {
                        var citySellerBranchExcludeObj = {
                            "class": ["offerExcludeConfig"],
                            "rel": ["offerExcludeConfigRep"],
                            "properties": {
                                "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                                "levelId": v,
                                "levelType": "ZONE(SELLER)"
                            }
                        }

                        $scope.cityLevelArray[cityId][0].entities.push(citySellerBranchExcludeObj);
                    })
                }
                if (cityCategoryExcludeId != undefined) {
                    $.each(cityCategoryExcludeId, function(k, v) {
                        var cityCategoryExcludeObj = {
                            "class": ["offerExcludeConfig"],
                            "rel": ["offerExcludeConfigRep"],
                            "properties": {
                                "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                                "levelId": v,
                                "levelType": "CATEGORY"

                            }
                        }

                        $scope.cityLevelArray[cityId][0].entities.push(cityCategoryExcludeObj);
                    })
                }
                if (cityProductExcludeId != undefined) {
                    $.each(cityProductExcludeId, function(k, v) {
                        var cityProductExcludeObj = {
                            "class": ["offerExcludeConfig"],
                            "rel": ["offerExcludeConfigRep"],
                            "properties": {
                                "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                                "levelId": v,
                                "levelType": "PRODUCT"
                            }
                        }
                        $scope.cityLevelArray[cityId][0].entities.push(cityProductExcludeObj);
                    })
                }
                $scope.sellerBranchExcludesInCityLevel = false;
                $scope.categoryExcludesInCityLevel = false;
                $scope.productsExcludesInCityLevel = false;
                $scope.cityLevelDetails = false;

                $scope.stateId = '';
                $scope.cityId = '';
            }
        } else {
            $scope.citiesLevelObj = {
                "class": ["offerConfig"],
                "rel": ["offerConfigRep"]

            }
            $scope.citiesLevelObj['properties'] = {};

            $scope.citiesLevelObj['properties']['stateName'] = angular.element("select[name='stateName'] option:selected").text();
            $scope.citiesLevelObj['properties']['cityName'] = angular.element("select[name='cityName'] option:selected").text();
            $scope.citiesLevelObj['properties']['cityId'] = cityId,

                $scope.citiesLevelObj['properties']['$siren4j.class'] = "com.arthvedi.bnv.offer.representation.siren.OfferConfigRepresentation"

            $scope.cityLevelArray[$scope.cityId].push($scope.citiesLevelObj);
            $scope.cityLevelArray[cityId][0].entities = [];
            if (citySellerBranchExcludeId != undefined) {
                $.each(citySellerBranchExcludeId, function(k, v) {
                    var citySellerBranchExcludeObj = {
                        "class": ["offerExcludeConfig"],
                        "rel": ["offerExcludeConfigRep"],
                        "properties": {
                            "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                            "levelId": v,
                            "levelType": "ZONE(SELLER)"
                        }
                    }

                    $scope.cityLevelArray[cityId][0].entities.push(citySellerBranchExcludeObj);
                })
            }
            if (cityCategoryExcludeId != undefined) {
                $.each(cityCategoryExcludeId, function(k, v) {
                    var cityCategoryExcludeObj = {
                        "class": ["offerExcludeConfig"],
                        "rel": ["offerExcludeConfigRep"],
                        "properties": {
                            "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                            "levelId": v,
                            "levelType": "CATEGORY"

                        }
                    }

                    $scope.cityLevelArray[cityId][0].entities.push(cityCategoryExcludeObj);
                })
            }
            if (cityProductExcludeId != undefined) {
                $.each(cityProductExcludeId, function(k, v) {
                    var cityProductExcludeObj = {
                        "class": ["offerExcludeConfig"],
                        "rel": ["offerExcludeConfigRep"],
                        "properties": {
                            "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                            "levelId": v,
                            "levelType": "PRODUCT"
                        }
                    }
                    $scope.cityLevelArray[cityId][0].entities.push(cityProductExcludeObj);
                })
            }

            $scope.sellerBranchExcludesInCityLevel = false;
            $scope.categoryExcludesInCityLevel = false;
            $scope.productsExcludesInCityLevel = false;
            $scope.cityLevelDetails = false;
            $scope.stateId = '';
            $scope.cityId = '';
        }
    }

    $scope.getAddCityLevelDetails = function() {
        $(".select2_demo_2").val(null).trigger('change.select2');
        $scope.cityLevelDetails = true;
        $scope.stateId = '';
        $scope.cityId = '';
    }

    $scope.getCloseCityLevel = function() {
        $scope.cityLevelDetails = false;
        $scope.sellerBranchExcludesInCityLevel = false;
        $scope.categoryExcludesInCityLevel = false;
        $scope.productsExcludesInCityLevel = false;
        $scope.cityLevel = false;
        $scope.levelId = '';
    }
    $scope.getDeleteCityLevel = function(cityId) {

        delete $scope.cityLevelArray[cityId];
    }
    $scope.getcitySellerBranchExcludeClose = function() {

        $scope.citySellerBranchExcludeId = '';
        $scope.sellerBranchExcludesInCityLevel = false;

    }
    $scope.getcityCategoryExcludeClose = function() {

        $scope.cityCategoryExcludeId = '';
        $scope.categoryExcludesInCityLevel = false;
    }
    $scope.getcityProductExcludeClose = function() {

        $scope.cityProductExcludeId = '';
        $scope.productsExcludesInCityLevel = false;
    }
    $scope.isCouponText = false;
    $scope.getCouponCodeDetails = function(coupon) {
        if (coupon.isCoupon == "true") {
            $scope.isCouponText = true;
        } else {
            $scope.isCouponText = false;

        }
    }


    /*Seller Branch Level Offer Applied Code*/
    /*Excludes For City level*/
    $scope.sellerBranchExCityLevel = false;
    $scope.sellerBranchExCategoryLevel = false;
    $scope.sellerBranchExProductLevel = false;
    $scope.getExcludesSellerLevelType = function(levelType) {
        switch (levelType) {
            case 'CITY':
                $scope.sellerBranchExCityLevel = true;
                break;
            case 'CATEGORY':
                $scope.sellerBranchExCategoryLevel = true;
                break;
            case 'PRODUCT':
                $scope.sellerBranchExProductLevel = true;
                break;

        }

    }
    $scope.getSellerBranchCityExcludeClose = function() {

        $scope.sellerBranchExCityLevel = false;

    }
    $scope.getSellerBranchCategoryExcludeClose = function() {

        $scope.sellerBranchExCategoryLevel = false;
    }
    $scope.getSellerBranchProductExcludeClose = function() {

        $scope.sellerBranchExProductLevel = false;
    }

    $scope.sellerBranchLevelArray = {};
    $scope.getSellerBranchSelectedValues = function(name, key, value) {
        var cityurl = '';
        if (key && value) {
            if (key == 'stateId=') {
                cityurl = "/city/citylist?stateId=" + value
                processReqFactory.processReq(cityurl, "GET", '', function(data) {
                    $scope.cityEntities = '';
                    // loadingView.startLoading("hide");
                    $rootScope.show_load = false;
                    $scope.cityEntities = data.entities;
                }, function(error) {
                    notifyAlertMessage.notify("Something went wrong", "alert-sucess")
                    // loadingView.startLoading("hide");
                    $rootScope.show_load = false;
                });
            }
            if (key == 'cityId=') {
                // for Seller list
                processReqFactory.processReq('/sellerbranch/branchlist?cityId=' + value, 'GET', '', function(response) {
                    $scope.sellerbranchObj = response.entities
                }, function(error) {
                    notifyAlertMessage.notify("sellerbranch List Not Available", "alert-danger")
                })
            }
            if (key == 'sellerbranchId=') {
                if ($scope.sellerBranchLevelArray.hasOwnProperty(value) == true && $scope.sellerBranchLevelArray[value].length != 0) {
                    notifyAlertMessage.notify("sellerBranchLevel already selected", "alert-danger")
                    return false;
                } else {
                    $scope.sellerBranchLevelArray[value] = [];
                }

            }
        }
    }


    $scope.sellerBranchLevelObj = {};
    $scope.getSellerBranchLevelObject = function(sellerbranchId, sellerBranchExcityId, sellerBranchExCategoryId, sellerBranchExProductId) {
        if ($scope.sellerBranchLevelArray.hasOwnProperty(sellerbranchId) == true && $scope.sellerBranchLevelArray[sellerbranchId].length != 0) {
            if ($scope.sellerBranchLevelArray[sellerbranchId][0]["properties"].sellerbranchId == sellerbranchId) {
                notifyAlertMessage.notify("City already Available", "alert-danger")
                $scope.sellerBranchLevelDetails = false;
                $scope.stateId = '';
                $scope.cityId = '';
                $scope.sellerbranchId = '';
                return false;
            } else {
                $scope.sellerBranchLevelObj = {
                    "class": ["offerConfig"],
                    "rel": ["offerConfigRep"]

                }
                $scope.sellerBranchLevelObj['properties'] = {};

                $scope.sellerBranchLevelObj['properties']['stateName'] = angular.element("select[name='stateName'] option:selected").text();
                $scope.sellerBranchLevelObj['properties']['cityName'] = angular.element("select[name='cityName'] option:selected").text();
                $scope.sellerBranchLevelObj['properties']['sellerBranchName'] = angular.element("select[name='sellerBranchName'] option:selected").text();
                $scope.sellerBranchLevelObj['properties']['levelId'] = sellerbranchId,
                    $scope.sellerBranchLevelObj['properties']['levelType'] = "SELLER",
                    $scope.sellerBranchLevelObj['properties']['$siren4j.class'] = "com.arthvedi.bnv.offer.representation.siren.OfferConfigRepresentation"

                $scope.sellerBranchLevelArray[$scope.sellerbranchId].push($scope.sellerBranchLevelObj);


                $scope.sellerBranchLevelArray[sellerbranchId][0].entities = [];
                if (sellerBranchExcityId != undefined) {
                    $.each(sellerBranchExcityId, function(k, v) {
                        var sellerBranchExcityObj = {
                            "class": ["offerExcludeConfig"],
                            "rel": ["offerExcludeConfigRep"],
                            "properties": {
                                "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                                "levelId": v,
                                "levelType": "CITY"
                            }
                        }

                        $scope.sellerBranchLevelArray[sellerbranchId][0].entities.push(sellerBranchExcityObj);
                    })
                }
                if (sellerBranchExCategoryId != undefined) {
                    $.each(sellerBranchExCategoryId, function(k, v) {
                        var sellerBranchExCategoryObj = {
                            "class": ["offerExcludeConfig"],
                            "rel": ["offerExcludeConfigRep"],
                            "properties": {
                                "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                                "levelId": v,
                                "levelType": "CATEGORY"

                            }
                        }

                        $scope.sellerBranchLevelArray[sellerbranchId][0].entities.push(sellerBranchExCategoryObj);
                    })
                }
                if (sellerBranchExProductId != undefined) {
                    $.each(sellerBranchExProductId, function(k, v) {
                        var sellerBranchExProductObj = {
                            "class": ["offerExcludeConfig"],
                            "rel": ["offerExcludeConfigRep"],
                            "properties": {
                                "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                                "levelId": v,
                                "levelType": "PRODUCT"
                            }
                        }
                        $scope.sellerBranchLevelArray[sellerbranchId][0].entities.push(sellerBranchExProductObj);
                    })
                }

                $scope.sellerBranchExCityLevel = false;
                $scope.sellerBranchExCategoryLevel = false;
                $scope.sellerBranchExProductLevel = false;
                $scope.sellerBranchLevelDetails = false;
                $scope.stateId = '';
                $scope.cityId = '';
                $scope.sellerbranchId = '';
            }
        } else {
            $scope.sellerBranchLevelObj = {
                "class": ["offerConfig"],
                "rel": ["offerConfigRep"]

            }
            $scope.sellerBranchLevelObj['properties'] = {};

            $scope.sellerBranchLevelObj['properties']['stateName'] = angular.element("select[name='stateName'] option:selected").text();
            $scope.sellerBranchLevelObj['properties']['cityName'] = angular.element("select[name='cityName'] option:selected").text();
            $scope.sellerBranchLevelObj['properties']['sellerBranchName'] = angular.element("select[name='sellerBranchName'] option:selected").text();
            $scope.sellerBranchLevelObj['properties']['levelId'] = sellerbranchId,
                $scope.sellerBranchLevelObj['properties']['levelType'] = "SELLER",

                $scope.sellerBranchLevelObj['properties']['$siren4j.class'] = "com.arthvedi.bnv.offer.representation.siren.OfferConfigRepresentation"

            $scope.sellerBranchLevelArray[$scope.sellerbranchId].push($scope.sellerBranchLevelObj);
            $scope.sellerBranchLevelArray[sellerbranchId][0].entities = [];
            if (sellerBranchExcityId != undefined) {
                $.each(sellerBranchExcityId, function(k, v) {
                    var sellerBranchExcityObj = {
                        "class": ["offerExcludeConfig"],
                        "rel": ["offerExcludeConfigRep"],
                        "properties": {
                            "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                            "levelId": v,
                            "levelType": "CITY"
                        }
                    }

                    $scope.sellerBranchLevelArray[sellerbranchId][0].entities.push(sellerBranchExcityObj);
                })
            }
            if (sellerBranchExCategoryId != undefined) {
                $.each(sellerBranchExCategoryId, function(k, v) {
                    var sellerBranchExCategoryObj = {
                        "class": ["offerExcludeConfig"],
                        "rel": ["offerExcludeConfigRep"],
                        "properties": {
                            "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                            "levelId": v,
                            "levelType": "CATEGORY"

                        }
                    }

                    $scope.sellerBranchLevelArray[sellerbranchId][0].entities.push(sellerBranchExCategoryObj);
                })
            }
            if (sellerBranchExProductId != undefined) {
                $.each(sellerBranchExProductId, function(k, v) {
                    var sellerBranchExProductObj = {
                        "class": ["offerExcludeConfig"],
                        "rel": ["offerExcludeConfigRep"],
                        "properties": {
                            "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                            "levelId": v,
                            "levelType": "PRODUCT"
                        }
                    }
                    $scope.sellerBranchLevelArray[sellerbranchId][0].entities.push(sellerBranchExProductObj);
                })
            }
            $scope.sellerBranchExCityLevel = false;
            $scope.sellerBranchExCategoryLevel = false;
            $scope.sellerBranchExProductLevel = false;
            $scope.sellerBranchLevelDetails = false;
            $scope.stateId = '';
            $scope.cityId = '';
            $scope.sellerbranchId = '';
        }
    }

    $scope.getAddSellerBranchLevelDetails = function() {
        $(".select2_demo_2").val(null).trigger('change.select2');
        $scope.sellerBranchLevelDetails = true;
        $scope.stateId = '';
        $scope.cityId = '';
        $scope.sellerbranchId = '';

    }

    $scope.getCloseSellerBranchLevel = function() {

        $scope.sellerBranchLevel = false;
        $scope.levelId = '';
    }
    $scope.getDeleteSellerBranchLevel = function(sellerbranchId) {
        delete $scope.sellerBranchLevelArray[sellerbranchId];
    }
    $scope.getSellerBranchLevelFormClose = function() {
        $scope.sellerBranchLevelDetails = false;
        $scope.stateId = '';
        $scope.cityId = '';
        $scope.sellerbranchId = '';
    }


    /*End Seller Branch Level Offer Applied Code*/

    $scope.cityLevel = false;
    $scope.cityLevelDetails = true;
    $scope.sellerBranchLevel = false;
    $scope.sellerBranchLevelDetails = true;
    $scope.categoryLevel = false;
    $scope.sellerCategoryLevel = false;
    $scope.productLevel = false;
    $scope.sellerProductLevel = false;
    $scope.billamountLevel = false;
    $scope.getLevelType = function(levelType) {
        switch (levelType) {
            case 'CITY':
                $scope.cityLevel = true;
                $scope.cityLevelDetails = true;
                break;
            case 'ZONE(SELLER)':
                $scope.sellerBranchLevel = true;
                $scope.sellerBranchLevelDetails = true;

                break;
            case 'CATEGORY':
                $scope.categoryLevel = true;
                break;
            case 'SELLER_CATEGORY':
                $scope.sellerCategoryLevel = true;
                break;
            case 'PRODUCT':
                $scope.productLevel = true;
                break;
            case 'SELLER_PRODUCT':
                $scope.sellerProductLevel = true;
                break;
            case 'BILLAMOUNT':
                $scope.billamountLevel = true;
                break;
        }
    }


    /*Excludes For Category level*/
    $scope.sellerBranchExcludesInCategoryLevel = false;
    $scope.cityExcludesInCategoryLevel = false;
    $scope.productExcludesInCategoryLevel = false;
    $scope.getExcludesCategoryLevelType = function(levelType) {
        switch (levelType) {
            case 'SELLER':
                $scope.sellerBranchExcludesInCategoryLevel = true;
                break;
            case 'CITY':
                $scope.cityExcludesInCategoryLevel = true;
                break;
            case 'PRODUCT':
                $scope.productExcludesInCategoryLevel = true;
                break;

        }

    }
    $scope.getCategorySellerBranchExcludeClose = function() {

        $scope.sellerBranchExcludesInCategoryLevel = false;

    }
    $scope.getCategoryCityExcludeClose = function() {

        $scope.cityExcludesInCategoryLevel = false;
    }
    $scope.getCategoryProductExcludeClose = function() {

        $scope.productExcludesInCategoryLevel = false;
    }

    /*Excludes For Product level*/
    $scope.sellerBranchExcludesInProductLevel = false;
    $scope.cityExcludesInProductLevel = false;
    $scope.categoryExcludesInProductLevel = false;
    $scope.getExcludesProductLevelType = function(levelType) {
        switch (levelType) {
            case 'SELLER':
                $scope.sellerBranchExcludesInProductLevel = true;
                break;
            case 'CITY':
                $scope.cityExcludesInProductLevel = true;
                break;
            case 'CATEGORY':
                $scope.categoryExcludesInProductLevel = true;
                break;

        }

    }
    $scope.getProductSellerBranchExcludeClose = function() {

        $scope.sellerBranchExcludesInProductLevel = false;

    }
    $scope.getProductCityExcludeClose = function() {

        $scope.cityExcludesInProductLevel = false;
    }
    $scope.getProductCategoryExcludeClose = function() {

        $scope.categoryExcludesInProductLevel = false;
    }



    /*Creation Functionality*/
    $scope.getOfferConfigCreation = function(offerFulfillmentData, categoryLevelCategoryId, productLevelProductId, categorySellerBranchExcludeId, categoryCityExcludeId, categoryProductExcludeId, productSellerBranchExcludeId, productCityExcludeId, productCategoryExcludeId) {
        let offerObj = {
            "class": ["offerFulfillment"],
            "rel": ["item"],

            "properties": {
                "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferFulfillmentRepresentation",
                "id": offerFulfillmentData.offerFulfillmentId
            }

        }
        offerObj.entities = [];
        $.each($scope.cityLevelArray, function(k, v) {

            offerObj["entities"].push(v[0]);

        })
        $.each($scope.sellerBranchLevelArray, function(k, v) {

            offerObj["entities"].push(v[0]);

        })

        /*Start Category COnfig And Excludes*/
        if (categoryLevelCategoryId != undefined) {
            let categoryIncludeObj = {};
            categoryIncludeObj['entities'] = [];
            $.each(categoryLevelCategoryId, function(k, v) {
                categoryIncludeObj["class"] = ["offerConfig"],
                    categoryIncludeObj["rel"] = ["offerConfigRep"],
                    categoryIncludeObj["properties"] = {
                        "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferConfigRepresentation",
                        "levelId": v,
                        "levelType": "CATEGORY"
                    }
            })
            if (categorySellerBranchExcludeId != undefined) {
                $.each(categorySellerBranchExcludeId, function(k, v) {
                    var categorySellerBranchExcludeObj = {
                        "class": ["offerExcludeConfig"],
                        "rel": ["offerExcludeConfigRep"],
                        "properties": {
                            "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                            "levelId": v,
                            "levelType": "SELLER"
                        }
                    }
                    categoryIncludeObj['entities'].push(categorySellerBranchExcludeObj);
                })
            }

            if (categoryCityExcludeId != undefined) {
                $.each(categoryCityExcludeId, function(k, v) {
                    var categoryCityExcludeObj = {
                        "class": ["offerExcludeConfig"],
                        "rel": ["offerExcludeConfigRep"],
                        "properties": {
                            "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                            "levelId": v,
                            "levelType": "CITY"
                        }
                    }
                    categoryIncludeObj['entities'].push(categoryCityExcludeObj);
                })
            }
            if (categoryProductExcludeId != undefined) {
                $.each(categoryProductExcludeId, function(k, v) {
                    var categoryProductExcludeObj = {
                        "class": ["offerExcludeConfig"],
                        "rel": ["offerExcludeConfigRep"],
                        "properties": {
                            "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                            "levelId": v,
                            "levelType": "PRODUCT"
                        }
                    }
                    categoryIncludeObj['entities'].push(categoryProductExcludeObj);
                })
            }
            offerObj["entities"].push(categoryIncludeObj);
        }
        /*End Category COnfig And Excludes*/

        /*Start Product COnfig And Excludes*/
        if (productLevelProductId != undefined) {
            let productIncludeObj = {};
            productIncludeObj['entities'] = [];
            $.each(productLevelProductId, function(k, v) {
                productIncludeObj["class"] = ["offerConfig"],
                    productIncludeObj["rel"] = ["offerConfigRep"],
                    productIncludeObj["properties"] = {
                        "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferConfigRepresentation",
                        "levelId": v,
                        "levelType": "PRODUCT"
                    }
            })
            if (productSellerBranchExcludeId != undefined) {
                $.each(productSellerBranchExcludeId, function(k, v) {
                    var productSellerExcludeObj = {
                        "class": ["offerExcludeConfig"],
                        "rel": ["offerExcludeConfigRep"],
                        "properties": {
                            "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                            "levelId": v,
                            "levelType": "SELLER"
                        }
                    }
                    productIncludeObj['entities'].push(productSellerExcludeObj);
                })
            }

            if (productCityExcludeId != undefined) {
                $.each(productCityExcludeId, function(k, v) {
                    var productCityExcludeObj = {
                        "class": ["offerExcludeConfig"],
                        "rel": ["offerExcludeConfigRep"],
                        "properties": {
                            "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                            "levelId": v,
                            "levelType": "CITY"
                        }
                    }
                    productIncludeObj['entities'].push(productCityExcludeObj);
                })
            }
            if (productCategoryExcludeId != undefined) {
                $.each(productCategoryExcludeId, function(k, v) {
                    var productCategoryExcludeObj = {
                        "class": ["offerExcludeConfig"],
                        "rel": ["offerExcludeConfigRep"],
                        "properties": {
                            "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferExcludeConfigRepresentation",
                            "levelId": v,
                            "levelType": "CATEGORY"
                        }
                    }
                    productIncludeObj['entities'].push(productCategoryExcludeObj);
                })
            }
            offerObj["entities"].push(productIncludeObj);
        }
        /*End Product COnfig And Excludes*/


        if (offerObj.entities.length == 0) {
            var offerObjExcludeObj = {
                "class": ["offerConfig"],
                "rel": ["offerConfigRep"],
                "properties": {
                    "$siren4j.class": "com.arthvedi.bnv.offer.representation.siren.OfferConfigRepresentation",
                    "discountType": offerFulfillmentData.discountType,
                    "maxDiscount": offerFulfillmentData.maxDiscount + '',
                    "isStandalone": "NONSTANDALONE",
                    "endDate": offerFulfillmentData.endDate,
                    "maxUses": offerFulfillmentData.maxUses + '',
                    "maxUsesPerCustomer": offerFulfillmentData.maxUsesPerCustomer + '',
                    "orderCount": offerFulfillmentData.orderCount,
                    "offerFulfillmentId": offerFulfillmentData.offerFulfillmentId,
                    "offerLongDescription": offerFulfillmentData.offerLongDescription,
                    "offerName": offerFulfillmentData.offerName,
                    "offerShortDescription": offerFulfillmentData.offerShortDescription,
                    "orderType": offerFulfillmentData.orderType,
                    "isCoupon": offerFulfillmentData.isCoupon,
                    "couponCode": offerFulfillmentData.couponCode,
                    "seoDescription": offerFulfillmentData.seoDescription,
                    "seoKeyword": offerFulfillmentData.seoKeyword,
                    "seoTitle": offerFulfillmentData.seoTitle,
                    "startDate": offerFulfillmentData.startDate,
                    "contributionAmountType": offerFulfillmentData.contributionAmountType + '',
                    "thirdPartyContributionAmount": offerFulfillmentData.thirdPartyContributionAmount + '',
                    "bnvContributionAmount": offerFulfillmentData.bnvContributionAmount + ''

                }
            }
            offerObj["entities"].push(offerObjExcludeObj);

        } else {
            $.each(offerObj['entities'], function(k, v) {
                delete v['$$hashKey'];
                if (v != undefined) {
                    v['properties']['discountType'] = offerFulfillmentData.discountType;
                    v['properties']['maxDiscount'] = offerFulfillmentData.maxDiscount + '';
                    v['properties']['isStandalone'] = "NONSTANDALONE";
                    v['properties']['endDate'] = offerFulfillmentData.endDate;
                    v['properties']['orderCount'] = offerFulfillmentData.orderCount;
                    v['properties']['maxUses'] = offerFulfillmentData.maxUses + '';
                    v['properties']['maxUsesPerCustomer'] = offerFulfillmentData.maxUsesPerCustomer + '';
                    v['properties']['offerFulfillmentId'] = offerFulfillmentData.offerFulfillmentId;
                    v['properties']['offerLongDescription'] = offerFulfillmentData.offerLongDescription
                    v['properties']['offerName'] = offerFulfillmentData.offerName;
                    v['properties']['isCoupon'] = offerFulfillmentData.isCoupon,
                        v['properties']['couponCode'] = offerFulfillmentData.couponCode,
                        v['properties']['offerShortDescription'] = offerFulfillmentData.offerShortDescription;
                    v['properties']['orderType'] = offerFulfillmentData.orderType;
                    v['properties']['seoDescription'] = offerFulfillmentData.seoDescription;
                    v['properties']['seoKeyword'] = offerFulfillmentData.seoKeyword;
                    v['properties']['seoTitle'] = offerFulfillmentData.seoTitle;
                    v['properties']['startDate'] = offerFulfillmentData.startDate;
                    v['properties']['contributionAmountType'] = offerFulfillmentData.contributionAmountType + '';
                    v['properties']['thirdPartyContributionAmount'] = offerFulfillmentData.thirdPartyContributionAmount + '';
                    v['properties']['bnvContributionAmount'] = offerFulfillmentData.bnvContributionAmount + '';

                } else {
                    offerObj['entities'].splice(k, 1);
                }

            })
        }
        console.log(JSON.stringify(offerObj));
        var data = JSON.stringify(offerObj);
        // loadingView.startLoading("show");
        $rootScope.show_load = true;
        processReqFactory.processReq("/offerfulfillment/" + offerFulfillmentData.offerFulfillmentId + "/addofferconfig", "PUT", data, function(response) {
            // loadingView.startLoading('hide');
            $rootScope.show_load = false;
            var createStatus = response['properties'].statusMessage.split(':::')
            if (createStatus[0] == 'FAILURE') {
                swal({ title: "Error!", text: createStatus[1], type: "success", confirmButtonText: "Ok" });
            } else {
                swal({ title: "Success!", text: createStatus[1], type: "success", confirmButtonText: "Ok" });
                $state.go('offers.offersConfigList')
            }
        }, function(error) {
            // loadingView.startLoading('hide');
            $rootScope.show_load = false;
            swal({ title: "Error!", text: 'Offer Not Created', type: "warning", confirmButtonText: "Ok" });
        });
    }
}

function OfferConfigListController($scope, $rootScope, loadingView, baseURL, dataTablesInitService, processReqFactory, notifyAlertMessage) {
    // loadingView.startLoading("show");
    $rootScope.show_load = true;
    $scope.noOfferConfig = false;
    var url =
        processReqFactory.processReq(baseURL.IP + "/offerconfig/all", "GET", '', function(data) {
            // loadingView.startLoading("hide");
            $rootScope.show_load = false;
            // if(data.entities){

            var columns = [
                { "data": "name" },
                { "data": "couponCodes" },
                { "data": "maxUses" },
                { "data": "maxUsesPerCustomer" },
                { "data": "priorityCode" },
                { "data": "towards" },
                {
                    "data": "status",
                    "render": function(data, type, row, meta) {
                        return data ? data : 'NA';
                    }
                },
                // { "data": "offerAppliedStatus" },
                {
                    "data": "id",
                    "orderable": false,
                    "searchable": false,
                    "render": function(data, type, row, meta) {
                        var a = '<a class="rd dtview" href="/#/offers/offersConfigView/' + row.offerName + '/' + data + '">View</a>'
                        return a;
                    }
                }
            ];

            dataTablesInitService.initDataTables(data, columns, '#offersConfigTable', '', $scope);

            // }else{
            // 	$scope.noOfferConfig=true
            // }
        }, function(error) {
            notifyAlertMessage.notify("Something went wrong", "alert-sucess")
            // loadingView.startLoading("hide");
            $rootScope.show_load = false;
        });
}


function OfferConfigViewController($scope, $stateParams, $rootScope, loadingView, processReqFactory, notifyAlertMessage) {
    $scope.editOfferConfig = true
    $scope.offerConfigId = $stateParams.offerConfigId
    $scope.offerConfigName = $stateParams.offerConfigName
    // for getting single purchase Order  data
    $scope.setInitialData = function() {
        // loadingView.startLoading('show');
        $rootScope.show_load = true;
        processReqFactory.processReq("/offerconfig/" + $scope.offerConfigId, "GET", '', function(success) {
            $scope.offerConfigDetails = ''
            $scope.offerConfigDetails = success
            $scope.offerConfigName = $scope.offerConfigDetails['properties'].offerType;
            // loadingView.startLoading('hide');
            $rootScope.show_load = false;
        }, function(error) {
            // loadingView.startLoading('hide');
            $rootScope.show_load = false;
            notifyAlertMessage.notify("Server Error", "alert-danger")
        });
    }
    $scope.offerConfigEdit = function(offerConfigDetails) {
        $scope.getOffersEditDetails = angular.copy(offerConfigDetails);
        $scope.editOfferConfig = false;
    }
    $scope.cancelEdit = function() {
        $scope.offerConfigDetails = $scope.getOffersEditDetails;
        $scope.editOfferConfig = true;
    }

    $scope.getUpdateOfferConfigDetails = function(updateOfferConfigDetails) {
        $scope.editOfferObj = updateOfferConfigDetails;
        processReqFactory.processReq("/offerconfig/" + updateOfferConfigDetails['properties'].id + "/edit", "PUT", $scope.editOfferObj, function(response) {
            var responseData = response['properties'].statusMessage.split(':::')
            if (response['properties'].statusMessage[0] == "FAILURE") {
                notifyAlertMessage.notify(responseData[1], "alert-warning")


            } else {
                $scope.setInitialData();
                notifyAlertMessage.notify("offerConfig  Updated", "alert-sucess")
                $scope.editOfferConfig = true
            }
        }, function() {
            notifyAlertMessage.notify("offerConfig Not Updated", "alert-danger")
            $scope.editOfferConfig = false
        });
    }

    $scope.getOfferConfigApply = function(offerconfig) {
        $scope.applyOfferObj = offerconfig;
        processReqFactory.processReq("/sellerproductoffer/offerconfig/" + offerconfig['properties'].id, "GET", $scope.applyOfferObj, function(response) {
            var responseData = response['properties'].statusMessage.split(':::')
            if (response['properties'].statusMessage[0] == "FAILURE") {
                notifyAlertMessage.notify(responseData[1], "alert-warning")


            } else {
                $scope.setInitialData();
                notifyAlertMessage.notify("offer applied  Updated", "alert-sucess")

            }
        }, function() {
            notifyAlertMessage.notify("offer applied Not Updated", "alert-danger")

        });
    }
    $scope.getOfferConfigRemove = function(offerconfig) {
        $scope.applyOfferObj = offerconfig;
        processReqFactory.processReq("/sellerproductoffer/offerconfig/" + offerconfig['properties'].id + '?oas=remove', "GET", $scope.applyOfferObj, function(response) {
            var responseData = response['properties'].statusMessage.split(':::')
            if (response['properties'].statusMessage[0] == "FAILURE") {
                notifyAlertMessage.notify(responseData[1], "alert-warning")


            } else {
                $scope.setInitialData();
                notifyAlertMessage.notify("offer applied  Updated", "alert-sucess")

            }
        }, function() {
            notifyAlertMessage.notify("offer applied Not Updated", "alert-danger")

        });
    }

}

function OffersViewController($scope, $stateParams, $rootScope, loadingView, baseURL, processReqFactory, notifyAlertMessage) {
    $scope.editOffers = true
    $scope.offerId = $stateParams.offerId
    $scope.offerName = $stateParams.offerName
    // for getting single purchase Order  data
    $scope.setInitialData = function() {
        // loadingView.startLoading('show');
        $rootScope.show_load = true;
        processReqFactory.processReq(baseURL.IP + "/offerfullfillment/" + $scope.offerId, "GET", '', function(success) {
            $scope.offerDetails = '';
            $scope.offerDetails = success;
            // loadingView.startLoading('hide');
            $rootScope.show_load = false;
        }, function(error) {
            // loadingView.startLoading('hide');
            $rootScope.show_load = false;
            notifyAlertMessage.notify("Server Error", "alert-danger");
        });
    }
    $scope.offersEdit = function(offerDetails) {
        $scope.getOffersEditDetails = angular.copy(offerDetails);
        $scope.editOffers = false;
    }
    $scope.cancelEdit = function() {
        $scope.offerDetails = $scope.getOffersEditDetails;
        $scope.editOffers = true;
    }

    $scope.getUpdateOfferDetails = function(updateOfferDetails) {
        $scope.editOfferObj = updateOfferDetails;
        processReqFactory.processReq("/offerfulfillment/" + updateOfferDetails['properties'].id + "/edit", "PUT", $scope.editOfferObj, function(response) {
            var responseData = response['properties'].statusMessage.split(':::')
            if (response['properties'].statusMessage[0] == "FAILURE") {
                notifyAlertMessage.notify(responseData[1], "alert-warning")


            } else {
                $scope.setInitialData();
                notifyAlertMessage.notify("offerfulfillment  Updated", "alert-sucess")
                $scope.editOffers = true
            }
        }, function() {
            notifyAlertMessage.notify("offerfulfillment Not Updated", "alert-danger")
            $scope.editOffers = false
        });
    }

}

function OfferFullfillmentCreationController($scope, $state, $stateParams, baseURL, $rootScope, loadingView, processReqFactory, notifyAlertMessage) {
    $scope.uomList = function() {
        var unitOfMeasurementUrl = baseURL.IP + "/unitOfMeasurement/all"
        processReqFactory.processReq(unitOfMeasurementUrl, "GET", '', function(data) {
            $scope.uomArray = data
        }, function(error) {
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong", "alert-danger")
        });
    }();

    // $scope.varientsArray = [];

    // $scope.adLevel = function(mainObj){
    // 	var addLevelObj ={
    // 		"buyLevelType":"",
    // 		"buyLevelName":"",
    // 		"getLevelType":"",
    // 		"getLevelName":"",
    // 		"isActive":"",
    // 	}
    // 	mainObj.child.push(addLevelObj);
    // }

    // $scope.addConfig = function(){
    // 	var configObj = {
    // 		"name":"",
    // 		"priorityCode":"",
    // 		"towards":"",
    // 		"couponCodes":"",
    // 		"maxUsesPerCustomer":"",
    // 		"maxUses":""
    // 	}
    // 	configObj.child = []
    // 	$scope.adLevel(configObj)
    // 	$scope.varientsArray.push(configObj);
    // }
    // $scope.addConfig();

    // $scope.removeConfig = function(indx){
    // 	$scope.varientsArray.splice(indx,1)
    // }

    // $scope.removeChild = function(parentIndx,indx){
    // 	$scope.varientsArray[parentIndx].child.splice(indx,1)
    // }

    $scope.goBack = function(){
      	window.history.back();
  	}

    $scope.getOfferFullmentCreate = function(offerdata) {
        var offerFullFillData = {
            "name": offerdata.name,
            "code": offerdata.code,
            "towards": offerdata.towards,
            "isActive": offerdata.isActive,
            "buyMinOrderQuantity": offerdata.buyMinOrderQuantity,
            "buyMinOrderAmount": offerdata.buyMinOrderAmount,
            "buyMinUom": offerdata.buyMinUom,
            "discountType": offerdata.discountType,
            "discount": offerdata.discount + '',
            "getDiscountType": offerdata.getDiscountType,
            "getOrderAmount": offerdata.getOrderAmount,
            "getOrderQuantity": offerdata.getOrderQuantity,
            "maxDiscount": offerdata.maxDiscount
        }
        loadingView.startLoading("show");
        // $rootScope.show_load = true;
        processReqFactory.processReq(baseURL.IP + "/offerfullfillment/create", "POST", offerFullFillData, function(response) {
            loadingView.startLoading('hide');
            // $rootScope.show_load = false;
            if (!response.id) {
                // swal({   title: "Error!",  text: 'Creation Failed',   type: "success",   confirmButtonText: "Ok" });
                notifyAlertMessage.notify('Offer Creation Failed', "alert-danger");
            } else {
                // swal({   title: "Success!",  text: 'Creation Success',   type: "success",   confirmButtonText: "Ok" });
                notifyAlertMessage.notify('Offer Created successfully', "alert-sucess");
                setTimeout(function() {
                    $state.go('offer.offerlist');
                }, 2000);
            }
        }, function(error) {
            loadingView.startLoading('hide');
            // $rootScope.show_load = false;
            swal({ title: "Error!", text: 'Offer Not Created', type: "warning", confirmButtonText: "Ok" });
        });
    }
}


function OfferFullfillmentConfigCreationController($scope, $state, $stateParams, $rootScope, loadingView, processReqFactory, baseURL, notifyAlertMessage) {
    $scope.configInArray = [];
    $scope.conInclude = function() {
        var configincludeObj = {
            "name": "",
            "priorityCode": "",
            "towards": "",
            "couponCodes": "",
            "maxUsesPerCustomer": "",
            "maxUses": "",
            "fullfillmentId": "",
        }
        $scope.configInArray.push(angular.copy(configincludeObj));
    }();
    // $scope.conInclude();

    $scope.removeconiclude = function(indx) {
        $scope.configInArray.splice(indx, 1)
    }

    $scope.goBack = function() {
        window.history.back();
    }
    
    $scope.configExArray = [];
    $scope.conExclude = function() {
        var configexcludeObj = {
            "name": "",
            "priorityCode": "",
            "towards": "",
            "couponCodes": "",
            "maxUsesPerCustomer": "",
            "maxUses": "",
            "fullfillmentId": "",
        }
        $scope.configExArray.push(configexcludeObj);
    }
    $scope.conExclude();

    $scope.removeconexclude = function(indx) {
        $scope.configExArray.splice(indx, 1)
    }

    // $scope.removeChild = function(parentIndx,indx){
    // 	$scope.configInArray[parentIndx].child.splice(indx,1)
    // }



    processReqFactory.processReq(baseURL.IP + "/offerfullfillment/all", "GET", '', function(response) {
        $scope.fulfillmentList = response;
    }, function(error) {
        notifyAlertMessage.notify("Something went wrong", "alert-sucess");
    });


    $scope.configSave = function(configObj) {
        configObj.startDate = configObj.startDate.split('/')[1] + '-' + configObj.startDate.split('/')[0] + '-' + configObj.startDate.split('/')[2] + " 00:00:00";
        configObj.endDate = configObj.endDate.split('/')[1] + '-' + configObj.endDate.split('/')[0] + '-' + configObj.endDate.split('/')[2] + " 23:59:00";

        var offerConfigData = {
            "name": configObj.name,
            "couponCodes": configObj.couponCodes,
            "towards": configObj.towards,
            "isActive": configObj.isActive,
            "priorityCode": configObj.priorityCode,
            "fullfillmentId": configObj.fullfillmentId,
            "maxUses": configObj.maxUses,
            "maxUsesPerCustomer": configObj.maxUsesPerCustomer,
            "startDate": configObj.startDate,
            "endDate": configObj.endDate
        }
        loadingView.startLoading("show");
        // $rootScope.show_load = true;
        processReqFactory.processReq(baseURL.IP + "/offerconfig/create", "POST", offerConfigData, function(response) {
            loadingView.startLoading('hide');
            // $rootScope.show_load = false;
            if (!response.id) {
                notifyAlertMessage.notify('Offer Config Creation Failed', "alert-danger");
            } else {
                notifyAlertMessage.notify('Offer Config Created successfully', "alert-sucess");
                setTimeout(function() {
                    $state.go('offer.offerconfiglist');
                }, 2000);
            }
        }, function(error) {
            loadingView.startLoading('hide');
            // $rootScope.show_load = false;
            // swal({   title: "Error!",  text: 'Offer Not Created',   type: "warning",   confirmButtonText: "Ok" });
            notifyAlertMessage.notify('Offer Config Creation Failed', "alert-danger");
        });
    }
}

function OfferFullfillmentListController($scope, $rootScope, loadingView, dataTablesInitService, baseURL, processReqFactory, notifyAlertMessage) {
    $scope.noOfferFulfillment = false;
    $scope.showOfferFulfillment = true;
    // loadingView.startLoading("show");
    $rootScope.show_load = true;
    var url = baseURL.IP + "/offerfullfillment/all"
    processReqFactory.processReq(url, "GET", '', function(response) {
        // loadingView.startLoading("hide");
        $rootScope.show_load = false;
        if (response) {
            var columns = [
                { "data": "name" },
                { "data": "code" },
                { "data": "towards" },
                { "data": "buyMinOrderAmount" },
                {
                    "data": "buyMinUom",
                    "render": function(data, type, row, meta) {
                        return (row.towards == 'INVOICE') ? 'NA' : data
                    }
                },
                {
                    "data": "discount",
                    "render": function(data, type, row, meta) {
                        return (data) ? data : 0.0
                    }
                },
                { "data": "discountType" },
                {
                    "data": "getDiscountType",
                    "render": function(data, type, row, meta) {
                        return (data == 'CASHBACK') ? data : "DIRECT"
                    }
                },
                {
                    "data": "getOrderAmount",
                    "render": function(data, type, row, meta) {
                        return (row.towards == 'BXGY') ? data : 0.0
                    }
                },
                {
                    "data": "getOrderQuantity",
                    "render": function(data, type, row, meta) {
                        return (row.towards == 'BXGY') ? data : 0.0
                    }
                },
                {
                    "data": "id",
                    "orderable": false,
                    "searchable": false,
                    "render": function(data, type, row, meta) {
                        var a = '<a class="rd dtview" href="./#/offer/offerview/' + row.discountType + '/' + data + '">View</a>'
                        return a;
                    }
                }
            ];
            dataTablesInitService.initDataTables(response, columns, '#offerFulfillmentList', '', $scope);
            $scope.noOfferFulfillment = false;
            $scope.showOfferFulfillment = true;

        } else {
            $scope.noOfferFulfillment = true;
            $scope.showOfferFulfillment = false;
        }
    }, function(error) {
        notifyAlertMessage.notify("Something went wrong", "alert-sucess")
        // loadingView.startLoading("hide");
        $rootScope.show_load = false;
    });
}

function offerAssortmentController() {

}

function OfferAssortmentCreationController($rootScope, $scope, baseURL, notifyAlertMessage, loadingView, processReqFactory, $state) {

    //  config list
    processReqFactory.processReq(baseURL.IP + "/offerconfig/all", "GET", '', function(data) {
        $scope.offerconfigObj = data;
    }, function(error) {
        notifyAlertMessage.notify("Something went wrong", "alert-sucess");
    });
    // for State list
    processReqFactory.processReq(baseURL.IP + '/state/all', 'GET', '', function(response) {
        $scope.stateListObj = response;
    }, function(error) {
        notifyAlertMessage.notify("State List Not Available", "alert-danger")
    })
    // For Category List
    processReqFactory.processReq(baseURL.IP + '/category/all', 'GET', '', function(success) {
        $scope.categoriesObj = success;
    }, function(error) {
        notifyAlertMessage.notify("Category List Not Available", "alert-danger")
    })
    //For Product List 
    processReqFactory.processReq(baseURL.IP + '/product/all', 'GET', '', function(success) {
        $scope.productsObj = success;
    }, function(error) {
        notifyAlertMessage.notify("Product List Not Available", "alert-danger")
    })
    // for City list
    processReqFactory.processReq(baseURL.IP + '/city/all', 'GET', '', function(response) {
        $scope.citiesObj = response;
    }, function(error) {
        notifyAlertMessage.notify("city List Not Available", "alert-danger")
    })
    // for Brand list
    processReqFactory.processReq(baseURL.IP + '/brand/all', 'GET', '', function(response) {
        $scope.brandsListObj = response;
    }, function(error) {
        notifyAlertMessage.notify("city List Not Available", "alert-danger")
    })
    // for users list
    processReqFactory.processReq(baseURL.IP + '/users/all', 'GET', '', function(response) {
        $scope.usersListObj = response;
    }, function(error) {
        notifyAlertMessage.notify("city List Not Available", "alert-danger")
    })


    $scope.configInArray = [];
    $scope.conInclude = function() {
        var configincludeObj = {
            "buyLevelName": "",
            "buyLevelType": "",
            "buyName": "",
            "getLevelName": "",
            "getLevelType": "",
        }
        $scope.configInArray.push(angular.copy(configincludeObj));
    };
    $scope.conInclude();

    $scope.removeconiclude = function(indx) {
        $scope.configInArray.splice(indx, 1)
    }

    $scope.configExArray = [];
    $scope.conExclude = function() {
        var configexcludeObj = {
            "levelName": "",
            "levelType": "",
            "levelTypeName": "",
        }
        $scope.configExArray.push(configexcludeObj);
    }
    $scope.conExclude();

    $scope.removeconexclude = function(indx) {
        $scope.configExArray.splice(indx, 1)
    }

    $scope.goBack = function() {
        window.history.back();
    }


    $scope.assortmentSave = function(assortData) {
        assortData['configExcludeModels'] = $scope.configExArray;

        if ($scope.configInArray.length > 0) {
            for (var ci in $scope.configInArray) {
                $scope.configInArray[ci]['buyName'] = $scope.configInArray[ci]['buyLevelName'].split('-')[1];
                $scope.configInArray[ci]['buyLevelName'] = $scope.configInArray[ci]['buyLevelName'].split('-')[0];
                // if ($scope.configInArray[ci]['getLevelName']) {} 
            }
        }
        assortData['configIncludeModels'] = $scope.configInArray;
        console.log(assortData)
        loadingView.startLoading("show");
        // $rootScope.show_load = true;
        processReqFactory.processReq(baseURL.IP + "/offerconfig/" + assortData.id + "/edit", "PUT", assortData, function(response) {
            loadingView.startLoading('hide');
            // $rootScope.show_load = false;
            if (!response.id) {
                notifyAlertMessage.notify('Offer Creation Failed', "alert-danger");
            } else {
                notifyAlertMessage.notify('Offer Created successfully', "alert-sucess");
                setTimeout(function() {
                    $state.go('offer.assortment');
                }, 2000);
            }
        }, function(error) {
            loadingView.startLoading('hide');
            // $rootScope.show_load = false;
            // swal({   title: "Error!",  text: 'Offer Not Created',   type: "warning",   confirmButtonText: "Ok" });
            notifyAlertMessage.notify('Offer Creation Failed', "alert-danger");
        });
    }
}

angular
    .module("distapp")
    .controller("OfferConfigCreationController", OfferConfigCreationController)
    .controller("OfferConfigListController", OfferConfigListController)
    .controller("OfferConfigViewController", OfferConfigViewController)
    .controller("OffersViewController", OffersViewController)
    .controller("OfferFullfillmentCreationController", OfferFullfillmentCreationController)
    .controller("OfferFullfillmentConfigCreationController", OfferFullfillmentConfigCreationController)
    .controller("OfferFullfillmentListController", OfferFullfillmentListController)
    .controller("offerAssortmentController", offerAssortmentController)
    .controller("OfferAssortmentCreationController", OfferAssortmentCreationController)