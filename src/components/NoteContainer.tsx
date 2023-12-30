import { useEffect, useState } from "react";
import Note from "./Note";
import { signOut } from "firebase/auth";
import { auth, colRef, db, q } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  DocumentData,
  DocumentReference,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const NoteContainer = () => {
  const [user] = useAuthState(auth);
  const [fetchedNote, setFetchedNote] = useState<Document[]>([]);
  const [note, setNote] = useState("");
  const [update, setUpdate] = useState<boolean>(false);
  const [docRef, setDocRef] = useState<DocumentReference>();

  useEffect(() => {
    // Note fetch
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFetchedNote(notes);
    });
    return () => unsubscribe();
  }, [note]);

  // type Data = {
  //   id: string;
  //   text: string;
  // };
  //   * ADD DOCS TO DATABASE
  const submit = async () => {
    if (update) {
      await updateDoc(docRef, {
        text: note,
      });

      setNote("");
      setUpdate(false);
    } else {
      try {
        await addDoc(colRef, {
          text: note,
          timestamp: serverTimestamp(),
        });
        setNote("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  //   * SIGN OUT
  const logOut = () => {
    signOut(auth);
  };

  const handleUpdate = async (docId: string) => {
    const ref = doc(db, "note", docId);
    const result: DocumentData = await getDoc(ref);
    setNote(result.data().text);
    setUpdate(true);
    setDocRef(ref);
  };

  const handleDelete = async (docId: string) => {
    const ref = doc(db, "note", docId);
    await deleteDoc(ref);
  };
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
            <button onClick={submit}>{update ? "Update" : "Submit"}</button>
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

      <div className="note-container">
        {/* <Note /> */}
        {fetchedNote.map((doc: DocumentData) => (
          <Note
            key={doc.id}
            text={doc.text}
            handleUpdate={() => handleUpdate(doc.id)}
            handleDel={() => handleDelete(doc.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default NoteContainer;
