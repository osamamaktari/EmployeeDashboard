# Simple Employee Management System

A clean and simple Employee Management CRUD application built with pure JavaScript and DOM manipulation.

## 🚀 Features

### Core CRUD Operations
- **Create**: Add new employees with form validation
- **Read**: Display employees in a clean table format
- **Update**: Edit employee information using prompt dialogs
- **Delete**: Soft delete (move to trash) and permanent delete options

### Form Validation
- **Name**: 2-50 characters, letters and spaces only (using regex)
- **Role**: 2-50 characters, letters and spaces only (using regex)
- **Status**: Required dropdown selection (Active, On Leave, Terminated)
- **Error Messages**: Clear validation feedback

### Additional Features
- **Trash Management**: View and restore deleted employees
- **Status Badges**: Color-coded employee status indicators
- **Responsive Design**: Works on desktop and mobile devices
- **Sample Data**: Pre-loaded with demo employees

## 🛠 Technical Implementation

### DOM Selectors Used
1. **getElementById()** - Access specific elements by ID
2. **querySelector()** - Select elements using CSS selectors
3. **getElementsByTagName()** - Access elements by tag name
4. **getElementsByClassName()** - Access elements by class name

### Text Content Methods
- **innerHTML** - Set/get HTML content including tags
- **textContent** - Set/get text content without HTML tags
- **innerText** - Set/get visible text content

### Attribute Manipulation
- **setAttribute()** - Set element attributes dynamically
- **getAttribute()** - Retrieve element attribute values

### Performance Monitoring
- **console.time()** and **console.timeEnd()** - Measure operation performance

### User Interaction
- **alert()** - Success and error notifications
- **confirm()** - Delete confirmation dialogs
- **prompt()** - Can be used for quick edits (implemented via form)

## 📁 File Structure

```
simple-employee-app/
├── index.html          # Clean HTML structure
├── style.css           # Simple, responsive styling
├── script.js           # Lightweight JavaScript functionality
└── README.md           # Project documentation
```

## 🎨 Design Features

- **Modern Gradient Background**: Purple gradient for visual appeal
- **Clean Card Layout**: White container with rounded corners and shadows
- **Responsive Tables**: Mobile-friendly table design
- **Status Badges**: Color-coded status indicators
- **Hover Effects**: Interactive button and row hover states
- **Professional Typography**: Clean, readable fonts

## 🚀 Getting Started

1. Open `index.html` in any modern web browser
2. Start managing employees immediately
3. No installation or setup required

## 📊 Sample Data

The app comes with pre-loaded sample employees:
- John Smith - Developer (Active)
- Jane Doe - Designer (On Leave)
- Bob Johnson - Manager (Active)

## ✅ Requirements Met

### Form Structure & Validation
- ✅ Name, Role, Status fields (all required)
- ✅ Regular expression validation
- ✅ Error messages with visual styling
- ✅ "Add Employee" button

### Main List Display
- ✅ Employee table with Name, Role, Status columns
- ✅ Dynamic status badges with color coding
- ✅ Edit and Delete action buttons

### Trash Bin Section
- ✅ Hidden by default, toggled by "Show Trash" button
- ✅ Restore and Permanently Delete options
- ✅ Separate view for deleted employees

### Technical Requirements
- ✅ 4+ different DOM selectors demonstrated
- ✅ setAttribute() and getAttribute() usage
- ✅ innerHTML, textContent, innerText correctly used
- ✅ console.time() performance measurement
- ✅ alert() and confirm() for user interaction

### UI/UX Requirements
- ✅ Responsive design with Flexbox
- ✅ Consistent spacing and professional layout
- ✅ Good readability and intuitive structure
- ✅ Semantic HTML structure

## 🔧 Code Highlights

- **Minimal Code**: Clean, readable, and maintainable
- **No External Dependencies**: Pure HTML, CSS, and JavaScript
- **Modern ES6+**: Arrow functions, template literals, destructuring
- **Performance Optimized**: Efficient DOM manipulation
- **Error Handling**: Comprehensive form validation
- **User-Friendly**: Clear feedback and intuitive interface

---

**Built with simplicity in mind using Pure JavaScript, HTML5, and CSS3**

