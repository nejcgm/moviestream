import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Cross from "../assets/gridicons_cross.png";
import { fetchSpecific } from "../functions/Fetching.js";
interface VideoPlayerProps {
  movieId: string | null;
  onCancel: () => void;
  type: string | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  movieId,
  onCancel,
  type,
}) => {
  const [video, setVideo] = useState<[]>([]);
  const [trailer, setTrailer] = useState<{ key: string | null | undefined }>();

  useEffect(() => {
    const loadVideo = async () => {
      const data = await fetchSpecific(type, movieId, "/videos", null, "");
      if (data) {
        setVideo(data?.results);
      }
    };
    loadVideo();
  }, [movieId]);

  useEffect(() => {
    const findTrailer = video?.find(
      (item: { type: string }) => item.type === "Trailer"
    );
    setTrailer(findTrailer);
  }, [video]);

  const videoContent = (
    <>
      <div className="fixed z-50 bg-black bg-opacity-35 top-0 left-0 w-full h-screen justify-center items-center flex flex-col">
        <div className="h-auto w-auto  flex flex-col">
          <button
            onClick={() => {
              onCancel();
            }}
            className="hover:bg-white/10 p-2 rounded-full mb-1 self-end"
          >
            <img className="h-[24px] sm:h-[32px]" src={Cross} alt="" />
          </button>
          <div className="bg-[#1A1A1A] p-[12px] sm:p-[24px] flex flex-col rounded-md">
            <iframe
              className="lg:w-[800px] lg:h-[500px] sm:w-[500px] sm:h-[300px] w-[330px] h-[210px]"
              src={`https://www.youtube.com/embed/${trailer?.key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
  return ReactDOM.createPortal(videoContent, document.body);
};

export default VideoPlayer;
