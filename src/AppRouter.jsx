import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MainScreen from "./App";
import Diagram from "./components/Diagram/Diagram";
import Resources from "./Resources/Resources";

function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainScreen />} />
				<Route path="/Diagram" element={<Diagram />} />
				<Route path="/Resources" element={<Resources />} />
			</Routes>
		</Router>
	);
}

export default AppRouter;
