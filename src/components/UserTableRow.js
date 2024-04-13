import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const UserTableRow = ({ obj, onDeleteSuccess }) => {
  const { id, username, email, image } = obj;

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:8080/delete/students/${id}`, {
          headers: {},
        })
        .then((res) => {
          if (res.status === 200) { // Assuming success code is 200 based on your update
            alert("User successfully deleted!");
            if (onDeleteSuccess) {
              onDeleteSuccess(id); // Call the callback function if provided
            } else {
              // Optionally reload the page here if no callback is provided
              // window.location.reload();
            }
          } else {
            console.error("Unexpected status code:", res.status);
            alert("Deletion failed. Please try again.");
          }
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
          if (err.response) {
            console.error("Server response:", err.response.data);
            // Handle specific errors based on server response structure (optional)
          } else {
            console.error("Request error:", err);
          }
          alert("Something went wrong. Please try again.");
        });
    }
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>{image}</td>
      <td>
        <Link className="edit-link" to={`/put/students/${id}`}>
          Edit
        </Link>
        <Button size="sm" variant="danger" onClick={() => deleteUser(id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default UserTableRow;