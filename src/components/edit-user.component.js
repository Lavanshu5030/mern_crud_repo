// //src/Components/edit-User.component.js
// // EditUser Component for update User data

// // Import Modules
// import React,
// {
// 	useState,
// 	useEffect
// } from "react";
// import axios from "axios";
// import UserForm
// 	from "./UserForm";

// // EditUser Component
// const EditUser = (props) => {
// 	const [formValues, setFormValues] =
// 		useState(
// 			{
// 				username: "",
// 				email: "",
// 				password: "",
// 				image:""
// 			}
// 		);

// 	//onSubmit handler
// 	const onSubmit = (UserObject) => {
// 		axios
// 			.put(
// "http://localhost:8080/put/students/:id" +
// 				props.match.params.id,
// 				UserObject
// 			)
// 			.then((res) => {
// 				if (res.status === 200) {
// 					alert("User successfully updated");
// 					props.history.push("/User-list");
// 				} else Promise.reject();
// 			})
// 			.catch(
// 				(err) =>
// 					alert("Something went wrong")
// 			);
// 	};

// 	// Load data from server and reinitialize User form
// 	useEffect(() => {
// 		axios.get(
//             "http://localhost:8080/put/students/:id"
// 				+ props.match.params.id
// 			).then((res) => {
// 				const {
// 					username,
// 					email,
// 					image
// 				} = res.data;
// 				setFormValues(
// 					{
// 						username,
// 						email,
// 						image
// 					});
// 			})
// 			.catch(
// 				(err) =>
// 					console.log(err)
// 			);
// 	}, []);

// 	// Return User form
// 	return (
// 		<UserForm
// 			initialValues={formValues}
// 			onSubmit={onSubmit}
// 			enableReinitialize>
// 			Update User
// 		</UserForm>
// 	);
// };

// // Export EditUser Component
// export default EditUser;


//src/Components/edit-User.component.js
// EditUser Component for update User data

// Import Modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm'

const EditUser = (props) => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const UserObject = formValues; // Assuming UserObject construction

    axios.put(`http://localhost:8080/put/students/${props.match.params.id}`, UserObject)
      .then((res) => {
        if (res.status === 200) {
          alert("User successfully updated");
          props.history.push("/User-list");
        } else Promise.reject();
      })
      .catch((err) => {
        console.error('Error updating user:', err);
        // Handle errors more specifically here (e.g., display an error message)
      })
      .finally(() => {
        setIsLoading(false); // Set loading back to false after submission
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/put/students/${props.match.params.id}`);
        const { username, email, image } = response.data;
        setFormValues({ username, email, image });
      } catch (err) {
        console.error('Error fetching data:', err);
        // Handle errors more specifically here (e.g., display an error message)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.match.params.id]);

  return (
    <div>
      {isLoading ? (
        <p>Loading user data...</p>
      ) : (
        <UserForm
          initialValues={formValues}
          onSubmit={onSubmit}
          handleChange={handleChange} // Explicitly pass handleChange
          enableReinitialize>
          Update User
        </UserForm>
      )}
    </div>
  );
};

export default EditUser;