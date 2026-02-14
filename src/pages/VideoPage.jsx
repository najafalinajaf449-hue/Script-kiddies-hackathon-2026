import { useParams } from "react-router-dom";

export default function VideoPage() {
  const { id } = useParams();

  const videos = {
    1: "G9t__9Tmwv4",
    2: "jfsWI8XgQyo",
    3: "VfowJHJz6-s",
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background-light dark:bg-background-dark">
      <iframe
        width="900"
        height="500"
        src={`https://www.youtube.com/embed/${videos[id]}`}
        title="YouTube video"
        allowFullScreen
        className="rounded-xl shadow-xl"
      ></iframe>
    </div>
  );
}
