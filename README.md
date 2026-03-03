**Student Management System (Full Stack)**
**Overview**

The Student Management System is a full-stack web application developed to manage student records efficiently. It allows users to add, update, delete, and view student details through a clean and dynamic user interface integrated with a MySQL database.

This project demonstrates complete frontend–backend integration using RESTful APIs and real-time database synchronization.


**Features**

- Add new student records
- Update existing student details (with SID validation)
- Delete student records with proper existence check
- View all students in a dynamically updated table
- Validation for missing fields
- Proper error handling (Student not found / Duplicate ID)
- Automatic UI refresh after CRUD operations


**Tech Stack**

**Frontend**
- HTML5
- CSS3
- JavaScript (ES6)
- Fetch API
- DOM Manipulation

**Backend**
- Node.js
- Express.js
- RESTful APIs

**Database**
- MySQL
- MySQL Workbench
- mysql2 package


**Architecture**

The project follows a Client–Server Architecture:
- User interacts with the frontend UI.
- JavaScript sends HTTP requests to Express backend.
- Backend processes requests and interacts with MySQL.
- Server sends JSON responses.
- UI updates dynamically based on response.
