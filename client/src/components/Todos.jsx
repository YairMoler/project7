import React, { useState, useEffect } from "react";

export default function Todos() {
  const [todosList, setTodosList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const showTodos = async () => {
      if (!user.id) {
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:3000/todos?user_id=${user.id}`
        );
        if (!res.ok) {
          const data = await res.json();
          alert(data.message);

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

  const addTodo = async () => {
    if (newTodo === "") {
      alert("YOU MUST FILL YOUR TODO");
    } else {
      try {
        const res = await fetch(`http://localhost:3000/todos`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ title: newTodo, user_id: user.id }),
        });
        if (!res.ok) {
          const data = await res.json();
          alert(data.message);
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
        const data = await res.json();
        alert(data.message);
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

  const updateTodo = async (todo) => {
    try {
      const res = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          completed: todo.completed === "true" ? "false" : "true",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.message);
        throw new Error("could not delete the todos...");
      } else {
        const data = await res.json();
        const updatedList = todosList.map((item) =>
          item.id === todo.id
            ? {
                ...item,
                completed: todo.completed === "true" ? "false" : "true",
              }
            : item
        );
        setTodosList(updatedList);
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <>
      <h1>To Do List:</h1>
      <div id="addTodo">
        add todo: <br />
        <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={addTodo}>+</button>
      </div>
      <br />
      {todosList.map((item) => (
        <>
          <div id="todo">
            {item.title}
            <button id="delete" onClick={() => deleteTodo(item.id)}>
              <img
                width="40"
                height="auto"
                src="https://www.shutterstock.com/image-vector/trash-can-icon-symbol-delete-260nw-1454137346.jpg"
                alt="Delete"
              />
            </button>
            <br></br>
            <button
              id="check"
              onClick={() => updateTodo(item)}
              style={{
                color: item.completed === "true" ? "green" : "red",
              }}
            >
              {item.completed === "true" ? "Check" : "Uncheck"}
            </button>
          </div>
        </>
      ))}
    </>
  );
}
