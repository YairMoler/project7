import { useState } from "react";
import Comments from "./Comments";

export default function SinglePost(props) {
  const [showComments, setShowComments] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [showBody, setShowBody] = useState(false);
  return (
    <>
      <div id="post">
        {edit ? (
          <button
            onClick={async () =>
              await props.editTitle(
                props.item.id,
                editedTitle,
                props.item.title,
                setEdit
              )
            }
          >
            save
          </button>
        ) : (
          props.item.user_id === props.userId && (
            <button onClick={() => setEdit((prev) => !prev)}>
              edit title{" "}
            </button>
          )
        )}
        {edit ? (
          <input
            value={editedTitle || props.item.title}
            type="text"
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <h2>{props.item.title}</h2>
        )}
        <br />
        <button onClick={() => setShowBody((prev) => !prev)}>
          {showBody ? "hide body" : "show body"}
        </button>
        <br />
        {showBody && props.item.body}
        <br />
        {props.item.user_id === props.userId && (
          <button onClick={() => props.deletePost(props.item.id)}>
            <img
              width="60"
              src="https://www.shutterstock.com/image-vector/trash-can-icon-symbol-delete-260nw-1454137346.jpg"
              alt="Delete"
            />
          </button>
        )}
        <br />
        <button onClick={() => setShowComments((prev) => !prev)}>
          <img
            width="40"
            height="auto"
            src="https://www.shutterstock.com/image-vector/chat-speech-bubble-icon-symbol-260nw-1451224709.jpg"
          />
        </button>
        {showComments && (
          <Comments postId={props.item.id} userId={props.item.user_id} />
        )}
      </div>
    </>
  );
}
