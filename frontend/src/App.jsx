import { useEffect, useRef, useState } from "react";
import teeth from "./teeth_whitening.json";
import food from "./food_storage.json";
import linen from "./linen.json";

export default function App() {
  // All 10 videos from combined.json
  const [videos] = useState(data.videos);

  // Track which video is currently visible
  const [currentIndex, setCurrentIndex] = useState(0);

  // Store refs to each video element
  const videoRefs = useRef([]);

  // Autoplay + pause logic using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            const index = Number(video.dataset.index);
            setCurrentIndex(index);

            video.currentTime = 0;
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.75 }
    );

    videoRefs.current.forEach((video) => {
      if (video && video.tagName === "VIDEO") {
        observer.observe(video);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Format duration (ms → mm:ss)
  function formatDuration(ms) {
    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  // Format posted timestamp (unix → "X days ago")
  function formatPosted(ts) {
    const now = Date.now() / 1000;
    const diff = now - ts;
    const days = Math.floor(diff / 86400);
    return `${days} days ago`;
  }

  const currentVideo = videos[currentIndex];

  return (
    <div className="feed">
      {videos.map((video, i) => (
        <div key={i} className="card">
          {/* LEFT SIDE — VIDEO */}
          <div className="video-area">
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              data-index={i}
              src={video.url}
              poster={video.cover}
              className="video-box"
              loop
              playsInline
              muted
            />
          </div>

          {/* RIGHT SIDE — ANALYTICS PANEL */}
          <div className="analytics-area">
            <h2>{data.product.title}</h2>

            <p><strong>Views:</strong> {video.play_count.toLocaleString()}</p>
            <p><strong>Likes:</strong> {video.like_count.toLocaleString()}</p>
            <p><strong>Duration:</strong> {formatDuration(video.duration)}</p>

            <h3>Product Rating</h3>
            <p><strong>Rating:</strong> {data.product.reviews.rating}</p>
            <p><strong>Reviews:</strong> {data.product.reviews.review_count.toLocaleString()}</p>

            <h3>Pricing</h3>

            <p>
              <strong>Price:</strong> $
              {parseFloat(
                data.product?.Pricing?.[0]?.price?.real_price?.price_val || 0
              ).toFixed(2)}
            </p>

            <p>
              <strong>Original:</strong> $
              {parseFloat(
                data.product?.Pricing?.[0]?.price?.original_price_value || 0
              ).toFixed(2)}
            </p>

            <p>
              <strong>Discount:</strong> {data.product?.Pricing?.[0]?.price?.discount || "N/A"}
            </p>



            <h3>Sales</h3>
            <p><strong>Sold:</strong> {data.product.sold_count.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
