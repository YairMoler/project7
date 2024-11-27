import React, { useState, useEffect } from "react";

export default function Todos() {
  const [todosList, setTodosList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
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
  }, [newTodo]);

  const addTodo = async () => {
    if (newTodo === "") {
      alert("YOU MUST FILL YOUR TODO");
    } else {
      try {
        const res = await fetch(`http://localhost:3000/todos`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ title: newTodo, user_id: 1 }),
        });
        if (!res.ok) {
          console.log("res: ", res);
          throw new Error("could not add the todos...");
        } else {
          const data = await res.json();
          console.log("data: ", data);
          setTodosList((prev) => [...prev, data]);
          setNewTodo("");
        }
      } catch (err) {
        console.log("err: ", err);
      }
    }
  };
  const deleteTodo = async (id) => {
    console.log("id: ", id);
    try {
      const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        console.log("res: ", res);
        throw new Error("could not delete the todos...");
      } else {
        const updatedList = todosList.filter((item) => item.id !== id);
        console.log("updatedList: ", updatedList);
        setTodosList(updatedList);
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <>
      <div id="addTodo">
        add todo:
        <input onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={addTodo}>+</button>
      </div>
      {todosList.map((item) => (
        <>
          <li>{item.title}</li>
          <button onClick={() => deleteTodo(item.id)}>delete:</button>
        </>
      ))}
    </>
  );
}
