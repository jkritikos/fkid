//url
var url = 'http://www.ifeelkid.gr/program/';

//schedule view
var viewSchedule = Ti.UI.createView({
	backgroundImage:IMAGE_PATH+'program/background_B.jpg',
	bottom:146
});

win.add(viewSchedule);

//title popup
var titleSchedulePopup = Ti.UI.createImageView({
	image:IMAGE_PATH+'program/title.png',
	top:0
});

viewSchedule.add(titleSchedulePopup);

//schedule table view
var scheduleTableView = Ti.UI.createTableView({
	backgroundColor:'transparent',
	bottom:0,
	top:207,
	separatorColor:'transparent',
	selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
});
viewSchedule.add(scheduleTableView);
getOnlineSchedule();

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
				
				//day label
				var titleScheduleLabel = Ti.UI.createLabel({
					text:day,
					color:'3bb3e6',
					textAlign:'center',
					width:350,
					top:16,
					font:{fontSize:67, fontWeight:'bold', fontFamily:'Aka-AcidGR-Collage'}
				});
				titleSchedulePopup.add(titleScheduleLabel);
				
				var tableRows = [];
	
				if(program != null){
					for (var i=0; i < program.length; i++){
						var time = program[i].time;
						var title = program[i].title;
						var playing = program[i].playing;
						
						//program row
						var row1 = Ti.UI.createTableViewRow({
							height:115,
							backgroundColor:'white'
						});
						
						//separator row
						var row2 = Ti.UI.createTableViewRow({
							height:7,
							backgroundColor:'transparent'
						});
						
						var color = null;
						
						if(i%2 == 0){
							color = '3bb3e6';
						}else{
							color = 'e9490c';
						}
						
						//time view
						var timeView = Ti.UI.createView({
							backgroundColor:color,
							left:-6,
							width:235,
							height:57,
							borderColor:color,
							borderRadius:6
						});
						
						//time label
						var timeViewLabel = Ti.UI.createLabel({
							text:time,
							textAlign:'center',
							color: 'white',
							width:233,
							height:57,
							font:{fontSize:30, fontWeight: 'bold'}
						});
						
						timeView.add(timeViewLabel);
						
						//program label
						var rowTitleLabel = Ti.UI.createLabel({
							text:title,
							textAlign:'right',
							width:450,
							right:37,
							font:{fontSize:25, fontFamily: 'Helvetica'}
						});
						
						row1.className = 'ScheduleRow';
						row2.className = 'SeparatorRow';
						row1.add(rowTitleLabel);
						row1.add(timeView);
						tableRows.push(row1);
						tableRows.push(row2)
					}
					scheduleTableView.setData(tableRows);
					
				}
				
			}
		};
		
		xhr.open('GET', url);
		xhr.send();
	}
}
