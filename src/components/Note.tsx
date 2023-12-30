import { GiPencil } from "react-icons/gi";
import { GoTrash } from "react-icons/go";

interface Data {
  text: string;
  handleUpdate: Function
  handleDel: Function
}

const Note = ({ text, handleUpdate, handleDel }: Data) => {
  
  return (
    <div className="note">
      <p className="text">{text}</p>
      <div className="text-info">
        <GiPencil className="pen" onClick={handleUpdate} />
        <GoTrash className="trash" onClick={handleDel} />
      </div>
    </div>
  );
};

export default Note;
