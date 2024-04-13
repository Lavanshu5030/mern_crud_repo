//src/Components/User-list.component.js
import React,
{
	useState,
	useEffect
} from "react";
import axios
	from "axios";
import { Table }
	from "react-bootstrap";
import UserTableRow
	from "./UserTableRow";
// import { Link }
// 	from "react-router-dom";

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
						{/* <th>Password</th> */}
						
					</tr>
				</thead>
				<tbody>{DataTable()}</tbody>
				{/* <tbody>
					{Users.map((user) => (
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td><img src={user.imageUrl} alt={user.name} /></td>
						
							<td>
								
								<Link className="edit-link"
									to={"/edit-User/" + id}>
									Edit
								</Link>
					
							</td>
						</tr>
					))}
				</tbody> */}
			</Table>
		</div>
	);
};

export default UserList;
