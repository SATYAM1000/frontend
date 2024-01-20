/** @format */

import "./login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/Context";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
	const navigate = useNavigate();
	const { loading, setLoading } = useAppContext();
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
			setLoading(true);
			const response = await axios.post(
				"https://fakeapi-lete.onrender.com/api/users/login",
				user
			);
			setLoading(false);
			if (response.status === 200) {
				localStorage.setItem("token", response.data.token);
				toast.success(response.data.msg);
				setUser({ email: "", password: "" });
				navigate("/");
			} else {
				setLoading(false);
				toast.error(response.data.msg);
			}
		} catch (error) {
			setLoading(false);
			console.log("Error while logging in", error);
			toast.error(error.response.data.msg);
		}
	};
	return (
		<div className="Login-page">
			{loading ? (
				<>
					<div className="loader">
						<ClipLoader
							color="#3e5a94"
							loading={loading}
							size={100}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</div>
				</>
			) : (
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
			)}
		</div>
	);
};

export default Login;
