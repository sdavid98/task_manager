<?php
require_once('queries.php');
print_r(updateTask(json_decode($_POST['sending'])));
?>