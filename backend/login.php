<?php
session_start();
include 'db.php';

function membuatToken(){
    return bin2hex(random_bytes(32));
}

header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'] ?? '';
    $password = md5($data['password'] ?? '');

    $query = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    $query->execute([$username,$password]);
    $user = $query->fetch();

    if($user){
        $token = membuatToken();
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['token'] = $token;

        echo json_encode(['success' => true, 'role' => $user['role'], 'token' => $token]);
    } else {
        echo json_encode(['success' => false, 'message' => 'username / password salah!']);
    }
}
?>