import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleAvatarClick = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};
	return (
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
			<img className="logo" src="masiot-logo.png" alt="Company Logo" />
		</div>
	);
}

export default NavigationBar;
