import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, editUser } from '../store/UserSlice';
import '../styles/UserTable.css'; // Importing the styles file

const UserTable = () => {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState(null);

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    const handleEdit = (user) => {
        setEditedUser(user);
        setEditMode(true);
    };

    function isValidCNIC(cnic) {
        return /^\d{5}-\d{7}-\d$/.test(cnic) && cnic.length >= 15;
    }

    const handleSaveEdit = (e) => {
        e.preventDefault();
    
        if (!editedUser.firstName || !editedUser.lastName || !editedUser.age || !editedUser.cnic || !isValidCNIC(editedUser.cnic)) {
            window.alert('You cannot leave any field empty, or the length of CNIC should be at least 15 characters and formatted as xxxxx-xxxxxxx-x.');
        } else {
            dispatch(editUser({ id: editedUser.id, updatedUser: editedUser }));
            setEditedUser(null);
            setEditMode(false);
        }
    };
    


    return (
        <div className="user-table-container">
            {/* <h2>USERS LIST</h2> */}

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        {/* <th>Last Name</th> */}
                        <th>Age</th>
                        <th>CNIC</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {users?.users?.length === 0 &&

                    <h4 style={{ paddingLeft: '0.5rem' }}>No users to display!</h4>}
                <tbody>

                    {users?.users?.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstName} {user.lastName}</td>
                            {/* <td>{user.lastName}</td> */}
                            <td>{user.age}</td>
                            <td>{user.cnic}</td>
                            <td className='ED'>
                                <button className='ED-buttons' onClick={() => handleEdit(user)} style={{ background: 'green', borderRadius: '10px', border: 'none', padding: '0.4rem 0.3rem', color: 'white' }}>Edit</button>
                                <button className='ED-buttons' onClick={() => handleDelete(user.id)} style={{ background: 'red', borderRadius: '10px', border: 'none', padding: '0.4rem 0.3rem', color: 'white' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editMode && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setEditMode(false)}>&times;</span>
                        <h2 style={{ textAlign: 'center' }}>Edit User</h2>
                        <form onSubmit={handleSaveEdit} className='edit_form'>
                            <input
                                type="text"
                                name="firstName"
                                value={editedUser.firstName}
                                onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                                placeholder="First Name"
                                className='edit_fields'
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={editedUser.lastName}
                                onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                                placeholder="Last Name"
                                className='edit_fields'
                            />
                            <input
                                type="number"
                                name="age"
                                value={editedUser.age}
                                onChange={(e) => setEditedUser({ ...editedUser, age: e.target.value })}
                                placeholder="Age"
                                className='edit_fields'
                            />
                            <input
                                type="text"
                                name="cnic"
                                value={editedUser.cnic}
                                onChange={(e) => setEditedUser({ ...editedUser, cnic: e.target.value })}
                                placeholder="CNIC (xxxxx-xxxxxxx-x)"
                                className='edit_fields'
                            />
                            <button type="submit" style={{ background: 'blue', color: 'white', padding: '0.8rem', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Save Edited Details</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserTable;
