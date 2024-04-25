import React from "react";
import "./Status.css";

function Status(props) {
	const {
		onlineUsers,
		totalUsers,
		completedTasks,
		totalTasks,
		completedResources,
		totalResources,
	} = props;

	return (
		<div className="status-section">
			<div className="status">
				<h2>Status</h2>
				<div className="status-item">
					<img src="/online-icon.png" alt="Online Icon" />
					<span>
						{onlineUsers}&#160;\&#160;{totalUsers}
					</span>
				</div>
				<div className="status-item">
					<img src="/tasks-icon.png" alt="Tasks Icon" />
					<span>
						{completedTasks}&#160;\&#160;{totalTasks}
					</span>
				</div>
				<div className="status-item">
					<img src="/resources-icon.png" alt="Resources Icon" />
					<span>
						{completedResources}&#160;\&#160;{totalResources}
					</span>
				</div>
			</div>
		</div>
	);
}

export default Status;
