/*import React from "react";
import {Link, withRouter} from "react-router-dom"


const Menu = () => (
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link className="nav-link" to = "/">
                    Home
                </Link>                
            </li>
        </ul>
    </div>

)
export default withRouter(Menu);*/
import React , {Fragment} from "react";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";



const currentTab = (location, path) => {
    if(location.pathname === path){
        return { color: "#45CE30"}
    }else{
        return { color: "#FFFFFF"}
    }
   
};

const Menu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = () => {
        // Perform any navigation logic here
        navigate("/");
    };

    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(location, "/")} className="nav-link" to="/" onClick={handleNavigation}>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(location,"/cart")} className="nav-link" to="/cart" onClick={handleNavigation}>
                        Cart
                    </Link>
                </li>
                {isAuthenticated && isAuthenticated.user &&  isAuthenticated().user.role ===0 && (
                    <li className="nav-item">
                    <Link style={currentTab(location,"/user/dashboard")} className="nav-link" to="/user/dashboard" onClick={handleNavigation}>
                        U. Dashboard
                    </Link>
                </li>
                )}
                {isAuthenticated && isAuthenticated.user && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                    <Link style={currentTab(location,"/admin/dashboard")} className="nav-link" to="/admin/dashboard" onClick={handleNavigation}>
                        A. Dashboard
                    </Link>
                </li>
                )}
                {!isAuthenticated() && (
                    <Fragment>
                    <li className="nav-item">
                        <Link style={currentTab(location,"/signup")} className="nav-link" to="/signup" onClick={handleNavigation}>
                            Signup
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link style={currentTab(location,"/signin")} className="nav-link" to="/signin" onClick={handleNavigation}>
                            Sign In
                        </Link>
                    </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                        <span
                        className="nav-link text-warning"
                        onClick={() => {
                            signout(() => {
                                navigate("/")
                            });
                        }} 
                        >
                            Signout
                        </span>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Menu;

