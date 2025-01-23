<?php
session_start();
include 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['token']) || $_SESSION['token'] !== $_GET['token']) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized access']);
    exit;
} else if ($_SESSION['role'] == 'admin'){
    $data = [
        'total_fleets' => 50,
        'active_fleets' => 45,
        'inactive_fleets' => 5
    ];
    echo json_encode($data);
    }else{
        echo json_encode(['error' => 'tidak di izinkan']);
} 
?>