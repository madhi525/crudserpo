document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('../backend/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const result = await response.json();

            if (result.success) {
                localStorage.setItem('token', JSON.stringify(result.token)); // Menyimpan token ke localStorage
                localStorage.setItem('role', JSON.stringify(result.role));
                window.location.href = 'dashboard.html'
            } else {
                alert(result.message || 'Login failed');
            }
        });
    }
});
