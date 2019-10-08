<?php


$user_id = '7';

function connect($statement, $stmtData, $wantResult) {
    try
    {
        $dbhost = '127.0.0.1';
        $dbname = 'task_manager';
        $dbuser = 'root';
        $dbpass = '';

        $a = array();
        $db_conn = new PDO("mysql:dbhost=$dbhost; dbname=$dbname", "$dbuser", "$dbpass");
        
        $stmt = $db_conn->prepare($statement); 
        $stmt->execute($stmtData);

        if ($wantResult) {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($result as $r) {
                    $res = array();
                    foreach($r as $val => $v) {
                        $v = utf8_encode($v);
                        $res[$val] = $v;
                    }
                    $a[] = $res;
                }
                return json_encode($a);
        }
        return;
    }

    catch(PDOExeption $e)
    {
        echo $e->getMassage();
    }
}

function initialCalendar($input) {
    $startDay = $input->calendarStart->day;
    $startMonth = $input->calendarStart->month;
    $startYear = $input->calendarStart->year;

    $endDay = $input->calendarEnd->day;
    $endMonth = $input->calendarEnd->month;
    $endYear = $input->calendarEnd->year;

    $stmt = "SELECT task_id, start_year, start_month, start_day, title, description, state FROM task 
            WHERE 
            (start_year >= :startYear AND start_year <= :endYear)
            AND (
                (start_month = :startMonth AND start_day >= :startDay )
                OR
                (start_month > :startMonth AND start_month < :endMonth)
                OR 
                (start_month = :endMonth AND start_day <= :endDay)
            )
            AND user_fk = :user
            ";

    $stmtParams = ['startDay' => $startDay, 'startMonth' => $startMonth, 'endDay' => $endDay, 'endMonth' => $endMonth, 'startYear' => $startYear, 'endYear' => $endYear, 'user' => '7'];

    return connect($stmt, $stmtParams, true);
    //return connect("SELECT task_id, start_month, start_day, length, title, state FROM task WHERE start_month >= :startMonth", ['startMonth'=> $startMonth]);
}

function updateTask($data) {
    $id = $data->id;
    $title = $data->title;
    $description = $data->description;

    $stmt = "UPDATE task SET title = :title, description = :description WHERE task_id = :id AND user_fk = :user";
    $params = ['title' => $title, 'description' => $description, 'id' => $id, 'user' => $_COOKIE['userId']];

    connect($stmt, $params, false);
    return initialCalendar($data->endPoints);
}

function markAsDoneUndone($data) {
    $id = $data->id;
    $state = $data->state;

    $stmt = "UPDATE task SET state = :state WHERE task_id = :id AND user_fk = :user";
    $params = ['state' => $state, 'id' => $id, 'user' => $_COOKIE['userId']];

    connect($stmt, $params, false);
    return initialCalendar($data->endPoints);
}

function deleteTask($data) {
    $id = $data->id;

    $stmt = "DELETE FROM task WHERE task_id = :id AND user_fk = :user";
    $param = ['id' => $id, 'user' => $_COOKIE['userId']];
    connect($stmt, $param, false);
    return initialCalendar($data->endPoints);
}

function createTask($data) {
    $id = chr(rand(97,122)) . chr(rand(97,122)) . chr(rand(97,122)) . chr(rand(97,122)) . chr(rand(97,122)) . chr(rand(97,122));

    $title = $data->title;
    $description = $data->desc;
    $year = (int)$data->year;
    $month = (int)$data->month;
    $day = (int)$data->day;
    $user = $_COOKIE['userId'];
    $state = 0;

    $stmt = "INSERT INTO task (id, task_id, start_year, start_month, start_day, user_fk, title, description, state) VALUES (NULL, :id, :year, :month, :day, :user, :title, :description, :state)";
    //var_dump($stmt);

    $params = ['id' => $id, 'year' => $year, 'month' => $month, 'day' => $day, 'user' => $user, 'title' => $title, 'description' => $description, 'state' => $state];
    //var_dump($params);

    connect($stmt, $params, false);
    return initialCalendar($data->endPoints);
}


?>