import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import App from "./App";
import Diagram from "./components/Diagram/Diagram";
import Resources from "./Resources/Resources";

function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/diagram" element={<Diagram />} />
				<Route path="/resources" element={<Resources />} />
			</Routes>
		</Router>
	);
}

export default AppRouter;
