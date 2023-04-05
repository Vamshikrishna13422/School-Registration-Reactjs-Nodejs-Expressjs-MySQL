import { useNavigate } from "react-router-dom";
  
const privateRoute =({child}) => {
    const navigate = useNavigate();
    const jwt = "Token";
    return jwt ? child : navigate('/login');
}

export default privateRoute;