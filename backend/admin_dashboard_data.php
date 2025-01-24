<?php
session_start();
include 'db.php';
header('Content-Type: application/json');

// Pastikan hanya admin yang dapat mengakses data ini
if ($_SESSION['role'] == 'admin') {
    // Data untuk dashboard admin
    $data = [
        'success' => true,
        'total_fleets' => 50,
        'active_fleets' => 45,
        'inactive_fleets' => 5
    ];
    echo json_encode($data);
} else {
    echo json_encode(['success' => false, 'message' => 'Unauthorized role']);
}
?>