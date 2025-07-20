// Global Variables
let employees = [];
let trashedEmployees = [];
let editingId = null;
let currentBonusEmployeeId = null;

// DOM Elements - Demonstrating different selectors
const form = document.getElementById('employeeForm'); // getElementById
const nameInput = document.querySelector('#name'); // querySelector
const roleInput = document.querySelector('#role');
const salaryInput = document.querySelector('#salary');
const statusSelect = document.querySelector('#status');
const employeeTableBody = document.getElementsByTagName('tbody')[0]; // getElementsByTagName
const trashTableBody = document.getElementsByTagName('tbody')[1];
const toggleTrashBtn = document.querySelector('#toggleTrash');
const mainList = document.querySelector('#mainList');
const trashList = document.querySelector('#trashList');
const errorElements = document.getElementsByClassName('error'); // getElementsByClassName

// Search and Filter Elements
const searchNameInput = document.querySelector('#searchName');
const filterRoleInput = document.querySelector('#filterRole');
const filterStatusSelect = document.querySelector('#filterStatus');
const minSalaryInput = document.querySelector('#minSalary');
const maxSalaryInput = document.querySelector('#maxSalary');
const minBonusInput = document.querySelector('#minBonus');
const maxBonusInput = document.querySelector('#maxBonus');
const clearFiltersBtn = document.querySelector('#clearFilters');
const deleteLowSalaryBtn = document.querySelector('#deleteLowSalary');

// Payroll Summary Elements
const totalPayrollSpan = document.querySelector('#totalPayroll');
const totalEmployeesSpan = document.querySelector('#totalEmployees');
const highEarnersSpan = document.querySelector('#highEarners');

// Modal Elements
const bonusModal = document.querySelector('#bonusModal');
const bonusEmployeeName = document.querySelector('#bonusEmployeeName');
const bonusEmployeeSalary = document.querySelector('#bonusEmployeeSalary');
const bonusPercentageInput = document.querySelector('#bonusPercentage');
const bonusAmountSpan = document.querySelector('#bonusAmount');
const totalWithBonusSpan = document.querySelector('#totalWithBonus');
const applyBonusBtn = document.querySelector('#applyBonus');
const cancelBonusBtn = document.querySelector('#cancelBonus');
const closeModalBtn = document.querySelector('.close');

// Regular Expressions for Validation
const nameRegex = /^[a-zA-Z\s]{2,50}$/;
const roleRegex = /^[a-zA-Z\s]{2,50}$/;
const salaryRegex = /^\d+(\.\d{1,2})?$/;

// Performance measurement function
function measurePerformance(operation, callback) {
    console.time(operation);
    const result = callback();
    console.timeEnd(operation);
    return result;
}

// Validation Functions
function validateForm() {
    let isValid = true;

    // Clear previous errors using forEach
    Array.from(errorElements).forEach(error => {
        error.textContent = '';
    });

    // Validate Name
    if (!nameRegex.test(nameInput.value.trim())) {
        document.getElementById('nameError').textContent = 'Name must be 2-50 characters, letters and spaces only';
        nameInput.classList.add('error');
        isValid = false;
    } else {
        nameInput.classList.remove('error');
    }

    // Validate Role
    if (!roleRegex.test(roleInput.value.trim())) {
        document.getElementById('roleError').textContent = 'Role must be 2-50 characters, letters and spaces only';
        roleInput.classList.add('error');
        isValid = false;
    } else {
        roleInput.classList.remove('error');
    }

    // Validate Salary
    const salaryValue = salaryInput.value.trim();
    if (!salaryValue || !salaryRegex.test(salaryValue) || parseFloat(salaryValue) < 0) {
        document.getElementById('salaryError').textContent = 'Please enter a valid salary (positive number)';
        salaryInput.classList.add('error');
        isValid = false;
    } else {
        salaryInput.classList.remove('error');
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

// Add Employee Function
function addEmployee(name, role, salary, status) {
    const employee = {
        id: Date.now(),
        name: name.trim(),
        role: role.trim(),
        salary: parseFloat(salary),
        bonus: 0,
        status: status,
        dateAdded: new Date().toLocaleDateString()
    };

    employees.push(employee);
    renderEmployees();
    updatePayrollSummary();
    alert('Employee added successfully!');
}

// Edit Employee Function
function editEmployee(id) {
    // Using find() array method
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        // Demonstrating setAttribute and getAttribute
        nameInput.setAttribute('value', employee.name);
        roleInput.setAttribute('value', employee.role);
        salaryInput.setAttribute('value', employee.salary);
        statusSelect.setAttribute('value', employee.status);

        // Demonstrating getAttribute
        console.log('Current name value:', nameInput.getAttribute('value'));

        nameInput.value = employee.name;
        roleInput.value = employee.role;
        salaryInput.value = employee.salary;
        statusSelect.value = employee.status;

        editingId = id;
        form.querySelector('button').textContent = 'Update Employee';
    }
}

// Update Employee Function
function updateEmployee(id, name, role, salary, status) {
    // Using map() array method to update employee
    employees = employees.map(emp => {
        if (emp.id === id) {
            return {
                ...emp,
                name: name.trim(),
                role: role.trim(),
                salary: parseFloat(salary),
                status: status
            };
        }
        return emp;
    });

    renderEmployees();
    updatePayrollSummary();
    alert('Employee updated successfully!');
}

// Delete Employee (Soft Delete)
function deleteEmployee(id) {
    // Using find() to get employee details
    const employee = employees.find(emp => emp.id === id);
    if (employee && confirm(`Are you sure you want to delete ${employee.name}?`)) {
        // Using filter() to remove from main list
        employees = employees.filter(emp => emp.id !== id);
        trashedEmployees.push(employee);
        renderEmployees();
        renderTrash();
        updatePayrollSummary();
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
        updatePayrollSummary();
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

// Bonus Functions
function openBonusModal(id) {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        currentBonusEmployeeId = id;
        bonusEmployeeName.textContent = employee.name;
        bonusEmployeeSalary.textContent = employee.salary.toLocaleString();
        bonusPercentageInput.value = '';
        bonusAmountSpan.textContent = '0';
        totalWithBonusSpan.textContent = employee.salary.toLocaleString();
        bonusModal.style.display = 'block';
    }
}

function closeBonusModal() {
    bonusModal.style.display = 'none';
    currentBonusEmployeeId = null;
    document.getElementById('bonusError').textContent = '';
}

function calculateBonusPreview() {
    const percentage = parseFloat(bonusPercentageInput.value) || 0;
    const employee = employees.find(emp => emp.id === currentBonusEmployeeId);

    if (employee && percentage >= 0 && percentage <= 100) {
        const bonusAmount = (employee.salary * percentage) / 100;
        const totalWithBonus = employee.salary + bonusAmount;

        bonusAmountSpan.textContent = bonusAmount.toLocaleString();
        totalWithBonusSpan.textContent = totalWithBonus.toLocaleString();
        document.getElementById('bonusError').textContent = '';
    } else if (percentage > 100) {
        document.getElementById('bonusError').textContent = 'Bonus percentage cannot exceed 100%';
    } else if (percentage < 0) {
        document.getElementById('bonusError').textContent = 'Bonus percentage cannot be negative';
    }
}

function applyBonus() {
    const percentage = parseFloat(bonusPercentageInput.value);

    if (!percentage || percentage < 0 || percentage > 100) {
        document.getElementById('bonusError').textContent = 'Please enter a valid percentage (0-100)';
        return;
    }

    // Using map() to update employee with bonus
    employees = employees.map(emp => {
        if (emp.id === currentBonusEmployeeId) {
            const bonusAmount = (emp.salary * percentage) / 100;
            return {
                ...emp,
                bonus: bonusAmount
            };
        }
        return emp;
    });

    renderEmployees();
    updatePayrollSummary();
    closeBonusModal();
    alert('Bonus applied successfully!');
}

// Filter and Search Functions
function getFilteredEmployees() {
    return measurePerformance('Filter Employees', () => {
        // Using filter() method with multiple conditions
        return employees.filter(employee => {
            // Name search
            const nameMatch = !searchNameInput.value ||
                employee.name.toLowerCase().includes(searchNameInput.value.toLowerCase());

            // Role filter
            const roleMatch = !filterRoleInput.value ||
                employee.role.toLowerCase().includes(filterRoleInput.value.toLowerCase());

            // Status filter
            const statusMatch = !filterStatusSelect.value ||
                employee.status === filterStatusSelect.value;

            // Salary range filter
            const minSalary = parseFloat(minSalaryInput.value) || 0;
            const maxSalary = parseFloat(maxSalaryInput.value) || Infinity;
            const salaryMatch = employee.salary >= minSalary && employee.salary <= maxSalary;

            // Bonus range filter
            const minBonus = parseFloat(minBonusInput.value) || 0;
            const maxBonus = parseFloat(maxBonusInput.value) || Infinity;
            const bonusMatch = employee.bonus >= minBonus && employee.bonus <= maxBonus;

            return nameMatch && roleMatch && statusMatch && salaryMatch && bonusMatch;
        });
    });
}

function clearFilters() {
    searchNameInput.value = '';
    filterRoleInput.value = '';
    filterStatusSelect.value = '';
    minSalaryInput.value = '';
    maxSalaryInput.value = '';
    minBonusInput.value = '';
    maxBonusInput.value = '';
    renderEmployees();
}

function deleteLowSalaryEmployees() {
    const threshold = 20000;
    // Using filter() to find low salary employees
    const lowSalaryEmployees = employees.filter(emp => emp.salary <= threshold);

    if (lowSalaryEmployees.length === 0) {
        alert('No employees found with salary ≤ $20,000');
        return;
    }

    const employeeNames = lowSalaryEmployees.map(emp => emp.name).join(', ');
    if (confirm(`Delete ${lowSalaryEmployees.length} employee(s) with salary ≤ $20,000?\n\nEmployees: ${employeeNames}`)) {
        // Move to trash
        trashedEmployees.push(...lowSalaryEmployees);
        // Remove from main list using filter()
        employees = employees.filter(emp => emp.salary > threshold);

        renderEmployees();
        renderTrash();
        updatePayrollSummary();
        alert(`${lowSalaryEmployees.length} employee(s) moved to trash`);
    }
}

// Payroll Management Functions
function updatePayrollSummary() {
    measurePerformance('Update Payroll Summary', () => {
        // Using reduce() to calculate total payroll
        const totalPayroll = employees.reduce((total, emp) => total + emp.salary + emp.bonus, 0);

        // Using filter() to count high earners
        const highEarnersCount = employees.filter(emp => emp.salary >= 100000).length;

        totalPayrollSpan.textContent = `$${totalPayroll.toLocaleString()}`;
        totalEmployeesSpan.textContent = employees.length;
        highEarnersSpan.textContent = highEarnersCount;
    });
}

// Render Functions
function renderEmployees() {
    return measurePerformance('Render Employees', () => {
        const filteredEmployees = getFilteredEmployees();

        // Using innerHTML to clear content
        employeeTableBody.innerHTML = '';

        if (filteredEmployees.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.setAttribute('colspan', '6');
            cell.textContent = 'No employees found'; // Using textContent
            cell.style.textAlign = 'center';
            cell.style.padding = '30px';
            cell.style.color = '#6c757d';
            row.appendChild(cell);
            employeeTableBody.appendChild(row);
            return;
        }

        // Using forEach() to render each employee
        filteredEmployees.forEach(employee => {
            const row = document.createElement('tr');

            // Create employee name with badges
            const nameCell = document.createElement('td');
            const nameContainer = document.createElement('div');
            nameContainer.className = 'employee-name';

            const nameSpan = document.createElement('span');
            nameSpan.textContent = employee.name;
            nameContainer.appendChild(nameSpan);

            // High salary badge
            if (employee.salary >= 100000) {
                const highSalaryBadge = document.createElement('span');
                highSalaryBadge.className = 'badge high-salary';
                highSalaryBadge.textContent = 'High';
                nameContainer.appendChild(highSalaryBadge);
            }

            // Bonus badge
            if (employee.bonus > 0) {
                const bonusBadge = document.createElement('span');
                bonusBadge.className = 'badge has-bonus';
                bonusBadge.textContent = 'Bonus';
                nameContainer.appendChild(bonusBadge);
            }

            nameCell.appendChild(nameContainer);

            // Using innerHTML for complex content
            row.innerHTML = `
                <td></td>
                <td>${employee.role}</td>
                <td class="salary">$${employee.salary.toLocaleString()}</td>
                <td class="bonus ${employee.bonus === 0 ? 'zero' : ''}">$${employee.bonus.toLocaleString()}</td>
                <td><span class="status ${employee.status.toLowerCase().replace(' ', '-')}">${employee.status}</span></td>
                <td>
                    <button class="action-btn edit-btn" onclick="editEmployee(${employee.id})">Edit</button>
                    <button class="action-btn bonus-btn" onclick="openBonusModal(${employee.id})">Bonus</button>
                    <button class="action-btn delete-btn" onclick="deleteEmployee(${employee.id})">Delete</button>
                </td>
            `;

            // Replace the first cell with our name cell
            row.replaceChild(nameCell, row.firstElementChild);
            employeeTableBody.appendChild(row);
        });
    });
}

function renderTrash() {
    trashTableBody.innerHTML = '';

    if (trashedEmployees.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.setAttribute('colspan', '6');
        cell.textContent = 'Trash is empty';
        cell.style.textAlign = 'center';
        cell.style.padding = '30px';
        cell.style.color = '#6c757d';
        row.appendChild(cell);
        trashTableBody.appendChild(row);
        return;
    }

    // Using forEach() to render trash items
    trashedEmployees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.role}</td>
            <td class="salary">$${employee.salary.toLocaleString()}</td>
            <td class="bonus">$${employee.bonus.toLocaleString()}</td>
            <td><span class="status ${employee.status.toLowerCase().replace(' ', '-')}">${employee.status}</span></td>
            <td>
                <button class="action-btn restore-btn" onclick="restoreEmployee(${employee.id})">Restore</button>
                <button class="action-btn permanent-delete-btn" onclick="permanentDelete(${employee.id})">Delete Forever</button>
            </td>
        `;
        trashTableBody.appendChild(row);
    });
}

// Toggle Trash View
function toggleTrash() {
    if (trashList.style.display === 'none') {
        trashList.style.display = 'block';
        mainList.style.display = 'none';
        toggleTrashBtn.textContent = 'Show Employees';
        renderTrash();
    } else {
        trashList.style.display = 'none';
        mainList.style.display = 'block';
        toggleTrashBtn.textContent = 'Show Trash';
    }
}

// Demonstrate text content differences
function demonstrateTextMethods() {
    console.log('=== Text Content Methods Demo ===');
    const testDiv = document.createElement('div');
    testDiv.innerHTML = '<strong>Bold</strong> text with <em>emphasis</em>';

    console.log('innerHTML:', testDiv.innerHTML); // Returns: <strong>Bold</strong> text with <em>emphasis</em>
    console.log('textContent:', testDiv.textContent); // Returns: Bold text with emphasis
    console.log('innerText:', testDiv.innerText); // Returns: Bold text with emphasis (visible text)
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
    const salary = salaryInput.value;
    const status = statusSelect.value;

    if (editingId) {
        updateEmployee(editingId, name, role, salary, status);
        editingId = null;
        form.querySelector('button').textContent = 'Add Employee';
    } else {
        addEmployee(name, role, salary, status);
    }

    form.reset();
});

// Search and Filter Event Listeners
searchNameInput.addEventListener('input', renderEmployees);
filterRoleInput.addEventListener('input', renderEmployees);
filterStatusSelect.addEventListener('change', renderEmployees);
minSalaryInput.addEventListener('input', renderEmployees);
maxSalaryInput.addEventListener('input', renderEmployees);
minBonusInput.addEventListener('input', renderEmployees);
maxBonusInput.addEventListener('input', renderEmployees);

// Button Event Listeners
toggleTrashBtn.addEventListener('click', toggleTrash);
clearFiltersBtn.addEventListener('click', clearFilters);
deleteLowSalaryBtn.addEventListener('click', deleteLowSalaryEmployees);

// Modal Event Listeners
bonusPercentageInput.addEventListener('input', calculateBonusPreview);
applyBonusBtn.addEventListener('click', applyBonus);
cancelBonusBtn.addEventListener('click', closeBonusModal);
closeModalBtn.addEventListener('click', closeBonusModal);

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === bonusModal) {
        closeBonusModal();
    }
});

// Initialize with sample data
function initializeApp() {
    console.log('Enhanced Employee Management System');

    // Add sample employees with salaries


    // Using forEach() to add sample data
    sampleEmployees.forEach((emp, index) => {
        employees.push({
            id: Date.now() + index,
            name: emp.name,
            role: emp.role,
            salary: emp.salary,
            bonus: 0,
            status: emp.status,
            dateAdded: new Date().toLocaleDateString()
        });
    });

    renderEmployees();
    updatePayrollSummary();
    demonstrateTextMethods();

    console.log('App initialized with sample data');
    console.log('Array methods used: filter(), map(), reduce(), find(), forEach()');
}

// Start the application
document.addEventListener('DOMContentLoaded', initializeApp);