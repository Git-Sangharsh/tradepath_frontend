import { useSelector } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./Loader.css";
import { useEffect } from "react";

const Loader = () => {
  const loading = useSelector((state) => state.getJournalLoader);
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    };
  }, [loading]);
  if (!loading) return null;

  return (
    <div className="loader-container">
      <ScaleLoader color="#4fa94d" height={40} width={10} />
    </div>
  );
};

export default Loader;
