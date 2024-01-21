import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProtectedRoute = (props) => {
  if(localStorage.getItem("token")){
    return props.children;
  }
  else{
    toast.error("Please login first");
    return <Navigate to="/login" />
  }
}

export default ProtectedRoute