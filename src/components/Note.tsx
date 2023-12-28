import { GiPencil } from "react-icons/gi";
import { GoTrash } from "react-icons/go";

const Note = () => {
  return (
    <div className="note">
        <p className="text">

      The begining of screenless design UI job to be taken over by solution
      Architecher
        </p>
      <div className="text-info">
        <GiPencil className="pen" />

        <GoTrash className="trash" />
      </div>
    </div>
  );
};

export default Note;
