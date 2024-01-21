/** @format */

import { useEffect } from "react";
import "./Verification.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const Verification = () => {
	const navigate = useNavigate();
	const { token } = useParams();

	if (!token) {
		navigate("/login");
	}
	useEffect(() => {
		console.log("token is", token);
		const verify = async () => {
			try {
				const response = await axios.post(
					`https://fakeapi-lete.onrender.com/api/users/verify/${token}`
				);

				if (response.status === 200) {
					toast.success(response.data.msg);
					navigate("/login");
				}
			} catch (error) {
				console.error("Error while verifying user", error);
				if (error.response.data.msg === "User is already verified") {
					navigate("/login");
				} else {
					toast.error(error.response.data.msg);
				}
			}
		};
		verify();
	}, [token, navigate]);

	return (
		<div className="verification-page">
			<h5>Verifying your email...</h5>
			<div className="new-loader">
				<ClipLoader
					color="#3e5a94"
					loading={true}
					size={50}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			</div>
		</div>
	);
};

export default Verification;
