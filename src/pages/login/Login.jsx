/** @format */

import "./login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({ email: "", password: "" });
	const handleFormFieldsChange = (e) => {
		const { name, value } = e.target;
		setUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFormSubmit = async (e) => {
		console.log("working");
		e.preventDefault();
		try {
			const response = await axios.post(
				"https://fakeapi-lete.onrender.com/api/users/login",
				user
			);
			if (response.status === 200) {
				localStorage.setItem("token", response.data.token);
				toast.success(response.data.msg);
				setUser({ email: "", password: "" });
				navigate("/");
			} else {
				toast.error(response.data.msg);
			}
		} catch (error) {
			console.log("Error while logging in", error);
			toast.error(error.response.data.msg);
		}
	};
	return (
		<div className="Login-page">
			<div className="form-wrapper">
				<h2 className="reg-h2">
					Login <span className="span-text">Here!</span>
				</h2>
				<form onSubmit={handleFormSubmit} className="Login-form">
					<div className="inputs-fields">
						<input
							value={user.email}
							onChange={handleFormFieldsChange}
							type="email"
							placeholder="Email"
							autoComplete="off"
							name="email"
						/>
						<input
							value={user.password}
							onChange={handleFormFieldsChange}
							type="password"
							placeholder="Password"
							autoComplete="off"
							name="password"
						/>
					</div>
					<div className="button-field">
						<button type="submit">Login</button>
						<p className="already-reg">
							Not registered? <Link to="/register">Register</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
