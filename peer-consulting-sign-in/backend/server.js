const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    user: "myUserAdmin",
    pass: "OITAdmin"
  })
  .then(() => console.log("DB server connect"))
  .catch(e => console.log("DB error", e));
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
  console.log("Database connected:", uri);
});

const signInCollectionRouter = require("./routes/signInCollection");
const userAdminCollectionRouter = require("./routes/userAdminCollection");
const subjectCollectionRouter = require("./routes/subjectCollection");

app.use("/signInCollection", signInCollectionRouter);
app.use("/userAdminCollection", userAdminCollectionRouter);
app.use("/subjectCollection", subjectCollectionRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
