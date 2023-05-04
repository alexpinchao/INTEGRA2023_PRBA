$(document).ready(function () {
	$(".form-range").each(function () {
		$(this).bootstrapSlider()
		$(this).on("change", function (slideEvt) {
			console.log(slideEvt)
			$(this).parents(".group-form-range").find(".form-range-value").text(slideEvt.value.newValue)
			updateChart()
		})
	})
	addClass()
	/* test de render whit js */
})

function addClass() {
	document.getElementsByClassName("slider").forEach((element) => {
		element.classList.add("slider-volt")
	})
}

function updateChart() {}

function loadStrategies(strategies_array) {
	var parent = document.getElementById("template_strategies").cloneNode(true)
	parent.querySelector("#process").innerHTML = strategies_array.process
	console.log(strategies_array.process)
	document.getElementById("test-clone").appendChild(parent)
}
