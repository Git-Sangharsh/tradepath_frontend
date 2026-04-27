import { useSelector } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./Loader.css"

const Loader = () => {
  const loading = useSelector((state) => state.getJournalLoader);

  if (!loading) return null;

  return (
    <div className="loader-container">
      <ScaleLoader color="#4fa94d"  height={40} width={10} />
    </div>
  );
};

export default Loader;
