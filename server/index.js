
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();



const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());


// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// Home route
app.get("/", (req, res) => {
  res.send("iMovies backend is running!");
});

// Health-check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "iMovies API is working!",
  });
});
const authRoutes = require("./routes/authRoutes");const movieRoutes = require("./routes/movieRoutes");

app.use("/api/auth", authRoutes);

app.use("/api/movies", movieRoutes);



app.listen(PORT, () => {
  console.log(`iMovies server running at http://localhost:${PORT}`);
  
  console.log(
  "Registered auth routes:",
  authRoutes.stack
    .filter((layer) => layer.route)
    .map((layer) => ({
      path: layer.route.path,
      methods: Object.keys(layer.route.methods),
    }))
);
});