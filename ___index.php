<!DOCTYPE html>
<html>
<head>
	<title>Minesweep</title>
	<style>
		html{
			height: 100%;
		}
		body{
			margin: 0;
			padding: 0;
			background: #ccc;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
		canvas {
			/*border: 1px solid #fff;*/
		}
	</style>
</head>
<body>

	<canvas id="board" width="401" height="401" />
    <script type="module" src="minesweep.js"></script>

</body>
</html>