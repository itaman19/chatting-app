import { useEffect, useRef, useState } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
//import Message from "./MessageComponent";
//import db from "./firebase";
//import firebase from "firebase";
import FlipMove from "react-flip-move";
import IconButton from "@material-ui/core/IconButton";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import firebaseApp from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp(firebaseApp);
const auth = firebase.auth();
const firestore = firebase.firestore();
//const analytics = firebase.analytics();

function SignIn() {
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

	return (
		<div className="welcomepage">
			<Button
				className="sign-in"
				onClick={signInWithGoogle}
				variant="contained"
				color="primary"
			>
				<img src="https://cdn.worldvectorlogo.com/logos/google-icon.svg"></img>
				Sign in with Google
			</Button>
			<h4>
				welcome guys 🔥 Click on signIn and start your chatting and don't worry
				about your password and mail it will be authenticated by google not me😁
			</h4>
		</div>
	);
}

function SignOut() {
	return (
		auth.currentUser && (
			<Button
				className="sign-out"
				onClick={() => auth.signOut()}
				color="primary"
				variant="contained"
			>
				Sign Out
			</Button>
		)
	);
}

function ChattingPage() {
	const dummy = useRef();
	const messagesRef = firestore.collection("messages");
	const query = messagesRef.orderBy("createdAt");

	const [messages] = useCollectionData(query, { idField: "id" });

	const [formValue, setFormValue] = useState("");
	const scrollToBottom = () => {
		dummy.current.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(scrollToBottom, [messages]);

	const sendMessage = async (e) => {
		e.preventDefault();

		const { displayName, uid, photoURL } = auth.currentUser;

		await messagesRef.add({
			text: formValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			photoURL,
			user: displayName,
		});

		setFormValue("");
		dummy.current.scrollIntoView({
			behavior: "smooth",
		});
	};

	return (
		<>
			<main>
				{messages &&
					messages.map((msg) => <Message key={msg.id} message={msg} />)}

				<span ref={dummy}></span>
			</main>

			<form onSubmit={sendMessage}>
				<input
					id="in"
					value={formValue}
					onChange={(e) => setFormValue(e.target.value)}
					placeholder="say something nice"
				/>
				<IconButton
					className="button"
					disabled={!formValue}
					variant="contained"
					color="primary"
					onClick={(e) => sendMessage(e)}
				>
					<i class="fa fa-paper-plane" aria-hidden="true"></i>
				</IconButton>
			</form>
		</>
	);
}

const Message = (props) => {
	//const isUser = username === message.username;
	const { text, uid, photoURL, user } = props.message;
	const messageClass = uid === auth.currentUser.uid ? "message_user" : "";
	return (
		<Card className={`message ${messageClass}`}>
			<CardContent>
				<Typography variant="body2" component="p" className="userandimg">
					<img
						src={
							photoURL ||
							"https://api.adorable.io/avatars/23/abott@adorable.png"
						}
					></img>
					{user}
				</Typography>
				<Typography variant="h6" component="h6">
					{text}
				</Typography>
			</CardContent>
		</Card>
	);
};

function App() {
	const [user] = useAuthState(auth);

	return (
		<div className="App">
			<header>
				<Container>
					<Typography variant="h6" component="h6" className="userandimg">
						<img src="https://lh3.googleusercontent.com/proxy/bGoPoPiKReBa5zSlFEV4Yd5BcN0OTd4iw8GhHdDerygHkL-pSnAohjLuteki5hbLhOVz5kd4nOTwE6eelegcejSnnFKHR13Js3Mw6HzTHN_uuYTsw2T1wGzGLCBNWv3Xg00ZQUhIWhcNIrwEOPHlcKmHP6tP"></img>
						Aman's messenger app
					</Typography>
				</Container>
				<SignOut />
			</header>

			<section>{user ? <ChattingPage /> : <SignIn />}</section>
		</div>
	);
}

export default App;
