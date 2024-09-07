document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = new Date(document.getElementById('dob').value);
    const termsAccepted = document.getElementById('terms').checked;

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

    const userData = { name, email, password, dob: dob.toISOString().split('T')[0], termsAccepted };
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));


    const tableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent = email;
    row.insertCell(2).textContent = password;
    row.insertCell(3).textContent = userData.dob;
    row.insertCell(4).textContent = termsAccepted ? 'Yes' : 'No';
});
