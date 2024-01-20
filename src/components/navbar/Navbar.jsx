/** @format */

import "./navbar.css";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";
import { RiArrowDropDownLine } from "react-icons/ri";

const menuItems = [
	{
		title: "Home",
		path: "/",
	},
	{
		title: "Products",
		path: "/products",
	},
	{
		title: "About Us",
		path: "/about",
	},
	{
		title: "Contact Us",
		path: "/contact",
	},
];

const Navbar = () => {
	
	const [showMenu, setShowMenu] = useState(false);
	const {
		state: { cart },
		dispatch,
	} = useAppContext();
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		console.log(location.pathname);
	}, []);

	const handleBarsClick = () => {
		console.log("clicked");
		setShowMenu((prev) => !prev);
	};
	const handleLogout = () => {
		localStorage.removeItem("token");
		dispatch({ type: "EMPTY_CART" })
		navigate("/login");
	};
	return (
		<div className="navbar">
			<div className="logo">
				<h2>Shopshi</h2>
			</div>
			<div className={`sidebar ${showMenu ? "show" : ""}`}>
				<div className="menu">
					<ul>
						{menuItems.map((item, key) => {
							return (
								<li key={key}>
									<Link
										className={location.pathname === item.path ? "active" : ""}
										to={item.path}>
										{item.title}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="cart-btns">
					<div className="cart">
						<Link to="/cart">
							<div className="combiner">
								<FaCartShopping className="trolly" />
								<p className="count">{cart.length}</p>
							</div>
						</Link>
						<RiArrowDropDownLine className="drop-down" />
					</div>

					<div className="btns">
						{localStorage.getItem("token") === null ? (
							<>
								<Link to="/login">
									<button className="login-btn">Login</button>
								</Link>
								<Link to="/register">
									<button className="register-btn">Register</button>
								</Link>
							</>
						) : (
							<button className="login-btn" onClick={handleLogout}>
								Logout
							</button>
						)}
					</div>
				</div>
			</div>
			<div className="for-mobile">
				<Link to="/cart">
					<div className="cart-mob">
						<FaCartShopping className="mob-trolly" />
						<p className="mob-count">{cart.length}</p>
					</div>
				</Link>
				<FaBars className="bars" onClick={handleBarsClick} />
			</div>
		</div>
	);
};

export default Navbar;
