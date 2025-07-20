// Global Variables
let employees = [];
let trashedEmployees = [];
let editingId = null;

// DOM Elements Demonstrating different selectors
const form = document.getElementById('employeeForm'); // getElementById
const nameInput = document.querySelector('#name'); // querySelector
const roleInput = document.querySelector('#role');
const statusSelect = document.querySelector('#status');
const employeeTableBody = document.getElementsByTagName('tbody')[0]; // getElementsByTagName
const trashTableBody = document.getElementsByTagName('tbody')[1];
const toggleTrashBtn = document.querySelector('#toggleTrash');
const empInfo = document.querySelector('#empInfo');
const trashList = document.querySelector('#trashList');
const errorElements = document.getElementsByClassName('error'); // getElementsByClassName

// Regular Expressions for Validation letter format and 
const nameRegex = /^[a-zA-Z\s]{2,40}$/;
const roleRegex = /^[a-zA-Z\s]{2,40}$/;

// Validation Functions
function validateForm() {
    let isValid = true;

    // Clear previous errors
    for (let error of errorElements) {
        error.textContent = '';
    }

    // Validate Name
    if (!nameRegex.test(nameInput.value.trim())) {
        document.getElementById('nameError').textContent = 'Name must be 2-to-40 characters, letters only';
        nameInput.classList.add('error');
        isValid = false;
    } else {
        nameInput.classList.remove('error');
    }

    // Validate Role
    if (!roleRegex.test(roleInput.value.trim())) {
        document.getElementById('roleError').textContent = 'Role must be 2-to-40 characters, letters only';
        roleInput.classList.add('error');
        isValid = false;
    } else {
        roleInput.classList.remove('error');
    }

    // Validate Status
    if (!statusSelect.value) {
        document.getElementById('statusError').textContent = 'Please select a status';
        statusSelect.classList.add('error');
        isValid = false;
    } else {
        statusSelect.classList.remove('error');
    }

    return isValid;
}

// Performance measurement
function measurePerformance(operation, callback) {
    console.time(operation);
    const result = callback();
    console.timeEnd(operation);
    return result;
}

// Add Employee Function
function addEmployee(name, role, status) {
    const employee = {
        id: Date.now(),
        name: name.trim(),
        role: role.trim(),
        status: status
    };

    employees.push(employee);
    renderEmployees();
    alert('Employee added successfully!'); // Using alert as required
}

// Edit Employee Function
function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        // Using setAttribute and getAttribute as required
        nameInput.setAttribute('value', employee.name);
        roleInput.setAttribute('value', employee.role);
        statusSelect.setAttribute('value', employee.status);

        // Demonstrating getAttribute
        console.log('Current name value:', nameInput.getAttribute('value'));

        nameInput.value = employee.name;
        roleInput.value = employee.role;
        statusSelect.value = employee.status;

        editingId = id;
        form.querySelector('button').textContent = 'Update Employee';
    }
}

// Update Employee Function
function updateEmployee(id, name, role, status) {
    const employeeIndex = employees.findIndex(emp => emp.id === id);
    if (employeeIndex !== -1) {
        employees[employeeIndex] = {
            ...employees[employeeIndex],
            name: name.trim(),
            role: role.trim(),
            status: status
        };
        renderEmployees();
        alert('Employee updated successfully!');
    }
}

// Delete Employee (Soft Delete)
function deleteEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (employee && confirm(`Are you sure you want to delete ${employee.name}?`)) {
        employees = employees.filter(emp => emp.id !== id);
        trashedEmployees.push(employee);
        renderEmployees();
        renderTrash();
        alert(`${employee.name} moved to trash`);
    }
}

// Restore Employee
function restoreEmployee(id) {
    const employee = trashedEmployees.find(emp => emp.id === id);
    if (employee) {
        trashedEmployees = trashedEmployees.filter(emp => emp.id !== id);
        employees.push(employee);
        renderEmployees();
        renderTrash();
        alert(`${employee.name} restored successfully!`);
    }
}

// Permanently Delete Employee
function permanentDelete(id) {
    const employee = trashedEmployees.find(emp => emp.id === id);
    if (employee && confirm(`Permanently delete ${employee.name}? This cannot be undone!`)) {
        trashedEmployees = trashedEmployees.filter(emp => emp.id !== id);
        renderTrash();
        alert(`${employee.name} permanently deleted`);
    }
}

// Render Employees Function
function renderEmployees() {
    return measurePerformance('Render Employees', () => {
        // Using innerHTML to set content
        employeeTableBody.innerHTML = '';

        employees.forEach(employee => {
            const row = document.createElement('tr');

            // Demonstrating innerHTML vs textContent vs innerText
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.role}</td>
                <td><span class="status ${employee.status.toLowerCase().replace(' ', '-')}">${employee.status}</span></td>
                <td>
                    <button class="action-btn edit-btn" onclick="editEmployee(${employee.id})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteEmployee(${employee.id})">Delete</button>
                </td>
            `;

            employeeTableBody.appendChild(row);
        });

        // Show empty message if no employees
        if (employees.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.setAttribute('colspan', '4');
            cell.textContent = 'No employees found'; // Using textContent
            cell.style.textAlign = 'center';
            row.appendChild(cell);
            employeeTableBody.appendChild(row);
        }
    });
}

// Render Trash Function
function renderTrash() {
    trashTableBody.innerHTML = '';

    trashedEmployees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.role}</td>
            <td><span class="status ${employee.status.toLowerCase().replace(' ', '-')}">${employee.status}</span></td>
            <td>
                <button class="action-btn restore-btn" onclick="restoreEmployee(${employee.id})">Restore</button>
                <button class="action-btn permanent-delete-btn" onclick="permanentDelete(${employee.id})">Delete Forever</button>
            </td>
        `;
        trashTableBody.appendChild(row);
    });

    if (trashedEmployees.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.setAttribute('colspan', '4');
        cell.textContent = 'Trash is empty';
        cell.style.textAlign = 'center';
        row.appendChild(cell);
        trashTableBody.appendChild(row);
    }
}

// Toggle Trash View
function toggleTrash() {
    if (trashList.style.display === 'none') {
        trashList.style.display = 'block';
        empInfo.style.display = 'none';
        toggleTrashBtn.textContent = 'Show Employees';
        renderTrash();
    } else {
        trashList.style.display = 'none';
        empInfo.style.display = 'block';
        toggleTrashBtn.textContent = 'Show Trash';
    }
}

// Demonstrate text content differences
function demonstrateTextMethods() {
    console.log('=== Text Content Methods Demo ===');
    const testDiv = document.createElement('div');
    testDiv.innerHTML = '<strong>Bold</strong> text';

    console.log('innerHTML:', testDiv.innerHTML); // Returns: <strong>Bold</strong> text
    console.log('textContent:', testDiv.textContent); // Returns: Bold text
    console.log('innerText:', testDiv.innerText); // Returns: Bold text (visible text)
}

// Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateForm()) {
        alert('Please fix the errors in the form');
        return;
    }

    const name = nameInput.value;
    const role = roleInput.value;
    const status = statusSelect.value;

    if (editingId) {
        updateEmployee(editingId, name, role, status);
        editingId = null;
        form.querySelector('button').textContent = 'Add Employee';
    } else {
        addEmployee(name, role, status);
    }

    form.reset();
});

toggleTrashBtn.addEventListener('click', toggleTrash);

// Initialize with sample data
function initializeApp() {
    console.log('Employee Management System');

    renderEmployees();
    demonstrateTextMethods();
}

// Start the application
document.addEventListener('DOMContentLoaded', initializeApp);