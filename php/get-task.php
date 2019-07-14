<?php
$data = $_POST["month"];
$task = array(
                array('id1','6', '11', 'length', 'title', 'state'),
                array('id2','7', '2', 'length', 'title', 'state'),
                array('id3','6', '22', 'length', 'title', 'state')
            );
echo json_encode($task);
?>