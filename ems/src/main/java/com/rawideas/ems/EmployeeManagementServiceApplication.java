package com.rawideas.ems;

import com.rawideas.ems.model.Department;
import com.rawideas.ems.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeeManagementServiceApplication implements CommandLineRunner {

	@Autowired
	private DepartmentService departmentService;

	public static void main(String[] args) {
		SpringApplication.run(EmployeeManagementServiceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Department dept1 = new Department();
		dept1.setName("Engineering");
		departmentService.createDepartment(dept1);
		dept1 = new Department();
		dept1.setName("Sales");
		departmentService.createDepartment(dept1);
	}
}
