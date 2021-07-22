/*Category Controller*/
function categoryController($rootScope,$scope,$http,$modal,baseURL,notifyAlertMessage,processReqFactory,dataTablesInitService,loadingView,$state, pageRole, rolesView){
      
  
  // console.log($state.current.name);
  // pageRole.newserve().then(function(response){
  //   // console.log(response);
  //   for(urldata in response.data){
  //     if (response.data[urldata]['route']) {
  //       if ($state.current.name == response.data[urldata]['route']) {
  //         $scope.checkingRole = response.data[urldata]['roles']
  //       }
  //     }else{
  //       for(suburldata in response.data[urldata]['submenu']){
  //         if ($state.current.name == response.data[urldata]['submenu'][suburldata]['route']) {
  //           $scope.checkingRole = response.data[urldata]['submenu'][suburldata]['roles'];
  //         }
  //       }
  //     }
  //   }
  // })

  $scope.categoryRole = rolesView.controlRole($state.current.name);
  console.log($scope.categoryRole);
  $scope.getCategoryList = function(param){
    loadingView.startLoading('show');
    
      processReqFactory.processReq(baseURL.IP+"/category/all","GET",'',function(response){
        loadingView.startLoading('hide');

          var columns = [
          { "data": "name" },
          { "data": "parentName",
            "render": function(data,type,row,meta){
              return data? data : row.name
            }
          },
          { "data": "isActive",
            "render": function(data,type,row,meta) {
            return (data == true)?'ACTIVE':'INACTIVE'
          }
           },
          { "data": "id",
            "orderable": false,
            "searchable": false,   
            "render": function(data,type,row,meta) {
              var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addOrUpdateCategory(\''+data+'\')\">VIEW</a>'
              return a;
            }
          }
        ];
        dataTablesInitService.initDataTables(response,columns,'#categoryTable','' ,$scope);
      // }else{
        $scope.categoryListJson = response;
      // }
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  }
  
  // for add and update category modal
  $scope.addOrUpdateCategory = function(id){
    $scope.catImageData = undefined;
    // $scope.getCategoryList();
    $scope.updateSave = (id?false:true);
    loadingView.startLoading('show');
      if($scope.updateSave == false){

          processReqFactory.processReq(baseURL.IP+"/category/"+id,"GET",'',function(data){
            loadingView.startLoading('hide');
            data.isActive = data.isActive + '';
            $scope.categoryData = data
          // $scope.modalInstance = $modal.open({
          //   templateUrl: 'views/product/addCategoryTemplate.html',
          //   // controller: ModalInstanceCtrl,
          //   size: 'md',
          //   scope:$scope
          // });

            $('#addCategoryModal').modal();
        },function(error){
          loadingView.startLoading('hide');
          notifyAlertMessage.notify("Something went Wrong","alert-danger")
        });
      }else{
        loadingView.startLoading('hide');
        $scope.categoryData = {}
        // $scope.modalInstance = $modal.open({
        //   templateUrl: 'views/product/addCategoryTemplate.html',
        //   // controller: ModalInstanceCtrl,
        //   size: 'md',
        //   scope:$scope
        // });
        $('#addCategoryModal').modal();
      }
  }

  $scope.imagesUploadObj = [];
  // for upload image
    $scope.categoryImage = function(el,index,Type) {
      $scope.bytes = el.files[0];
      var imageType=$scope.bytes.type;
      var imgType=imageType.substring(0,5);
      var formData = new FormData();
      formData.append('file', $scope.bytes);
      formData.append('entityType','category');
      if(imgType == "image"){
        $.ajax({
        type: "POST",
        url:baseURL.IP+'/uploadfile/image',
        data:formData,
        headers: {'Authorization': 'Bearer '+sessionStorage.getItem('token')},
        processData: false,
        contentType: false,
        success: function(response) {
          var responseData = response.uploadStatus.split(':::')
            if(responseData[0] != "SUCCESS"){
              notifyAlertMessage.notify(responseData[1],"alert-danger")
            }else{
              $scope.catImageData = response['imageModels'][0]
              notifyAlertMessage.notify(responseData[1],"alert-success")
            }
        },
        error:function(){
            notifyAlertMessage.notify("Image Not Uploaded","alert-danger")
        }
      });
    }else{
      notifyAlertMessage.notify("Please Upload Image","alert-danger")
    }
  }

  $scope.createUpdateCategory = function(data){
    data.companyId = JSON.parse(sessionStorage.getItem('sessionOn'))['companyId'];
    $scope.categoryData = data;
    $scope.categoryData.isActive = JSON.parse(data.isActive);
    var url = baseURL.IP + (data.id ? "/category/"+data.id+"/edit":"/category/create")
    var method = (data.id?"PUT":"POST")
      processReqFactory.processReq(url,method,$scope.categoryData,function(response){
        loadingView.startLoading('hide');
        var response = response;
        if($scope.catImageData){
          var catImgDataUpload = {
              "imageName" : $scope.catImageData.imageName,
              "imageFolder" : $scope.catImageData.imageFolder,
              "imageType" : $scope.catImageData.imageType,
              "isActive" : true,
              "categoryId" : $scope.categoryData.id,
              "orderOfPlace" : '1'
            }
            processReqFactory.processReq(baseURL.IP+'/categoryImages/create','POST',catImgDataUpload,function(catImgRes){
              loadingView.startLoading('hide');
              var alertMessage = (data.id?"Category updated ":"Category created ")
              notifyAlertMessage.notify(alertMessage + " successfully","alert-sucess")
              setTimeout(function(){
                location.reload();
              },3000);
            },function(error){
              loadingView.startLoading('hide');
              notifyAlertMessage.notify("Something went Wrong","alert-danger")
            });
        }else{
          var alertMessage = (data.id?"Category updated ":"Category created ")
          notifyAlertMessage.notify(alertMessage + " successfully","alert-sucess")
          setTimeout(function(){
            location.reload();
          },3000);
        }
      },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
      });
  }
}

angular
  .module('distapp')
  .controller('categoryController',categoryController)