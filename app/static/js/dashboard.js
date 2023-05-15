var last_indicator_3 = ""
var chart_element_3 = ""
var keys_list_3 = []

function createChartExpansion(
	list_name,
	indicator,
	key,
	dataModel_pruebas_expansion,
	chart_title,
	line_chart,
	graph_container
) {
	var row = key
	var row_table = row
	var al = Math.floor(Math.random() * 255)
	// var al2 = Math.floor((Math.random() * (255)));
	var b_colorslist = [
		"rgba(" + al + ", 99, 132, 1)",
		"rgba(" + al + ", 162, 235, 1)",
		"rgba(" + al + ", 206, 86, 1)",
		"rgba(" + al + ", 192, 192, 1)",
		"rgba(" + al + ", 102, 255, 1)",
		"rgba(" + al + ", 159, 64, 1)",
	]
	var colorslist = [
		"rgba(" + al + ", 99, 132, 1)",
		"rgba(" + al + ", 162, 235, 1)",
		"rgba(" + al + ", 206, 86, 1)",
		"rgba(" + al + ", 192, 192, 1)",
		"rgba(" + al + ", 102, 255, 1)",
		"rgba(" + al + ", 159, 64, 1)",
	]
	/* const table_name = key; */
	const table_name = indicator
	document.getElementById(chart_title).innerHTML = table_name
	var json_file = dataModel_pruebas_expansion
	console.log("graficas analisis table_name", table_name)
	console.log("graficas analisis", json_file)
	var table = json_file[table_name]
	console.log("graficas analisis table", table)
	var keys = Object.keys(table[0])
	var labels = table.map(function (e) {
		return e[keys[0]]
	})
	labels = labels.slice(0, 12)
	var data = table.map(function (e) {
		return e[row]
	})
	length = data.length
	var array = []
	for (var j = 0; j < length; j++) {
		array.push(parseFloat(data[j]))
	}
	var unit = ""
	// var units = JSON.parse('{{units | tojson | safe}}');
	// if (indicator in units) {
	//     unit = units[indicator];
	//     if (unit == 'Porcentaje %') {
	//         array = array.map(function (x) { return x * 100; });;
	//     }
	// }
	/* Agregada - Capturar graficas actuales > 2 restablece */

	/* Desagregados - else */
	if (last_indicator_3 == indicator) {
		if (!keys_list_3.includes(row_table)) {
			keys_list_3.push(row_table)
			const update_dataset = {
				label: row_table,
				borderColor: colorslist[keys_list_3.length],
				backgroundColor: b_colorslist[keys_list_3.length],
				data: array,
				spanGraphs: false,
				fill: true,
			}
			chart_element_3.data.datasets.push(update_dataset)
			chart_element_3.update()
		} else {
			keys_list_3 = keys_list_3.filter((data) => data != row_table)
			chart_element_3.data.datasets = chart_element_3.data.datasets.filter(
				(data) => data.label != row_table
			)
			chart_element_3.update()
		}
	} else {
		keys_list_3 = [row_table]
		var mydatasets = [
			{
				label: row_table,
				borderColor: colorslist[0],
				backgroundColor: b_colorslist[0],
				data: array,
				spanGraphs: false,
				fill: true,
			},
		]
		let delayed
		$("#" + line_chart).remove()
		$("#" + graph_container).append(
			'<canvas id="' + line_chart + '" width="100%" height="48vh"><canvas>'
		)
		var config = {
			type: "bar",
			data: {
				labels: labels,
				datasets: mydatasets,
			},
			options: {
				responsive: true,
				scales: {
					xAxes: [
						{
							stacked: true,
							scaleLabel: {
								display: true,
								labelString: "Año",
							},
						},
					],
					yAxes: [
						{
							stacked: true,
							scaleLabel: {
								display: true,
								labelString: unit,
							},
						},
					],
				},
				title: {
					display: false,
					text: table_name,
				},
				legend: {
					position: "bottom",
				},
				animation: {
					onComplete: () => {
						delayed = true
					},
					delay: (context) => {
						let delay = 0
						if (context.type === "data" && context.mode === "default" && !delayed) {
							delay = context.dataIndex * 300 + context.datasetIndex * 100
						}
						return delay
					},
				},
			},
		}
		chart_element_3 = new Chart(document.getElementById(line_chart), config)
	}
	last_indicator_3 = indicator
	console.log("last_indicator_3", last_indicator_3)
}

var last_indicator_4 = ""
var chart_element_4 = ""
var keys_list_4 = []

function createChartUpgrade(
	list_name,
	indicator,
	key,
	dataModel_pruebas_expansion,
	chart_title,
	line_chart,
	graph_container
) {
	var row = key
	var row_table = row
	var al = Math.floor(Math.random() * 255)
	// var al2 = Math.floor((Math.random() * (255)));
	var b_colorslist = [
		"rgba(" + al + ", 99, 132, 1)",
		"rgba(" + al + ", 162, 235, 1)",
		"rgba(" + al + ", 206, 86, 1)",
		"rgba(" + al + ", 192, 192, 1)",
		"rgba(" + al + ", 102, 255, 1)",
		"rgba(" + al + ", 159, 64, 1)",
	]
	var colorslist = [
		"rgba(" + al + ", 99, 132, 1)",
		"rgba(" + al + ", 162, 235, 1)",
		"rgba(" + al + ", 206, 86, 1)",
		"rgba(" + al + ", 192, 192, 1)",
		"rgba(" + al + ", 102, 255, 1)",
		"rgba(" + al + ", 159, 64, 1)",
	]
	/* const table_name = key; */
	const table_name = indicator
	document.getElementById(chart_title).innerHTML = table_name
	var json_file = dataModel_pruebas_expansion

	console.log("graficas analisis", json_file)
	var table = json_file[table_name]
	var keys = Object.keys(table[0])
	var labels = table.map(function (e) {
		return e[keys[0]]
	})
	labels = labels.slice(0, 12)
	var data = table.map(function (e) {
		return e[row]
	})
	length = data.length
	var array = []
	for (var j = 0; j < length; j++) {
		array.push(parseFloat(data[j]))
	}
	var unit = ""
	// var units = JSON.parse('{{units | tojson | safe}}');
	// if (indicator in units) {
	//     unit = units[indicator];
	//     if (unit == 'Porcentaje %') {
	//         array = array.map(function (x) { return x * 100; });;
	//     }
	// }
	/* Agregada - Capturar graficas actuales > 2 restablece */

	/* Desagregados - else */
	if (last_indicator_4 == indicator) {
		if (!keys_list_4.includes(row_table)) {
			keys_list_4.push(row_table)
			const update_dataset = {
				label: row_table,
				borderColor: colorslist[keys_list_4.length],
				backgroundColor: b_colorslist[keys_list_4.length],
				data: array,
				spanGraphs: false,
				fill: true,
			}
			chart_element_4.data.datasets.push(update_dataset)
			chart_element_4.update()
		} else {
			keys_list_4 = keys_list_4.filter((data) => data != row_table)
			chart_element_4.data.datasets = chart_element_4.data.datasets.filter(
				(data) => data.label != row_table
			)
			chart_element_4.update()
		}
	} else {
		keys_list_4 = [row_table]
		var mydatasets = [
			{
				label: row_table,
				borderColor: colorslist[0],
				backgroundColor: b_colorslist[0],
				data: array,
				spanGraphs: false,
				fill: true,
			},
		]
		let delayed
		$("#" + line_chart).remove()
		$("#" + graph_container).append(
			'<canvas id="' + line_chart + '" width="100%" height="48vh"><canvas>'
		)
		var config = {
			type: "bar",
			data: {
				labels: labels,
				datasets: mydatasets,
			},
			options: {
				responsive: true,
				scales: {
					xAxes: [
						{
							stacked: true,
							scaleLabel: {
								display: true,
								labelString: "Año",
							},
						},
					],
					yAxes: [
						{
							stacked: true,
							scaleLabel: {
								display: true,
								labelString: unit,
							},
						},
					],
				},
				title: {
					display: false,
					text: table_name,
				},
				legend: {
					position: "bottom",
				},
				animation: {
					onComplete: () => {
						delayed = true
					},
					delay: (context) => {
						let delay = 0
						if (context.type === "data" && context.mode === "default" && !delayed) {
							delay = context.dataIndex * 300 + context.datasetIndex * 100
						}
						return delay
					},
				},
			},
		}
		chart_element_4 = new Chart(document.getElementById(line_chart), config)
	}
	last_indicator_4 = indicator
	console.log("last_indicator_4", last_indicator_4)
}

function loadSliders(strategies_array) {
	$(".form-range").each(function () {
		$(this).bootstrapSlider()
		$(this).on("change", function (slideEvt) {
			$(this).parents(".group-form-range").find(".form-range-value").text(slideEvt.value.newValue)
			updateChart(strategies_array)
		})
	})
	addClass()
	/* test de render whit js */
}

function removeSliders() {
	const boxes = document.querySelectorAll(".slider")
	boxes.forEach((box) => {
		box.remove()
	})
}

function addClass() {
	document.getElementsByClassName("slider").forEach((element) => {
		element.classList.add("slider-volt")
	})
}

function getProcessName() {
	var processName = $("#select-dropdown-var").find("span").text()
	if (processName == "Generación") {
		processName = "generation"
	} else if (processName == "Distribución") {
		processName = "distribution"
	} else if (processName == "Uso final") {
		processName = "end_use"
	}
	return processName
}

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
	strategy_html.querySelector("#strategy-range-info").innerHTML =
		strategy.lower_value + "-" + strategy.upper_value + " " + strategy.unit
	strategy_html.querySelector("#strategy-example-current-value").innerHTML = strategy.value
	strategy_html.querySelector("#strategy-example-current-value").classList.add("form-range-value")
	strategy_html.querySelector("#strategy-example-current-value").id = "current-value-" + strategy.id
	return strategy_html
}

function filterStrategiesByProcess(strategies_array) {
	let current_process = getProcessName()
	let new_strategies = Object.fromEntries(
		Object.entries(strategies_array).filter(([key]) => key.includes(current_process))
	)
	return new_strategies[current_process]
}

function filterStrategiesById(array, ids) {
	console.log("la vaca loca array", array.models)
	let new_array = array.models
		.filter((model) => model.strategies.some((strategy) => ids.includes(strategy.id)))
		.map((model) => {
			let newElt = Object.assign({}, model, {
				strategies: model.strategies.filter((strategy) => ids.includes(strategy.id)),
			})
			return newElt
		})
	array.models = new_array
	return array
}

function filterStrategiesByIdValues(array, idsValues) {
	let ids = Object.keys(idsValues)
	let new_array = array.models
		.filter((model) => model.strategies.some((strategy) => ids.includes(strategy.id)))
		.map((model) => {
			let newElt = Object.assign({}, model, {
				strategies: model.strategies
					.filter((strategy) => ids.includes(strategy.id))
					.map((inStrategies) => {
						let newEltValue = Object.assign({}, inStrategies, {
							selected_value: idsValues[ids.find((strategiId) => strategiId == inStrategies.id)],
						})
						return newEltValue
					}),
			})
			return newElt
		})
	array.models = new_array
	return array
}

function loadStrategies(strategies_array, strategies_id_selected) {
	//const fecha = fecha;
	strategies_array = filterStrategiesByProcess(strategies_array)
	strategies_to_show = filterStrategiesById(strategies_array, strategies_id_selected)
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
	document.getElementById("test-clone").innerHTML = ""
	document.getElementById("test-clone").appendChild(parent)
	removeSliders()
	loadSliders(strategies_array)
}

function getCurrentValues() {
	let key_values = {}
	document.querySelectorAll(".form-range-value").forEach(function (values) {
		key_id = String(values.id.split("-").slice(-1))
		value_slider = values.innerHTML
		key_values[key_id] = value_slider
	})
	return key_values
}

function getStrategieName() {
	let strategieName = []
	strategieName.push("Estrategias de expansión")
	strategieName.push("Estrategias de actualización")
	return strategieName
}

// function getCurrentValuesIds() {
// 	let ids = []
// 	let values_sliders = []
// 	document.querySelectorAll(".form-range-value").forEach(function (values) {
// 		key_id = String(values.id.split("-").slice(-1))
// 		value_slider = values.innerHTML
// 		ids.push(key_id)
// 		values_sliders.push(value_slider)
// 	})
// 	return [ids, values_sliders]
// }
function generateGhapExpansion(sub_strategies, n, strategies_name) {
	console.log("--- generateGhapExpansion  sub_strategies---", sub_strategies)
	let sub_strategies_key = Object.keys(sub_strategies)

	sub_strategies_key.forEach(function (item, index) {
		let sub_strategies_name = sub_strategies[item].name
		let sub_strategies_value = parseFloat(sub_strategies[item].selected_value)
		let sub_strategies_fp = parseFloat(sub_strategies[item].fp)

		let data_model_expansion = modelExpansionEstrategy(
			n,
			sub_strategies_value,
			sub_strategies_fp,
			sub_strategies_name
		)
		createChartExpansion(
			list_name,
			strategies_name,
			sub_strategies_name,
			data_model_expansion,
			"chart_title_3",
			"line-chart-3",
			"graph-container-3"
		)
	})
}

function generateGhapUpgrade(sub_strategies, n, strategies_name) {
	console.log("--- generateGhapUpgrade  sub_strategies---", sub_strategies)
	let sub_strategies_key = Object.keys(sub_strategies)

	sub_strategies_key.forEach(function (item, index) {
		let sub_strategies_name = sub_strategies[item].name
		let sub_strategies_value = parseFloat(sub_strategies[item].selected_value) / 100
		let sub_strategies_n_LB = sub_strategies[item].n_LB
		let sub_strategies_data = sub_strategies[item].values_BAU
		let plot_upgrade = modelUpgradeStrategy(
			n,
			sub_strategies_value,
			sub_strategies_data,
			sub_strategies_n_LB,
			sub_strategies_name
		)
		createChartUpgrade(
			list_name,
			strategies_name,
			sub_strategies_name,
			plot_upgrade,
			"chart_title_4",
			"line-chart-4",
			"graph-container-4"
		)
	})
}
function plotDataStrategies(strategies) {
	let strategiesModels = strategies.models
	let n = 9

	let strategiesName = getStrategieName()

	if (
		Object.entries(strategiesModels.filter((model) => strategiesName[0].includes(model.name)))
			.length != 0 &&
		Object.entries(strategiesModels.filter((model) => strategiesName[1].includes(model.name)))
			.length != 0
	) {
		let a = strategiesModels[0]
		let b = strategiesModels[1]

		if (
			Object.entries(
				b.strategies.filter((strategy) =>
					a.strategies.some((strategy2) => strategy2.id_relation.includes(strategy.id_relation))
				)
			).length != 0
		) {
			//aqui grafica cuando tiene las dos estrategias y que estan relacionadas entre si
			let pato = b.strategies
				.filter((strategy) =>
					a.strategies.some((strategy2) => strategy2.id_relation.includes(strategy.id_relation))
				)
				.map((sub_strategies) => {
					let newSubStrategies = Object.assign({}, sub_strategies, {
						values_BAU: a.strategies
							.filter((strategyValue) =>
								strategyValue.id_relation.includes(sub_strategies.id_relation)
							)
							.map((sub_strategies_values) => {
								let newSubStrategies = modelExpansionEstrategyOnlyData(
									n,
									parseFloat(sub_strategies_values.selected_value),
									sub_strategies_values.fp
								)
								return newSubStrategies
							})[0],
					})
					return newSubStrategies
				})
			generateGhapExpansion(a.strategies, n, strategiesName[0])
			generateGhapUpgrade(pato, n, strategiesName[1])
		} else if (
			Object.entries(
				b.strategies.filter((strategy) =>
					a.strategies.some((strategy2) => strategy2.id_relation !== strategy.id_relation)
				)
			).length != 0
		) {
			//aqui grafica cuando tiene las dos estrategias pero esta no esta relacionada con las sub estrategias de expansion
			let ardilla = b.strategies.filter((strategy) =>
				a.strategies.some((strategy2) => strategy2.id_relation !== strategy.id_relation)
			)
			generateGhapExpansion(a.strategies, n, strategiesName[0])
			generateGhapUpgrade(ardilla, n, strategiesName[1])
		} else {
			//aqui grafica cuando tiene las dos estrategias pero ninguna esta relacionada entre si
			generateGhapExpansion(a.strategies, n, strategiesName[0])
			generateGhapUpgrade(b.strategies, n, strategiesName[1])
		}
	} else {
		let strategiesModelsKeys = Object.keys(strategiesModels)
		strategiesModelsKeys.forEach(function (items, index) {
			let strategies_name = strategiesModels[items].name
			let sub_strategies = strategiesModels[items].strategies

			if (strategies_name == "Estrategias de expansión") {
				generateGhapExpansion(sub_strategies, n, strategies_name)
			} else if (strategies_name == "Estrategias de actualización") {
				generateGhapUpgrade(sub_strategies, n, strategies_name)
			}
		})
	}
}

function modelExpansionEstrategyOnlyData(n, valorObjetivo, fp) {
	var increment = valorObjetivo / n
	var data = []
	var data_Return = []
	let gp = 0

	let creaIncrement = increment
	for (let a = 0; a < n; a++) {
		data.push(creaIncrement)
		creaIncrement = creaIncrement + increment
	}
	for (let i = 0; i < data.length; i++) {
		gp = data[i] * fp * 8760
		data_Return.push(gp)
	}
	return data_Return
}

function modelExpansionEstrategy(n, valorObjetivo, fp, name) {
	var increment = valorObjetivo / n
	var data = []
	var data_plot = []
	var data_plot_return = []
	let j = 2
	let gp = 0

	let creaIncrement = increment
	for (let a = 0; a < n; a++) {
		data.push(creaIncrement)
		creaIncrement = creaIncrement + increment
	}
	for (let i = 0; i < data.length; i++) {
		let data_plot_dict = {}
		let anio = "202" + j
		if (j > 9) {
			j = 0
			anio = "203" + j
		}
		j++
		gp = data[i] * fp * 8760
		data_plot_dict.Año = anio
		data_plot_dict[name] = gp
		data_plot.push(data_plot_dict)
	}
	data_plot_return["Estrategias de expansión"] = data_plot
	return data_plot_return
}

function modelUpgradeStrategy(n, nj, dataIn, n_LB, name) {
	// Generación con recurso hidráhulico
	// ESTA FUNCION TIENE EN CUENTA LOS VALORES BAU ACTUALES Y VALORES TEORICOS DE LA EFICIENCIA .
	// ENTONCES PARA TENER EL VALOR DEL INCREMENTO DEBEMOS EMPEZAR EN EL BAU COMO ORIGEN
	let cp = 0
	let j = 2
	var data = []
	var data_plot = []
	var data_plot_return = []
	var incrementNj = (nj - n_LB) / n //llamar al valor minimo n_LB
	let creaIncrement = n_LB + incrementNj
	for (let a = 0; a < n; a++) {
		data.push(creaIncrement)
		creaIncrement = creaIncrement + incrementNj
	}

	for (let i = 0; i < data.length; i++) {
		let data_plot_dict = {}
		let anio = "202" + j
		if (j > 9) {
			j = 0
			anio = "203" + j
		}
		j++

		cp = dataIn[i] / data[i]
		data_plot_dict.Año = anio
		data_plot_dict[name] = cp
		data_plot.push(data_plot_dict)
	}
	data_plot_return["Estrategias de actualización"] = data_plot
	return data_plot_return
}

/* Desde aca se puede seguir ajustando */
function updateChart(strategies_array) {
	console.log("--- Update Chart ---")
	console.log("Values form sliders")
	console.log(getCurrentValues())

	let current_values = getCurrentValues()
	let strategies = filterStrategiesByIdValues(strategies_array, current_values)
	plotDataStrategies(strategies)
}

/* Desarrollo Nuevo */
$(".btn-progress-next").on("click", function () {
	var currentStepNum = $("#checkout-progress").data("current-step")
	var nextStepNum = currentStepNum + 1
	var currentStep = $(".stepp.stepp-" + currentStepNum)
	var nextStep = $(".stepp.stepp-" + nextStepNum)
	var progressBar = $("#checkout-progress")
	/* $(".btn-progress-prev").removeClass("disabled") */
	if (currentStepNum == 6) {
		return false
	}
	$(".checkout-progress")
		.removeClass(".stepp-" + currentStepNum)
		.addClass(".stepp-" + (currentStepNum + 1))

	currentStep.removeClass("active").addClass("valid")
	currentStep.find("span").addClass("opaque")
	currentStep.find(".fa.fa-check").removeClass("opaque")

	nextStep.addClass("active")
	progressBar
		.removeAttr("class")
		.addClass("stepp-" + nextStepNum)
		.data("current-step", nextStepNum)
})

$(".btn-progress-prev").on("click", function () {
	var currentStepNum = $("#checkout-progress").data("current-step")
	var prevStepNum = currentStepNum - 1
	var currentStep = $(".stepp.stepp-" + currentStepNum)
	var prevStep = $(".stepp.stepp-" + prevStepNum)
	var progressBar = $("#checkout-progress")
	/* $(".btn-progress-next").removeClass("disabled") */
	if (currentStepNum == 1) {
		return false
	}
	$(".checkout-progress")
		.removeClass(".stepp-" + currentStepNum)
		.addClass(".stepp-" + prevStepNum)

	currentStep.removeClass("active")
	prevStep.find("span").removeClass("opaque")
	prevStep.find(".fa.fa-check").addClass("opaque")

	prevStep.addClass("active").removeClass("valid")
	progressBar
		.removeAttr("class")
		.addClass("stepp-" + prevStepNum)
		.data("current-step", prevStepNum)
})
