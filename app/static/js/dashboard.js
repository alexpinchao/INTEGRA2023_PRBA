function loadSliders() {
	$(".form-range").each(function () {
		$(this).bootstrapSlider()
		$(this).on("change", function (slideEvt) {
			$(this).parents(".group-form-range").find(".form-range-value").text(slideEvt.value.newValue)
			updateChart()
		})
	})
	addClass()
	/* test de render whit js */
}

function addClass() {
	document.getElementsByClassName("slider").forEach((element) => {
		element.classList.add("slider-volt")
	})
}

function updateChart() {}

function loadModel(model, parent) {
	var model_html = parent.querySelector("#accordion-item-model-id").cloneNode(true)
	model_html.id = "accordion-item-model-" + model.id
	model_html.querySelector("#model-name").innerHTML = model.name
	model_html.querySelector("#heading-model-id").id = "heading-model-" + model.id
	model_html
		.querySelector(".accordion-button")
		.setAttribute("data-bs-target", "#collapse-model-" + model.id)
	model_html
		.querySelector(".accordion-button")
		.setAttribute("aria-controls", "collapse-model-" + model.id)
	model_html
		.querySelector("#collapse-model-id")
		.setAttribute("aria-labelledby", "heading-model-" + model.id)
	model_html.querySelector("#collapse-model-id").id = "collapse-model-" + model.id
	return model_html
}

function loadStrategy(strategy, parent, idModel) {
	var strategy_html = parent.querySelector("#strategy-item-example").cloneNode(true)
	strategy_html.id = "accordion-strategy-" + strategy.id
	strategy_html.querySelector("#strategy-example-name").innerHTML = strategy.name
	strategy_html.querySelector("#strategy-example-name").id = "strategy-" + strategy.id + "-name"
	strategy_html.querySelector("#heading-strategy-example").id = "heading-strategy-" + strategy.id

	strategy_html
		.querySelector(".accordion-button")
		.setAttribute("data-bs-target", "#collapse-strategy-" + strategy.id)
	strategy_html
		.querySelector(".accordion-button")
		.setAttribute("aria-controls", "collapse-strategy-" + strategy.id)
	strategy_html
		.querySelector("#collapse-strategy-example")
		.setAttribute("aria-labelledby", "heading-strategy-" + strategy.id)
	strategy_html
		.querySelector("#collapse-strategy-example")
		.setAttribute("data-bs-parent", "#strategies-model-" + idModel)
	strategy_html.querySelector("#collapse-strategy-example").id = "collapse-strategy-" + strategy.id
	strategy_html.querySelector("#strategy-name-variable").innerHTML = strategy.variable
	strategy_html.querySelector(".form-range").setAttribute("data-slider-min", strategy.lower_value)
	strategy_html
		.querySelector(".form-range")
		.setAttribute("data-slider-max", String(strategy.upper_value))
	strategy_html
		.querySelector(".form-range")
		.setAttribute("data-slider-min", String(strategy.lower_value))
	strategy_html
		.querySelector(".form-range")
		.setAttribute("data-slider-value", String(strategy.value))
	strategy_html
		.querySelector(".form-range")
		.setAttribute("data-slider-id", "range-strategy-" + strategy.id)
	strategy_html.querySelector("#strategy-example-unit").innerHTML = strategy.unit
	strategy_html.querySelector("#strategy-bau-info").innerHTML =
		strategy.value + " " + strategy.unit + " " + strategy.year
	strategy_html.querySelector(".form-range-value").innerHTML = strategy.value
	strategy_html.querySelector("#strategy-range-info").innerHTML =
		strategy.lower_value + "-" + strategy.upper_value + " " + strategy.unit
	return strategy_html
}

function loadStrategies(strategies_array) {
	var parent = document.getElementById("template_strategies").cloneNode(true)
	parent.querySelector("#process").innerHTML = strategies_array.process
	strategies_array.models.forEach((model) => {
		var model_html = loadModel(model, parent)
		model.strategies.forEach((strategy) => {
			model_html
				.querySelector("#strategies-model-id")
				.appendChild(loadStrategy(strategy, model_html, model.id))
		})
		model_html.querySelector("#strategies-model-id").id = "strategies-model-" + model.id
		/* model_html.querySelector("#strategies-model-id").id = "strategies-model-" + model.id */
		parent.querySelector("#accordion-strategies").appendChild(model_html)
	})
	document.getElementById("test-clone").appendChild(parent)
	loadSliders()
}
