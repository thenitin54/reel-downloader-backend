import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.json({ error: "Instagram URL required" });

  try {
    const apiUrl =
      "https://instagram-downloader-scraper-reels-igtv-posts-stories.p.rapidapi.com/instagram/?url=" +
      encodeURIComponent(url);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_KEY,
        "X-RapidAPI-Host":
          "instagram-downloader-scraper-reels-igtv-posts-stories.p.rapidapi.com"
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Download failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
