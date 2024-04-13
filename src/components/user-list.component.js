//src/Components/User-list.component.js
import React,{useState,useEffect} from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import UserTableRow from "./UserTableRow";


const UserList = () => {
	const [Users, setUsers] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8080/get/students")
			.then(({ data }) => {
				setUsers(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const DataTable = () => {
		return Users.map((res, i) => {
			return <UserTableRow
				obj={res} key={i} />;
		});
	};

	return (
		<div className="table-wrapper">
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Sr.No</th>
						<th>Name</th>
						<th>Email</th>
						<th>Image</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>{DataTable()}</tbody>
			</Table>
		</div>
	);
};

export default UserList;
