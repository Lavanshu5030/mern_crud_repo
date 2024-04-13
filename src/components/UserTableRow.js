// for showing single user details
//src/Components/UserTableRow.js
import React from "react";
import { Button }
	from "react-bootstrap";
import { Link }
	from "react-router-dom";
import axios from "axios";

const UserTableRow =
	(props) => {
		const {
			id,
			username,
			email,
			image
		} = props.obj;

		const deleteUser = () => {
			axios
				.delete(
"http://localhost:8080/delete/students/:id" + id)
				.then((res) => {
					if (res.status === 200) {
						alert("User successfully deleted");
						window.location.reload();
					} else Promise.reject();
				})
				.catch(
					(err) =>
						alert("Something went wrong"));
		};


		// const deleteUser = (id) => {
		// 	axios
		// 	  .delete(`http://localhost:8080/delete/students/${id}`,{
		// 		headers: {} // Empty headers object (can be extended later)
		// 	  })
		// 	  .then((res) => {
		// 		if (res.status === 200) {
		// 		  alert("User successfully deleted");
		// 		  window.location.reload();
		// 		}
		// 	  })
		// 	  .catch((err) => { // Catch errors from the API call
		// 		console.error("Error deleting user:", err); // Log the error for debugging
		// 		alert("Something went wrong. Please try again."); // More user-friendly message
		// 	  });
		//   };

		return (
			<tr>
				<td>{id}</td>
				<td>{username}</td>
				<td>{email}</td>
				<td>{image}</td>
				<td>
					<Link className="edit-link"
						to={"/put/students/" + id}>
						Edit
					</Link>
					<Button
						onClick={deleteUser}
						size="sm" variant="danger">
						Delete
					</Button>
				</td>
			</tr>
		);
	};

export default UserTableRow;
