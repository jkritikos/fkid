
//get online schedule
function getOnlineSchedule(){
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
}