<?php
$dbhost = '127.0.0.1';
$dbname = 'task_manager';
$dbuser = 'root';
$dbpass = 'taskRoot2019';


$user_id = 34;
$month_id = $_POST["month"];


try
{
    $a = array();
    $b = array();
    $db_conn = new PDO("mysql:dbhost=$dbhost; dbname=$dbname", "$dbuser", "$dbpass");
    $stmt = $db_conn->prepare("SELECT * FROM task"); 
    $stmt->execute();
     foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
         $a[] = array(utf8_encode($row['title']), $row['id']);
         
        //$result[0]);
        //var_dump($row);
        //echo ;
        //echo ;
        
     }
    //array_push($a, $b);
 print_r(json_encode($a));
}

catch(PDOExeption $e)
{
    echo $e->getMassage();
}



/*
$task = array(
                array('id1','6', '11', 'length', 'title', 'state'),
                array('id2','7', '2', 'length', 'title', 'state'),
                array('id3','6', '22', 'length', 'title', 'state')
            );
echo json_encode($task);*/
?>