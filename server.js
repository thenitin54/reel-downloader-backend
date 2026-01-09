import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.json({ error: "No URL provided" });

  try {
    const apiUrl =
      "https://instagram-downloader-scraper-reels-igtv-posts-stories.p.rapidapi.com/v1/instagram?url=" +
      encodeURIComponent(url);

    const r = await fetch(apiUrl, {
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_KEY,
        "X-RapidAPI-Host":
          "instagram-downloader-scraper-reels-igtv-posts-stories.p.rapidapi.com",
      },
    });

    const data = await r.json();
    const video =
      data.download_url || (data.result && data.result[0]?.url);

    if (!video) return res.json({ error: "Video not found" });

    res.json({ success: true, video });
  } catch (err) {
    res.json({ error: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
