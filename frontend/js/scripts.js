
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
                window.location.href =
                    result.role === 'admin'
                        ? 'admin_dashboard.html'
                        : 'fleet_dashboard.html';
            } else {
                alert(result.message || 'Login failed');
            }
        });
    }

    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            const response = await fetch('../backend/logout.php');
            const result = await response.json();
            if (result.success) {
                window.location.href = 'index.html';
            }
        });
    }

    const dashboardData = document.getElementById('dashboardData');
    if (dashboardData) {
        fetch('../backend/admin_dashboard_data.php')
            .then((response) => response.json())
            .then((data) => {
                dashboardData.innerHTML = `
                    <p>Total Fleets: ${data.total_fleets}</p>
                    <p>Active Fleets: ${data.active_fleets}</p>
                    <p>Inactive Fleets: ${data.inactive_fleets}</p>
                `;
            })
            .catch(() => {
                dashboardData.innerHTML = '<p>Error loading data</p>';
            });
    }

    const fleetData = document.getElementById('fleetData');
    if (fleetData) {
        fetch('../backend/fleet_dashboard_data.php')
            .then((response)=> response.json())
            .then((data) => {
                fleetData.innerHTML = `
                <h4>Fleet ID : ${data.id}</h4>
                <p>tugas aktif : ${data.tugas_aktif}</p>
                <p>tugas selesai : ${data.tugas_selesai}</p>
                <h5>tugas terkini :</h5>
                <ul>${data.recent_task.map((aktivitas) => `<li>${aktivitas}</li>`).join('')} </ul>
                `;
            })
            .catch(() => {
                fleetData.innerHTML = '<p>Error loading data</p>';
            });
    }
});