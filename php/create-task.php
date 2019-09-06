<?php
require_once('queries.php');
print_r(createTask(json_decode($_POST['sending'])));
?>