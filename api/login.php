<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $rawData = file_get_contents('../db/Students.js', true);
    if ($rawData === false) {
        die('Error loading file');
    }
    $cleanData = preg_replace('/^[\x00-\x1F\x80-\xFF]+/', '', $rawData);
    $users = json_decode($cleanData, true);
    $userFound = false;
    foreach ($users as $user) {
        if ($user['username'] === $username && $user['password'] === $password) {
            $userFound = true;
            break;
        }
    }
    if ($userFound) {
        echo "User authenticated successfully!";
        $_SESSION['username'] = $username;
        $_SESSION['fullname'] = $user['fullname'];

        header("Location: /");
        exit();
    } else {
        echo "Invalid username or password!";
    }
}
