require("dotenv").config();

const express = require("express");
const cors = require("cors");

const questionRoutes = require("./routes/questionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Quiz Practice System API is running" });
});

app.use("/api/questions", questionRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
