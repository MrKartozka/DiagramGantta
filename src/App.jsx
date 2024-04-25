import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SideNav from "./components/SideNav/SideNav";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Status from "./components/Status/Status";
import Clock from "./components/Clock/Clock";
import ButtonsMenu from "./MainScreen/ButtonsMenu";

function App() {
	const onlineUsers = 50;
	const totalUsers = 55;
	const completedTasks = 10;
	const totalTasks = 14;
	const completedResources = 340;
	const totalResources = 345;

	return (
		<div className="home-screen">
			<NavigationBar />
			<SideNav />
			<ButtonsMenu />
			<Clock />
			<Status
				onlineUsers={onlineUsers}
				totalUsers={totalUsers}
				completedTasks={completedTasks}
				totalTasks={totalTasks}
				completedResources={completedResources}
				totalResources={totalResources}
			/>
		</div>
	);
}

export default App;
