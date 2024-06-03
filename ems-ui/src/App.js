import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import SearchBar from './components/SearchBar';

import api from './api/emsApi';

function App() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const employees = await api.getEmployees();
      setEmployees(employees);
    };

    const fetchDepartments = async () => {
      const departments = await api.getDepartments();
      setDepartments(departments);
    };

    fetchEmployees();
    fetchDepartments();
  }, []);

  const handleAddEmployee = async (employee) => {
    const newEmployee = await api.addEmployee(employee);

    if (newEmployee) {
      setEmployees([...employees, newEmployee]);
      setSelectedEmployee(null);
    }
  };

  const handleEditEmployee = async (employee) => {
    const updatedEmployee = await api.editEmployee(employee);
    if (updatedEmployee) {
      const updatedEmployees = employees.map((emp) => (emp.id === employee.id ? updatedEmployee : emp));
      setEmployees(updatedEmployees);
      setSelectedEmployee(null);
    }
  };

  const handleDeleteEmployee = async (id) => {
    await api.deleteEmployee(id);
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleSearch = async (searchText) => {
    setSelectedEmployee(null);
    const searchedEmployees = await api.searchEmployees(searchText);
    if (searchedEmployees) {
      setEmployees(searchedEmployees);
    }
  };

  return (
    <div className="App">
      <h1>EMS</h1>
      <SearchBar onSearch={handleSearch} />
      <h2>Employees</h2>
      {employees?.length > 0 ? <EmployeeList
        employees={employees}
        onEdit={setSelectedEmployee}
        onDelete={handleDeleteEmployee}
        onSearch={handleSearch}
      /> : <p>No Employees found!</p>}
      <button onClick={() => setSelectedEmployee({})}>Add Employee</button>
      {selectedEmployee && (
        <EmployeeForm
          key={selectedEmployee?.id}
          employee={selectedEmployee}
          departments={departments}
          onAdd={selectedEmployee.id ? handleEditEmployee : handleAddEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}

export default App;
