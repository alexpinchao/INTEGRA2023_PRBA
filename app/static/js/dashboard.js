var last_indicator_3 = ""
var chart_element_3 = ""
var keys_list_3 = []

var units_array = []
function loadUnit(units){
    units_array = units
}
function checkParameters() {
	var year_selected = document.getElementById("fecha").innerText
	var text_process_selected = $(".process-selected").find("span").text()
	console.log("----- check parameters -----")
	console.log(year_selected)
	console.log(text_process_selected)
	if (!(year_selected === "Seleccionar") && !(text_process_selected === "Seleccionar")) {
		ActiveSection("scenarios_2")
		return
	}
}

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
	var units = units_array
	if (indicator in units) {
	    unit = units[indicator];
	    if (unit == 'Porcentaje %') {
	        array = array.map(function (x) { return x * 100; });;
	    }
	}
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
	var units = units_array
	if (indicator in units) {
	    unit = units[indicator];
	    if (unit == 'Porcentaje %') {
	        array = array.map(function (x) { return x * 100; });;
	    }
	}
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

var last_indicator_5 = ""
var chart_element_5 = ""
var keys_list_5 = []

function createChartIndicador1(
	list_name,
	indicator,
	key,
	dataModel_pruebas_expansion,
	chart_title,
	line_chart,
	graph_container
) {
	var row = key

	// var last_indicator_5 = '';
	// var chart_element_5 = '';
	// var keys_list_5 = [];

	// var row = row1.replace("$CO_2eq$","CO2eq");
	// var translate_array = JSON.parse('{{translating_dict | tojson | safe}}');
	var row_table = row
	// if(row in translate_array){
	//   row_table = translate_array[row];
	// }else{
	//   row_table = row;
	// }
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
		// if (row == "Poblacion_Total" || row == "P_Urbano" || row == "P_Rural" || row == "V_Rural"|| row == "V_Urbano" || row == "Vivienda_Total"){
		//   array.push(parseFloat(data[j])/1000000);
		// }else{
		array.push(parseFloat(data[j]))
		//}
	}
	var unit = ""
	var units = units_array
	if (indicator in units) {
	    unit = units[indicator];
	    if (unit == 'Porcentaje %') {
	        array = array.map(function (x) { return x * 100; });;
	    }
	}
	/* Agregada - Capturar graficas actuales > 2 restablece */

	/* Desagregados - else */
	if (last_indicator_5 == indicator) {
		if (!keys_list_5.includes(row_table)) {
			keys_list_5.push(row_table)
			const update_dataset = {
				label: row_table,
				borderColor: colorslist[keys_list_5.length],
				backgroundColor: b_colorslist[keys_list_5.length],
				data: array,
				spanGraphs: false,
				fill: true,
			}
			chart_element_5.data.datasets.push(update_dataset)
			chart_element_5.update()
		} else {
			keys_list_5 = keys_list_5.filter((data) => data != row_table)
			chart_element_5.data.datasets = chart_element_5.data.datasets.filter(
				(data) => data.label != row_table
			)
			chart_element_5.update()
		}
	} else {
		keys_list_5 = [row_table]
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
							stacked: false,
							scaleLabel: {
								display: true,
								labelString: "Año",
							},
						},
					],
					yAxes: [
						{
							stacked: false,
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
		chart_element_5 = new Chart(document.getElementById(line_chart), config)
	}
	last_indicator_5 = indicator
	console.log("last_indicator_5", last_indicator_5)
}

var last_indicator_6 = ""
var chart_element_6 = ""
var keys_list_6 = []

function createChartIndicador2(
	list_name,
	indicator,
	key,
	dataModel_pruebas_expansion,
	chart_title,
	line_chart,
	graph_container
) {
	var row = key

	// var last_indicator_6 = '';
	// var chart_element_6 = '';
	// var keys_list_6 = [];

	// var row = row1.replace("$CO_2eq$","CO2eq");
	// var translate_array = JSON.parse('{{translating_dict | tojson | safe}}');
	var row_table = row
	// if(row in translate_array){
	//   row_table = translate_array[row];
	// }else{
	//   row_table = row;
	// }
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
		// if (row == "Poblacion_Total" || row == "P_Urbano" || row == "P_Rural" || row == "V_Rural"|| row == "V_Urbano" || row == "Vivienda_Total"){
		//   array.push(parseFloat(data[j])/1000000);
		// }else{
		array.push(parseFloat(data[j]))
		//}
	}
	var unit = ""
	var units = units_array
	if (indicator in units) {
	    unit = units[indicator];
	    if (unit == 'Porcentaje %') {
	        array = array.map(function (x) { return x * 100; });;
	    }
	}
	/* Agregada - Capturar graficas actuales > 2 restablece */

	/* Desagregados - else */
	if (last_indicator_6 == indicator) {
		if (!keys_list_6.includes(row_table)) {
			keys_list_6.push(row_table)
			const update_dataset = {
				label: row_table,
				borderColor: colorslist[keys_list_6.length],
				backgroundColor: b_colorslist[keys_list_6.length],
				data: array,
				spanGraphs: false,
				fill: true,
			}
			chart_element_6.data.datasets.push(update_dataset)
			chart_element_6.update()
		} else {
			keys_list_6 = keys_list_6.filter((data) => data != row_table)
			chart_element_6.data.datasets = chart_element_6.data.datasets.filter(
				(data) => data.label != row_table
			)
			chart_element_6.update()
		}
	} else {
		keys_list_6 = [row_table]
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
							stacked: false,
							scaleLabel: {
								display: true,
								labelString: "Año",
							},
						},
					],
					yAxes: [
						{
							stacked: false,
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
		chart_element_6 = new Chart(document.getElementById(line_chart), config)
	}
	last_indicator_6 = indicator
	console.log("last_indicator_6", last_indicator_6)
}

var last_indicator_7 = ""
var chart_element_7 = ""
var keys_list_7 = []

function createChartIndicador3(
	list_name,
	indicator,
	key,
	dataModel_pruebas_expansion,
	chart_title,
	line_chart,
	graph_container
) {
	var row = key

	// var last_indicator_7 = '';
	// var chart_element_7 = '';
	// var keys_list_7 = [];

	// var row = row1.replace("$CO_2eq$","CO2eq");
	// var translate_array = JSON.parse('{{translating_dict | tojson | safe}}');
	var row_table = row
	// if(row in translate_array){
	//   row_table = translate_array[row];
	// }else{
	//   row_table = row;
	// }
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
		// if (row == "Poblacion_Total" || row == "P_Urbano" || row == "P_Rural" || row == "V_Rural"|| row == "V_Urbano" || row == "Vivienda_Total"){
		//   array.push(parseFloat(data[j])/1000000);
		// }else{
		array.push(parseFloat(data[j]))
		//}
	}
	var unit = ""
	var units = units_array
	if (indicator in units) {
	    unit = units[indicator];
	    if (unit == 'Porcentaje %') {
	        array = array.map(function (x) { return x * 100; });;
	    }
	}
	/* Agregada - Capturar graficas actuales > 2 restablece */

	/* Desagregados - else */
	if (last_indicator_7 == indicator) {
		if (!keys_list_7.includes(row_table)) {
			keys_list_7.push(row_table)
			const update_dataset = {
				label: row_table,
				borderColor: colorslist[keys_list_7.length],
				backgroundColor: b_colorslist[keys_list_7.length],
				data: array,
				spanGraphs: false,
				fill: true,
			}
			chart_element_7.data.datasets.push(update_dataset)
			chart_element_7.update()
		} else {
			keys_list_7 = keys_list_7.filter((data) => data != row_table)
			chart_element_7.data.datasets = chart_element_7.data.datasets.filter(
				(data) => data.label != row_table
			)
			chart_element_7.update()
		}
	} else {
		keys_list_7 = [row_table]
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
							stacked: false,
							scaleLabel: {
								display: true,
								labelString: "Año",
							},
						},
					],
					yAxes: [
						{
							stacked: false,
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
		chart_element_7 = new Chart(document.getElementById(line_chart), config)
	}
	last_indicator_7 = indicator
	console.log("last_indicator_7", last_indicator_7)
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

// function filterStrategiesByIdExpansion(array, ids) {

//     let new_array = array.models
// 		.filter((model) => model.strategies.some((strategy) => ids.includes(strategy.id_relation)))
// 		.map((model) => {
// 			let newElt = Object.assign({}, model, {
// 				strategies: model.strategies.filter((strategy) => ids.includes(strategy.id_relation)),
// 			})
// 			return newElt
// 		})
// 	array.models = new_array
// 	return array
// }

function filterStrategiesByIdRelationated(array, ids) {
	let new_array = array.models
		.filter((model) => model.strategies.some((strategy) => ids.includes(strategy.id_relation)))
		.map((model) => {
			let newElt = Object.assign({}, model, {
				strategies: model.strategies.filter((strategy) => ids.includes(strategy.id_relation)),
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

let const_strategies = {}
function loadStrategies(strategies_array, strategies_id_selected) {
	//const fecha = fecha;
	const_strategies = JSON.parse(JSON.stringify(strategies_array))
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

function modifyData(data) {
	let dataReturn = []
	let list_names = Object.keys(data)
	let name_return = ""
	console.log("--Consumo sacando datos data  0xx--", data)

	list_names.forEach(function (item, index) {
		let data_loop = data[item]
		let data_loop_keys = Object.keys(data_loop)
		let name = Object.keys(data_loop[0])
		//console.log("----------Consumo sacando datos name  0xx--", name[1]);
		name_return = name[1]

		data_loop_keys.forEach(function (item2, index2) {
			let data_loop_keys_item = data[item][item2]
			let data_loop_keys2 = Object.values(data_loop_keys_item)
			console.log("--Consumo sacando datos keys2 xx--", data_loop_keys2[1])
			dataReturn.push(data_loop_keys2[1])
		})
	})
	return [dataReturn, name_return]
}

function validateNameIndicatorEficiency(name) {
	if (name == "Generación eléctrica a partir de parque térmico") {
		name = "Eficiencia energética en parque térmico"
	} else if (name == "Generación eléctrica a partir de plantas hidráulicas") {
		name = "Eficiencia energética plantas hidráulicas"
	} else if (name == "Generación eléctrica a partir plantas de Auto y Cogeneración") {
		name = "Eficiencia energética en plantas de Auto y Cogeneración"
	} else if (name == "Generación eléctrica a partir de plantas eólicas") {
		name = "Eficiencia en plantas eólicas"
	} else if (name == "Generación eléctrica a partir de plantas solares") {
		name = "Eficiencia en plantas solares"
	}
	return name
}

function validateNameIndicatorIep(name) {
	if (name == "Generación eléctrica a partir de parque térmico") {
		name = "Intensidad energética primaria en parque térmico"
	} else if (name == "Generación eléctrica a partir de plantas hidráulicas") {
		name = "Intensidad energética primaria en plantas hidráulicas"
	} else if (name == "Generación eléctrica a partir plantas de Auto y Cogeneración") {
		name = "Intensidad energética primaria en plantas de Auto y Cogeneración"
	} else if (name == "Generación eléctrica a partir de plantas eólicas") {
		name = "Intensidad energética primaria en plantas eólicas"
	} else if (name == "Generación eléctrica a partir de plantas solares") {
		name = "Intensidad energética primaria en plantas solares"
	}
	return name
}

function validateNameIndicatorIec(name) {
	if (name == "Generación eléctrica a partir de parque térmico") {
		name = "Emisiones de carbono en parque térmico"
	} else if (name == "Generación eléctrica a partir de plantas hidráulicas") {
		name = "Emisiones de carbono en plantas hidráulicas"
	} else if (name == "Generación eléctrica a partir plantas de Auto y Cogeneración") {
		name = "Emisiones de carbono en plantas de Auto y Cogeneración"
	} else if (name == "Generación eléctrica a partir de plantas eólicas") {
		name = "Emisiones de carbono en plantas eólicas"
	} else if (name == "Generación eléctrica a partir de plantas solares") {
		name = "Emisiones de carbono en plantas solares"
	}
	return name
}
function generationIndicatorEficiency(generacion, consumo, name) {
	console.log("--generationIndicatorEficiency--")
	console.log("--generacion--", generacion)
	console.log("--consumo--", Object.values(consumo))

	name = validateNameIndicatorEficiency(name)
	// let consumo_data =Object.values(consumo)
	// let consumo_data_2 = Object.keys(consumo_data)

	// console.log("--consumo--",consumo_data_2);
	let eficiency = 0
	let data_plot_eficiency = []
	let k = 2
	let anio_eficiency = ""
	let data_plot_return = []
	for (var i = 0; i < generacion.length; i++) {
		let data_plot_dict = {}
		anio_eficiency = "202" + k
		if (k > 9) {
			k = 0
			anio_eficiency = "203" + k
		}
		k++
		eficiency = generacion[i] / consumo[i]
		console.log("--eficiency--", eficiency)
		//data_plot_dict = {"Año": anio_eficiency, "Indicador de eficiencia energética": eficiency};
		data_plot_dict.Año = anio_eficiency
		data_plot_dict[name] = eficiency
		data_plot_eficiency.push(data_plot_dict)
	}

	data_plot_return["Indicador de eficiencia energética"] = data_plot_eficiency
	console.log("--data_plot_return--", data_plot_return)
	createChartIndicador1(
		list_name,
		"Indicador de eficiencia energética",
		name,
		data_plot_return,
		"chart_title_5",
		"line-chart-5",
		"graph-container-5"
	)
	return data_plot_return
}

function generationIndicatorsIEP(consumo, pib, name) {
	// Generación con recurso hidráhulico
	// ESTA FUNCION TIENE EN CUENTA LOS VALORES BAU ACTUALES Y VALORES TEORICOS DE LA EFICIENCIA .
	// ENTONCES PARA TENER EL VALOR DEL INCREMENTO DEBEMOS EMPEZAR EN EL BAU COMO ORIGEN
	name = validateNameIndicatorIep(name)

	console.log("--generationIndicatorsIEP--")
	let iep = 0 // (consumo /pib)/1000
	let anio = ""
	let k = 2
	let data_plot_iep = []
	var data_plot_return = []
	for (var i = 0; i < consumo.length; i++) {
		let data_plot_dict = {}
		anio = "202" + k
		if (k > 9) {
			k = 0
			anio = "203" + k
		}
		k++
		iep = consumo[i] / pib[i] / 1000
		console.log("--Indicador de eficiencia energética--", iep)
		//data_plot_dict = {"Año": anio, "Indicador intensidad energética primaria": iep};
		data_plot_dict.Año = anio
		data_plot_dict[name] = iep
		data_plot_iep.push(data_plot_dict)
	}
	// console.log("--gp--",gp)
	// console.log("--anio--",anio)
	data_plot_return["Indicador intensidad energética primaria"] = data_plot_iep
	console.log("--data_plot_return--", data_plot_return)
	createChartIndicador2(
		list_name,
		"Indicador intensidad energética primaria",
		name,
		data_plot_return,
		"chart_title_6",
		"line-chart-6",
		"graph-container-6"
	)
	return data_plot_return
}

function generationIndicatorsIEC(consumo, fe, pib, name) {
	// Generación con recurso hidráhulico
	// ESTA FUNCION TIENE EN CUENTA LOS VALORES BAU ACTUALES Y VALORES TEORICOS DE LA EFICIENCIA .
	// ENTONCES PARA TENER EL VALOR DEL INCREMENTO DEBEMOS EMPEZAR EN EL BAU COMO ORIGEN

	name = validateNameIndicatorIec(name)
	console.log("--generationIndicatorsIEC--")
	let iec = 0 // (consumo*fe) /pib
	let anio = ""
	let k = 2
	let data_plot_iec = []
	var data_plot_return = []

	for (var i = 0; i < consumo.length; i++) {
		let data_plot_dict = {}
		anio = "202" + k
		if (k > 9) {
			k = 0
			anio = "203" + k
		}
		k++
		iec = (consumo[i] * fe) / pib[i]
		console.log("--Indicador intensidad de emisiones de carbono--", iec)
		//data_plot_dict = {"Año": anio, "Indicador intensidad de emisiones de carbono": iec};
		data_plot_dict.Año = anio
		data_plot_dict[name] = iec
		data_plot_iec.push(data_plot_dict)
	}

	// console.log("--gp--",gp)
	// console.log("--anio--",anio)
	data_plot_return["Indicador intensidad de emisiones de carbono"] = data_plot_iec
	console.log("--data_plot_return--", data_plot_return)
	createChartIndicador3(
		list_name,
		"Indicador intensidad de emisiones de carbono",
		name,
		data_plot_return,
		"chart_title_7",
		"line-chart-7",
		"graph-container-7"
	)
	return data_plot_return
}

function generateDataIndicatorWithBau(sub_strategies_expansion, sub_strategies_upgrade, n) {
	console.log("--- generateGhapExpansion  sub_strategies_expansion---", sub_strategies_expansion)
	let sub_strategies_key = Object.keys(sub_strategies_expansion)
	let data_model_expansion = []
	sub_strategies_key.forEach(function (item, index) {
		let sub_strategies_expansion_name = sub_strategies_expansion[item].name
		let sub_strategies_expansion_value = parseFloat(sub_strategies_expansion[item].selected_value)
		let sub_strategies_expansion_fp = parseFloat(sub_strategies_expansion[item].fp)

		let data_model_expansion1 = modelExpansionEstrategy(
			n,
			sub_strategies_expansion_value,
			sub_strategies_expansion_fp,
			sub_strategies_expansion_name
		)
		data_model_expansion.push(data_model_expansion1)
		//createChartExpansion(list_name, strategies_name, sub_strategies_name, data_model_expansion, "chart_title_3", "line-chart-3","graph-container-3");
	})

	console.log("--- generateGhapUpgrade  sub_strategies_upgrade---", sub_strategies_upgrade)
	let data_model_upgrade = []
	let sub_strategies_upgrade_key = Object.keys(sub_strategies_upgrade)

	sub_strategies_upgrade_key.forEach(function (item, index) {
		let sub_strategies_name = sub_strategies_upgrade[item].name
		let sub_strategies_value = parseFloat(sub_strategies_upgrade[item].value) / 100
		let sub_strategies_n_LB = sub_strategies_upgrade[item].n_LB
		let sub_strategies_data = sub_strategies_upgrade[item].values_BAU
		let data_model_upgrade1 = modelUpgradeStrategy(
			n,
			sub_strategies_value,
			sub_strategies_data,
			sub_strategies_n_LB,
			sub_strategies_name
		)
		//createChartUpgrade(list_name, strategies_name, sub_strategies_name, plot_upgrade, "chart_title_4", "line-chart-4","graph-container-4");
		data_model_upgrade.push(data_model_upgrade1)
	})

	return [data_model_expansion, data_model_upgrade]
}

function generateDataIndicatorWithBau2(sub_strategies_expansion, sub_strategies_upgrade, n) {
	console.log("--- generateGhapExpansion  sub_strategies_expansion---", sub_strategies_expansion)
	let sub_strategies_key = Object.keys(sub_strategies_expansion)
	let data_model_expansion = []
	sub_strategies_key.forEach(function (item, index) {
		let sub_strategies_expansion_name = sub_strategies_expansion[item].name
		let sub_strategies_expansion_value = parseFloat(sub_strategies_expansion[item].value)
		let sub_strategies_expansion_fp = parseFloat(sub_strategies_expansion[item].fp)

		let data_model_expansion1 = modelExpansionEstrategy(
			n,
			sub_strategies_expansion_value,
			sub_strategies_expansion_fp,
			sub_strategies_expansion_name
		)
		data_model_expansion.push(data_model_expansion1)
		//createChartExpansion(list_name, strategies_name, sub_strategies_name, data_model_expansion, "chart_title_3", "line-chart-3","graph-container-3");
	})

	console.log("--- generateGhapUpgrade  sub_strategies_upgrade---", sub_strategies_upgrade)
	let data_model_upgrade = []
	let sub_strategies_upgrade_key = Object.keys(sub_strategies_upgrade)

	sub_strategies_upgrade_key.forEach(function (item, index) {
		let sub_strategies_name = sub_strategies_upgrade[item].name
		let sub_strategies_value = parseFloat(sub_strategies_upgrade[item].selected_value) / 100
		let sub_strategies_n_LB = sub_strategies_upgrade[item].n_LB
		let sub_strategies_data = sub_strategies_upgrade[item].values_BAU
		let data_model_upgrade1 = modelUpgradeStrategy(
			n,
			sub_strategies_value,
			sub_strategies_data,
			sub_strategies_n_LB,
			sub_strategies_name
		)
		//createChartUpgrade(list_name, strategies_name, sub_strategies_name, plot_upgrade, "chart_title_4", "line-chart-4","graph-container-4");
		data_model_upgrade.push(data_model_upgrade1)
	})

	return [data_model_expansion, data_model_upgrade]
}

function generateDataIndicatorWithValues(sub_strategies_expansion, sub_strategies_upgrade, n) {
	console.log("--- generateGhapExpansion  sub_strategies_expansion---", sub_strategies_expansion)
	let sub_strategies_key = Object.keys(sub_strategies_expansion)
	let data_model_expansion = []
	sub_strategies_key.forEach(function (item, index) {
		let sub_strategies_expansion_name = sub_strategies_expansion[item].name
		let sub_strategies_expansion_value = parseFloat(sub_strategies_expansion[item].selected_value)
		let sub_strategies_expansion_fp = parseFloat(sub_strategies_expansion[item].fp)

		let data_model_expansion1 = modelExpansionEstrategy(
			n,
			sub_strategies_expansion_value,
			sub_strategies_expansion_fp,
			sub_strategies_expansion_name
		)
		data_model_expansion.push(data_model_expansion1)
		//createChartExpansion(list_name, strategies_name, sub_strategies_name, data_model_expansion, "chart_title_3", "line-chart-3","graph-container-3");
	})

	console.log("--- generateGhapUpgrade  sub_strategies_upgrade---", sub_strategies_upgrade)
	let data_model_upgrade = []
	let sub_strategies_upgrade_key = Object.keys(sub_strategies_upgrade)

	sub_strategies_upgrade_key.forEach(function (item, index) {
		let sub_strategies_name = sub_strategies_upgrade[item].name
		let sub_strategies_value = parseFloat(sub_strategies_upgrade[item].selected_value) / 100
		let sub_strategies_n_LB = sub_strategies_upgrade[item].n_LB
		let sub_strategies_data = sub_strategies_upgrade[item].values_BAU
		let data_model_upgrade1 = modelUpgradeStrategy(
			n,
			sub_strategies_value,
			sub_strategies_data,
			sub_strategies_n_LB,
			sub_strategies_name
		)
		//createChartUpgrade(list_name, strategies_name, sub_strategies_name, plot_upgrade, "chart_title_4", "line-chart-4","graph-container-4");
		data_model_upgrade.push(data_model_upgrade1)
	})

	return [data_model_expansion, data_model_upgrade]
}

function createStrategyExpansionComplementary(sub_strategies, strategies_array_copia, n) {
	let sub_strategies_expansion = sub_strategies
	let ids_relatioated = sub_strategies_expansion.map((sub) => {
		let id_relationated = sub.id_relation
		return id_relationated
	})

	console.log("entra a expansion ids_relatioated", ids_relatioated)

	console.log("entra a actualizacion strategies_array_copia", strategies_array_copia)
	let strategies_copia = JSON.parse(JSON.stringify(strategies_array_copia))

	let strategies_array_copia_process = filterStrategiesByProcess(strategies_copia)
	let strategies_by_id_relationated = filterStrategiesByIdRelationated(
		strategies_array_copia_process,
		ids_relatioated
	)
	let sub_strategies_upgrade = strategies_by_id_relationated.models[1]
	console.log(
		"entra a expansion need strategies_by_id_relationated",
		strategies_by_id_relationated.models[1]
	)
	let strategies_complementaries = sub_strategies_upgrade.strategies
		.filter((strategy) =>
			sub_strategies_expansion.some((strategy2) =>
				strategy2.id_relation.includes(strategy.id_relation)
			)
		)
		.map((sub_strategies_upgrade_list) => {
			let newSubStrategies = Object.assign({}, sub_strategies_upgrade_list)
			return newSubStrategies
		})
	console.log("entra a expansion strategies_complementaries", strategies_complementaries)
	let create_data_indicator = generateDataIndicatorWithBau(
		sub_strategies_expansion,
		strategies_complementaries,
		n
	)
	let create_data_indicator_generation = create_data_indicator[0]
	console.log("create_data_indicator_generation", create_data_indicator_generation)
	let create_data_indicator_consume = create_data_indicator[1]
	console.log("create_data_indicator_consume", create_data_indicator_consume)
	createGraphIndicator(create_data_indicator_generation, create_data_indicator_consume)
	//generateComplementaryStrategies()
	//generateGhapExpansion(sub_strategies,n,strategies_name);
	console.log("entra a expansion sub_strategies", sub_strategies)
}

function createStrategyUpgradeComplementary(sub_strategies, strategies_array_copia, n) {
	let sub_strategies_upgrade = sub_strategies
	let ids_relatioated = sub_strategies_upgrade.map((sub) => {
		let id_relationated = sub.id_relation
		return id_relationated
	})
	console.log("entra a actualizacion ids_relatioated", ids_relatioated)
	console.log("entra a actualizacion strategies_array_copia", strategies_array_copia)
	let strategies_copia = JSON.parse(JSON.stringify(strategies_array_copia))
	let strategies_array_copia_process = filterStrategiesByProcess(strategies_copia)
	let strategies_by_id_relationated = filterStrategiesByIdRelationated(
		strategies_array_copia_process,
		ids_relatioated
	)
	console.log(
		"entra a actualizacion need strategies_by_id_relationated",
		strategies_by_id_relationated.models[0]
	)
	let sub_strategies_expansion = strategies_by_id_relationated.models[0]
	let strategies_complementaries = sub_strategies_expansion.strategies
		.filter((strategy) =>
			sub_strategies_upgrade.some((strategy2) =>
				strategy2.id_relation.includes(strategy.id_relation)
			)
		)
		.map((sub_strategies_upgrade_list) => {
			let newSubStrategies = Object.assign({}, sub_strategies_upgrade_list)
			return newSubStrategies
		})
	console.log("entra a expansion strategies_complementaries", strategies_complementaries)
	let create_data_indicator = generateDataIndicatorWithBau2(
		strategies_complementaries,
		sub_strategies_upgrade,
		n
	)
	let create_data_indicator_generation = create_data_indicator[0]
	console.log("create_data_indicator_generation", create_data_indicator_generation)
	let create_data_indicator_consume = create_data_indicator[1]
	console.log("create_data_indicator_consume", create_data_indicator_consume)
	createGraphIndicator(create_data_indicator_generation, create_data_indicator_consume)
	//generateGhapUpgrade(sub_strategies,n,strategies_name)
	console.log("entra a actualizacion")
}

function createGraphIndicator(create_data_indicator_generation, create_data_indicator_consume) {
	let generacion = create_data_indicator_generation
	let consumo = create_data_indicator_consume
	//datos de pib desde 2022 hasta 2030, no es necesario agregar año porque el sistem recorre hasta el año que necesita
	let pib = [
		344.1612833, 355.4685381, 367.8705797, 380.837696, 394.8857455, 408.9742253, 423.1216551,
		437.1906672, 451.7446956,
	]
	let fe = 0.13

	let keys_genrartion = Object.keys(generacion)
	//let keys_consume = Object.keys(consumo)
	keys_genrartion.forEach(function (item, index) {
		let genration_item = generacion[item]
		let consume_item = consumo[item]

		let data_generacion_total = modifyData(genration_item)
		let data_consumo_total = modifyData(consume_item)

		let data_generacion = data_generacion_total[0]
		let name = data_generacion_total[1]
		let data_consumo = data_consumo_total[0]

		generationIndicatorEficiency(data_generacion, data_consumo, name)
		generationIndicatorsIEP(data_consumo, pib, name)
		generationIndicatorsIEC(data_consumo, fe, pib, name)
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
			let strategies_relationated = b.strategies
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
			let sub_str_not_included = b.strategies
				.filter((strategy) =>
					a.strategies.some((strategy2) => strategy2.id_relation.includes(strategy.id_relation))
				)
				.map((sub) => {
					let new_ids = sub.id_relation
					return new_ids
				})
			console.log("graficar estrategias")
			console.log("graficar estrategias a.strategies", a.strategies)
			console.log("graficar estrategias strategies_relationated", strategies_relationated)
			console.log("graficar estrategias sub_str_not_included", sub_str_not_included)
			generateGhapExpansion(a.strategies, n, strategiesName[0])
			generateGhapUpgrade(strategies_relationated, n, strategiesName[1])

			if (
				Object.entries(
					b.strategies.filter((strategy) => !sub_str_not_included.includes(strategy.id_relation))
				).length != 0
			) {
				let sub_str_not_relationed = b.strategies.filter(
					(strategy) => !sub_str_not_included.includes(strategy.id_relation)
				)
				console.log("graficar estrategias sub_str_not_relationed", sub_str_not_relationed)
				generateGhapUpgrade(sub_str_not_relationed, n, strategiesName[1])
			}
		} else if (
			Object.entries(
				b.strategies.filter((strategy) =>
					a.strategies.some((strategy2) => strategy2.id_relation !== strategy.id_relation)
				)
			).length != 0
		) {
			//aqui grafica cuando tiene las dos estrategias pero esta no esta relacionada con las sub estrategias de expansion
			let sub_strategies_no_relationed = b.strategies.filter((strategy) =>
				a.strategies.some((strategy2) => strategy2.id_relation !== strategy.id_relation)
			)
			generateGhapExpansion(a.strategies, n, strategiesName[0])
			generateGhapUpgrade(sub_strategies_no_relationed, n, strategiesName[1])
		} else {
			//aqui grafica cuando tiene las dos estrategias pero ninguna esta relacionada entre si //nunca entra pero por si acaso
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

function plotDataIndicators(strategies) {
	let strategiesModels = strategies.models
	let n = 9
	let strategies_array_copia = const_strategies

	let strategiesName = getStrategieName()
	console.log("---plotDataIndicators---")
	console.log("---plotDataIndicators---strategies_array_copia", strategies_array_copia)

	if (
		Object.entries(strategiesModels.filter((model) => strategiesName[0].includes(model.name)))
			.length != 0 &&
		Object.entries(strategiesModels.filter((model) => strategiesName[1].includes(model.name)))
			.length != 0
	) {
		let a = strategiesModels[0]
		let b = strategiesModels[1]

		console.log("como es a", a)
		console.log("como es b", b)

		if (
			Object.entries(
				b.strategies.filter((strategy) =>
					a.strategies.some((strategy2) => strategy2.id_relation.includes(strategy.id_relation))
				)
			).length != 0
		) {
			//aqui grafica cuando tiene las dos estrategias y que estan relacionadas entre si
			let strategies_relationated = b.strategies
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
			let sub_str_not_included = b.strategies
				.filter((strategy) =>
					a.strategies.some((strategy2) => strategy2.id_relation.includes(strategy.id_relation))
				)
				.map((sub) => {
					let new_ids = sub.id_relation
					return new_ids
				})

			let sub_str_not_included_expansion = a.strategies
				.filter((strategy) =>
					b.strategies.some((strategy2) => strategy2.id_relation.includes(strategy.id_relation))
				)
				.map((sub) => {
					let new_ids = sub.id_relation
					return new_ids
				})
			// console.log("como es a.strategies",a.strategies)
			// console.log("como es strategies_relationated",strategies_relationated)
			// console.log("como es sub_str_not_included auixlio",sub_str_not_included)
			console.log("como es sub_str_not_included", sub_str_not_included)
			console.log("como es sub_str_not_included_expansion", sub_str_not_included_expansion)

			let create_data_indicator = generateDataIndicatorWithValues(
				a.strategies,
				strategies_relationated,
				n
			)
			let create_data_indicator_generation = create_data_indicator[0]
			let create_data_indicator_consume = create_data_indicator[1]
			createGraphIndicator(create_data_indicator_generation, create_data_indicator_consume)

			if (
				Object.entries(
					b.strategies.filter((strategy) => !sub_str_not_included.includes(strategy.id_relation))
				).length != 0
			) {
				let sub_str_not_relationed = b.strategies.filter(
					(strategy) => !sub_str_not_included.includes(strategy.id_relation)
				)

				//generateGhapUpgrade(sub_str_not_relationed,n,strategiesName[1])
				console.log(
					"como es sub_str_not_relationed no incluye actualizacion",
					sub_str_not_relationed
				)
			}
			if (
				Object.entries(
					a.strategies.filter(
						(strategy) => !sub_str_not_included_expansion.includes(strategy.id_relation)
					)
				).length != 0
			) {
				let sub_str_not_relationed = a.strategies.filter(
					(strategy) => !sub_str_not_included_expansion.includes(strategy.id_relation)
				)

				//generateGhapUpgrade(sub_str_not_relationed,n,strategiesName[1])
				console.log("como es sub_str_not_relationed no incluye expansion", sub_str_not_relationed)
			}
		} else if (
			Object.entries(
				b.strategies.filter((strategy) =>
					a.strategies.some((strategy2) => strategy2.id_relation !== strategy.id_relation)
				)
			).length != 0
		) {
			//aqui grafica cuando tiene las dos estrategias pero esta no esta relacionada con las sub estrategias de expansion
			console.log("create_data_indicator----entra ??")
			let sub_strategies_no_relationed = b.strategies.filter((strategy) =>
				a.strategies.some((strategy2) => strategy2.id_relation !== strategy.id_relation)
			)
			/** Se puede usar las mismas funciones de cuanto no fueron seleccionadas las dos estrategias (expansioon y actualizacion)
			 * No es necesario verificar el tipo de estrategia ya que el filtro anterior siempre devuelve
			 * las sub estrategias de actualizacion
			 */
			createStrategyExpansionComplementary(a.strategies, strategies_array_copia, n)
			createStrategyUpgradeComplementary(sub_strategies_no_relationed, strategies_array_copia, n)
		} else {
			//aqui grafica cuando tiene las dos estrategias pero ninguna esta relacionada entre si //nunca entra pero por si acaso
			//generateGhapExpansion(a.strategies,n,strategiesName[0]);
			//generateGhapUpgrade(b.strategies,n,strategiesName[1])
		}
	} else {
		let strategiesModelsKeys = Object.keys(strategiesModels)
		strategiesModelsKeys.forEach(function (items, index) {
			let strategies_name = strategiesModels[items].name
			let sub_strategies = strategiesModels[items].strategies
			if (strategies_name == "Estrategias de expansión") {
				createStrategyExpansionComplementary(sub_strategies, strategies_array_copia, n)
			} else if (strategies_name == "Estrategias de actualización") {
				createStrategyUpgradeComplementary(sub_strategies, strategies_array_copia, n)
			}
		})
	}
}

function generateComplementaryStrategies() {
	let strategies_relationated = b.strategies
		.filter((strategy) =>
			a.strategies.some((strategy2) => strategy2.id_relation.includes(strategy.id_relation))
		)
		.map((sub_strategies) => {
			let newSubStrategies = Object.assign({}, sub_strategies, {
				values_BAU: a.strategies
					.filter((strategyValue) => strategyValue.id_relation.includes(sub_strategies.id_relation))
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
	return strategies_relationated
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
	// implementar funcion que cache cuando se presione el boton de paso 4
	plotDataIndicators(strategies)
}

/* Desarrollo Nuevo */
$(".btn-progress-next").on("click", function () {
	var currentStepNum = $(".checkout-progress").data("current-step")
	var nextStepNum = currentStepNum + 1
	var currentStep = $(".stepp.stepp-" + currentStepNum)
	var nextStep = $(".stepp.stepp-" + nextStepNum)
	var currentProgress = $(".checkout-progress")
	if (currentStepNum == 6) {
		return false
	}
	currentProgress.removeClass(".stepp-" + currentStepNum).addClass(".stepp-" + (currentStepNum + 1))

	currentStep.removeClass("active").addClass("valid")
	currentStep.find("span").addClass("opaque")
	currentStep.find(".fa.fa-check").removeClass("opaque")

	nextStep.addClass("active")

	currentProgress
		.removeAttr("class")
		.addClass("checkout-progress stepp-" + nextStepNum)
		.data("current-step", nextStepNum)
})

$(".btn-progress-prev").on("click", function () {
	var currentStepNum = $(".checkout-progress").data("current-step")
	var prevStepNum = currentStepNum - 1
	var currentStep = $(".stepp.stepp-" + currentStepNum)
	var prevStep = $(".stepp.stepp-" + prevStepNum)
	var currentProgress = $(".checkout-progress")
	if (currentStepNum == 1) {
		return false
	}
	currentProgress.removeClass(".stepp-" + currentStepNum).addClass(".stepp-" + prevStepNum)

	currentStep.removeClass("active")

	prevStep.find("span").removeClass("opaque")
	prevStep.find(".fa.fa-check").addClass("opaque")
	prevStep.addClass("active").removeClass("valid")

	currentProgress
		.removeAttr("class")
		.addClass("checkout-progress stepp-" + prevStepNum)
		.data("current-step", prevStepNum)
})
