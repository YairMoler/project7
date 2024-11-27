import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        console.log("event.target.name: ", event.target.name);
        if (event.target.name === "username") {
            console.log("username: ", username);
            console.log("in username");

            setUsername(event.target.value);
        } else {
            console.log("password: ", password);
            console.log("in password");

            setPassword(event.target.value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!password.match(/[0-9]+/)) return setError("password must be a number");
        if (username.length < 4 || password.length < 4) return setError("username and password must be at least 4 characters long");
        const res = await fetch("http://localhost:3000/login", {
            body: JSON.stringify({ password: password, username: username }),
            headers: { "Content-Type": "application/json" },
            method: "POST",
        });

        const user = await res.json();
        if (!user.id) return setError("username or password is incorrect");
        localStorage.setItem("user", JSON.stringify(user));
        navigate(`home/${user.username}/`);
    };
    return (
        <>
            <h1>login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">username</label>
                <input type="text" name="username" onChange={handleChange} value={username} />
                <br />
                <label htmlFor="password">password</label>
                <input type="password" name="password" onChange={handleChange} value={password} />
                <br />
                <button onClick={handleSubmit}>login</button>
            </form>
            {error && <h2>{error}</h2>}
        </>
    );
}
