import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import EnquiryList from "./EnquiryList";
import swal from "sweetalert2/dist/sweetalert2.js";
const Enquiry = () => {
  let [enquiryList, setEnquiryList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  let getAllEnquries = () => {
    axios
      .get("http://localhost:8000/api/web/enquiry/view")
      .then((res) => {
        // toast.success("Enquiries fetched successfully");
        return res.data;
      })
      .then((finalData) => {
        if (finalData.status) {
          setEnquiryList(finalData.data);
        }
      });
  };

  useEffect(() => {
    getAllEnquries();
  }, []);

  let getValue = (e) => {
    let inputName = e.target.name;
    let value = e.target.value;

    let oldData = { ...formData };
    oldData[inputName] = value;
    setFormData(oldData);
  };
  let saveEnquiry = (e) => {
    e.preventDefault();
    if (formData._id) {
      axios
        .put(`http://localhost:8000/api/web/enquiry/update/${formData._id}`, formData)
        .then((res) => {
          toast.success("Enquiry updated successfully");
          setFormData({ name: "", email: "", phone: "", message: "", _id: "" }); // Reset form after successful submissions
          getAllEnquries();
        });
    } else {
      // Simulating a delay for the API call to mimic a real-world scenario
      axios
        .post("http://localhost:8000/api/web/enquiry/insert", formData)
        .then((res) => {
          toast.success("Enquiry saved successfully");
          setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form after successful submissions
          getAllEnquries();
          console.log(res.data); // Added logging for success response
        })

        .catch((err) => {
          console.error("Error:", err.response.data); // Added logging for error response
        });
    }
  };

  return (
    <>
      <div className="W-[100%]">
        <ToastContainer />
        <h1 className="text-[40px] text-center py-4 font-bold h-auto">
          User Enquiry
        </h1>
        <div className="grid grid-cols-[30%_auto] gap-5 ml-2 ">
          <div className="bg-gray-200 p-2 rounded-md ">
            <div className="bg-gray-200 p-4">
              <h2 className="text-[20px] font-bold ">Enquiry Form</h2>
              <form onSubmit={saveEnquiry}>
                <div className="py-3">
                  <Label htmlFor="name" value="Your Name" />
                  <TextInput
                    type="text"
                    onChange={getValue}
                    name="name"
                    value={formData.name}
                    required
                    id="name"
                    placeholder="Enter Your Name"
                  />
                </div>
                <div className="py-3">
                  <Label htmlFor="email" value="Your Email" />
                  <TextInput
                    type="email"
                    onChange={getValue}
                    name="email"
                    value={formData.email}
                    required
                    id="email"
                    placeholder="Enter Your Email"
                  />
                </div>
                <div className="py-3">
                  <Label htmlFor="phone" value="Your Phone" />
                  <TextInput
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={getValue}
                    required
                    id="phone"
                    placeholder="Enter Your Phone No"
                  />
                </div>
                <div className="py-3">
                  <Label htmlFor="message" value="Your Message" />
                  <Textarea
                    type="text"
                    onChange={getValue}
                    value={formData.message}
                    name="message"
                    required
                    id="message"
                    placeholder="Enter Your Message"
                    rows={4}
                  />
                </div>
                <div className="py-2">
                  <Button type="submit" className="w-[100%]">
                    {formData._id ? "Update" : "Save"}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <EnquiryList
            data={enquiryList}
            getAllEnquiry={getAllEnquries}
            swal={swal}
            setFormData={setFormData}
          />
        </div>
      </div>
    </>
  );
};

export default Enquiry;
