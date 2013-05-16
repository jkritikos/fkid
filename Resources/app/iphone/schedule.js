//url
var url = 'http://www.ifeelkid.gr/program/';
var tableShown = false;
var currentBar = 1;
var leftOffset = null;
var loadingBarsInterval = null;

//schedule view
var viewSchedule = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'program/background_B.jpg',
	bottom:65,
	opacity:0
});

win.add(viewSchedule);

//no internet bar
var scheduleNoInternetBar = Ti.UI.createImageView({
	image:IMAGE_PATH+'player/error_bar.png',
	bottom:150
});

var scheduleNoInternetLabel = Ti.UI.createLabel({
	text:MSG_NO_INTERNET,
	color:'white',
	width:280,
	textAlign:'center',
	font:{fontSize:13, fontFamily:'Helvetica'}
});
scheduleNoInternetBar.add(scheduleNoInternetLabel);

//title popup
var titleSchedulePopup = Ti.UI.createImageView({
	image:IMAGE_PATH+'program/title.png',
	top:0
});

viewSchedule.add(titleSchedulePopup);

//day label
var titleScheduleLabel = Ti.UI.createLabel({
	text:SCHEDULE_TITLE,
	color:'3bb3e6',
	textAlign:'center',
	width:150,
	top:8,
	font:{fontSize:34, fontWeight:'bold', fontFamily:'Aka-AcidGR-Collage'}
});
titleSchedulePopup.add(titleScheduleLabel);

//orange bar 1
var loadingBar1 = Ti.UI.createImageView({
	image:IMAGE_PATH+'program/loading_bar1.png',
	left:70,
	top:220,
	blueBar:false
});

viewSchedule.add(loadingBar1);

//orange bar 2
var loadingBar2 = Ti.UI.createImageView({
	image:IMAGE_PATH+'program/loading_bar1.png',
	top:220,
	blueBar:false
});

viewSchedule.add(loadingBar2);

//orange bar 3
var loadingBar3 = Ti.UI.createImageView({
	image:IMAGE_PATH+'program/loading_bar1.png',
	right:70,
	top:220,
	blueBar:false
});

viewSchedule.add(loadingBar3);

//blue bar 1
var blueBar1 = Ti.UI.createImageView({
	//image:IMAGE_PATH+'program/loading_bar2.png',
	top:220,
	zIndex:1//,
	//opacity:0
});

viewSchedule.add(blueBar1);

//schedule table view
var scheduleTableView = Ti.UI.createTableView({
	backgroundColor:'transparent',
	bottom:0,
	top:110,
	separatorColor:'transparent',
	selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
});
//start Loading of bars 

viewSchedule.addEventListener('loadTableData', displayTable);

function displayTable(e){
	var weekday = e.json.weekday;
	var program = e.json.data;
	
	switch (weekday){
		case 0:
			day = 'Δευτέρα';
			break;
		case 1:
			day = 'Τρίτη';
			break;
		case 2:
			day = 'Τετάρτη';
			break;
		case 3:
			day = 'Πέμπτη';
			break;
		case 4:
			day = 'Παρασκευή';
			break;
		case 5:
			day = 'Σάββατο';
			break;
		case 6:
			day = 'Κυριακή';
			break;
	}
	titleScheduleLabel.text = day;
	populateTableView(program);
	
	if(!tableShown){
		barsLoading(STOP);
		viewSchedule.add(scheduleTableView);
		tableShown = true;	
	}
}


//populate table view
function populateTableView(data){
	
	var tableRows = [];
	
	if(data != null){
		for (var i=0; i < data.length; i++){
			
			var time = data[i].time;
			var title = data[i].title;
			var playing = data[i].title;
			
			var color = null;
	
			if(i%2 == 0){
				color = '3bb3e6';
			}else{
				color = 'e9490c';
			}
			
			//program row
			var row = Ti.UI.createTableViewRow({
				height:55,
				backgroundColor:'transparent', 
				bottom:15
			});
			
			//separator row
			var rowView = Ti.UI.createView({
				height:51,
				backgroundColor:'white',
			});
			
			//time view
			var timeView = Ti.UI.createView({
				backgroundColor:color,
				left:-4,
				width:114,
				height:35,
				borderColor:color,
				borderRadius:4
			});
			
			
			//time label
			var timeViewLabel = Ti.UI.createLabel({
				text:time,
				textAlign:'center',
				color: 'white',
				width:110,
				height:35,
				font:{fontSize:16, fontWeight: 'bold'}
			});
			
			timeView.add(timeViewLabel);
			
			
			//program label
			var rowTitleLabel = Ti.UI.createLabel({
				text:title,
				textAlign:'right',
				width:190,
				height:50,
				right:15,
				font:{fontSize:14, fontFamily: 'Helvetica'}
			});
			
			row.className = 'ScheduleRow';
			
			rowView.add(timeView);
			rowView.add(rowTitleLabel);
			row.add(rowView);
			
			tableRows.push(row);
		}
		scheduleTableView.setData(tableRows);
	}
}


function barsLoading(action){
	if(action == 1){
		loadingBar1.show();
		loadingBar2.show();
		loadingBar3.show();
		blueBar1.show();
		loadingBarsInterval = setInterval(animateBars, 300);
	}else if(action == 0){
		loadingBar1.hide();
		loadingBar2.hide();
		loadingBar3.hide();
		blueBar1.hide();
		clearInterval(loadingBarsInterval);
	}
}

function animateBars(){
	
	blueBar1.image = IMAGE_PATH+'program/loading_bar2.png';
	
	if(currentBar == 1){
		leftOffset = 70;
		blueBar1.left = leftOffset;
		currentBar = 2;
	}else if(currentBar == 2){
		leftOffset = 134;
		currentBar = 3;
		blueBar1.left = leftOffset;
	}else if(currentBar == 3){
		leftOffset = 198;
		blueBar1.left = leftOffset;
		currentBar = 1;
	}
}

function checkScheduleInternet(){
	if(Titanium.Network.online == true){
		getOnlineSchedule();
		viewSchedule.remove(scheduleNoInternetBar);
	}else{
		if(!tableShown){
			barsLoading(STOP);
			titleScheduleLabel.text = 'OOPS!'
			viewSchedule.add(scheduleNoInternetBar);
		}
	}
}