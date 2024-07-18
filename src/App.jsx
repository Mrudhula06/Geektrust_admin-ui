import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './UserTable';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setFilteredUsers(users.filter(user =>
        Object.values(user).some(value => 
          String(value).toLowerCase().includes(query.toLowerCase())
        )
      ));
    } else {
      setFilteredUsers(users);
    }
    setCurrentPage(1);
  };

  const handleEdit = (id, updatedUser) => {
    const updatedUsers = users.map(user => (user.id === id ? updatedUser : user));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(user => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedRows([]);
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prevSelectedRows =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter(rowId => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleSelectAllRows = (isChecked) => {
    if (isChecked) {
      setSelectedRows(currentUsers.map(user => user.id));
    } else {
      setSelectedRows([]);
    }
  };

  const currentUsers = filteredUsers.slice((currentPage - 1) * 10, currentPage * 10);
  const totalPages = Math.ceil(filteredUsers.length / 10);

  return (
    <div className="app-container">
      <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
      <UserTable
        users={currentUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelectRow={handleSelectRow}
        onSelectAll={handleSelectAllRows}
        selectedRows={selectedRows}
      />
      <button className="delete-selected" onClick={handleDeleteSelected}>Delete Selected</button>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
