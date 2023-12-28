import "./App.css";
import { useState } from "react";
import Note from "./components/Note";
import GoogleButton from "react-google-button";



function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [note, setNote] = useState("")
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
      <section className="right-side">
        <div className="txt-btn-wrapper">
          <div className="write-container">
            <textarea placeholder="Write your note here" rows={5} value={note} onChange={(e) => setNote(e.target.value)} />
            <div className="btn-cont">
              <button>Submit</button>
            </div>
          </div>
          <div className="signIn-container">
            <GoogleButton />
          </div>
        </div>
        <h1>Notes</h1>
        <Note />
      </section>
    </main>
  );
}

export default App;
