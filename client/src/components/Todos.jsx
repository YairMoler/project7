import React, { useState, useEffect } from "react";

export default function Todos() {
  const [todosList, setTodosList] = useState([]);

  //   let user = JSON.parse(localStorage.getItem("currentUser"));
  const user = { id: 1 };
  useEffect(() => {
    const showTodos = async () => {
      if (!user.id) {
        return;
      }
      try {
        const res = await fetch(`http://localhost:3000/todos?user_id=1`);
        if (!res.ok) {
          console.log("res: ", res);

          throw new Error("could not get the todos...");
        }
        const data = await res.json();
        console.log("data: ", data);
        setTodosList(data);
      } catch (err) {
        console.log("err: ", err);
      }
    };
    showTodos();
  }, []);

  console.log(todosList);

  return (
    <>
      {todosList.map((item) => (
        <li>{item.title}</li>
      ))}
    </>
  );
}
