import { React } from "react";
import { useLocation } from "react-router-dom";
import "./SideNav.css";

function SideNav() {
	const location = useLocation();

	return (
		<div className="side-nav">
			<img
				src="notifications-small.png"
				className="notifications-icons"
				alt="notif-icon"
			/>
			<img src="mail-small.png" className="mail-icons" alt="mail-icon" />
			{location.pathname === "/diagram" && (
				<div className="side-nav--items">
					<div className="side-nav__item">
						<img
							src="/sideInfo.svg"
							className="side-nav--items__info"
							alt=""
						/>
					</div>
					<div className="side-nav__item">
						<img
							src="/sideFilters.svg"
							className="side-nav--items__filters"
							alt=""
						/>
					</div>
					<div className="side-nav__item">
						<img
							src="/sideRefresh.svg"
							className="side-nav--items__refresh"
							alt=""
						/>
					</div>
					<div className="side-nav__item">
						<img
							src="/sideSign.svg"
							className="side-nav--items__sign"
							alt=""
						/>
					</div>
				</div>
			)}
			<img
				src="referal-small.png"
				className="referal-icons"
				alt="referal-icon"
			/>
		</div>
	);
}

export default SideNav;
