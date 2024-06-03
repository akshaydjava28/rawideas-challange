import axios from 'axios';

const baseUrl = 'http://localhost:8080';

const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/api/employees/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const getEmployees = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/employees`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const searchEmployees = async (searchText) => {
  try {
    const response = await axios.get(`${baseUrl}/api/employees`, {
      params: {
        name: searchText,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const getDepartments = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/departments`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const addEmployee = async (employee) => {
  try {
    const response = await axios.post(`${baseUrl}/api/employees`, employee);
    alert("Employee Added");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const editEmployee = async (employee) => {
  try {
    const response = await axios.put(`${baseUrl}/api/employees/${employee.id}`, employee);
    alert("Employee Updated");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${baseUrl}/api/employees/${id}`);
    alert("Employee Deleted");
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    let errorMessage = '';
    if (data.errors) {
      errorMessage = data.errors.join('\n'); // Join all error messages
    } else if (data.message) {
      errorMessage = data.message;
    } else {
      errorMessage = `Error: ${status}`;
    }
    alert(errorMessage);
  } else if (error.request) {
    alert('Error communicating with the server.');
  } else {
    alert('An error occurred while setting up the request.');
  }
};
// eslint-disable-next-line
export default {
  getEmployees,
  searchEmployees,
  getEmployeeById,
  getDepartments,
  addEmployee,
  editEmployee,
  deleteEmployee,
};
