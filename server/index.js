let express = require("express");
let cors = require("cors");
let app = express();
let mongoose = require("mongoose");
const enquiryRouter = require("./App/Routes/web/enquiryRoute");
require("dotenv").config();
app.use(cors());
app.use(express.json()); //middlware;
app.use(express.urlencoded({ extended: true }));

//routes

app.use("/api/web/enquiry/", enquiryRouter);

//routers end
// Connect to MongoDB
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
