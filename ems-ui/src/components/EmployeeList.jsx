import React from 'react';
import PropTypes from 'prop-types';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.department.name}</td>
              <td>
                <button onClick={() => onEdit(employee)}>Edit</button>
                <button onClick={() => onDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

EmployeeList.propTypes = {
  employee: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      department: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string
      }),
  }),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EmployeeList;