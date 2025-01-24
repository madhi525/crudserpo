document.addEventListener('DOMContentLoaded', ()=>{
    const userData = {
        token: JSON.parse(localStorage.getItem('token')),
        role: JSON.parse(localStorage.getItem('role')),
    }
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            const response = await fetch('../backend/logout.php');
            const result = await response.json();
            if (result.success) {
                window.location.href = 'index.html';
                localStorage.clear();
            }
        });
    }
    if (userData.token !== null && userData.role !== null ) {
        const divNav = document.getElementById('judul-container');
        const dataContainer = document.getElementById('data-container');
        if (userData.role === 'admin'){
            fetch('../backend/admin_dashboard_data.php')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    divNav.innerHTML = `Admin Dashboard`;
                    dataContainer.innerHTML = `
                        <p>Total Fleets: ${data.total_fleets}</p>
                        <p>Active Fleets: ${data.active_fleets}</p>
                        <p>Inactive Fleets: ${data.inactive_fleets}</p>
                    `;
                } else {
                    alert(`tidak di izinkan harap login sebagai fleet terlebih dahulu`);
                    window.location.href = 'index.html';
                }
            })
            .catch(() => {
                dataContainer.innerHTML = '<p>Error loading data</p>';
            });
        } else if (userData.role === 'fleet'){
            fetch('../backend/fleet_dashboard_data.php')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    divNav.innerHTML = `Fleet Dashboard`;
                    dataContainer.innerHTML = `
                    <h4>Fleet ID : ${data.id}</h4>
                    <p>tugas aktif : ${data.tugas_aktif}</p>
                    <p>tugas selesai : ${data.tugas_selesai}</p>
                    <h5>tugas terkini :</h5>
                    <ul>${data.recent_task.map((aktivitas) => `<li>${aktivitas}</li>`).join('')} </ul>
                    `;
                } else {
                    alert(`tidak di izinkan harap login sebagai fleet terlebih dahulu`);
                    window.location.href = 'index.html';
                }
            })
            .catch(() => {
                dataContainer.innerHTML = '<p>Error loading data</p>';
            });
        } else {
            alert('tidak di izinkan harap login sebagai admin atau fleet terlebih dahulu');
            window.location.href = 'index.html';
        }
    } else {
        alert(`tidak di izinkan harap login terlebih dahulu`);
        window.location.href = 'index.html';
    }
})