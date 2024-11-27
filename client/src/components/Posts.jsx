import React, { useState, useEffect } from "react";
export default function Posts() {
  const [postsList, setPostsList] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  //   let user = JSON.parse(localStorage.getItem("currentUser"));
  const user = { id: 1 };
  useEffect(() => {
    const showPosts = async () => {
      if (!user.id) {
        return;
      }
      try {
        const res = await fetch(`http://localhost:3000/posts?user_id=1`);
        if (!res.ok) {
          console.log("res: ", res);

          throw new Error("could not get the posts...");
        }
        const data = await res.json();
        console.log("data: ", data);
        setPostsList(data);
      } catch (err) {
        console.log("err: ", err);
      }
    };
    showPosts();
  }, [newTitle]);

  const addPost = async () => {
    if (newTitle === "" || newBody === "") {
      alert("you must fill your Post");
    } else {
      try {
        const res = await fetch(`http://localhost:3000/posts`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            title: newTitle,
            body: newBody,
            user_id: 1,
          }),
        });
        if (!res.ok) {
          console.log("res: ", res);
          throw new Error("could not add the todos...");
        } else {
          const data = await res.json();
          console.log("data: ", data);
          setPostsList((prev) => [...prev, data]);
          setNewTitle("");
          setNewBody("");
        }
      } catch (err) {
        console.log("err: ", err);
      }
    }
  };
  const deletePost = async (id) => {
    console.log("id: ", id);
    try {
      const res = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        console.log("res: ", res);
        throw new Error("could not delete the todos...");
      } else {
        const updatedList = postsList.filter((item) => item.id !== id);
        console.log("updatedList: ", updatedList);
        setPostsList(updatedList);
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <>
      <h1>Posts:</h1>
      <div id="addPosts">
        add post: <br />
        <lable>title:</lable>
        <input onChange={(e) => setNewTitle(e.target.value)} />
        <lable>body:</lable>
        <input onChange={(e) => setNewBody(e.target.value)} />
        <button onClick={addPost}>+</button>
      </div>
      <br />
      {postsList.map((item) => (
        <>
          <div id="post">
            {item.title}
            <br /> {item.body}
            <br />
            {item.user_id === 1 && (
              <button onClick={() => deletePost(item.id)}>
                <img
                  src="https://www.shutterstock.com/image-vector/trash-can-icon-symbol-delete-260nw-1454137346.jpg"
                  alt="Delete"
                />
              </button>
            )}
          </div>
        </>
      ))}
    </>
  );
}
