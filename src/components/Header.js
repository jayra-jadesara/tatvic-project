import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import globalConstant from "../globalConstant";
import { getUserDataGoogle } from "../services/home-services";

const Header = () => {
    const [userDataGoogle, setUserDataGoogle] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            getUserDataGoogle(accessToken).then(resp => {
                setUserDataGoogle(resp);
                localStorage.setItem("email", resp.email);
            })
        }
    }, []);

    const setLogOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("email");
        navigate(globalConstant.CREDENTIAL_FORM);
    };

    return (
        <div >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="ps-4">
                    <img alt="usericon" className="rounded-circle border border-dark" src={userDataGoogle?.picture}
                        name={userDataGoogle?.name}
                        description={userDataGoogle?.email} />
                    <div>
                        <span>{userDataGoogle?.email}</span>
                        <button
                            className="btn btn-sm btn-danger ms-2"
                            onClick={() => setLogOut()}
                        >
                            Log out
                        </button>
                    </div>
                </div>
                <ul className="navbar-nav mr-auto ps-5">
                    <li><Link to={globalConstant.DASHBOARD} className="nav-link">Wikipedia</Link></li>
                    <li><Link to={globalConstant.SCORECARD} className="nav-link">ScoreCard</Link></li>
                </ul>
            </nav>
            <hr />


        </div>
    )
}

export default Header;