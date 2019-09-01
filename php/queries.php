<?php

/*
$user_id = 34;
$month_id = $_POST["month"];*/

function connect($statement, $stmtData) {
    try
    {
        $dbhost = '127.0.0.1';
        $dbname = 'task_manager';
        $dbuser = 'root';
        $dbpass = 'taskRoot2019';

        $a = array();
        $db_conn = new PDO("mysql:dbhost=$dbhost; dbname=$dbname", "$dbuser", "$dbpass");
        
        $stmt = $db_conn->prepare($statement); 
        $stmt->execute($stmtData);

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

    catch(PDOExeption $e)
    {
        echo $e->getMassage();
    }
}

function initialCalendar($input) {
    //return $input->calendarStart->year;
    $startDay = $input->calendarStart->day;
    $startMonth = $input->calendarStart->month;
    $startYear = $input->calendarStart->year
    return connect("SELECT * FROM task WHERE start_month >= :startMonth", ['startMonth'=> $startMonth]);
}

?>