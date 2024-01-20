/** @format */

import { useEffect } from "react";
import "./Verification.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

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
					`http://localhost:5000/api/users/verify/${token}`
				);
        if(response.status === 200){
          toast.success(response.data.msg);
          navigate("/login");
        }
			} catch (error) {
				console.error("Error while verifying user", error);
        toast.error(error.response.data.msg);
			}
		};
		verify();
	}, [token, navigate]);

	return <div className="verification-page"></div>;
};

export default Verification;
