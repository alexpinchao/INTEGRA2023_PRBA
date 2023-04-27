/* globals Chart:false, feather:false */

function sliderUpdate(id) {
	let value = document.getElementById("range" + id).value
	document.getElementById("range" + id + "Val").innerHTML = value
}
