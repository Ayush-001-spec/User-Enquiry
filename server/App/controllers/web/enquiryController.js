const enquiryModel = require("../../Modals/Enquiry.model");

let enquiryInsert = (req, res) => {
  let { name, email, phone, message } = req.body;
  if (!name || !email || !phone || !message) {
    return res
      .status(400)
      .send({ message: "All fields are required", status: 0 });
  }
  let newEnquiry = new enquiryModel({
    name: name,
    email: email,
    phone: phone,
    message: message,
  });
  newEnquiry
    .save()
    .then(() => {
      res.send({ message: "enquiry successfully", status: 1 });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message, status: 0 });
    });
};

let EnquiryList = async (req, res) => {
  let enquiry = await enquiryModel.find();
  res.send({ status: 1, msg: "Enquiry List", data: enquiry });
};

let EnquiryDelete = async (req, res) => {
  let enId = req.params.id;
  let enquiry = await enquiryModel.deleteOne({ _id: enId });
  res.send({ status: 1, message: "Enquiry Deleted Sucesfully ", enquiry });
};

let enquirySingleRow = async (req, res) => {
  let id = req.params.id;
  let enquiry = await enquiryModel.findOne({ _id: id });
  res.send({ status: 1, enquiry });
};

let EnquiryUpdate = async (req, res) => {
  let id = req.params.id;

  let { name, email, phone, message } = req.body;
  let updateObj = {
    name,
    email,
    phone,
    message,
  };
  let updateRes = await enquiryModel.updateOne({ _id: id }, updateObj);
  res.send({ status: 1, message: "Enquiry Updated Successfully", updateRes });
};

module.exports = {
  enquiryInsert,
  EnquiryList,
  EnquiryDelete,
  enquirySingleRow,
  EnquiryUpdate,
};
