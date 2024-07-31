import React, { useState, useEffect, useRef } from "react";
import { GanttChart } from "smart-webcomponents-react/ganttchart";
import "smart-webcomponents-react/source/styles/smart.default.css";
import "../components/Diagram/Diagram.css";
import "../Resources/Resources.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function Resources() {
	// Состояние для управления раскрывающимся меню
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Обработчик клика по аватарке для открытия/закрытия раскрывающегося меню
	const handleAvatarClick = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	// Создаем ссылку для Gantt диаграммы
	const ganttChart = useRef();
	const view = "day"; // Устанавливаем вид диаграммы
	const treeSize = "25%"; // Устанавливаем размер дерева задач
	const durationUnit = "hour"; // Устанавливаем единицу длительности

	// Функция для форматирования даты
	function formatDate(dateStr) {
		if (typeof dateStr === "string") {
			return dateStr.replace(" ", "T");
		}
		return dateStr;
	}

	// Функция для получения диапазона дат задачи
	function getTaskSpan(segments) {
		if (segments && segments.length > 0) {
			const dates = segments.map((segment) => ({
				start: new Date(formatDate(segment.dateStart)),
				end: new Date(formatDate(segment.dateEnd)),
			}));

			dates.sort((a, b) => a.start - b.start); // Сортируем даты по началу

			const dateStart = dates[0].start; // Получаем самую раннюю дату начала

			dates.sort((a, b) => b.end - a.end); // Сортируем даты по окончанию

			const dateEnd = dates[0].end; // Получаем самую позднюю дату окончания

			return {
				dateStart: dateStart.toISOString(),
				dateEnd: dateEnd.toISOString(),
			};
		} else {
			return {
				dateStart: new Date().toISOString(),
				dateEnd: new Date().toISOString(),
			};
		}
	}

	// Инициализация данных для диаграммы
	const initialDataSource = [
		{
			id: "Слесарь",
			label: "Project Development",
			class: "front-end",
			gild: "12",
			UIN: "7T4552",
			progress: 25,
			job: "Developer",
			segments: [
				{
					label: "010 Слесарная",
					dateStart: "2021-01-15 12:00:00",
					dateEnd: "2021-01-15 15:00:00",
					duration: 2.5,
				},
				{
					label: "020 Токарная",
					dateStart: "2021-01-15 16:00:00",
					dateEnd: "2021-01-15 18:00:00",
					duration: 4,
				},
			],
		},
		{
			id: "Фрезеровщик",
			label: "Project Development",
			class: "front-end",
			gild: "7",
			UIN: "7T4552",
			progress: 25,
			job: "Developer",
			segments: [
				{
					label: "020 Токарная",
					dateStart: "2021-01-15 11:00:00",
					dateEnd: "2021-01-15 12:30:00",
				},
				{
					label: "030 Фрезерная",
					dateStart: "2021-01-15 13:00:00",
					dateEnd: "2021-01-15 14:00:00",
				},
				{
					label: "050 Точение",
					dateStart: "2021-01-15 14:30:00",
					dateEnd: "2021-01-15 15:00:00",
				},
				{
					label: "065 Прорезание",
					dateStart: "2021-01-15 15:30:00",
					dateEnd: "2021-01-15 18:00:00",
				},
			],
		},
		{
			id: "Токарь",
			label: "Project Development",
			class: "front-end",
			gild: "11",
			UIN: "7T4552",
			progress: 25,
			job: "Developer",
			segments: [],
		},
	].map((task) => {
		if (task.segments && task.segments.length > 0) {
			return {
				...task,
				...getTaskSpan(task.segments),
			};
		} else {
			let currentDateTime = new Date().toISOString();
			return {
				...task,
				dateStart: currentDateTime,
				dateEnd: currentDateTime,
				label: "",
			};
		}
	});
	const [dataSource, setDataSource] = useState([]);

	// Эффект для установки начальных данных при монтировании компонента
	useEffect(() => {
		setDataSource(initialDataSource);
	}, []);

	// Возвращаем JSX для отображения компонента
	return (
		<div className="diagramm-home-screen">
			<div className="top-nav">
				<div className="user-profile" onClick={handleAvatarClick}>
					<img src="profile.png" alt="User Profile" />
					<span>John Doe</span>
					{isDropdownOpen && (
						<div className="dropdown-menu">
							<ul>
								<li>
									<a href="#">Change User</a>
								</li>
								<li>
									<a href="#">About Me</a>
								</li>
								<li>
									<a href="#">Settings</a>
								</li>
							</ul>
						</div>
					)}
				</div>
				<Link to="/">
					<button className="home-button">
						<img src="/home.png" alt="settings" />
					</button>
				</Link>
				<img
					className="logo"
					src="masiot-logo.png"
					alt="Company Logo"
				/>
			</div>
			<div className="side-nav">
				<img
					src="notifications-small.png"
					className="notifications-icons"
					alt="notif-icon"
				/>
				<img
					src="mail-small.png"
					className="mail-icons"
					alt="mail-icon"
				/>
				<img
					src="referal-small.png"
					className="referal-icons"
					alt="referal-icon"
				/>
			</div>
			<GanttChart
				ref={ganttChart} // Ссылка на компонент GanttChart
				id="ganttChart" // Устанавливаем id для компонента GanttChart
				view={view} // Устанавливаем вид диаграммы
				taskColumns={[
					{
						label: "Employee", // Устанавливаем метку столбца
						value: "id", // Устанавливаем значение столбца
					},
					{
						label: "Job Name", // Устанавливаем метку столбца
						value: "job", // Устанавливаем значение столбца
						hidden: "true", // Скрываем столбец
					},
					{
						label: "Цех", // Устанавливаем метку столбца
						value: "gild", // Устанавливаем значение столбца
					},
					{
						label: "УИН", // Устанавливаем метку столбца
						value: "UIN", // Устанавливаем значение столбца
					},
				]}
				treeSize={treeSize} // Устанавливаем размер дерева задач
				durationUnit={durationUnit} // Устанавливаем единицу длительности
				dataSource={dataSource} // Устанавливаем источник данных
				popupWindowTabs={["general", "segments", "custom"]} // Устанавливаем вкладки всплывающего окна
				popupWindowCustomizationFunction={(target, type, item) => {
					if (type === "task") {
						// Проверяем тип элемента
						let segmentsContainer = target.querySelector(
							".segments-container"
						);

						if (!segmentsContainer) {
							segmentsContainer = document.createElement("div"); // Создаем контейнер для сегментов
							segmentsContainer.className = "segments-container"; // Устанавливаем класс для контейнера
							target.appendChild(segmentsContainer); // Добавляем контейнер в целевой элемент
						}

						segmentsContainer.innerHTML = ""; // Очищаем контейнер сегментов

						if (item.segments && item.segments.length > 0) {
							// Проверяем, есть ли сегменты
							item.segments.forEach((segment) => {
								let segmentContainer =
									document.createElement("div"); // Создаем контейнер для сегмента

								segmentContainer.innerHTML = `<h2>${segment.label}</h2>`; // Устанавливаем содержимое сегмента

								for (let key in segment) {
									if (key !== "label") {
										let p = document.createElement("p"); // Создаем элемент для отображения свойства сегмента
										p.textContent = `${key}: ${segment[key]}`; // Устанавливаем текстовое содержимое элемента

										segmentContainer.appendChild(p); // Добавляем элемент в контейнер сегмента
									}
								}

								segmentsContainer.appendChild(segmentContainer); // Добавляем контейнер сегмента в контейнер сегментов
							});
						}
					}
				}}
				style={{ marginTop: "80px", width: "96%" }} // Устанавливаем стили для компонента GanttChart
			></GanttChart>
		</div>
	);
}

export default Resources;
