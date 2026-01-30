const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Padmanjali@2006',
    database: 'student_management',
    port: 3306
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('❌ Database Connection Failed:', err);
        return;
    }
    console.log('✅ Connected to MySQL Database');
});

// Home route
app.get('/', (req, res) => {
    res.send('Student Management Backend is Running 🚀');
});

// ✅ Add Student
app.post('/add-student', (req, res) => {
    const { sid, name, phone, email, course, branch } = req.body;

    if (!sid || !name || !phone || !email || !course || !branch) {
        return res.json({ message: '❌ All fields are required' });
    }

    const sql =
        'INSERT INTO students (sid, name, phone, email, course, branch) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [sid, name, phone, email, course, branch], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.json({ message: '❌ Student ID already exists' });
            }
            return res.json({ message: '❌ Database error' });
        }

        res.json({ message: '✅ Student added successfully' });
    });
});


// ✅ Get Student by SID
app.get('/get-student/:id', (req, res) => {
    const sql = 'SELECT * FROM students WHERE sid = ?';

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json({ message: '❌ Error occurred' });
        if (result.length === 0) return res.json({ message: '❌ Student not found' });

        res.json(result[0]);
    });
});

// ✅ Update Student
app.put('/update-student/:id', (req, res) => {
    const { name, phone, email, course, branch } = req.body;

    const sql =
        'UPDATE students SET name=?, phone=?, email=?, course=?, branch=? WHERE sid=?';

    db.query(sql, [name, phone, email, course, branch, req.params.id], (err, result) => {
        if (err) return res.json({ message: '❌ Error occurred' });
        if (result.affectedRows === 0)
            return res.json({ message: '❌ Student not found' });

        res.json({ message: '✅ Student updated successfully' });
    });
});

// ✅ Delete Student
app.delete('/delete-student/:id', (req, res) => {
    const sql = 'DELETE FROM students WHERE sid = ?';

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json({ message: '❌ Error occurred' });
        if (result.affectedRows === 0)
            return res.json({ message: '❌ Student not found' });

        res.json({ message: '✅ Student deleted successfully' });
    });
});

// ✅ Get All Students
app.get('/get-all-students', (req, res) => {
    db.query('SELECT * FROM students', (err, result) => {
        if (err) return res.json([]);
        res.json(result);
    });
});

// Start server
app.listen(5000, () => {
    console.log('🚀 Server running on http://localhost:5000');
});
