var last_indicator_3 = ""
var chart_element_3 = ""
var keys_list_3 = []
var last_indicator_4 = ""
var chart_element_4 = ""
var keys_list_4 = []
var last_indicator_5 = ""
var chart_element_5 = ""
var keys_list_5 = []
var last_indicator_6 = ""
var chart_element_6 = ""
var keys_list_6 = []
var last_indicator_7 = ""
var chart_element_7 = ""
var keys_list_7 = []
var last_indicator_8 = ""
var chart_element_8 = ""
var keys_list_8 = []
let data_topsis = []
var strategies_const
let const_strategies = {}

var units_array = []
function loadUnit(units) {
	units_array = units
}

function validateDate() {
	let anio_base = 2021
	let year_selected = parseInt(document.getElementById("fecha").innerText)
	let n = year_selected - anio_base
	return n
}

document.getElementById("adjust_sub_estrategies_prev").addEventListener("click", function () {
	cleanGrahpVariables()
})

document.getElementById("visalization_indicators_prev").addEventListener("click", function () {
	cleanGrahpIndicators()
})

function cleanGrahpVariables() {
	if (chart_element_3) {
		chart_element_3.destroy()
		document.getElementById("chart_title_3").innerHTML = " "
	}
	if (chart_element_4) {
		chart_element_4.destroy()
		document.getElementById("chart_title_4").innerHTML = " "
	}
}

function cleanGrahpIndicators() {
	if (chart_element_5) {
		chart_element_5.destroy()
		document.getElementById("chart_title_5").innerHTML = " "
	}
	if (chart_element_6) {
		chart_element_6.destroy()
		document.getElementById("chart_title_6").innerHTML = " "
	}
	if (chart_element_7) {
		chart_element_7.destroy()
		document.getElementById("chart_title_7").innerHTML = " "
	}
}
function checkParameters() {
	var year_selected = document.getElementById("fecha").innerText
	var text_process_selected = $("#process-selected").find("span").text()
	var name_scenario = document.getElementById("name-input").value
	console.log(name_scenario)
	if (
		!(year_selected === "Seleccionar") &&
		!(text_process_selected === "Seleccionar") &&
		!(name_scenario == null)
	) {
		loadParameters(name_scenario, text_process_selected)
		ActiveSection("scenarios_2")
		return
	} else {
		$("#error-section").text("Verifique los campos ingresados")
		if (year_selected === "Seleccionar") {
			$("#select-year").addClass("btn-danger")
		}
		if (text_process_selected === "Seleccionar") {
			$("#process-selected").addClass("btn-danger")
		}
		if (!name_scenario) {
			$("#name-input").addClass("border-danger")
		}
	}
}

function loadParameters(name, process) {
	document.querySelectorAll("#scenario-name-macro").forEach(function (element) {
		element.innerHTML = name
	})
	document.querySelectorAll("#scenario-process-macro").forEach(function (element) {
		element.innerHTML = process
	})
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
	const table_name = indicator
	document.getElementById(chart_title).innerHTML = table_name
	var json_file = dataModel_pruebas_expansion
	//console.log("graficas analisis createChartExpansion", json_file)
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
		unit = units[indicator]
		if (unit == "Porcentaje %") {
			array = array.map(function (x) {
				return x * 100
			})
		}
	}
	/* Agregada - Capturar graficas actuales > 2 restablece */
	/* Desagregados - else */
	try {
		_ = chart_element_3.data.datasets
		var graphAlreadyExist = true
	} catch (e) {
		var graphAlreadyExist = false
	} finally {
		if (!keys_list_3.includes(row_table) && graphAlreadyExist) {
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
			return
		} else {
			{
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
			//console.log("last_indicator_3", last_indicator_3)
		}
	}
}

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
	const table_name = indicator
	document.getElementById(chart_title).innerHTML = table_name
	var json_file = dataModel_pruebas_expansion
	//console.log("graficas analisis createChartUpgrade", json_file)
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
		unit = units[indicator]
		if (unit == "Porcentaje %") {
			array = array.map(function (x) {
				return x * 100
			})
		}
	}
	/* Agregada - Capturar graficas actuales > 2 restablece */
	/* Desagregados - else */
	try {
		_ = chart_element_4.data.datasets
		var graphAlreadyExist = true
	} catch (e) {
		var graphAlreadyExist = false
	} finally {
		if (!keys_list_4.includes(row_table) && graphAlreadyExist) {
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
		//console.log("last_indicator_4", last_indicator_4)
	}
}

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
	var row_table = row
	var al = Math.floor(Math.random() * 255)
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
	const table_name = indicator
	document.getElementById(chart_title).innerHTML = table_name
	var json_file = dataModel_pruebas_expansion
	//console.log("graficas analisis createChartIndicador1", json_file)
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
		unit = units[indicator]
		if (unit == "Porcentaje %") {
			array = array.map(function (x) {
				return x * 100
			})
		}
	}
	/* Agregada - Capturar graficas actuales > 2 restablece */
	/* Desagregados - else */
	try {
		_ = chart_element_5.data.datasets
		var graphAlreadyExist = true
	} catch (e) {
		var graphAlreadyExist = false
	} finally {
		if (!keys_list_5.includes(row_table) && graphAlreadyExist) {
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
			return
		} else {
			{
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
			//console.log("last_indicator_5", last_indicator_5)
		}
	}
}

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
	var row_table = row
	var al = Math.floor(Math.random() * 255)
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
	const table_name = indicator
	document.getElementById(chart_title).innerHTML = table_name
	var json_file = dataModel_pruebas_expansion
	//console.log("graficas analisis createChartIndicador2", json_file)
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
		unit = units[indicator]
		if (unit == "Porcentaje %") {
			array = array.map(function (x) {
				return x * 100
			})
		}
	}
	/* Agregada - Capturar graficas actuales > 2 restablece */
	/* Desagregados - else */
	try {
		_ = chart_element_6.data.datasets
		var graphAlreadyExist = true
	} catch (e) {
		var graphAlreadyExist = false
	} finally {
		if (!keys_list_6.includes(row_table) && graphAlreadyExist) {
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
			return
		} else {
			{
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
			//console.log("last_indicator_6", last_indicator_6)
		}
	}
}

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
	var row_table = row
	var al = Math.floor(Math.random() * 255)
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
	const table_name = indicator
	document.getElementById(chart_title).innerHTML = table_name
	var json_file = dataModel_pruebas_expansion
	//console.log("graficas analisis createChartIndicador3", json_file)
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
		unit = units[indicator]
		if (unit == "Porcentaje %") {
			array = array.map(function (x) {
				return x * 100
			})
		}
	}
	/* Agregada - Capturar graficas actuales > 2 restablece */
	/* Desagregados - else */
	try {
		_ = chart_element_7.data.datasets
		var graphAlreadyExist = true
	} catch (e) {
		var graphAlreadyExist = false
	} finally {
		if (!keys_list_7.includes(row_table) && graphAlreadyExist) {
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
			return
		} else {
			{
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
			//console.log("last_indicator_7", last_indicator_7)
		}
	}
}

function createChartTopsis(
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
	const table_name = indicator
	document.getElementById(chart_title).innerHTML = table_name
	var json_file = dataModel_pruebas_expansion
	//console.log("graficas analisis createChartTopsis", json_file)
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
		unit = units[indicator]
		if (unit == "Porcentaje %") {
			array = array.map(function (x) {
				return x * 100
			})
		}
	}
	/* Agregada - Capturar graficas actuales > 2 restablece */
	/* Desagregados - else */
	try {
		_ = chart_element_8.data.datasets
		var graphAlreadyExist = true
	} catch (e) {
		var graphAlreadyExist = false
	} finally {
		if (!keys_list_8.includes(row_table) && graphAlreadyExist) {
			keys_list_8.push(row_table)
			const update_dataset = {
				label: row_table,
				borderColor: colorslist[keys_list_8.length],
				backgroundColor: b_colorslist[keys_list_8.length],
				data: array,
				spanGraphs: false,
				fill: true,
			}
			chart_element_8.data.datasets.push(update_dataset)
			chart_element_8.update()
			return
		} else {
			{
				keys_list_8 = [row_table]
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
										display: false,
										labelString: "Año",
									},
								},
							],
							yAxes: [
								{
									stacked: false,
									scaleLabel: {
										display: false,
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
				chart_element_8 = new Chart(document.getElementById(line_chart), config)
			}
			last_indicator_8 = indicator
			//console.log("last_indicator_8", last_indicator_8)
		}
	}
}

function loadSliders(strategies_array) {
	$(".form-range").each(function () {
		$(this).bootstrapSlider()
		$(this).on("change", { passive: true }, function (slideEvt) {
			$(this).parents(".group-form-range").find(".form-range-value").text(slideEvt.value.newValue)
		})
		$(this).on("slideStop", { passive: true }, function (slideEvt) {
			slideEvt.preventDefault()
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
	var processName = $("#process-selected").find("span").text()
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

//let const_strategies = {}
function loadStrategies(strategies_array, strategies_id_selected) {
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
	list_names.forEach(function (item, index) {
		let data_loop = data[item]
		let data_loop_keys = Object.keys(data_loop)
		let name = Object.keys(data_loop[0])
		name_return = name[1]

		data_loop_keys.forEach(function (item2, index2) {
			let data_loop_keys_item = data[item][item2]
			let data_loop_keys2 = Object.values(data_loop_keys_item)
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
	} else if (name == "Generación eléctrica a partir de plantas de Auto y Cogeneración") {
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
	} else if (name == "Generación eléctrica a partir de plantas de Auto y Cogeneración") {
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
	} else if (name == "Generación eléctrica a partir de plantas de Auto y Cogeneración") {
		name = "Emisiones de carbono en plantas de Auto y Cogeneración"
	} else if (name == "Generación eléctrica a partir de plantas eólicas") {
		name = "Emisiones de carbono en plantas eólicas"
	} else if (name == "Generación eléctrica a partir de plantas solares") {
		name = "Emisiones de carbono en plantas solares"
	}
	return name
}
function generationIndicatorEficiency(generacion, consumo, name) {
	name = validateNameIndicatorEficiency(name)
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
		data_plot_dict.Año = anio_eficiency
		data_plot_dict[name] = eficiency
		data_plot_eficiency.push(data_plot_dict)
	}
	data_plot_return["Indicador de eficiencia energética"] = data_plot_eficiency
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
		//data_plot_dict = {"Año": anio, "Indicador intensidad energética primaria": iep};
		data_plot_dict.Año = anio
		data_plot_dict[name] = iep
		data_plot_iep.push(data_plot_dict)
	}
	data_plot_return["Indicador intensidad energética primaria"] = data_plot_iep
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
		data_plot_dict.Año = anio
		data_plot_dict[name] = iec
		data_plot_iec.push(data_plot_dict)
	}
	data_plot_return["Indicador intensidad de emisiones de carbono"] = data_plot_iec
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

	let strategies_copia = JSON.parse(JSON.stringify(strategies_array_copia))

	let strategies_array_copia_process = filterStrategiesByProcess(strategies_copia)
	let strategies_by_id_relationated = filterStrategiesByIdRelationated(
		strategies_array_copia_process,
		ids_relatioated
	)
	let sub_strategies_upgrade = strategies_by_id_relationated.models[1]
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
	let create_data_indicator = generateDataIndicatorWithBau(
		sub_strategies_expansion,
		strategies_complementaries,
		n
	)
	let create_data_indicator_generation = create_data_indicator[0]
	let create_data_indicator_consume = create_data_indicator[1]
	createGraphIndicator(create_data_indicator_generation, create_data_indicator_consume)
}

function createStrategyUpgradeComplementary(sub_strategies, strategies_array_copia, n) {
	let sub_strategies_upgrade = sub_strategies
	let ids_relatioated = sub_strategies_upgrade.map((sub) => {
		let id_relationated = sub.id_relation
		return id_relationated
	})
	let strategies_copia = JSON.parse(JSON.stringify(strategies_array_copia))
	let strategies_array_copia_process = filterStrategiesByProcess(strategies_copia)
	let strategies_by_id_relationated = filterStrategiesByIdRelationated(
		strategies_array_copia_process,
		ids_relatioated
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
	let create_data_indicator = generateDataIndicatorWithBau2(
		strategies_complementaries,
		sub_strategies_upgrade,
		n
	)
	let create_data_indicator_generation = create_data_indicator[0]
	let create_data_indicator_consume = create_data_indicator[1]
	createGraphIndicator(create_data_indicator_generation, create_data_indicator_consume)
}

function emissionFactor(name) {
	let fe = 0
	if (name == "Generación eléctrica a partir de parque térmico") {
		fe = 0.126379
	} else if (name == "Generación eléctrica a partir de plantas de Auto y Cogeneración") {
		fe = 0.126379
	} else {
		fe = 0
	}
	return fe
}

function modifyName(name) {
	let str = name
	// let keyword = "de";
	// let words = str.split(" ");
	// let index = words.indexOf(keyword);
	// let result = words.slice(index).join(" ");
	let keyword = "de"
	let index = str.indexOf(keyword)
	let result = str.slice(index + keyword.length).trim()
	return result
}

function prepareDataTopsis(eficiency, iep, iec, name) {
	let parent_object = {}
	let name_plant = modifyName(name)
	let efi = Object.values(eficiency)[0].slice(-1)[0]
	let efi_last_value = Object.values(efi)[1]
	let efi_last_name = Object.keys(efi)[1]

	let iep_last = Object.values(iep)[0].slice(-1)[0]
	let iep_las_value = Object.values(iep_last)[1]
	let iep_las_name = Object.keys(iep_last)[1]

	let iec_last = Object.values(iec)[0].slice(-1)[0]
	let iec_last_value = Object.values(iec_last)[1]
	let iec_last_name = Object.keys(iec_last)[1]

	let data_topsis_return = Object.assign({}, parent_object, {
		[name_plant]: [
			{
				[efi_last_name]: efi_last_value,
				[iep_las_name]: iep_las_value,
				[iec_last_name]: iec_last_value,
			},
		],
	})
	return data_topsis_return
}

function createDataChartTopsis(data) {
	let dataTopsis = JSON.parse(data)
	let keys = Object.keys(dataTopsis)
	keys.forEach(function (item) {
		let alternatives = dataTopsis[item]["alternatives"]
		let data_graph = []
		let array_alternatives = []
		let dict_graph = {}
		dict_graph.Año = " "
		dict_graph[alternatives] = dataTopsis[item]["performance score"]
		array_alternatives.push(dict_graph)
		data_graph["Clasificación de estrategias"] = array_alternatives
		createChartTopsis(
			list_name,
			"Clasificación de estrategias",
			alternatives,
			data_graph,
			"chart_title_8",
			"line-chart-8",
			"graph-container-8"
		)
	})
}

//let data_topsis = []
function createGraphIndicator(create_data_indicator_generation, create_data_indicator_consume) {
	let generacion = create_data_indicator_generation
	let consumo = create_data_indicator_consume
	//datos de pib desde 2022 hasta 2030, no es necesario agregar año porque el sistem recorre hasta el año que necesita
	let pib = [
		344.1612833, 355.4685381, 367.8705797, 380.837696, 394.8857455, 408.9742253, 423.1216551,
		437.1906672, 451.7446956,
	]
	let keys_genrartion = Object.keys(generacion)
	keys_genrartion.forEach(function (item, index) {
		let genration_item = generacion[item]
		let consume_item = consumo[item]

		let data_generacion_total = modifyData(genration_item)
		let data_consumo_total = modifyData(consume_item)

		let data_generacion = data_generacion_total[0]
		let name = data_generacion_total[1]
		let data_consumo = data_consumo_total[0]
		let fe = emissionFactor(name)
		let eficiency = generationIndicatorEficiency(data_generacion, data_consumo, name)
		let iep = generationIndicatorsIEP(data_consumo, pib, name)
		let iec = generationIndicatorsIEC(data_consumo, fe, pib, name)
		let values = prepareDataTopsis(eficiency, iep, iec, name)
		data_topsis.push(values)
	})
}
function plotDataStrategies(strategies) {
	let strategiesModels = strategies.models
	let n = validateDate()

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
	let n = validateDate()
	let strategies_array_copia = const_strategies

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

			let strategies_relationated_expansion = a.strategies.filter((strategy) =>
				b.strategies.some((strategy2) => strategy2.id_relation.includes(strategy.id_relation))
			)
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
			let create_data_indicator = generateDataIndicatorWithValues(
				strategies_relationated_expansion,
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
				createStrategyUpgradeComplementary(sub_str_not_relationed, strategies_array_copia, n)
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
				createStrategyExpansionComplementary(sub_str_not_relationed, strategies_array_copia, n)
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
//var strategies_const
function updateChart(strategies_array) {
	//console.log(getCurrentValues())
	let current_values = getCurrentValues()
	strategies_const = filterStrategiesByIdValues(strategies_array, current_values)
	plotDataStrategies(strategies_const)
}

document.getElementById("adjust_sub_estrategies_next").addEventListener("click", function () {
	plotDataIndicators(strategies_const)
})

function topsisValues(weights){
	let parent_object = {}
	// let criterios_values = Object.assign({}, parent_object, {
	// 	criteria_values: [
	// 		{ energetico: 0.352350155182091, economico: 0.138435264150802, ambiental: 0.509214580667107 },
	// 	],
	// })
	let criterios_values = {}
	criterios_values = Object.assign({}, parent_object, {
		criteria_values: [weights],
	})
	data_topsis.push(criterios_values)
	const dict_values = { data_topsis }
	const s = JSON.stringify(dict_values)
	//console.log(s)
	$.ajax({
		url: "/dashboard/analysis",
		type: "POST",
		contentType: "application/json",
		charset: "utf-8",
		data: JSON.stringify(s),
		success: function (data, status, xhr) {
			// success callback function
			//console.log("data respon", data)
			console.log("status: " + status)
			createDataChartTopsis(data)
			data_topsis.pop()
		},
		error: function (jqXhr, textStatus, errorMessage) {
			// error callback
			console.log("Error: " + errorMessage)
		},
	})
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

$(".weight-input").each(function () {
	$(this).on("change", { passive: true }, function (changeEvt) {
		if (!sum_values_checker()) {
			$(this).addClass("is-invalid")
		} else {
			$(".weight-input").removeClass("is-invalid")
		}
	})
})

function get_weights_values() {
	let values = $(".weight-input")
		.map(function () {
			return parseFloat($(this).val())
		})
		.get()
	return values
}

function sum_values_checker() {
	let sum = get_weights_values().reduce((partialSum, a) => partialSum + a, 0)
	return sum < 99 || sum > 101 ? false : true
}

function weights_check() {
	let weights = {
		energetico: 0.333,
		economico: 0.333,
		ambiental: 0.333,
	}

	if (sum_values_checker()) {
		let values = get_weights_values()
		weights["ambiental"] = values[0] / 100
		weights["economico"] = values[1] / 100
		weights["energetico"] = values[2] / 100
		topsisValues(weights)
	} else {
		console.log("error de valores")
	}
}
