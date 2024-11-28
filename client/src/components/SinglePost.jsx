import { useState } from "react";
import Comments from "./Comments";

export default function SinglePost(props) {
  const [showComments, setShowComments] = useState(false);
  return (
    <>
      <div id="post">
        {props.item.title}
        <br /> {props.item.body}
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
