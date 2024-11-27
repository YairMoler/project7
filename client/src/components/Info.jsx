import React from "react";

export default function Info() {
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div id="info">
        <h2>your details:</h2>
        <li>
          <strong>username:</strong> {user.username}
        </li>
        <li>
          <strong>email:</strong>
          {user.email}
        </li>
      </div>
    </>
  );
}
