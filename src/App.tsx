import "./App.css";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import NoteContainer from "./components/NoteContainer";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log(user)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <section className="left-side">
        <h1 className="logo-title">Scribble</h1>
        <div>
          <div
            className={`circle ${open ? "opened" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
          </div>

          <ul className={`color-container ${open ? "opened" : ""}`}>
            <li data-color="yellow"></li>
            <li data-color="orange"></li>
            <li data-color="purple"></li>
            <li data-color="blue"></li>
            <li data-color="green"></li>
          </ul>
        </div>
      </section>
      {user ? (
        <NoteContainer />
      ) : (
        <GoogleButton className="signIn-container" onClick={signIn} />
      )}
    </main>
  );
}

export default App;
