import React from "react";
import { Button, Table } from "flowbite-react";
import axios from "axios";
const EnquiryList = ({ data, getAllEnquiry, swal, setFormData }) => {
  let deleteRow = (id) => {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then(function () {
        swal("Deleted!", "Your file has been deleted.", "success");
      })
      .then(() => {
        axios
          .delete(`http://localhost:8000/api/web/enquiry/delete/${id}`)
          .then((res) => {
            console.log(res);
            getAllEnquiry();
          })
          .catch((err) => {
            console.log(err);
          });
      });

    // alert(id)
  };

  let handelEdit = (id) => {
    axios
      .get(`http://localhost:8000/api/web/enquiry/single/${id}`)
      .then((res) => {
        setFormData(res.data.enquiry);
      });
  };

  return (
    <div className="bg-gray-200 p-4 rounded-md">
      <h2 className="text-[20px] font-bold text-center mb-4 ">Enquiry List</h2>

      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Sr No</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone No</Table.HeadCell>
            <Table.HeadCell>Message</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {data.map((enquiry, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{enquiry.name}</Table.Cell>
                <Table.Cell>{enquiry.email}</Table.Cell>
                <Table.Cell>{enquiry.phone}</Table.Cell>
                <Table.Cell>{enquiry.message}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      handelEdit(enquiry._id);
                    }}
                  >
                    Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      deleteRow(enquiry._id);
                    }}
                    className="bg-red-600 text-white hover:bg-red-900 hover:text-white"
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default EnquiryList;
