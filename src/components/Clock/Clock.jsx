import { React, useState, useEffect } from "react";
import "./Clock.css";

// Этот компонент отображает текущее время и дату, обновляясь каждую секунду
function Clock() {
	// Определение состояния "time" с начальным значением текущей даты и времени
	const [time, setTime] = useState(new Date());

	// Использование хука useEffect для установки интервала обновления времени каждую секунду
	useEffect(() => {
		// Установка интервала, который обновляет состояние "time" каждую секунду
		const intervalID = setInterval(() => {
			setTime(new Date()); // Обновление состояния текущим временем
		}, 1000);

		// Очистка интервала при размонтировании компонента для предотвращения утечек памяти
		return () => {
			clearInterval(intervalID);
		};
	}, []); // Пустой массив зависимостей означает, что эффект выполняется только при монтировании и размонтировании

	// Форматирование времени в часы, минуты и секунды
	const formattedTime = time.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	// Форматирование текущей даты
	const formattedDate = new Date().toLocaleDateString([], {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		weekday: "long",
	});

	return (
		<div className="real-time">
			<div className="time">{formattedTime}</div>{" "}
			<div className="date">{formattedDate}</div>{" "}
		</div>
	);
}

export default Clock;
