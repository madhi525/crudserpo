<?php
session_start();
include 'db.php';
header('Content-Type: application/json');

if ($_SESSION['role'] == 'fleet'){
    $data = [
        'id' => 123,
        'tugas_aktif' => 8,
        'tugas_selesai' => 2,
        'recent_task' => [
            'PM LINK 001', 'PM LINK 002', 'PM LINK 003'
        ],
    ];
    echo json_encode($data);
    }else{
        echo json_encode(['error' => 'tidak di izinkan']);
}
?>