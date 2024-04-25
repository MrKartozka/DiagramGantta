import React, { useState, useEffect, useRef } from "react";
import { GanttChart } from "smart-webcomponents-react/ganttchart";
import "smart-webcomponents-react/source/styles/smart.default.css";
import "../components/Diagram/Diagram.css";
import "../Resources/Resources.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function Resources() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleAvatarClick = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const ganttChart = useRef();
	const view = "day";
	const treeSize = "25%";
	const durationUnit = "hour";

	function formatDate(dateStr) {
		if (typeof dateStr === "string") {
			return dateStr.replace(" ", "T");
		}
		return dateStr;
	}

	function getTaskSpan(segments) {
		if (segments && segments.length > 0) {
			const dates = segments.map((segment) => ({
				start: new Date(formatDate(segment.dateStart)),
				end: new Date(formatDate(segment.dateEnd)),
			}));

			dates.sort((a, b) => a.start - b.start);

			const dateStart = dates[0].start;

			dates.sort((a, b) => b.end - a.end);

			const dateEnd = dates[0].end;

			return {
				dateStart: dateStart.toISOString(),
				dateEnd: dateEnd.toISOString(),
			};
		} else {
			// return some default value when there are no segments
			return {
				dateStart: new Date().toISOString(), // set a default start date
				dateEnd: new Date().toISOString(), // set a default end date
			};
		}
	}

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
				label: "", // Do not provide a label for tasks without segments
			};
		}
	});
	// Set an initial state for the dataSource
	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		setDataSource(initialDataSource);
	}, []);

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
				ref={ganttChart}
				id="ganttChart"
				view={view}
				taskColumns={[
					{
						label: "Employee",
						value: "id",
					},
					{
						label: "Job Name",
						value: "job",
						hidden: "true",
					},
					{
						label: "Цех",
						value: "gild",
					},
					{
						label: "УИН",
						value: "UIN",
					},
				]}
				treeSize={treeSize}
				durationUnit={durationUnit}
				dataSource={dataSource}
				popupWindowTabs={["general", "segments", "custom"]}
				popupWindowCustomizationFunction={(target, type, item) => {
					if (type === "task") {
						// Check if the segmentsContainer already exists
						let segmentsContainer = target.querySelector(
							".segments-container"
						);

						// If it doesn't exist, create it
						if (!segmentsContainer) {
							segmentsContainer = document.createElement("div");
							segmentsContainer.className = "segments-container";
							target.appendChild(segmentsContainer);
						}

						// Clear the segmentsContainer's content
						segmentsContainer.innerHTML = "";

						// Check if the task has segments before trying to display them
						if (item.segments && item.segments.length > 0) {
							// Loop through all the segments of the task
							item.segments.forEach((segment) => {
								// Create a container for the segment
								let segmentContainer =
									document.createElement("div");

								// Add the segment label to the container
								segmentContainer.innerHTML = `<h2>${segment.label}</h2>`;

								// Loop through all the properties of the segment
								for (let key in segment) {
									// Skip the 'label' property since we've already added it
									if (key !== "label") {
										// Create a paragraph element for the property
										let p = document.createElement("p");
										p.textContent = `${key}: ${segment[key]}`;

										// Add the paragraph element to the segment container
										segmentContainer.appendChild(p);
									}
								}

								// Add the segment container to the segments container
								segmentsContainer.appendChild(segmentContainer);
							});
						}
					}
				}}
				style={{ marginTop: "80px", width: "96%" }}
			></GanttChart>
		</div>
	);
}

export default Resources;
