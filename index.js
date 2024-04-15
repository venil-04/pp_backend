const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectdb = require("./connection.js");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/UserRoute.js");
const partyplotRoues = require("./routes/PartyPlotRoute.js");
const bookingroutes = require("./routes/BookingRoute.js");
const cors = require('cors');

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const PORT = process.env.PORT;
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// db connection
connectdb();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/pp", partyplotRoues);
app.use("/api/v1/booking", bookingroutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
