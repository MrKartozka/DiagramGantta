import React, { useEffect, useState } from "react";
import { GanttChart } from "smart-webcomponents-react/ganttchart";
import "smart-webcomponents-react/source/styles/smart.default.css";
import "./Diagram.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TableDiagram from "../TableDiagram/TableDiagram";
import NavigationBar from "../NavigationBar/NavigationBar";
import SideNav from "../SideNav/SideNav";

function Diagram() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedChart, setSelectedChart] = useState("gantta");
	const [searchTerm, setSearchTerm] = useState("");
	const [ganttView, setGanttView] = useState("year"); // new state variable for the Gantt chart view

	const handleAvatarClick = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	// Эффект для имитации загрузки данных
	useEffect(() => {
		// Имитация загрузки данных, если они есть
		const data = []; // Пустой массив для демонстрации работы с пустыми данными
		setFilteredData(data);
	}, []);

	// handle increase time
	const increaseTime = () => {
		setGanttView((prevView) => {
			switch (prevView) {
				case "hour":
					return "day";
				case "day":
					return "week";
				case "week":
					return "month";
				case "month":
					return "year";
				default:
					return prevView;
			}
		});
	};

	// handle decrease time
	const decreaseTime = () => {
		setGanttView((prevView) => {
			switch (prevView) {
				case "year":
					return "month";
				case "month":
					return "week";
				case "week":
					return "day";
				case "day":
					return "hour";
				default:
					return prevView;
			}
		});
	};

	const ganttaData = [
		{
			label: "00-260(44)",
			taskStatus: "RectangleGreen.svg",
			dateStart: "2020-06-25",
			dateEnd: "2021-04-28",
			nomenclature: "РК-231.45.33.77_Шестерня",
			product: "Редуктор_РК-231",
			quantity: "2",
			laborIntensity: "4",
			customer: "ООО_Антей",
			productivity: "0",
			cost: "5400",
			priority: "1",
			planDate: "2023-04-15",
			actualDate: "2023-04-18",
			purchase: "0",
			blank: "Круг_стальной_ГОСТ_380-2005_СтЗсп",
			deviation: "3",
			unitPrice: "4000",
			percent: "50",
			dce: "РТ65.233.25",
			dragProject: true,
			expanded: true,
			type: "order",
			tasks: [
				{
					label: "020 Токарная",
					taskStatus: "RectangleGreen.svg",
					dateStart: "2020-09-10",
					dateEnd: "2021-08-10",
					dragProject: true,
					Number: "020",
					Name: "Токарная",
					CodeOperation: "4110",
					laborIntensity: "2",
					gild: "2",
					technicalprocess: "223.2332.42",
					cost: "2100",
					quantity: "3",
					planDate: "16.12.2022",
					actualDate: "16.12.2022",
					purchase: "0",
					outfit: "Н3000423",
					deviation: "2",
					priority: "1",
					unitPrice: "4000",
					percent: "50",
					dce: "РТ65.233.25",
					expanded: true,
					type: "operation",
					tasks: [
						{
							label: "Pegas 380",
							taskStatus: "RectangleGreen.svg",
							description:
								"Фрезерный универсальный станок 5 осей ЧПУ",
							dateStart: "2020-09-10",
							dateEnd: "2021-08-10",
							dragProject: true,
							typical: "Оборудование ЧПУ",
							gild: "3",
							system: "none",
							nowstatus: "Техобслуживание",
							uin: "3T3555",
							deviation: "3",
							priority: "1",
							quantity: "2",
							unitPrice: "4000",
							percent: "50",
							planDate: "2023-03-11",
							actualDate: "2023-04-15",
							dce: "РТ65.233.25",
							expanded: true,
							type: "resources",
						},
						{
							label: "Слесарь",
							taskStatus: "RectangleGreen.svg",
							dateStart: "2020-09-10",
							dateEnd: "2021-08-10",
							Surname: "Смотраков",
							Name: "Алексей",
							SecSurname: "Владимирович",
							Profession: "Слесарь",
							rank: "4",
							gild: "12",
							UIN: "P567723",
							Current_status: "Алексей",
							deviation: "3",
							priority: "1",
							quantity: "2",
							unitPrice: "4000",
							percent: "50",
							planDate: "2023-03-11",
							actualDate: "2023-04-15",
							dce: "РТ65.233.25",
							dragProject: true,
							expanded: true,
							type: "resources",
						},
					],
				},
			],
		},
		{
			label: "02-450(34)",
			taskStatus: "RectangleBlue.svg",
			dateStart: "2020-04-25",
			dateEnd: "2021-02-15",
			nomenclature: "РК-231.45.33.77_Шестерня",
			product: "Редуктор_РК-231",
			quantity: "2",
			laborIntensity: "4",
			customer: "ООО_Антей",
			productivity: "0",
			cost: "5400",
			priority: "2",
			planDate: "2023-03-11",
			actualDate: "2023-04-15",
			purchase: "0",
			blank: "Круг_стальной_ГОСТ_380-2005_СтЗсп",
			deviation: "5",
			unitPrice: "5000",
			percent: "50",
			dce: "КТ15.263.27",
			dragProject: true,
			expanded: true,
			type: "order",
			tasks: [
				{
					label: "020 Токарная",
					taskStatus: "RectangleBlue.svg",
					dateStart: "2020-09-10",
					dateEnd: "2021-08-10",
					dragProject: true,
					Number: "020",
					Name: "Токарная",
					CodeOperation: "4110",
					laborIntensity: "2",
					gild: "2",
					technicalprocess: "223.2332.42",
					cost: "2100",
					quantity: "3",
					planDate: "16.12.2022",
					actualDate: "16.12.2022",
					purchase: "0",
					outfit: "Н3000423",
					deviation: "3",
					priority: "1",
					unitPrice: "4000",
					percent: "50",
					dce: "РТ65.233.25",
					expanded: true,
					type: "operation",
					tasks: [
						{
							label: "Слесарь",
							taskStatus: "RectangleRed.svg",
							dateStart: "2020-09-10",
							dateEnd: "2021-08-10",
							Surname: "Смотраков",
							Name: "Алексей",
							SecSurname: "Владимирович",
							Profession: "Слесарь",
							rank: "4",
							gild: "12",
							UIN: "P567723",
							Current_status: "Алексей",
							deviation: "3",
							priority: "1",
							quantity: "2",
							unitPrice: "4000",
							percent: "50",
							planDate: "2023-03-11",
							actualDate: "2023-04-15",
							dce: "РТ65.233.25",
							dragProject: true,
							expanded: true,
							type: "resources",
						},
					],
				},
			],
		},
	];

	const [filteredData, setFilteredData] = useState(ganttaData);

	useEffect(() => {
		const newFilteredData = ganttaData
			.map((order) => ({
				...order,
				tasks: order.tasks.filter((operation) => {
					const isMatch = operation.label
						.toLowerCase()
						.includes(searchTerm.toLowerCase());
					console.log(
						"Task label:",
						operation.label,
						"Search Term:",
						searchTerm,
						"Is Match:",
						isMatch
					);
					return isMatch;
				}),
			}))
			.filter((order) => {
				const isOrderMatch = order.label
					.toLowerCase()
					.includes(searchTerm.toLowerCase());
				console.log(
					"Order label:",
					order.label,
					"Search Term:",
					searchTerm,
					"Is Match:",
					isOrderMatch
				);
				return isOrderMatch || order.tasks.length > 0;
			});

		console.log("New Filtered Data:", newFilteredData);
		setFilteredData(newFilteredData);
	}, [searchTerm]);

	const handleButtonClick = (chart) => {
		setSelectedChart(chart);
	};

	const treeSize = 400;

	return (
		<div className="diagramm-home-screen">
			<NavigationBar />
			<SideNav />
			{/* <div className="header-items">
				<div className="links">
					<div className="links-texts">
						<div
							className="link1"
							onClick={() => handleButtonClick("gantta")}
						>
							<span>Гант</span>
						</div>
						&nbsp;|&nbsp;
						<div
							className="link2"
							onClick={() => handleButtonClick("table")}
						>
							<span>Таблица</span>
						</div>
					</div>
				</div>
				<div className="links-buttons">
					<button onClick={increaseTime}>Increase Time</button>
					<button onClick={decreaseTime}>Decrease Time</button>
				</div>
				<input
					type="text"
					placeholder="Search..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="search-input"
				/>
			</div> */}

			{selectedChart === "gantta" && (
				<GanttChart
					dataSource={filteredData}
					taskColumns={[
						{
							label: "Status",
							value: "taskStatus",
							size: "30%",
							formatFunction: (taskStatus) => {
								return `<img src="${taskStatus}" alt="Task Status" style="width: 15px; height: 15px;">`;
							},
						},
						{
							label: "Tasks",
							value: "label",
							size: "40%",
						},
						{
							label: "Duration (hours)",
							value: "duration",
							formatFunction: (date) => parseInt(date),
						},
						{
							label: "Tasks",
							value: "nomenclature",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "product",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "quantity",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "laborIntensity",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "customer",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "productivity",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "cost",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "priority",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "planDate",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "actualDate",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "purchase",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "blank",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "Number",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "Name",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "CodeOperation",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "gild",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "technicalprocess",
							hidden: true,
						},
						{
							label: "Tasks",
							value: "outfit",
							hidden: true,
						},
						{
							label: "Отклонение",
							value: "deviation",
						},
					]}
					treeSize={treeSize}
					durationUnit="hour"
					id="gantta-gantt"
					view={ganttView}
					className="gantt-chart"
					popupWindowTabs={["general"]}
				/>
			)}

			{selectedChart === "table" && <TableDiagram data={filteredData} />}
		</div>
	);
}

export default Diagram;
