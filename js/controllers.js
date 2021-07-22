
function MainCtrl($rootScope) {

	/**
	 * daterange - Used as initial model for data range picker in Advanced form view
	 */
	this.daterange = {startDate: null, endDate: null}

	/**
	 * slideInterval - Interval for bootstrap Carousel, in milliseconds:
	 */
	this.slideInterval = 5000;


	/**
	 * states - Data used in Advanced Form view for Chosen plugin
	 */
	this.states = [
		'Alabama',
		'Alaska',
		'Arizona',
		'Arkansas',
		'California',
		'Colorado',
		'Connecticut',
		'Delaware',
		'Florida',
		'Georgia',
		'Hawaii',
		'Idaho',
		'Illinois',
		'Indiana',
		'Iowa',
		'Kansas',
		'Kentucky',
		'Louisiana',
		'Maine',
		'Maryland',
		'Massachusetts',
		'Michigan',
		'Minnesota',
		'Mississippi',
		'Missouri',
		'Montana',
		'Nebraska',
		'Nevada',
		'New Hampshire',
		'New Jersey',
		'New Mexico',
		'New York',
		'North Carolina',
		'North Dakota',
		'Ohio',
		'Oklahoma',
		'Oregon',
		'Pennsylvania',
		'Rhode Island',
		'South Carolina',
		'South Dakota',
		'Tennessee',
		'Texas',
		'Utah',
		'Vermont',
		'Virginia',
		'Washington',
		'West Virginia',
		'Wisconsin',
		'Wyoming'
	];

	/**
	 * persons - Data used in Tables view for Data Tables plugin
	 */
	this.persons = [
		{
			id: '1',
			firstName: 'Monica',
			lastName: 'Smith'
		},
		{
			id: '2',
			firstName: 'Sandra',
			lastName: 'Jackson'
		},
		{
			id: '3',
			firstName: 'John',
			lastName: 'Underwood'
		},
		{
			id: '4',
			firstName: 'Chris',
			lastName: 'Johnatan'
		},
		{
			id: '5',
			firstName: 'Kim',
			lastName: 'Rosowski'
		}
	];

	/**
	 * check's - Few variables for checkbox input used in iCheck plugin. Only for demo purpose
	 */
	this.checkOne = true;
	this.checkTwo = true;
	this.checkThree = true;
	this.checkFour = true;

	/**
	 * knobs - Few variables for knob plugin used in Advanced Plugins view
	 */
	this.knobOne = 75;
	this.knobTwo = 25;
	this.knobThree = 50;

	/**
	 * Variables used for Ui Elements view
	 */
	this.bigTotalItems = 175;
	this.bigCurrentPage = 1;
	this.maxSize = 5;
	this.singleModel = 1;
	this.radioModel = 'Middle';
	this.checkModel = {
		left: false,
		middle: true,
		right: false
	};

	/**
	 * groups - used for Collapse panels in Tabs and Panels view
	 */
	this.groups = [
		{
			title: 'Dynamic Group Header - 1',
			content: 'Dynamic Group Body - 1'
		},
		{
			title: 'Dynamic Group Header - 2',
			content: 'Dynamic Group Body - 2'
		}
	];

	/**
	 * alerts - used for dynamic alerts in Notifications and Tooltips view
	 */
	this.alerts = [
		{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
		{ type: 'success', msg: 'Well done! You successfully read this important alert message.' },
		{ type: 'info', msg: 'OK, You are done a great job man.' }
	];

	/**
	 * addAlert, closeAlert  - used to manage alerts in Notifications and Tooltips view
	 */
	this.addAlert = function() {
		this.alerts.push({msg: 'Another alert!'});
	};

	this.closeAlert = function(index) {
		this.alerts.splice(index, 1);
	};

	/**
	 * randomStacked - used for progress bar (stacked type) in Badges adn Labels view
	 */
	this.randomStacked = function() {
		this.stacked = [];
		var types = ['success', 'info', 'warning', 'danger'];

		for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
			var index = Math.floor((Math.random() * 4));
			this.stacked.push({
				value: Math.floor((Math.random() * 30) + 1),
				type: types[index]
			});
		}
	};
	/**
	 * initial run for random stacked value
	 */
	this.randomStacked();

	/**
	 * summernoteText - used for Summernote plugin
	 */
	this.summernoteText = ['<h3>Hello Jonathan! </h3>',
	'<p>dummy text of the printing and typesetting industry. <strong>Lorem Ipsum has been the dustrys</strong> standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more',
		'recently with</p>'].join('');

	/**
	 * General variables for Peity Charts
	 * used in many view so this is in Main controller
	 */
	this.BarChart = {
		data: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2, 4, 7, 3, 2, 7, 9, 6, 4, 5, 7, 3, 2, 1, 0, 9, 5, 6, 8, 3, 2, 1],
		options: {
			fill: ["#1ab394", "#d7d7d7"],
			width: 100
		}
	};

	this.BarChart2 = {
		data: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2],
		options: {
			fill: ["#1ab394", "#d7d7d7"]
		}
	};

	this.BarChart3 = {
		data: [5, 3, 2, -1, -3, -2, 2, 3, 5, 2],
		options: {
			fill: ["#1ab394", "#d7d7d7"]
		}
	};

	this.LineChart = {
		data: [5, 9, 7, 3, 5, 2, 5, 3, 9, 6, 5, 9, 4, 7, 3, 2, 9, 8, 7, 4, 5, 1, 2, 9, 5, 4, 7],
		options: {
			fill: '#1ab394',
			stroke: '#169c81',
			width: 64
		}
	};

	this.LineChart2 = {
		data: [3, 2, 9, 8, 47, 4, 5, 1, 2, 9, 5, 4, 7],
		options: {
			fill: '#1ab394',
			stroke: '#169c81',
			width: 64
		}
	};

	this.LineChart3 = {
		data: [5, 3, 2, -1, -3, -2, 2, 3, 5, 2],
		options: {
			fill: '#1ab394',
			stroke: '#169c81',
			width: 64
		}
	};

	this.LineChart4 = {
		data: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2],
		options: {
			fill: '#1ab394',
			stroke: '#169c81',
			width: 64
		}
	};

	this.PieChart = {
		data: [1, 5],
		options: {
			fill: ["#1ab394", "#d7d7d7"]
		}
	};

	this.PieChart2 = {
		data: [226, 360],
		options: {
			fill: ["#1ab394", "#d7d7d7"]
		}
	};
	this.PieChart3 = {
		data: [0.52, 1.561],
		options: {
			fill: ["#1ab394", "#d7d7d7"]
		}
	};
	this.PieChart4 = {
		data: [1, 4],
		options: {
			fill: ["#1ab394", "#d7d7d7"]
		}
	};
	this.PieChart5 = {
		data: [226, 134],
		options: {
			fill: ["#1ab394", "#d7d7d7"]
		}
	};
	this.PieChart6 = {
		data: [0.52, 1.041],
		options: {
			fill: ["#1ab394", "#d7d7d7"]
		}
	};

$rootScope.collapseMenu = function(){
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



};




/*Dash Board Controller*/


/**
 * dashboardFlotTwo - simple controller for data
 * for Flot chart in Dashboard view
 */
function dashboardFlotTwo() {

	var data1 = [
		[gd(2012, 1, 1), 7],
		[gd(2012, 1, 2), 6],
		[gd(2012, 1, 3), 4],
		[gd(2012, 1, 4), 8],
		[gd(2012, 1, 5), 9],
		[gd(2012, 1, 6), 7],
		[gd(2012, 1, 7), 5],
		[gd(2012, 1, 8), 4],
		[gd(2012, 1, 9), 7],
		[gd(2012, 1, 10), 8],
		[gd(2012, 1, 11), 9],
		[gd(2012, 1, 12), 6],
		[gd(2012, 1, 13), 4],
		[gd(2012, 1, 14), 5],
		[gd(2012, 1, 15), 11],
		[gd(2012, 1, 16), 8],
		[gd(2012, 1, 17), 8],
		[gd(2012, 1, 18), 11],
		[gd(2012, 1, 19), 11],
		[gd(2012, 1, 20), 6],
		[gd(2012, 1, 21), 6],
		[gd(2012, 1, 22), 8],
		[gd(2012, 1, 23), 11],
		[gd(2012, 1, 24), 13],
		[gd(2012, 1, 25), 7],
		[gd(2012, 1, 26), 9],
		[gd(2012, 1, 27), 9],
		[gd(2012, 1, 28), 8],
		[gd(2012, 1, 29), 5],
		[gd(2012, 1, 30), 8],
		[gd(2012, 1, 31), 25]
	];

	var data2 = [
		[gd(2012, 1, 1), 800],
		[gd(2012, 1, 2), 500],
		[gd(2012, 1, 3), 600],
		[gd(2012, 1, 4), 700],
		[gd(2012, 1, 5), 500],
		[gd(2012, 1, 6), 456],
		[gd(2012, 1, 7), 800],
		[gd(2012, 1, 8), 589],
		[gd(2012, 1, 9), 467],
		[gd(2012, 1, 10), 876],
		[gd(2012, 1, 11), 689],
		[gd(2012, 1, 12), 700],
		[gd(2012, 1, 13), 500],
		[gd(2012, 1, 14), 600],
		[gd(2012, 1, 15), 700],
		[gd(2012, 1, 16), 786],
		[gd(2012, 1, 17), 345],
		[gd(2012, 1, 18), 888],
		[gd(2012, 1, 19), 888],
		[gd(2012, 1, 20), 888],
		[gd(2012, 1, 21), 987],
		[gd(2012, 1, 22), 444],
		[gd(2012, 1, 23), 999],
		[gd(2012, 1, 24), 567],
		[gd(2012, 1, 25), 786],
		[gd(2012, 1, 26), 666],
		[gd(2012, 1, 27), 888],
		[gd(2012, 1, 28), 900],
		[gd(2012, 1, 29), 178],
		[gd(2012, 1, 30), 555],
		[gd(2012, 1, 31), 993]
	];


	var dataset = [
		{
			label: "Number of orders",
			grow:{stepMode:"linear"},
			data: data2,
			color: "#1ab394",
			bars: {
				show: true,
				align: "center",
				barWidth: 24 * 60 * 60 * 600,
				lineWidth: 0
			}

		},
		{
			label: "Payments",
			grow:{stepMode:"linear"},
			data: data1,
			yaxis: 2,
			color: "#464f88",
			lines: {
				lineWidth: 1,
				show: true,
				fill: true,
				fillColor: {
					colors: [
						{
							opacity: 0.2
						},
						{
							opacity: 0.2
						}
					]
				}
			}
		}
	];


	var options = {
		grid: {
			hoverable: true,
			clickable: true,
			tickColor: "#d5d5d5",
			borderWidth: 0,
			color: '#d5d5d5'
		},
		colors: ["#1ab394", "#464f88"],
		tooltip: true,
		xaxis: {
			mode: "time",
			tickSize: [3, "day"],
			tickLength: 0,
			axisLabel: "Date",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 12,
			axisLabelFontFamily: 'Arial',
			axisLabelPadding: 10,
			color: "#d5d5d5"
		},
		yaxes: [
			{
				position: "left",
				max: 1070,
				color: "#d5d5d5",
				axisLabelUseCanvas: true,
				axisLabelFontSizePixels: 12,
				axisLabelFontFamily: 'Arial',
				axisLabelPadding: 3
			},
			{
				position: "right",
				color: "#d5d5d5",
				axisLabelUseCanvas: true,
				axisLabelFontSizePixels: 12,
				axisLabelFontFamily: ' Arial',
				axisLabelPadding: 67
			}
		],
		legend: {
			noColumns: 1,
			labelBoxBorderColor: "#d5d5d5",
			position: "nw"
		}

	};

	function gd(year, month, day) {
		return new Date(year, month - 1, day).getTime();
	}

	/**
	 * Definition of variables
	 * Flot chart
	 */
	this.flotData = dataset;
	this.flotOptions = options;
}



/*ChartControlller for dash dashboard*/


function chartJsCtrl() {

	/**
	 * Data for Polar chart
	 */
	this.polarData = [
		{
			value: 300,
			color:"#a3e1d4",
			highlight: "#1ab394",
			label: "App"
		},
		{
			value: 140,
			color: "#dedede",
			highlight: "#1ab394",
			label: "Software"
		},
		{
			value: 200,
			color: "#b5b8cf",
			highlight: "#1ab394",
			label: "Laptop"
		}
	];

	/**
	 * Options for Polar chart
	 */
	this.polarOptions = {
		scaleShowLabelBackdrop : true,
		scaleBackdropColor : "rgba(255,255,255,0.75)",
		scaleBeginAtZero : true,
		scaleBackdropPaddingY : 1,
		scaleBackdropPaddingX : 1,
		scaleShowLine : true,
		segmentShowStroke : true,
		segmentStrokeColor : "#fff",
		segmentStrokeWidth : 2,
		animationSteps : 100,
		animationEasing : "easeOutBounce",
		animateRotate : true,
		animateScale : false
	};

	/**
	 * Data for Doughnut chart
	 */
	this.doughnutData = [
		{
			value: 300,
			color:"#a3e1d4",
			highlight: "#1ab394",
			label: "App"
		},
		{
			value: 50,
			color: "#dedede",
			highlight: "#1ab394",
			label: "Software"
		},
		{
			value: 100,
			color: "#b5b8cf",
			highlight: "#1ab394",
			label: "Laptop"
		}
	];

	/**
	 * Options for Doughnut chart
	 */
	this.doughnutOptions = {
		segmentShowStroke : true,
		segmentStrokeColor : "#fff",
		segmentStrokeWidth : 2,
		percentageInnerCutout : 45, // This is 0 for Pie charts
		animationSteps : 100,
		animationEasing : "easeOutBounce",
		animateRotate : true,
		animateScale : false
	};

	/**
	 * Data for Line chart
	 */
	this.lineData = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "Example dataset",
				fillColor: "rgba(220,220,220,0.5)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: [65, 59, 80, 81, 56, 55, 40]
			},
			{
				label: "Example dataset",
				fillColor: "rgba(26,179,148,0.5)",
				strokeColor: "rgba(26,179,148,0.7)",
				pointColor: "rgba(26,179,148,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(26,179,148,1)",
				data: [28, 48, 40, 19, 86, 27, 90]
			}
		]
	};

	this.lineDataDashboard4 = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "Example dataset",
				fillColor: "rgba(220,220,220,0.5)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: [65, 59, 40, 51, 36, 25, 40]
			},
			{
				label: "Example dataset",
				fillColor: "rgba(26,179,148,0.5)",
				strokeColor: "rgba(26,179,148,0.7)",
				pointColor: "rgba(26,179,148,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(26,179,148,1)",
				data: [48, 48, 60, 39, 56, 37, 30]
			}
		]
	};

	/**
	 * Options for Line chart
	 */
	this.lineOptions = {
		scaleShowGridLines : true,
		scaleGridLineColor : "rgba(0,0,0,.05)",
		scaleGridLineWidth : 1,
		bezierCurve : true,
		bezierCurveTension : 0.4,
		pointDot : true,
		pointDotRadius : 4,
		pointDotStrokeWidth : 1,
		pointHitDetectionRadius : 20,
		datasetStroke : true,
		datasetStrokeWidth : 2,
		datasetFill : true
	};

	/**
	 * Options for Bar chart
	 */
	this.barOptions = {
		scaleBeginAtZero : true,
		scaleShowGridLines : true,
		scaleGridLineColor : "rgba(0,0,0,.05)",
		scaleGridLineWidth : 1,
		barShowStroke : true,
		barStrokeWidth : 2,
		barValueSpacing : 5,
		barDatasetSpacing : 1
};

	/**
	 * Data for Bar chart
	 */
	this.barData = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "My First dataset",
				fillColor: "rgba(220,220,220,0.5)",
				strokeColor: "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data: [65, 59, 80, 81, 56, 55, 40]
			},
			{
				label: "My Second dataset",
				fillColor: "rgba(26,179,148,0.5)",
				strokeColor: "rgba(26,179,148,0.8)",
				highlightFill: "rgba(26,179,148,0.75)",
				highlightStroke: "rgba(26,179,148,1)",
				data: [28, 48, 40, 19, 86, 27, 90]
			}
		]
	};

	/**
	 * Data for Radar chart
	 */
	this.radarData = {
		labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
		datasets: [
			{
				label: "My First dataset",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: [65, 59, 90, 81, 56, 55, 40]
			},
			{
				label: "My Second dataset",
				fillColor: "rgba(26,179,148,0.2)",
				strokeColor: "rgba(26,179,148,1)",
				pointColor: "rgba(26,179,148,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: [28, 48, 40, 19, 96, 27, 100]
			}
		]
	};

	/**
	 * Options for Radar chart
	 */
	this.radarOptions = {
		scaleShowLine : true,
		angleShowLineOut : true,
		scaleShowLabels : false,
		scaleBeginAtZero : true,
		angleLineColor : "rgba(0,0,0,.1)",
		angleLineWidth : 1,
		pointLabelFontFamily : "'Arial'",
		pointLabelFontStyle : "normal",
		pointLabelFontSize : 10,
		pointLabelFontColor : "#666",
		pointDot : true,
		pointDotRadius : 3,
		pointDotStrokeWidth : 1,
		pointHitDetectionRadius : 20,
		datasetStroke : true,
		datasetStrokeWidth : 2,
		datasetFill : true
	};


};


function navigationController($scope, $http, $state, pageRole){

	$scope.roleName = "SUPERADMIN";
	if(!JSON.parse(sessionStorage.getItem('sessionOn'))){
		$state.go('login');
		sessionStorage.setItem('token', '');
		sessionStorage.setItem('sessionOn', JSON.stringify({'sessionId': '', 'status': false, 'branchId': '', 'role': ''}));

		return false;
	}else{
		$scope.branchAddress = JSON.parse(sessionStorage.getItem('sessionOn'))['branchAddress'];
	}
	// JSON.parse(sessionStorage.getItem('sessionOn'))['role']

	// $http.get("./json/navigation.json").then(function(response){

	//     $scope.navData = response.data;
	// });
	pageRole.newserve().then(function(data){
		$scope.navData = data.data;
		sessionStorage.setItem('menuData','');
		sessionStorage.setItem('menuData',JSON.stringify(data.data));
	})

	// $scope.activeLi = 'dashboard';

	var activename = location.hash.split('/')[1];

	$scope.pathName = function(name,event){
		$scope.activeLi = name;
		if (name=='users') {
			$scope.activeLi = "Users & Permissions";
		}
		// if (event) {
		// if($('.sub_li').hasClass('li_child')){
		//  $('.sub_li.li_child').removeClass('in')   
		// }
		// $('.sub_li').toggleClass('li_child');
		// }// $scope.activeLi = location.hash.split('/')[1];
		// return (== name)? true: false;
	}
	$scope.pathName(activename);



	$scope.logoutView = function(){
		$state.go('login');
		sessionStorage.setItem('token', '');
		sessionStorage.setItem('sessionOn', JSON.stringify({'sessionId': '', 'status': false, 'branchId': '', 'role': ''}));
	}

	$scope.profileView = function(){
		$state.go("dashboard.profile");
	}

};

function customerController($scope,$modal){
	$scope.addCustomerModalTemplate = function(){
		  var modalInstance = $modal.open({
			templateUrl: 'views/parties/addCustomerTemplate.html',
			controller: ModalInstanceCtrl,
			size: 'lg'
			
		});
	}

	$scope.getAllNextDueAmountListByCustomer = function(){
	 var modalInstance = $modal.open({
			templateUrl: 'views/parties/allCustomerDueAmountList.html',
			controller: ModalInstanceCtrl,
			size: 'lg'
			
		});   
	}
}

function expensesController($scope, $modal, baseURL, processReqFactory, dataTablesInitService, notifyAlertMessage, loadingView, filterLink){

	

	


    $scope.submitExpenses = function(expObj){
    	if (expObj.fd.search('/')>0 && expObj.td.search('/')>0) {
		    var formLink = [];
	    	var orderUrl = '';
			for(rd in expObj){
				if(rd&&expObj[rd]){
					if (rd=='fd' || rd=='td') {
						expObj[rd] = expObj[rd].split('/')[2]+'-'+expObj[rd].split('/')[0]+'-'+expObj[rd].split('/')[1];
					}
					formLink.push(rd+'='+expObj[rd]);
				}
			}
			if(!JSON.parse(sessionStorage.getItem('sessionOn'))){
		$state.go('login');
	}else{
		formLink.push('companyBranch='+JSON.parse(sessionStorage.getItem('sessionOn'))['branchId']);
	}
			
			$scope.debitCreditAmount = {'debit': 0.0,'credit': 0.0}

			orderUrl += filterLink.getLink(formLink);
			processReqFactory.processReq(baseURL.IP+"/expenses/all"+orderUrl,"GET",'',function(response){
		        loadingView.startLoading('hide');
		        for(var dm in response){
		        	if (response[dm].mode == 'DEBIT') {
		        		$scope.debitCreditAmount.debit += response[dm].amount;
		        	}else{
		        		$scope.debitCreditAmount.credit += response[dm].amount;
		        	}
		        }
		        var columns = [
		        { "data": "name" },
		        { "data": "amount",
		          "render": function(data,type,row,meta) {
		            return (data)?data:'0'
		          }
		        },
		        { "data": "mode"},
		         { "data": "approvedBy"},
		         { "data": "createdDate"},
		        { "data": "id",
		          "orderable": false,
		          "searchable": false,   
		          "render": function(data,type,row,meta) {
		            var a = '<a class="rd dtview btn btn-primary btn-xs">View</a>'
		            return a;
		          }
		        }
		      ];
		      dataTablesInitService.initDataTables(response,columns,'#expensesList','' ,$scope);
		      console.log($scope.debitAmount)
		    },function(error){
		        loadingView.startLoading('hide');
		        notifyAlertMessage.notify("Something went Wrong","alert-danger")
		    });
		}else{
			expObj.fd = '';
			expObj.td = '';
			notifyAlertMessage.notify("Something went Wrong","alert-danger")
		}
    }
};


function expensesTypeController($scope, $modal, baseURL, processReqFactory, dataTablesInitService, notifyAlertMessage, loadingView){
	$scope.addExpensesModalTemplate = function(viewdata){
		//   var modalInstance = $modal.open({
		// 	templateUrl: 'views/expenses/addExpensesModalTemplate.html',
		// 	controller: ModalInstanceCtrl,
		// 	size: 'lg'
		// });
		$scope.typeObj = {};
		if (viewdata) {
			for(var et in $scope.expenseTypeData){
				if ($scope.expenseTypeData[et]['id'] == viewdata ) {
					$scope.typeObj = $scope.expenseTypeData[et];
				}
			}
			
		}
		$('#addExpensesTypeModal').appendTo('body').modal();
	}

	processReqFactory.processReq(baseURL.IP+"/expenseType/all?cid="+JSON.parse(sessionStorage.getItem('sessionOn'))['companyId'],"GET",'',function(response){
        loadingView.startLoading('hide');
        $scope.expenseTypeData = response;
        var columns = [
        { "data": "name" },
        { "data": "description" },
        { "data": "isActive",
          "render": function(data,type,row,meta) {
            return (data == true)?'ACTIVE':'INACTIVE'
          }
         },
        { "data": "id",
          "orderable": false,
          "searchable": false,   
          "render": function(data,type,row,meta) {
            var a = '<a class="rd dtview btn btn-primary btn-xs" ng-click=\"addExpensesModalTemplate(\''+data+'\')\">View</a>'
            return a;
          }
        }
      ];
      dataTablesInitService.initDataTables(response,columns,'#expensesTypeList','' ,$scope);
    },function(error){
        loadingView.startLoading('hide');
        notifyAlertMessage.notify("Something went Wrong","alert-danger")
    });


    $scope.saveExpenseType = function(typeObj){
    	// console.log(typeObj	)
    	if (typeObj.id) {

	    	processReqFactory.processReq(baseURL.IP+"/expenseType/"+typeObj.id+"/edit","PUT",typeObj,function(response){
	        loadingView.startLoading('hide');
	        if (response.id) {
	        	notifyAlertMessage.notify("Expense Type Updated Successfully","alert-warning")
	        	setTimeout(function(){
	        		location.reload();
	        	},2000);
	        	
	        }
		    },function(error){
		        loadingView.startLoading('hide');
		        notifyAlertMessage.notify("Something went Wrong","alert-danger")
		    });
    	}else{
    		typeObj['companyId'] = JSON.parse(sessionStorage.getItem('sessionOn'))['companyId'];
	    	typeObj['isActive'] = true;
	    	processReqFactory.processReq(baseURL.IP+"/expenseType/create","POST",typeObj,function(response){
	        loadingView.startLoading('hide');
	        if (response.id) {
	        	notifyAlertMessage.notify("Expense Type Created Successfully","alert-warning")
	        	setTimeout(function(){
	        		location.reload();
	        	},2000);
	        	
	        }
		    },function(error){
		        loadingView.startLoading('hide');
		        notifyAlertMessage.notify("Something went Wrong","alert-danger")
		    });
    	}
    	
    }
}


function paymentController($scope,$modal) {
	$scope.addPaymentModalTemplate = function(){
		 var modalInstance = $modal.open({
			templateUrl: 'views/payment/addPaymentTemplate.html',
			controller: ModalInstanceCtrl,
			size: 'lg'
			
		});
	}
};
function saleCreationController($scope){
	$scope.getRowAdded = function(){

		
	}
}


function paymentInController($scope,$modal){
	  $scope.addPaymentInModalTemplate = function(){
		 var modalInstance = $modal.open({
			templateUrl: 'views/payment/paymenyInCreationModalTemplate.html',
			controller: ModalInstanceCtrl,
			size: 'lg'
			
		});
	}   

	$scope.getLinkPaymentWithInvoice = function(){
		var modalInstance = $modal.open({
			templateUrl: 'views/payment/linkPaymentModalTemplate.html',
			controller: ModalInstanceCtrl,
			size: 'lg'
			
		});
	}
}


function paymentOutController($scope,$modal){
	  $scope.addPaymentOutModalTemplate = function(){
		 var modalInstance = $modal.open({
			templateUrl: 'views/payment/paymenyOutCreationModalTemplate.html',
			controller: ModalInstanceCtrl,
			size: 'lg'
			
		});
	}   
}




function estimationCreationController($scope,$rootScope){
	$rootScope.collapseMenu();
}




function stockInCreationController($scope,$rootScope){
	$rootScope.collapseMenu();
}




function stockController($scope,$modal){
	  $scope.showStockDetails = function(){
		 var modalInstance = $modal.open({
			templateUrl: 'views/inventory/stockViewModalTemplate.html',
			controller: ModalInstanceCtrl,
			size: 'lg'
			
		});
	}   
}


// function loginController($scope,$modal){
//       $scope.createStockPointTemplate = function(){
//          var modalInstance = $modal.open({
//             templateUrl: 'views/inventory/addStockPointModalTemplate.html',
//             controller: ModalInstanceCtrl,
//             size: 'md'
			
//         });
//     }   
// }

function loginController($scope, $rootScope, processReqFactory, baseURL, $state, $http, notifyAlertMessage, loadingView){

	$scope.userObj = {};
	$scope.showLogin = true;

	$scope.userLogin = function(){
		if ($scope.userObj.username) {
			if ($scope.userObj.password) {
				loadingView.startLoading('show');
				var loginJson = {"username": $scope.userObj.username+":::P","password":$scope.userObj.password} 
				processReqFactory.processReq(baseURL.IP+"/login","POST",loginJson,function(data){
					// $http.defaults.headers.common['Authorization'] = 'Bearer ' + data['token'];
					loadingView.startLoading('hide');
					$state.go('dashboard.home');
					sessionStorage.setItem('token', data['token'])
					if (data['posSession']) {
						sessionStorage.setItem('sessionOn', JSON.stringify({'sessionId': data['posSession'], 'status': true, 'companyId': '8a80810b740a792201740b04bd1e0000', 'branchId': data['branchId'], 'role':data['roles'],'branchAddress': data['branchAddress']	}));
					}else{
						sessionStorage.setItem('sessionOn', JSON.stringify({'sessionId': '', 'status': false,'companyId': '8a80810b740a792201740b04bd1e0000', 'branchId': data['branchId'],'branchAddress': data['branchAddress']}));
					}
				},function(error){
					loadingView.startLoading('hide');
					notifyAlertMessage.notify(error['details'][0], 'warning');
				});
			}else{

				notifyAlertMessage.notify("Please enter password", 'alert-warning');
			}
		}else{
			notifyAlertMessage.notify("Please enter username", 'warning');
		}
	}

	$scope.getForget = function(path){
		if (path=='Login') {
			if ($scope.userObj.username) {
				$scope.showLogin = !$scope.showLogin;
				
				processReqFactory.processReq(baseURL.IP+"/otp/forgotpassword","PUT",{'phoneNo': $scope.userObj.username},function(data){
						if (data) {
							notifyAlertMessage.notify("OTP sent to given Mobile Number", 'alert-warning');
						}
					},function(error){
						loadingView.startLoading('hide');
						// notifyAlertMessage.notify(error['details'][0], 'warning');
					});
			}else{
				notifyAlertMessage.notify("Please enter Mobile Number", 'warning');
			}
		}else{
			$scope.showLogin = !$scope.showLogin;
		}

	}

	$scope.userForgetPassword = function(){
		var forgetjson = {};
		forgetjson['phoneNo'] = $scope.userObj['username'];
		forgetjson['otp'] = $scope.userObj['otp'];
		forgetjson['type'] = 'POSUSER';
		// forgetjson['otpType'] = 'FORGOTPASSWORD';
		forgetjson['newPassword'] = $scope.userObj['newPassword'];
		forgetjson['confirmPassword'] = $scope.userObj['confirmPassword'];
		processReqFactory.processReq(baseURL.IP+"/users/forgot/password","PUT",forgetjson,function(data){
					if (data) {
						if (data.id) {
							notifyAlertMessage.notify('Your Password changed Successfully', "warning");
							location.reload();
						}
					}
				},function(error){
					loadingView.startLoading('hide');
					// notifyAlertMessage.notify(error['details'][0], 'warning');
				});
	}
	
}

function profileController($scope, $rootScope, processReqFactory, baseURL, $state, $http, notifyAlertMessage){

	processReqFactory.processReq(baseURL.IP+"/companybranchuser/profile","GET",'',function(data){

		$scope.profileObj = data;
	},function(error){
		notifyAlertMessage.notify(error['details'][0], 'warning');
	});


	$scope.passwordChange = function(passwordData){
		if (passwordData['newPassword'] == passwordData['confirmPassword']) {
			loadingView.startLoading('show');
			passwordData['id'] = $scope.profileObj['userId'];
			processReqFactory.processReq(baseURL.IP+"/users/change/password","PUT",passwordData,function(data){
				loadingView.startLoading('hide');
				setTimeout(function(){
					location.reload();
				},2000);
				notifyAlertMessage.notify('Password Changed successfully', 'warning');
			},function(error){
				loadingView.startLoading('hide');
				notifyAlertMessage.notify(error['details'][0], 'warning');
			});
		}else{
			notifyAlertMessage.notify('Password and Confirm password does not match!!', 'warning');
		}
	}

}

function dashboardController($scope, $rootScope, loadingView, processReqFactory, baseURL, $state, $http, notifyAlertMessage,chatService){


if (!JSON.parse(sessionStorage.getItem('sessionOn'))) {
	$state.go('login');
	sessionStorage.setItem('token', '');
	sessionStorage.setItem('sessionOn', JSON.stringify({'sessionId': '', 'status': false, 'branchId': '', 'role': ''}));

	return false;
}
	// processReqFactory.processReq(baseURL.IP+"/companybranch/all","GET",'',function(response){ 
 //        $scope.companyBranchList = response;
 //      },function(error){
 //         if (error.status==401) {
 //            $state.go('login');
 //          }
 //      });

	// $scope.categoryList = function(){
	//     var categoryUrl = baseURL.IP+"/category/all"
	//       processReqFactory.processReq(categoryUrl,"GET",'',function(data){
	//         $scope.categoryArray = data
	//       },function(error){
	//         loadingView.startLoading('hide');
	//         notifyAlertMessage.notify("Something went Wrong","alert-danger")
	//     });
	//   }();
	//   $scope.brandList = function(){
	//     var brandUrl = baseURL.IP+"/brand/all"
	//       processReqFactory.processReq(brandUrl,"GET",'',function(data){
	//         $scope.brandArray = data
	//       },function(error){
	//         loadingView.startLoading('hide');
	//         notifyAlertMessage.notify("Something went Wrong","alert-danger")
	//     });
	//   }();

	$scope.lessStockData ={};
	$scope.lessStockData.stockLessThan = 5;

	$scope.lessStock = function(lessStockData){
	  	// var lessStockurl = baseURL.IP+"/productSkuBranchBatchStockPoint/list"
	  	// processReqFactory.processReq(categoryUrl,"GET",'',function(data){
	   //      $scope.categoryArray = data
	   //    },function(error){
	   //      loadingView.startLoading('hide');
	   //      notifyAlertMessage.notify("Something went Wrong","alert-danger")
	   //  });
	   // loadingView.startLoading('show');
	   // if(!lessStockData.branch){
	   // 	notifyAlertMessage.notify("Please select Branch","alert-danger");
	   // 	return false;
	   // }
	   // var barcode = (lessStockData.barcode?'&barcode='+lessStockData.barcode:'') ;
	   // var brand = (lessStockData.brand?'&brand='+lessStockData.brand:'') ;
	   // var category = (lessStockData.category?'&category='+lessStockData.category:'') ;
	   var stockLess = (lessStockData.stockLessThan?'&stockLessThan='+lessStockData.stockLessThan:'') ;
        processReqFactory.processReq(baseURL.IP + "/productSkuBranchBatchStockPoint/list?branch=" + JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'] + stockLess , "GET", '', function(response) {
            loadingView.startLoading('hide');
            $scope.lessStockDataRep = response;

            var stockObj = {};
            stockObj['All'] = {};
            stockObj['All']['bname'] = 'All';
            stockObj['All']['list'] = [];
            for(var rs in response){
            	if (stockObj[response[rs]['brandName']]==undefined) {
            		stockObj[response[rs]['brandName']] = {};
            		stockObj[response[rs]['brandName']]['bname'] = response[rs]['brandName'];
            		stockObj[response[rs]['brandName']]['list'] = [];
            	}
            	stockObj[response[rs]['brandName']]['list'].push(response[rs]);
            	stockObj['All']['list'].push(response[rs]);
            }

            console.log(stockObj);
            // if (less) {}
        }, function(error) {
            loadingView.startLoading('hide');
            notifyAlertMessage.notify("Something went Wrong", "alert-danger")
        });
	  };

	  $scope.lessStock($scope.lessStockData);
	  
	$scope.invoiceFilter = {};
	var todatDate = new Date();
	// console.log(new Date(moment().subtract(6, 'days')['_d']).getDate())
	// console.log(new Date(moment().subtract(6, 'days')['_d']).getMonth())
	// console.log(new Date(moment().subtract(6, 'days')['_d']).getFullYear())
	var Tosevendays
	if (todatDate.toLocaleDateString().split('-')[0]<10) {
		$scope.invoiceFilter.dateobj = (new Date(moment().subtract(6, 'days')['_d']).getFullYear())+'-0'+(new Date(moment().subtract(6, 'days')['_d']).getMonth()+1)+"-"+(new Date(moment().subtract(6, 'days')['_d']).getDate())+" - "+todatDate.toLocaleDateString().split('/')[2]+'-0'+todatDate.toLocaleDateString().split('/')[0]+"-"+todatDate.toLocaleDateString().split('/')[1];
		// $scope.invoiceFilter.dateobj.split
	}else{  
		$scope.invoiceFilter.dateobj = (new Date(moment().subtract(6, 'days')['_d']).getFullYear())+'-'+(new Date(moment().subtract(6, 'days')['_d']).getMonth()+1)+"-"+(new Date(moment().subtract(6, 'days')['_d']).getDate())+" - "+todatDate.toLocaleDateString().split('/')[2]+'-'+todatDate.toLocaleDateString().split('/')[0]+"-"+todatDate.toLocaleDateString().split('/')[1];
	}

	

	
	$scope.dashboard ={};
	$scope.dashboardDateChange = function(dashData){

		if (dashData) {
			if (dashData.dateobj.indexOf('/')>=0) {
				var fromDate = dashData.dateobj.split(' - ')[0].split('/')[2]+'-'+dashData.dateobj.split(' - ')[0].split('/')[0]+'-'+dashData.dateobj.split(' - ')[0].split('/')[1];
				var toDate = dashData.dateobj.split(' - ')[1].split('/')[2]+'-'+dashData.dateobj.split(' - ')[1].split('/')[0]+'-'+dashData.dateobj.split(' - ')[1].split('/')[1];
				$scope.invoiceFilter.dateobj = fromDate+" - "+toDate;
			}else{
				// var sdate = $scope.invoiceFilter.dateobj;
				
				$scope.invoiceFilter.dateobj = dashData.dateobj;
			}
		}

		processReqFactory.processReq(baseURL.IP + "/dashboard/newcustomers?fd="+ $scope.invoiceFilter.dateobj.split(" ")[0] + "&todate=" + $scope.invoiceFilter.dateobj.split(" ")[2]+"&branchid=" + JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'],"GET",'',function(data){
			$scope.dashboard.newcustomerObj = data;
			// document.getElementById('dashboard-date').value = $scope.invoiceFilter.dateobj;
		},function(error){
			notifyAlertMessage.notify(error['details'][0], 'warning');
		});


		$scope.invoiceFilter.source = $scope.invoiceFilter.source?$scope.invoiceFilter.source:'OFFLINE';
		if($scope.invoiceFilter.source){

			//sale
			processReqFactory.processReq(baseURL.IP + "/dashboard/sale?fd="+ $scope.invoiceFilter.dateobj.split(" ")[0] + "&td=" + $scope.invoiceFilter.dateobj.split(" ")[2]+"&branch=" + JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'] + "&source=" + $scope.invoiceFilter.source ,"GET",'',function(data){
				$scope.dashboard.saleObj = data;
				// document.getElementById('dashboard-date').value = $scope.invoiceFilter.dateobj;
			},function(error){
				notifyAlertMessage.notify(error['details'][0], 'warning');
			});

			//Returns
			processReqFactory.processReq(baseURL.IP + "/dashboard/returns?fd="+ $scope.invoiceFilter.dateobj.split(" ")[0] + "&td=" + $scope.invoiceFilter.dateobj.split(" ")[2]+"&branch=" + JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'] + "&source=" + $scope.invoiceFilter.source ,"GET",'',function(data){
				$scope.dashboard.returnObj = data;
				// document.getElementById('dashboard-date').value = $scope.invoiceFilter.dateobj;
			},function(error){
				notifyAlertMessage.notify(error['details'][0], 'warning');
			});

			//Bill Size
			processReqFactory.processReq(baseURL.IP + "/dashboard/bill/size?fd="+ $scope.invoiceFilter.dateobj.split(" ")[0] + "&td=" + $scope.invoiceFilter.dateobj.split(" ")[2]+"&branch=" + JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'] + "&source=" + $scope.invoiceFilter.source ,"GET",'',function(data){
				$scope.dashboard.billsizeObj = data;
				// document.getElementById('dashboard-date').value = $scope.invoiceFilter.dateobj;
			},function(error){
				notifyAlertMessage.notify(error['details'][0], 'warning');
			});

			// Chart Data
			processReqFactory.processReq(baseURL.IP + "/dashboard/payments?fd="+ $scope.invoiceFilter.dateobj.split(" ")[0] + "&td=" + $scope.invoiceFilter.dateobj.split(" ")[2]+"&branch=" + JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'] + "&source=" + $scope.invoiceFilter.source + "&status=delivered" ,"GET",'',function(response){
				$scope.dashboard.salePaymentsByPaymentMethods = response;
				// document.getElementById('dashboard-date').value = $scope.invoiceFilter.dateobj;

					if (response) {
						function drawChart() {
							// Define the chart to be drawn.
							var data = new google.visualization.DataTable();
							data.addColumn('string', 'Payment Method');
							data.addColumn('number', 'Amount');
							var rows = Object.keys(response.paymentData).map(prop => [prop, response.paymentData[prop]]);
							/*data.addRows([
								['Cash', 45.0],
								['Google pay', 26.8],
								['Phone pay', 12.8],
								['Card', 8.5]
								// ['Opera', 6.2],
								// ['Others', 0.7]
							]);*/
							data.addRows(rows);

							// Set chart options
							var options = {
								'title': 'Sale report Payments',
								// 'colors': ['#48d09b', '#60d4a7', '#87ceb2', '#96c5b3'],
								'width': 550,
								'height': 400,
								pieHole: 0.4,
								// is3D: true,
								 pieSliceText: 'value'
							};

							// Instantiate and draw the chart.
							var chart = new google.visualization.PieChart(document.getElementById('container'));
							chart.draw(data, options);
						}
						google.charts.setOnLoadCallback(drawChart);
					}
			},function(error){
				notifyAlertMessage.notify(error['details'][0], 'warning');
			});

			//Top Performing Products
			processReqFactory.processReq(baseURL.IP + "/dashboard/top/products?fd="+ $scope.invoiceFilter.dateobj.split(" ")[0] + "&td=" + $scope.invoiceFilter.dateobj.split(" ")[2]+"&branch=" + JSON.parse(sessionStorage.getItem('sessionOn'))['branchId'] + "&source=" + $scope.invoiceFilter.source + "&status=delivered&limit=7" ,"GET",'',function(data){
				$scope.productObj = data.topProducts;
				// document.getElementById('dashboard-date').value = $scope.invoiceFilter.dateobj;
			},function(error){
				notifyAlertMessage.notify(error['details'][0], 'warning');
			});
		}



	}

	$scope.dashboardDateChange();


	// $scope.passwordChange = function(passwordData){
	//     if (passwordData['newPassword'] == passwordData['confirmPassword']) {
	//         loadingView.startLoading('show');
	//         passwordData['id'] = $scope.profileObj['userId'];
	//         processReqFactory.processReq(baseURL.IP+"/users/change/password","PUT",passwordData,function(data){
	//             loadingView.startLoading('hide');
	//             setTimeout(function(){
	//                 location.reload();
	//             },2000);
	//             notifyAlertMessage.notify('Password Changed successfully', 'warning');
	//         },function(error){
	//             loadingView.startLoading('hide');
	//             notifyAlertMessage.notify(error['details'][0], 'warning');
	//         });
	//     }else{
	//         notifyAlertMessage.notify('Password and Confirm password does not match!!', 'warning');
	//     }
	// }

}

function stockConversionController($rootScope){
	$rootScope.collapseMenu()
}
function ModalInstanceCtrl($scope, $modalInstance){
		$scope.close = function () {
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}
/**
 *
 * Pass all functions into module
 */
angular
	.module('thapp')
	.controller('MainCtrl', MainCtrl)
	.controller('ModalInstanceCtrl', ModalInstanceCtrl)
	.controller('dashboardFlotTwo',dashboardFlotTwo)
	.controller('chartJsCtrl',chartJsCtrl)
	.controller('navigationController',navigationController)
	.controller('customerController',customerController)
	.controller('expensesController',expensesController)
	.controller('expensesTypeController',expensesTypeController)
	.controller('paymentController',paymentController)
	.controller('saleCreationController',saleCreationController)
	.controller('paymentInController',paymentInController)
	.controller('estimationCreationController',estimationCreationController)
	.controller('paymentOutController',paymentOutController)
	.controller('stockInCreationController',stockInCreationController)
	.controller('stockController',stockController)
	.controller('stockConversionController',stockConversionController)
	.controller('loginController',loginController)
	.controller('dashboardController',dashboardController)
	.controller('profileController',profileController);