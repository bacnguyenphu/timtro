import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Logout(props) {
    const dispatch = useDispatch()
    dispatch(logout())
    return (
        <>
            {props.children}
        </>
    );
}

export default Logout;