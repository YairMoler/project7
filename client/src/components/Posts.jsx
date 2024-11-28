import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
//posts
export default function Posts() {
  const [postsList, setPostsList] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [limit, setLimit] = useState(5);
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const showPosts = async () => {
      if (!user.id) {
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:3000/posts?user_id=${user.id}&limit=${limit}`
        );
        if (!res.ok) {
          console.log("res: ", res);

          throw new Error("could not get the posts...");
        }
        const data = await res.json();
        console.log("data: ", data);
        setPostsList(data);
      } catch (err) {
        console.log("err: ", err);
        alert("err: ", err);
      }
    };
    showPosts();
  }, [newTitle, limit]);

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
            user_id: user.id,
          }),
        });
        if (!res.ok) {
          console.log("res: ", res);
          throw new Error("could not add the posts...");
        } else {
          const data = await res.json();
          console.log("data: ", data);
          setPostsList((prev) => [data, ...prev]);
          setNewTitle("");
          setNewBody("");
        }
      } catch (err) {
        console.log("err: ", err);
        alert("err: ", err);
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
      alert("err: ", err);
    }
  };

  return (
    <>
      <h1>Posts:</h1>
      <div id="addPosts">
        add post: <br />
        <lable>title:</lable>
        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <lable>body:</lable>
        <input value={newBody} onChange={(e) => setNewBody(e.target.value)} />
        <button onClick={addPost}>+</button>
      </div>
      <br />
      {postsList.map((item) => (
        <SinglePost item={item} userId={user.id} deletePost={deletePost} />
      ))}
      <button onClick={() => setLimit((prev) => prev + 5)}>show more:</button>
    </>
  );
}
