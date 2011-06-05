<?php include('siteChunks/_applicationVariables.php'); ?>
<!DOCTYPE html>
<html>
<head>
	<?php // Isolating the mobile head stuff ?>
	<?php include('siteChunks/a_headContent.php'); ?>
	<?php // Global Stylesheets ?>
	<?php include('siteChunks/b_globalStylesheets.php'); ?>
	
	<?php // Component Stylesheets ?>
	
	<?php // View Level Stylesheets ?>
</head>	
<body>
	<h2>
		jSpeed - A JS Speed Benchmark. 
	</h2>
	<h5>
		Woefully Naive JS testing focused on measures that affect common web site/app tasks.
	</h5>
	
	<button id="StartTest">Start Benchmark</button>
	
	<section id="DisplayArea">
		<!-- This is where all the stuff goes, yo. -->
	</section>
	
	
	
	
	<?php // ----------------------------------------------------------- Javascript ?>
	<?php include('siteChunks/y_globalScripts.php'); ?>
	<script src="views/test.js"></script>
	<script>
		var jSpeed = jSpeed || {};
		$(document).ready(function() //doc ready
		{
			jSpeed.View = new jSpeed.Test(
				'<?php echo $_SERVER['HTTP_USER_AGENT']; ?>'
				);
			
			
		});//doc ready
	</script>
	<!-- Start Bogus Markup for DOM testing -->
	<?php include('components/bogusMarkup.html'); ?>
	<!-- End Bogus Markup for DOM testing -->

<?php include('siteChunks/z_closeHtml.php'); ?>