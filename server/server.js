import express from "express";
import mongoose from "mongoose";
import shortid from "shortid";
import shortUrl from "./model/shortStore.js";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

try {
  mongoose.connect(process.env.MongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('Error connecting to MongoDB:', error.message);
}

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello There!");
});

app.post("/short", async (req, res) => {
  const fullUrl = req.body.full;
  const existingShortUrl = await shortUrl.findOne({ full: fullUrl });
  if (existingShortUrl) {
    res.send(existingShortUrl);
  } else {
    const record = new shortUrl({
      full: fullUrl
    });
    await record.save();
    const newShortUrl = await shortUrl.findOne({ full: fullUrl });
    res.send(newShortUrl);
  }
});

app.get("/:shortUrl", async (req, res) => {
  const short = await shortUrl.findOne({ short: req.params.shortUrl });
  if (short == null) return res.sendStatus(404);
  
  short.clicks++;
  await short.save();
  
  res.redirect(`${short.full}`);
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log("Server started successfully on port: ", port);
});
