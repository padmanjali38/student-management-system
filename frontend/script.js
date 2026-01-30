const BASE_URL = "http://localhost:5000";
window.onload = loadStudents;

function showMessage(text, isError = false) {
    const msg = document.getElementById("msg");
    msg.innerText = text;
    msg.style.color = isError ? "red" : "green";
}

// Load table
function loadStudents() {
    fetch(`${BASE_URL}/get-all-students`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("studentTableBody");
            tbody.innerHTML = "";

            data.forEach(s => {
                tbody.innerHTML += `
                    <tr>
                        <td>${s.sid}</td>
                        <td>${s.name}</td>
                        <td>${s.phone}</td>
                        <td>${s.email}</td>
                        <td>${s.course}</td>
                        <td>${s.branch}</td>
                    </tr>`;
            });
        });
}

// ADD
function showAddForm() {
    document.getElementById("formContainer").innerHTML = `
        <form>
            <h3>Add Student</h3>

            <input type="number" id="sid" placeholder="Student ID" required>
            <input type="text" id="name" placeholder="Name" required>
            <input type="text" id="phone" placeholder="Phone" required>
            <input type="email" id="email" placeholder="Email" required>
            <input type="text" id="course" placeholder="Course" required>
            <input type="text" id="branch" placeholder="Branch" required>

            <button type="button" onclick="addStudent()">Add</button>
        </form>
    `;
}


function addStudent() {
    const student = {
        sid: document.getElementById("sid").value.trim(),
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        email: document.getElementById("email").value.trim(),
        course: document.getElementById("course").value.trim(),
        branch: document.getElementById("branch").value.trim()
    };

    fetch(`${BASE_URL}/add-student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    })
    .then(res => res.json())
    .then(data => {
        showMessage(data.message);
        loadStudents();
        document.getElementById("formContainer").innerHTML = "";
    });
}


// DELETE
function showDeleteForm() {
    formContainer.innerHTML = `
        <form>
            <input id="delSid" placeholder="SID">
            <button type="button" onclick="deleteStudent()">Delete</button>
        </form>`;
}

function deleteStudent() {
    fetch(`${BASE_URL}/delete-student/${delSid.value}`, { method: "DELETE" })
    .then(res => res.json())
    .then(d => {
        showMessage(d.message, d.message.includes("❌"));
        loadStudents();
        formContainer.innerHTML = "";
    });
}

// UPDATE FLOW
function showUpdateForm() {
    formContainer.innerHTML = `
        <form>
            <input id="searchSid" placeholder="Enter SID">
            <button type="button" onclick="fetchStudent()">Search</button>
        </form>`;
}

function fetchStudent() {
    fetch(`${BASE_URL}/get-student/${searchSid.value}`)
    .then(res => res.json())
    .then(d => {
        if (d.message) {
            showMessage(d.message, true);
            return;
        }

        formContainer.innerHTML = `
            <form>
                <input id="uName" value="${d.name}">
                <input id="uPhone" value="${d.phone}">
                <input id="uEmail" value="${d.email}">
                <input id="uCourse" value="${d.course}">
                <input id="uBranch" value="${d.branch}">
                <button type="button" onclick="updateStudent(${d.sid})">Update</button>
            </form>`;
    });
}

function updateStudent(sid) {
    fetch(`${BASE_URL}/update-student/${sid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: uName.value,
            phone: uPhone.value,
            email: uEmail.value,
            course: uCourse.value,
            branch: uBranch.value
        })
    })
    .then(res => res.json())
    .then(d => {
        showMessage(d.message, d.message.includes("❌"));
        loadStudents();
        formContainer.innerHTML = "";
    });
}
