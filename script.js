
document.getElementById('form-open').addEventListener('click', () => {
    document.querySelector('.form_container').classList.toggle('show');
});

document.querySelector('.form_close').addEventListener('click', () => {
    document.querySelector('.form_container').classList.remove('show');
});

document.getElementById('signup').addEventListener('click', () => {
    document.querySelector('.login_form').style.display = 'none';
    document.querySelector('.signup_form').style.display = 'block';
});

document.getElementById('login').addEventListener('click', () => {
    document.querySelector('.signup_form').style.display = 'none';
    document.querySelector('.login_form').style.display = 'block';
});

// Handle login form submission
document.querySelector('.login_form form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[placeholder="Enter your Email"]').value;
    const password = e.target.querySelector('input[placeholder="Enter your Password"]').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert('Login successful!');
        window.location.href = 'main.html'; // Redirect to main page
    } else {
        alert('Invalid credentials');
    }
});

// Handle signup form submission
document.querySelector('.signup_form form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[placeholder="Enter your Email"]').value;
    const password = e.target.querySelector('input[placeholder="Create Password"]').value;

    localStorage.setItem('user', JSON.stringify({ email, password }));
    alert('Signup successful!');
    document.querySelector('.signup_form').style.display = 'none';
    document.querySelector('.login_form').style.display = 'block';
    // Optionally, you can automatically log in the user after signup
    window.location.href = 'main.html'; // Redirect to main page
});
