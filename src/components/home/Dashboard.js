import Header from '../Header';
import globalConstant from "../../globalConstant";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Dashboard = (props) => {
    const [isLoginPage, setLoginPage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoginPage(false);
        if (!localStorage.getItem('accessToken')) {
            navigate(globalConstant.CREDENTIAL_FORM);
            setLoginPage(true);
        }
    }, [navigate]);

    return (
        <div className="App">
            {!isLoginPage && <Header />}
            {props.children}
        </div >
    );
}

export default Dashboard;