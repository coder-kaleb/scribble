import { useState } from "react";
import Note from "./Note";
import { signOut } from "firebase/auth";
import { auth, colRef } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { DocumentData, addDoc, onSnapshot } from "firebase/firestore";

const NoteContainer = () => {
  const [user] = useAuthState(auth);
//   const [fetchedNote, setFetchedNote] = useState<Item[]>();
  const [note, setNote] = useState("");
  type Item = {
    text: string;
  };
//   console.log(fetchedNote)

  //   * SIGN OUT
  const logOut = () => {
    signOut(auth);
  };

  //   * ADD DOCS TO DATABASE
  const submit = async () => {
    try {
      await addDoc(colRef, {
        text: note,
      });
      // console.log(res)
      setNote("");
    } catch (error) {
      console.log(error);
    }
  };

  //  * Note fetch

  const unsubscribe = onSnapshot(colRef, (doc): void => {
    const notes: DocumentData = [];
    doc.forEach((item) => {
      notes.push(item.data());
    });
    // setFetchedNote(notes);
  });

  return (
    <section className="right-side">
      <div className="txt-btn-wrapper">
        <div className="write-container">
          <textarea
            placeholder="Write your note here"
            rows={6}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="btn-cont">
            <button onClick={submit}>Submit</button>
          </div>
        </div>
        <div className="sign-out-cont">
          {user ? (
            <img src={`${user.photoURL}`} alt="phot-url" className="photo" />
          ) : (
            <button className="log-out" onClick={logOut}>
              Sign Out
            </button>
          )}
        </div>
      </div>
      <h1>Notes</h1>

      <Note />
    </section>
  );
};

export default NoteContainer;
