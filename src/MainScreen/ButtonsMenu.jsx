import React from "react";
import { Link } from "react-router-dom";
import "./ButtonsMenu.css";

function ButtonsMenu() {
	return (
		<div className="container">
			<div className="content">
				<div className="buttons">
					<Link to="/diagram" className="order-button">
						<img src="/orders.png" alt="Orders" />
						<span>Orders</span>
					</Link>
					<Link to="/Resources" className="resource-button">
						<img src="/resources.png" alt="Resources" />
						<span>Resources</span>
					</Link>
					<button className="nomenclature-button">
						<img src="/nomenclature.png" alt="Nomenclature" />
						<span>Nomenclature</span>
					</button>
					<button className="report-button">
						<img src="/report.png" alt="Reports" />
						<span>Reports</span>
					</button>
					<button className="mail-button">
						<img src="/mail.png" alt="Mail" />
						<span>Mail</span>
					</button>
					<button className="journal-button">
						<img src="/journal.png" alt="Journal" />
						<span>Journal</span>
					</button>
					<button className="notification-button">
						<img src="/notifications.png" alt="Notifications" />
						<span>Notifications</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default ButtonsMenu;
