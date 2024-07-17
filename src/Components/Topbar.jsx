import { useNavigate } from "react-router-dom";

export default function TopBar(props){
    const navigate = useNavigate();
    function loginbutton(){
        navigate('/login')
    }
    function registerbutton(){
        navigate('/register')
    }
    return(
        <div>
            <div className="flex flex row">
            {props.LoggedIn ? <div>
                <div>
                    <button onClick={loginbutton}>Login</button>
                    <button onClick={registerbutton}>Register</button>
                </div>
            </div>:
            <div>
                <div>Hi {localStorage.getItem('user')?localStorage.getItem('user').name:'User'}</div>
                <button>Sign Out</button>
            </div>}
            </div>
        </div>
    )
}
