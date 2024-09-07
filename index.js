document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = new Date(document.getElementById('dob').value);
    const termsAccepted = document.getElementById('terms').checked;

    // Validate email
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Age validation
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const isBeforeBirthday = monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate());
    const validAge = age > 18 && age < 55;

    if (!validAge || isBeforeBirthday) {
        alert('You must be between 18 and 55 years old.');
        return;
    }

    if (!termsAccepted) {
        alert('You must accept the terms.');
        return;
    }

    // Save data to web storage
    const userData = { name, email, password, dob: dob.toISOString().split('T')[0], termsAccepted };
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    // Update table
    updateTable();
    document.getElementById('registrationForm').reset();
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function updateTable() {
    const tableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing table rows

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = user.name;
        row.insertCell(1).textContent = user.email;
        row.insertCell(2).textContent = user.password;
        row.insertCell(3).textContent = user.dob;
        row.insertCell(4).textContent = user.termsAccepted ? 'Yes' : 'No';
    });
}

function loadUsers() {
    updateTable();
}
