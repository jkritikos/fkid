var stop = 0;
var start = 1;
var timeouts = new Array();

//no Internet connection in schedule
function scheduleNoInternetConnection(){
	titleScheduleLabel.text = 'OOPS!'
	
	var scheduleNoInternetBar = Ti.UI.createImageView({
		image:IMAGE_PATH+'player/error_bar.png',
		bottom:150
	});
	viewSchedule.add(scheduleNoInternetBar);
	
	var scheduleNoInternetLabel = Ti.UI.createLabel({
		text:'Φαίνεται να μην είσαι συνδεδεμένος στο Internet.. Συνδέσου και δοκίμασε ξανά!',
		color:'white',
		width:280,
		textAlign:'center',
		font:{fontSize:13, fontFamily:'Helvetica'}
	});
	scheduleNoInternetBar.add(scheduleNoInternetLabel);

}

//loading bars - options: stop or start 
/*function barsLoading(action){
	if(action == 1){
		var offset = 1000;
		
		timeouts = [];
		
		for (var i=0; i<=100; i++){
			if(loadingBar1.blueBar == false){
				timeouts[i] = setTimeout(function(){
					blueBar1.show();
					blueBar2.hide();
					blueBar3.hide();
				}, offset);
				loadingBar1.blueBar = true;
				loadingBar2.blueBar = false;
				loadingBar3.blueBar = true;
			}else if(loadingBar2.blueBar == false){
				timeouts[i] = setTimeout(function(){
					blueBar1.hide();
					blueBar2.show();
					blueBar3.hide();
				}, offset);
				loadingBar1.blueBar = true;
				loadingBar2.blueBar = true;
				loadingBar3.blueBar = false;
			}else if(loadingBar3.blueBar == false){
				timeouts[i] = setTimeout(function(){
					blueBar1.hide();
					blueBar2.hide();
					blueBar3.show();
				}, offset);
				loadingBar1.blueBar = false;
				loadingBar2.blueBar = true;
				loadingBar3.blueBar = true;
			}
			offset = offset + 1000;
			
		}
	}else if(action == 0){
		//remove bars and clear all timeouts
		loadingBar1.hide();
		loadingBar2.hide();
		loadingBar3.hide();
		blueBar1.hide();
		blueBar2.hide();
		blueBar3.hide();
		
		for (var i=0; i<=timeouts.length; i++){
			clearTimeout(timeouts[i]);
		}
	}
}*/

function barsLoading(action){
	if(action == 1){
		var offset = 400;
		
		timeouts = [];
		
		var blueBarLeft = null;
		var blueBarRight = null;
		var blueBarOffset = 64;
		var blueBarLeft = 70;
		
		for (var i=1; i<=100; i++){
			
			//needed to put timeout in function to resolve cluse problem 
			(function(blueBarLeft, blueBarRight, offset, i){
					timeouts[i] = setTimeout(function(){
						blueBar1.image = IMAGE_PATH+'program/loading_bar2.png';
						blueBar1.left = blueBarLeft;
				}, offset);
			}) (blueBarLeft, blueBarRight, offset, i);
			
			blueBarLeft += blueBarOffset;
			
			//if it reaches the third bar, change the left property to default 
			if(i%3 == 0){
				blueBarLeft = 70;
			}
			
			offset = offset + 400;
		}
	}else if(action == 0){
		//remove bars and clear all timeouts
		loadingBar1.hide();
		loadingBar2.hide();
		loadingBar3.hide();
		blueBar1.hide();
		
		for (var i=1; i<=timeouts.length; i++){
			clearTimeout(timeouts[i]);
		}
	}
}

//disable internet if user enabled internet while app was active
function disablePlayerNoInternet(){
	if(Titanium.Network.online == true){
		if(playerNoInternetBar != null){
			audioPlayer.stop();
			playerPlayButton.backgroundImage = IMAGE_PATH+'player/play.png';
			playerPlayButton.active = false;
			playerNoInternetBar.hide;
		}
	}
}


//get online schedule
function getOnlineSchedule(){
	if (Titanium.Network.online == true){
		var xhr = Ti.Network.createHTTPClient();
		xhr.setTimeout(20000);
		
		xhr.onload = function(e) {
			var jsonData = JSON.parse(this.responseText);
			
			if(jsonData.status == '200'){
				var weekday = jsonData.weekday;
				var program = jsonData.data;
				
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
				
				var tableRows = [];
	
				if(program != null){
					for (var i=0; i < program.length; i++){
						var time = program[i].time;
						var title = program[i].title;
						var playing = program[i].playing;
						
						var color = null;
	
						if(i%2 == 0){
							color = '3bb3e6';
						}else{
							color = 'e9490c';
						}
						
						populateTableView(time, title, color, tableRows);
					}
					
					setTimeout(function(){
						titleScheduleLabel.text = day;
						scheduleTableView.setData(tableRows);
						
						if (!tableShown){
							barsLoading(stop);
							viewSchedule.add(scheduleTableView);
							tableShown = true;
						}
					}, 4000);
				}
				
			}
		};
		
		xhr.open('GET', url);
		xhr.send();
	}else{
		barsLoading(stop);
		scheduleNoInternetConnection();
	}
}


function populateTableView(time, title, color, tableRows){
	//program row
	var row1 = Ti.UI.createTableViewRow({
		height:55,
		backgroundColor:'white', 
		bottom:15
	});
	
	//separator row
	var row2 = Ti.UI.createTableViewRow({
		height:4,
		backgroundColor:'transparent'
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
	
	row1.className = 'ScheduleRow';
	row2.className = 'SeparatorRow';
	row1.add(rowTitleLabel);
	row1.add(timeView);
	tableRows.push(row1);
	tableRows.push(row2);
}
