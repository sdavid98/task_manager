<?php
require_once('queries.php');
print_r(deleteTask(json_decode($_POST['sending'])));
?>