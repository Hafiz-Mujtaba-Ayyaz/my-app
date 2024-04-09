import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, editUser } from '../store/UserSlice';
import '../styles/UserTable.css';

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
        console.log('first')
        console.log(editedUser.age)

        if (!editedUser.firstName || !editedUser.age || !editedUser.cnic || !isValidCNIC(editedUser.cnic)) {
            window.alert('You cannot leave any field empty, or the length of CNIC should be at least 15 characters and formatted as xxxxx-xxxxxxx-x.');
        }
        else if (editedUser.age <= 0) {
            window.alert('You cannot enter age equal to or less than 0 (must be positive)');
        }
        else {
            dispatch(editUser({ id: editedUser.id, updatedUser: editedUser }));
            setEditedUser(null);
            setEditMode(false);
        }
    };

    return (
        <div className="user-table-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>CNIC</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {users?.users?.length === 0 && <h4 style={{ paddingLeft: '0.5rem' }}>No users to display!</h4>}
                <tbody>
                    {users?.users?.map((user) => (
                        <tr key={user.id}>
                            <td>
                                {editMode && editedUser && editedUser.id === user.id ? (
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={editedUser.firstName}
                                        onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                                        placeholder="First Name"
                                        className='edit_fields'
                                    />
                                ) : (
                                    `${user.firstName}`
                                )}
                            </td>
                            <td>{editMode && editedUser && editedUser.id === user.id ? (
                                <input
                                    type="number"
                                    name="age"
                                    value={editedUser.age}
                                    onChange={(e) => setEditedUser({ ...editedUser, age: e.target.value })}
                                    placeholder="Age"
                                    className='edit_fields'
                                />
                            ) : (
                                user.age
                            )}
                            </td>
                            <td>{editMode && editedUser && editedUser.id === user.id ? (
                                <input
                                    type="text"
                                    name="cnic"
                                    value={editedUser.cnic}
                                    onChange={(e) => setEditedUser({ ...editedUser, cnic: e.target.value })}
                                    placeholder="CNIC (xxxxx-xxxxxxx-x)"
                                    className='edit_fields'
                                    autoComplete='off'
                                />
                            ) : (
                                user.cnic
                            )}
                            </td>
                            <td className='ED'>
                                {editMode && editedUser && editedUser.id === user.id ? (
                                    <>
                                        <button type="submit" onClick={handleSaveEdit} style={{ background: 'blue', color: 'white', padding: '0.5rem', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Save</button>
                                        <button type="submit" onClick={() => setEditMode(!editMode)} style={{ background: 'red', color: 'white', padding: '0.5rem', border: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '1.3rem' }}>&times;</button>
                                    </>
                                ) : (
                                    <>
                                        <button className='ED-buttons' onClick={() => handleEdit(user)} style={{ background: 'green', borderRadius: '10px', border: 'none', padding: '0.4rem 0.3rem', color: 'white' }}>Edit</button>
                                        <button className='ED-buttons' onClick={() => handleDelete(user.id)} style={{ background: 'red', borderRadius: '10px', border: 'none', padding: '0.4rem 0.3rem', color: 'white' }}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;