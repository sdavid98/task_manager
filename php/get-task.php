<?php
require_once('queries.php');
print_r(initialCalendar(json_decode($_POST['sending'])));



/*
$task = array(
                array('id1','6', '11', 'length', 'title', 'state'),
                array('id2','7', '2', 'length', 'title', 'state'),
                array('id3','6', '22', 'length', 'title', 'state')
            );
echo json_encode($task);*/
?>