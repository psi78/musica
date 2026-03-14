function goToLogin() {
    document.getElementById('landing-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
}

function goBack() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('landing-screen').classList.remove('hidden');
}

function togglePassword() {
    const pw = document.getElementById('passwordField');
    pw.type = pw.type === 'password' ? 'text' : 'password';
}

function handleLogin() {
    const btnText = document.getElementById('btnText');
    const spinner = document.getElementById('spinner');
    const loginBtn = document.getElementById('loginBtn');
    const loginForm = document.getElementById('loginForm');

    // Start loading state
    btnText.classList.add('hidden');
    spinner.classList.remove('hidden');
    loginBtn.style.pointerEvents = 'none';

    // Fake a server delay for "polish"
    setTimeout(() => {
        // Submit the form to the backend
        loginForm.submit();
    }, 1800);
}
