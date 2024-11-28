import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const resetInputFields = () => {
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
    };
    const handleChange = (event) => {
        console.log("event.target.name: ", event.target.name);
        switch (event.target.name) {
            case "username":
                console.log("username: ", username);
                console.log("in username");

                setUsername(event.target.value);
                break;
            case "password":
                console.log("password: ", password);
                console.log("in password");

                setPassword(event.target.value);
                break;
            case "confirmPassword":
                console.log("confirmPassword: ", confirmPassword);
                console.log("in confirm password");

                setConfirmPassword(event.target.value);
                break;
            case "email":
                console.log("email: ", email);
                console.log("in email");

                setEmail(event.target.value);
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!password.match(/[0-9]+/)) return setError("password must be a number");
        if (password !== confirmPassword) return setError("passwords does not match");
        if (username.length < 4 || password.length < 4) return setError("username and password must be at least 4 characters long");
        if (!email) return setError("email must be filled");

        const res = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: password, username: username, email: email }),
        });
        if (!res.ok && res.status !== 400) return setError("something went wrong try again");
        if (res.status === 400) return setError(await res.text());

        const user = await res.json();

        localStorage.setItem("user", JSON.stringify(user));
        navigate(`/home/${user.username}/`);

        resetInputFields();
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">username</label>
                <input type="text" name="username" onChange={handleChange} value={username} />
                <br />
                <label htmlFor="email">email</label>
                <input type="text" name="email" onChange={handleChange} value={email} />
                <br />
                <label htmlFor="password">password</label>
                <input type="password" name="password" onChange={handleChange} value={password} />
                <br />
                <label htmlFor="confirmPassword"> confirm password</label>
                <input type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword} />
                <br />
                <button onClick={handleSubmit}>register</button>
            </form>
            <NavLink to="/">login</NavLink>
            {error && <h2>{error}</h2>}
        </>
    );
}
