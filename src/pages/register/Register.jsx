/** @format */

import { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/Context";
import ClipLoader from "react-spinners/ClipLoader";

const Register = () => {
	const navigate = useNavigate();
	const { loading, setLoading } = useAppContext();
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleFormFieldsChange = (event) => {
		const { name, value } = event.target;
		setUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFormSubmit = async (event) => {
		console.log("working")
		event.preventDefault();
		try {
			setLoading(true);
			const response = await axios.post(
				"https://fakeapi-lete.onrender.com/api/users/register",
				user
			);
			setLoading(false);
			if (response.status === 201) {
				toast.success(response.data.msg);
				setUser({
					username: "",
					email: "",
					password: "",
				});
				navigate("/verify");
			} else {
				setLoading(false);
				console.log("Something went wrong");
				toast.error("Something went wrong");
			}
		} catch (error) {
			setLoading(false);
			console.log("Error while fetching data from server", error);
			toast.error(error.response.data.msg);
		}
	};
	return (
		<div className="register-page">
			{loading ? (
				<div className="loader">
					<ClipLoader
						color="#3e5a94"
						loading={loading}
						size={100}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			) : (
				<>
					<div className="form-wrapper">
						<h2 className="reg-h2">
							Register <span className="span-text">Here!</span>
						</h2>
						<form className="register-form" onSubmit={handleFormSubmit}>
							<div className="inputs-fields">
								<input
									name="username"
									value={user.username}
									type="text"
									placeholder="Username"
									autoComplete="off"
									onChange={handleFormFieldsChange}
								/>
								<input
									name="email"
									value={user.email}
									type="email"
									placeholder="Email"
									autoComplete="off"
									onChange={handleFormFieldsChange}
								/>
								<input
									name="password"
									value={user.password}
									type="password"
									placeholder="Password"
									autoComplete="off"
									onChange={handleFormFieldsChange}
								/>
							</div>
							<div className="button-field">
								<button type="submit">Register</button>
								<p className="already-reg">
									Already registered? <Link to="/login">Login</Link>
								</p>
							</div>
						</form>
					</div>
				</>
			)}
		</div>
	);
};

export default Register;
