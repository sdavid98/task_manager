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
    $startDay = $input->calendarStart->day;
    $startMonth = $input->calendarStart->month;
    $startYear = $input->calendarStart->year;

    $endDay = $input->calendarEnd->day;
    $endMonth = $input->calendarEnd->month;
    $endYear = $input->calendarEnd->year;

    $stmt = "SELECT task_id, start_year, start_month, start_day, length, title, description, state FROM task 
            WHERE 
            (start_year >= :startYear AND start_year <= :endYear)
            AND (
                (start_month = :startMonth AND start_day >= :startDay )
                OR
                (start_month > :startMonth AND start_month < :endMonth)
                OR 
                (start_month = :endMonth AND start_day <= :endDay)
            )
            ";

    $stmtParams = ['startDay' => $startDay, 'startMonth' => $startMonth, 'endDay' => $endDay, 'endMonth' => $endMonth, 'startYear' => $startYear, 'endYear' => $endYear];

    return connect($stmt, $stmtParams);
    //return connect("SELECT task_id, start_month, start_day, length, title, state FROM task WHERE start_month >= :startMonth", ['startMonth'=> $startMonth]);
}


?>