import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { Table } from 'react-bootstrap';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axios.get("/user/getAll");
                setLoading(false);
                setUsers(response.data);
                console.log(response.data);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        getAllUsers();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!users.length) {
        return <p>No users found...</p>;
    }

    return (
        <div className='container'>
            <h3>All Users</h3>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td><button className='btn btn-danger btn-sm' >Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Users;
