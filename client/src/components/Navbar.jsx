import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("user", JSON.stringify(null));
    navigate("/");
  };
  return (
    <>
      <div id="navbar">
        {/* <div>
          <NavLink
            to=""
            style={({ isActive }) => {
              return { backgroundColor: isActive ? "pink" : "white" };
            }}
          >
            Home
          </NavLink>
        </div> */}
        <div>
          <NavLink
            to="info"
            style={({ isActive }) => {
              return { backgroundColor: isActive ? "pink" : "white" };
            }}
          >
            Info
          </NavLink>
        </div>
        <div>
          <NavLink
            to="todos"
            style={({ isActive }) => {
              return { backgroundColor: isActive ? "pink" : "white" };
            }}
          >
            Todos
          </NavLink>
        </div>
        <div>
          <NavLink
            to="posts"
            style={({ isActive }) => {
              return { backgroundColor: isActive ? "pink" : "white" };
            }}
          >
            Posts
          </NavLink>
        </div>

        <button onClick={() => logout()}>Logout</button>
      </div>
    </>
  );
}
