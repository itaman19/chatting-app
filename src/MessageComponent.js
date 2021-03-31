import React, { forwardRef } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./Message.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

const auth = firebase.auth();

const Message = forwardRef((props, ref) => {
	//const isUser = username === message.username;
	const { text, uid, photoURL } = props.message;
	const messageClass = uid === auth.currentUser.uid ? "message_user" : "";
	return (
		<Card ref={ref} className={`message ${messageClass}`}>
			<CardContent>
				<Typography variant="h5" component="h2">
					<img
						src={
							photoURL ||
							"https://api.adorable.io/avatars/23/abott@adorable.png"
						}
					></img>
					{
						//isUser ? "" : message.username + " : "
					}
					{text}
				</Typography>
			</CardContent>
		</Card>
	);
});
export default Message;

/*
	function ChatMessage(props) {
	const { text, uid, photoURL } = props.message;

	const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

	return (
		<>
			<div className={`message ${messageClass}`}>
				<img
					src={
						photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
					}
				/>
				<p>{text}</p>
			</div>
		</>
	);
}














const Message = forwardRef(({ username, message }, ref) => {
	const isUser = username === message.username;
	return (
		<Card ref={ref} className={`message ${isUser && "message_user"}`}>
			<CardContent>
				<Typography variant="h5" component="h2">
					{isUser ? "" : message.username + " : "}
					{message.message}
				</Typography>
			</CardContent>
		</Card>
	);
});
*/
