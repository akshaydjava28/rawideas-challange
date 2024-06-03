package com.rawideas.ems.service;

import com.rawideas.ems.dto.EmployeeDto;
import com.rawideas.ems.exception.ResourceNotFoundException;
import com.rawideas.ems.model.Department;
import com.rawideas.ems.model.Employee;
import com.rawideas.ems.repo.EmployeeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private DepartmentService departmentService;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", id));
    }

    public List<Employee> findByNameContaining(String name) {
        return employeeRepository.findAllByNameContainingIgnoreCase(name);
    }

    @Transactional
    public Employee createEmployee(EmployeeDto employeeDto) {
        Long deptId = employeeDto.getDepartmentId();
        Department department = departmentService.getDepartmentById(deptId); // Retrieve department
        if (department == null) {
            new ResourceNotFoundException("Department", "id", deptId);
        }

        Employee employee = new Employee();
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        employee.setDepartment(department);
        employee.setCreated(LocalDateTime.now());

        return employeeRepository.save(employee);
    }

    @Transactional
    public Employee updateEmployee(Long id, EmployeeDto employeeDto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", id));

        // Update employee fields
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());

        Long deptId = employeeDto.getDepartmentId();

        if (deptId != employee.getDepartment().getId()) {
            Department department = departmentService.getDepartmentById(deptId); // Retrieve department
            if (department == null) {
                new ResourceNotFoundException("Department", "id", deptId);
            }
            employee.setDepartment(department);
        }

        return employeeRepository.save(employee);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", id));

        employeeRepository.delete(employee);
    }
}
