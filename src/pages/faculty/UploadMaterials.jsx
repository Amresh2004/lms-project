import React, { useState, useEffect } from "react";

const UploadMaterials = () => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // ✅ STEP 1: Load data from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("videos");
    if (saved) {
      setVideos(JSON.parse(saved));
    }
  }, []);

  // ✅ STEP 2: Save data to LocalStorage
  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  // ✅ Convert YouTube link
  const convertToEmbed = (link) => {
    if (link.includes("watch?v=")) {
      return link.replace("watch?v=", "embed/");
    }
    return link;
  };

  // ✅ Add Video
  const addVideo = () => {
    if (!title || !url) {
      alert("Fill all fields");
      return;
    }

    const newVideo = {
      id: Date.now(),
      title: title,
      url: convertToEmbed(url),
    };

    setVideos((prev) => [...prev, newVideo]);

    setTitle("");
    setUrl("");
  };

  // ✅ Delete Video
  const deleteVideo = (id) => {
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
  };

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-4">Upload Materials</h3>

      {/* FORM */}
      <div className="card p-4 shadow-sm mb-4">
        <div className="row g-3">
          
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Video Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="YouTube URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-primary w-100"
              onClick={addVideo}
            >
              Add
            </button>
          </div>

        </div>
      </div>

      {/* VIDEO LIST */}
      <div className="row g-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div className="col-md-4" key={video.id}>
              <div className="card shadow-sm">

                <iframe
                  width="100%"
                  height="200"
                  src={video.url}
                  title={video.title}
                  allowFullScreen
                ></iframe>

                <div className="card-body">
                  <h6>{video.title}</h6>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteVideo(video.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p>No videos added</p>
        )}
      </div>
    </div>
  );
};

export default UploadMaterials;