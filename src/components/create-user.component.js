import React,{useState,useEffect} from "react";
import axios from 'axios';
import UserForm from "./UserForm";

// CreateUser Component
const CreateStudent = () => {
	const [formValues, setFormValues] =
		useState(
			{
				username: '',
				email: '',
				password: '',
				image:''
			})
	// onSubmit handler
// updated onSubmit event asynchronous method
const onSubmit = async (UserObject) => {
	try {
	  const response = await axios.post(
		'http://localhost:8080/post/students',
		UserObject,	{ headers: { 'Content-Type': 'application/json' } } // Set Content-Type header
	  );
  
	  if (response.status === 201) {
		alert('User successfully created!');
		// Optionally perform actions after successful creation, e.g., redirect
	  } 
	  else {
		throw new Error(`API request failed with status ${response.status}`);
	  }
	} catch (error) {
		console.log(error)
	//   console.error('Error creating user:', error);
	  alert('Failed to create user Or User already exists'); // More specific user-facing message
	}
  };

	// Return User form
	return (
		<UserForm initialValues={formValues}
			onSubmit={onSubmit}
			enableReinitialize>
			Create Student
		</UserForm>
	)
}

// Export CreateUser Component
export default CreateStudent
