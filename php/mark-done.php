<?php
require_once('queries.php');
print_r(markAsDoneUndone(json_decode($_POST['sending'])));
?>