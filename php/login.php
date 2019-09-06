<?php
$data = json_decode($_POST['sending']);
if ($data->action == 'log') {
    $username = $data->user;
    $pw = $data->pw;

    $stmt = "SELECT password FROM user WHERE name = :username";
    $param = ['username' => $username];
    $pwHash = connect($stmt, $param, true)['password'];

    if (password_verify($pw, $pwHash)) {
        $stmt = "SELECT id FROM user WHERE name = :username";
        $param = ['username' => $username];
        print_r(connect($stmt, $param, true)['id']);
    }
    else {
        print_r('Wrong data');
    }
    
}
else {
    $username = $data->user;
    
    $stmt = "SELECT id FROM user WHERE name = :username";
    $param = ['username' => $username];
    if (!connect($stmt, $param, true)) {
        $pw = password_hash($data->pw, PASSWORD_DEFAULT);
        $stmt = "INSERT INTO user (name, password) VALUES (:username, :password)";
        $param = ['username' => $username, 'password' => $pw];
        connect($stmt, $param, false);

        $stmt = "SELECT id FROM user WHERE name = :username";
        $param = ['username' => $username];
        print_r(connect($stmt, $param, true)['id']);
    }
    else {
        print_r('Choose another username');
    }
}

function connect($statement, $stmtData, $select) {
    try
    {
        $dbhost = '127.0.0.1';
        $dbname = 'task_manager';
        $dbuser = 'root';
        $dbpass = 'taskRoot2019';

        $db_conn = new PDO("mysql:dbhost=$dbhost; dbname=$dbname", "$dbuser", "$dbpass");
        
        $stmt = $db_conn->prepare($statement); 
        $stmt->execute($stmtData);

        if ($select) {
            $count = $stmt->rowCount();
            if($count >= 1) {
                $userId = $stmt->fetch();
                return $userId;
            }
            return false;
        }
        return;
    }

    catch(PDOExeption $e)
    {
        echo $e->getMassage();
    }
}

?>