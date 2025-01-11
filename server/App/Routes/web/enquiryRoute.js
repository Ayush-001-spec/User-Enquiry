let express = require("express");
const {
  enquiryInsert,
  EnquiryList,
  EnquiryDelete,
  enquirySingleRow,
  EnquiryUpdate,
} = require("../../controllers/web/enquiryController");
let enquiryRouter = express.Router();

enquiryRouter.post("/insert", enquiryInsert);
enquiryRouter.get("/view", EnquiryList);
enquiryRouter.delete("/delete/:id", EnquiryDelete);
enquiryRouter.get("/single/:id", enquirySingleRow);
enquiryRouter.put('/Update/:id', EnquiryUpdate)

module.exports = enquiryRouter;
