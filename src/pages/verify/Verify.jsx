/** @format */

import { useEffect } from "react";
import axios from "axios";
import "./verify.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Verify = () => {
	const navigate = useNavigate();
	const headers = {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		"Content-Type": "application/json",
	};
	useEffect(() => {
		const checkVerifiedOrNot = async () => {
			try {
				const response = await axios.get(
					"https://fakeapi-lete.onrender.com/api/users/user",
					{ headers }
				);
				if (response.status === 200) {
					if (response.data.user.verified) {
						navigate("/");
					} else {
						toast.error("Please verify your email");
					}
				}
        
			} catch (error) {
				console.error(error);
				const errorMsg =
					error.response && error.response.data && error.response.data.msg
						? error.response.data.msg
						: "An error occurred";
				toast.error(errorMsg);
			}
		};

		checkVerifiedOrNot();
	}, []);

	return (
		<div className="verify-page">
			<h4>A verification link has been sent to your email.</h4>
		</div>
	);
};

export default Verify;
