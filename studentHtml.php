<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script> 
</head>


<body>
    <?php
		session_start();
    ?>
    <p style="float: right; width: 10%; margin-top:1px">
        User: <?php echo $_SESSION['username'] ?>
    </p>

    <div id="libraryDiv">
        <table id="library" style="width:60%" border="2" cellpadding="2">
            <tr>
                <th>Art Shelf</th>
                <th>Science Shelf</th>
                <th>Sport Shelf</th>
                <th>Literature Shelf</th>
            </tr>
        </table>
    </div>

    <div id="student">
        <p></p>
        <form id="borrow" name="borrow">
            <label><b>Borrow Book</b></label>
            <input type="text" placeholder="Enter ID to borrow" name="borrowID">
        </form>
        <button id="borrowButton">Borrow</button>
        <p></p>
        <form id="return" name="return">
            <label><b>Return Book</b></label>
            <input type="text" placeholder="Enter ID to return" name="returnID">
        </form>
        <button id="returnButton">Return</button>
    </div>
    <script src="student.js"></script>
</body>
</html>