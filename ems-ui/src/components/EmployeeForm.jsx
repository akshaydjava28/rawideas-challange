import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EmployeeForm = ({ employee, departments, onAdd, onClose }) => {
    const [firstName, setFirstName] = useState(employee?.firstName || '');
    const [lastName, setLastName] = useState(employee?.lastName || '');
    const [email, setEmail] = useState(employee?.email || '');
    const [departmentId, setDepartmentId] = useState(employee?.department?.id || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEmployee = {
            id: employee.id,
            firstName,
            lastName,
            email,
            departmentId,
        };
        onAdd(newEmployee);
    };

    return (
        <div className="employee-form">
            <h2>{employee.id ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">FirstName</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">LastName</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <select
                        id="department"
                        value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}
                    >
                        <option value="">Select Department</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">
                    Submit
                </button>
                <button type="button" onClick={() => onClose()}>
                    Close
                </button>
            </form>
        </div>);
};

EmployeeForm.propTypes = {
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
    departments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    onAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default EmployeeForm;