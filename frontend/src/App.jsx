import { useState } from "react";

export default function App() {
  // Generate analytics ONCE for each video, representing real world analytics per video
  const [videos] = useState(() =>
    Array.from({ length: 20 }).map(() => ({
      views: Math.floor(Math.random() * 500000) + 1000,
      likes: Math.floor(Math.random() * 50000) + 100,
      comments: Math.floor(Math.random() * 2000) + 10,
      ctr: (Math.random() * 5).toFixed(2),
      conversion: (Math.random() * 3).toFixed(2),
    }))
  );

  return (
    <div className="feed">
      {videos.map((video, i) => (
        <div key={i} className="card">
          <div className="video-area">
            <div className="video-box">Video {i + 1}</div>
          </div>

          <div className="analytics-area">
            <h3>Analytics</h3>
            <p>Views: {video.views.toLocaleString()}</p>
            <p>Likes: {video.likes.toLocaleString()}</p>
            <p>Comments: {video.comments.toLocaleString()}</p>
            <p>CTR: {video.ctr}%</p>
            <p>Conversion: {video.conversion}%</p>
          </div>
        </div>
      ))}
    </div>
  );
}
