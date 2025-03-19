import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CheckLogin({ children }) {

    const user = useSelector(state => state.authenUser)
    const navigate = useNavigate()
    if(user.isAuthenticate){
        navigate('/')
    }

    return (
        <>
            {children}
        </>
    );
}

export default CheckLogin;