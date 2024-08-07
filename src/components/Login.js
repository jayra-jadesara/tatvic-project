import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import globalConstant from "../globalConstant";

function IconGoogle() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 48 48' fill='#fff'>
            <path d='M23 21.5v5a1.5 1.5 0 001.5 1.5h10.809a11.946 11.946 0 01-2.205 3.805l6.033 5.229C42.159 33.529 44 28.98 44 24c0-.828-.064-1.688-.202-2.702A1.5 1.5 0 0042.312 20H24.5a1.5 1.5 0 00-1.5 1.5zm-10.388 6.261C12.22 26.577 12 25.314 12 24s.22-2.577.612-3.761l-6.557-5.014C4.752 17.878 4 20.849 4 24s.752 6.122 2.056 8.775l6.556-5.014zm18.253 6.074A11.961 11.961 0 0124 36c-4.212 0-7.917-2.186-10.059-5.478l-6.362 4.865C11.195 40.585 17.202 44 24 44c4.968 0 9.508-1.832 13.009-4.84l-6.144-5.325zm6.65-24.538A19.883 19.883 0 0024 4c-6.798 0-12.805 3.415-16.421 8.614l6.362 4.865C16.083 14.186 19.788 12 24 12c2.944 0 5.776 1.081 7.974 3.043a1.5 1.5 0 002.06-.059l3.525-3.524a1.5 1.5 0 00-.044-2.163z'></path>
        </svg>
    );
}

const Login = () => {
    const navigate = useNavigate();

    const loginToGoogle = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse);
            localStorage.setItem("accessToken", tokenResponse.access_token);
            navigate(globalConstant.DASHBOARD);
        },
        onError: e => console.log(e)
    });

    return (
        <>
            <div className="loinpage container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Login with</h5>
                                <div className="d-grid mb-2">
                                    <button className="btn btn-danger btn-login text-uppercase fw-bold" onClick={() => loginToGoogle()}>
                                        <IconGoogle /> Sign in with Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;