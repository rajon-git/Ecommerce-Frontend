import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/auth";

const Menu=()=>{
    //hook
    const [auth,setAuth]=useAuth();
    const navigate=useNavigate();

    const logout=()=>{
        setAuth({...auth,user:null,token:""});
        localStorage.removeItem("auth");
        navigate("/login");
    }
    return(
        <>
        <ul className="nav d-flex justify-content-between shadow-sm mb-2">
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                HOME
                </NavLink>
            </li>

            {!auth?.user ?(
            <>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/login">
                LOGIN
                </NavLink>
                
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/register">
                REGISTER
                </NavLink>
            </li>
            </>
            ):(
                <li className="nav-item pointer">
                <a onClick={logout} className="nav-link">
                  LOGOUT
                </a>
              </li>
            )}
        </ul>
        </>
    )
}
export default Menu;