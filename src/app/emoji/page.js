"use client";
import { useState, useEffect } from "react";

export default function EmojiKeyboard() {
  const [category, setCategory] = useState("activities");
  const [emojis, setEmojis] = useState([]);

  // Text streams for each mode
  const [chatText, setChatText] = useState("");
  const [videoText, setVideoText] = useState("");
  const [mergeText, setMergeText] = useState("");

  // Active mode: "chat", "video", or "merge"
  const [activeMode, setActiveMode] = useState("chat");

  useEffect(() => {
    async function loadEmojis(cat) {
      setEmojis([]);
      try {
        const res = await fetch(`/emojis/${cat}.json`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setEmojis(Object.keys(data));
      } catch (error) {
        console.error(error);
      }
    }

    if (category) loadEmojis(category);
  }, [category]);

  function handleEmojiClick(emoji) {
    if (activeMode === "chat") setChatText((prev) => prev + emoji);
    else if (activeMode === "video") setVideoText((prev) => prev + emoji);
    else if (activeMode === "merge") setMergeText((prev) => prev + emoji);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 25% 25%",
        gap: "1rem",
        minHeight: "100vh",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      {/* CHAT COLUMN */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>HELLO. HERE IS OUR FUNCTIONAL OPENCV PROJECT which helps people play charades using images.</h1>
        <h1>LINK: https://dashing-croquembouche-8a581c.netlify.app/</h1>
        <h2>
          <b>CHAT LOGS COLUMN</b>
        </h2>
        <textarea
          value={chatText}
          readOnly={activeMode !== "chat"}
          onChange={(e) => activeMode === "chat" && setChatText(e.target.value)}
          placeholder={activeMode === "chat" ? "Type your chat here..." : "Inactive"}
          style={{
            flexGrow: 1,
            resize: "none",
            fontSize: "1.1rem",
            padding: "0.5rem",
            backgroundColor: activeMode === "chat" ? "white" : "#f0f0f0",
            borderColor: activeMode === "chat" ? "#ccc" : "#aaa",
            cursor: activeMode === "chat" ? "text" : "not-allowed",
          }}
        />
      </div>

      {/* ACTION / VIDEO / MERGE PANEL */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>
          <b>ACTION PANEL</b>
        </h2>

        {/* Video Textarea only if activeMode is video */}
        {activeMode === "video" ? (
          <textarea
            value={videoText}
            onChange={(e) => setVideoText(e.target.value)}
            placeholder="Type your video notes here..."
            style={{
              width: "100%",
              height: "150px",
              resize: "none",
              fontSize: "1.1rem",
              padding: "0.5rem",
              marginBottom: "1rem",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              aspectRatio: "16 / 9",
              backgroundColor: "#ddd",
              border: "1px solid #444",
              marginBottom: "1rem",
              display: activeMode === "chat" ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
              fontStyle: "italic",
            }}
          >
            Action Panel Inactive (Select video or merge)
          </div>
        )}

        {/* Control Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <button disabled={activeMode !== "video"}>Start</button>
          <button disabled={activeMode !== "video"}>Stop</button>
          <button disabled={activeMode !== "merge"}>Approve</button>
          <button disabled={activeMode !== "merge"}>Discard</button>
        </div>

        {/* Merge Text paragraph at bottom, only if activeMode is merge */}
        {activeMode === "merge" && (
          <p
            style={{
              marginTop: "auto",
              padding: "1rem",
              border: "1px solid #aaa",
              borderRadius: "4px",
              backgroundColor: "#f9f9f9",
              minHeight: "100px",
              whiteSpace: "pre-wrap",
              fontSize: "1.1rem",
              userSelect: "text",
            }}
          >
            {mergeText || "Merge text will appear here."}
          </p>
        )}

        {/* Merge button */}
        <button
          style={{
            width: "100%",
            padding: "0.5rem",
            marginTop: "1rem",
            marginBottom: "0.5rem",
          }}
          disabled={activeMode !== "merge"}
          onClick={() => {
            console.log("Merged emojis:", mergeText);
            alert("Merged emojis logged to console!");
          }}
        >
          Merge!
        </button>

        <img
          src="/waves.png"
          alt="Ocean waves"
          style={{ width: "100%", height: "150px", display: "block" }}
        />
      </div>

      {/* EMOJI KEYBOARD */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          height: "calc(100vh - 4rem)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "right" }}>
          <b>EMOJI KEYBOARD</b>
        </h1>

        <form style={{ textAlign: "right", marginBottom: "1rem" }}>
          <label htmlFor="active-mode-select" style={{ marginRight: "1rem" }}>
            Active Mode:
          </label>
          <select
            id="active-mode-select"
            value={activeMode}
            onChange={(e) => setActiveMode(e.target.value)}
            style={{ width: "100%" }}
          >
            <option value="chat">Chat</option>
            <option value="video">Video</option>
            <option value="merge">Merge</option>
          </select>
        </form>

        <form style={{ textAlign: "right", marginBottom: "1rem" }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="emoji-select"
            style={{ width: "100%" }}
          >
            <option value="activities">Activities</option>
            <option value="animals">Animals</option>
            {/* Add more categories as needed */}
          </select>
        </form>

        <div
          id="emoji-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          {emojis.map((emoji, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleEmojiClick(emoji)}
              style={{
                fontSize: "2rem",
                cursor: "pointer",
                background: "transparent",
                border: "none",
                padding: 0,
                textAlign: "center",
              }}
              aria-label={`Emoji ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <img
        src="/book.png"
        alt="BOOK"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "auto",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
