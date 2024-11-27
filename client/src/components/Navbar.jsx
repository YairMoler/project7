import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <NavLink to="">Home</NavLink>
            <NavLink to="info">Info</NavLink>
            <NavLink to="todos">Todos</NavLink>
            <NavLink to="posts">Posts</NavLink>
            <button>Logout</button>
        </>
    );
}
