# rbr-digital-employee-dashboard

RBR Digital Employee Dashboard

## Backend
### RFs (Requisitos funcionais)
- [] Implement the GET /api/employees endpoint to retrieve all employees.
- [] Implement the GET /api/employees/:id endpoint to retrieve a single employee by ID.
- [] Implement the POST /api/employees endpoint to create a new employee.
- [] Implement the PUT /api/employees/:id endpoint to update an employee by ID.
- [] Implement the DELETE /api/employees/:id endpoint to delete an employee by ID.

### RNs (Regras de negócio)
- [] Validate employee data before saving to the database.
- [] Return appropriate HTTP status codes for success and error scenarios.

### RNFs (Requisitos não-funcionais)
- [] Use TypeScript for type safety.
- [] Ensure the database connection is established using Mongoose.
- [] Handle errors appropriately and log them.

## Frontend
### RFs (Requisitos funcionais)
- [] Display a table of employees with columns for name, position, department, and actions (edit/delete).
- [] Include a button to add a new employee.
- [] Implement sorting and search functionality in the employee list.
- [] Create a form to add a new employee with fields for name, position, department, and hire date.
- [] Create a form to edit an existing employee's details with pre-filled current details.
- [] Validate the form fields before submission.

### RNs (Regras de negócio)
- [] Ensure form validation before submitting data to the backend.
- [] Ensure the application is responsive.

### RNFs (Requisitos não-funcionais)
- [] Use TypeScript for type safety.
- [] Use Chakra UI for styling and UI components.
- [] Ensure the application is responsive and works well on various screen sizes.
- [] Write tests to cover the main functionalities using Vitest.