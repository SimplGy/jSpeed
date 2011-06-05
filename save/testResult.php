<?php
require_once '../../dbConnect.inc.php';

//Store vars
$ua = $_POST['ua'];
$core = $_POST['coreRuns'];
$string = $_POST['stringRuns'];
$dom = $_POST['domRuns'];
$anim = $_POST['animRuns'];
$total = $_POST['totalRuns'];

//Save to db
$sql = mysql_query("
		INSERT INTO testresults (ua, testtime, scoreCore, scoreString, scoreDom, scoreAnim, scoreTotal)
		VALUES ('$ua', NOW(), '$core', '$string', '$dom', '$anim', '$total')
		")
		or die (mysql_error());
	if(!$sql) {
		echo 'There has been an error adding the test result.';
	} else {
		echo'The test result has been added.';
	}//if else

