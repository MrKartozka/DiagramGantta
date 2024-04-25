import { React, useState, useEffect } from "react";
import "./Clock.css";

function Clock() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const intervalID = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => {
			clearInterval(intervalID);
		};
	}, []);

	const formattedTime = time.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	const formattedDate = new Date().toLocaleDateString([], {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		weekday: "long",
	});

	return (
		<div className="real-time">
			<div className="time">{formattedTime}</div>
			<div className="date">{formattedDate}</div>
		</div>
	);
}

export default Clock;
