import { useState } from "react";
import UserContext from "./UserContext";


const UserState = (props) => {


    const [user, setUser] = useState(localStorage.getItem('access_token'));
    
    const login = async (email, password) => {
        // API Call
        const response = await fetch(`http://localhost:7400/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email, password: password }),
        });
        const user = await response.json();
        console.log(user);
        if (user.access_token) {
            localStorage.setItem('access_token', user.access_token);
            setUser(user);
        }
       

    }
    
    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
    }

    const register = async (name,email, password) => {
        // API Call
        const response = await fetch(`http://localhost:7400/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email, password: password, name: name }),
        });
        const user = await response.json();
        console.log(user);
        if(user.msg){
            alert(user.msg)
        }
        if (user.access_token) {
            localStorage.setItem('access_token', user.access_token);
            setUser(user);
        }
    }
    
    return (
        <UserContext.Provider value={{ user, login, logout,register }}>
        {props.children}
        </UserContext.Provider>
    );
    }
    export default UserState;