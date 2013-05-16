var stop = 0;
var start = 1;
var timeouts = new Array();

var SERVER_TIMEOUT = 20000;

//get online schedule
function getOnlineSchedule(){
	if (Titanium.Network.online == true){
		var xhr = Ti.Network.createHTTPClient();
		xhr.setTimeout(SERVER_TIMEOUT);
		
		xhr.onload = function(e) {
			var jsonData = JSON.parse(this.responseText);
			
			if (jsonData.status == '200'){
				viewSchedule.fireEvent('loadTableData', {json:jsonData});
			}
			
		};
		
		xhr.open('GET', url);
		xhr.send();
	}else{
		barsLoading(stop);
		scheduleNoInternetConnection();
	}
}