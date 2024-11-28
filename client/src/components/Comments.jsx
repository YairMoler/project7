import { useState, useEffect } from "react";

export default function Comments(props) {
  const [commentsList, setCommentsList] = useState([]);
  const [newName, setNewName] = useState("");
  const [newBody, setNewBody] = useState("");
  const [add, setAdd] = useState(false);
  console.log(props.postId);
  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const showComments = async () => {
      if (!user.id) {
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:3000/comments?post_id=${props.postId}`
        );
        if (!res.ok) {
          console.log("res: ", res);

          throw new Error("could not get the posts...");
        }
        const data = await res.json();
        console.log("data2: ", data);
        setCommentsList(data);
      } catch (err) {
        console.log("err: ", err);
      }
    };
    showComments();
  }, [newName]);
  //add comment
  const addComment = async () => {
    if (newName === "" || newBody === "") {
      alert("you must fill your comment");
    } else {
      try {
        const res = await fetch(`http://localhost:3000/comments`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name: newName,
            body: newBody,
            user_id: user.id,
            post_id: props.postId,
          }),
        });
        if (!res.ok) {
          console.log("res: ", res);
          throw new Error("could not add the todos...");
        } else {
          const data = await res.json();
          console.log("data: ", data);
          setCommentsList((prev) => [...prev, data]);
          setNewName("");
          setNewBody("");
        }
      } catch (err) {
        console.log("err: ", err);
      }
    }
  };
  //delete comment
  const deleteComment = async (id) => {
    console.log("id: ", id);
    try {
      const res = await fetch(`http://localhost:3000/comments/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        console.log("res: ", res);
        throw new Error("could not delete the todos...");
      } else {
        const updatedList = commentsList.filter((item) => item.id !== id);
        console.log("updatedList: ", updatedList);
        setCommentsList(updatedList);
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };
  return (
    <>
      {commentsList.map((item) => (
        <div>
          <strong>{item.name}: </strong>
          {item.body}
          {item.user_id === user.id && (
            <button onClick={() => deleteComment(item.id)}>
              <img
                width="50"
                height="50"
                src="https://www.shutterstock.com/image-vector/trash-can-icon-symbol-delete-260nw-1454137346.jpg"
                alt="Delete"
              />
            </button>
          )}
        </div>
      ))}
      <br />
      <button onClick={() => setAdd((prev) => !prev)}>addComment</button>
      {add && (
        <div id="addComment">
          <lable>name:</lable>
          <input onChange={(e) => setNewName(e.target.value)} />
          <lable>body:</lable>
          <input onChange={(e) => setNewBody(e.target.value)} />
          <button onClick={addComment}>+</button>
        </div>
      )}
    </>
  );
}
