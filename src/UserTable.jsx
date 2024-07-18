import React, { useState } from 'react';

const UserTable = ({ users, onEdit, onDelete, onSelectRow, onSelectAll, selectedRows }) => {
  const [editingId, setEditingId] = useState(null);
  const [editUser, setEditUser] = useState({});

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditUser(user);
  };

  const handleSaveClick = () => {
    onEdit(editingId, editUser);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={(e) => onSelectAll(e.target.checked)}
              checked={users.length > 0 && selectedRows.length === users.length}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className={selectedRows.includes(user.id) ? 'selected' : ''}>
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(user.id)}
                onChange={() => onSelectRow(user.id)}
              />
            </td>
            <td>
              {editingId === user.id ? (
                <input
                  type="text"
                  name="name"
                  value={editUser.name}
                  onChange={handleInputChange}
                />
              ) : (
                user.name
              )}
            </td>
            <td>
              {editingId === user.id ? (
                <input
                  type="email"
                  name="email"
                  value={editUser.email}
                  onChange={handleInputChange}
                />
              ) : (
                user.email
              )}
            </td>
            <td>
              {editingId === user.id ? (
                <input
                  type="text"
                  name="role"
                  value={editUser.role}
                  onChange={handleInputChange}
                />
              ) : (
                user.role
              )}
            </td>
            <td>
              {editingId === user.id ? (
                <button className="save" onClick={handleSaveClick}>
                  Save
                </button>
              ) : (
                <>
                  <button className="edit" onClick={() => handleEditClick(user)}>
                    Edit
                  </button>
                  <button className="delete" onClick={() => onDelete(user.id)}>
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
