var test = 0;
	function randomColor()
	{
		return '#'+Math.floor(Math.random()*16777215).toString(16);
	}
	function initPicker(picker)
		{
			$(picker).ColorPicker(
				({
						color: '#0000ff',
						onShow: function (colpkr) {
							$(colpkr).fadeIn(500);
							return false;
						},
						onHide: function (colpkr) {
							$(colpkr).fadeOut(500);
							return false;
						},
						onChange: function (hsb, hex, rgb) {
							$('#follower').css('backgroundColor', '#' + hex);
							$(picker).css('backgroundColor', '#' + hex);
						}
					})
				);
		}
	function updateFollower(follower)
	{	
		document.getElementById(follower).style.width = document.getElementById("slider").value*100 + "%";
	}
	function updateColor(follower)
	{
		document.getElementById(follower).style.backgroundColor = "#" + document.getElementById("colorss").value;
	}
	function addScheduleElement()
	{
		console.log("hi");
		var scheduler = document.getElementById("scheduler-body");
		var tr = document.createElement('tr');

		var td1 = document.createElement('td');
		var picker = document.createElement("div");
		picker.className = "preview-circle"; 	
		picker.backgroundColor = randomColor();
		initPicker(picker);
		td1.appendChild(picker);

		var td2 = document.createElement("td");
		var textInput = document.createElement("input");
		textInput.type = "text";
		td2.appendChild(textInput);

		var td3 = document.createElement("td");
		var heading = document.createElement("h3");
		heading.innerHTML = test;
		test++;
		td3.appendChild(heading);

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		scheduler.appendChild(tr);
	}