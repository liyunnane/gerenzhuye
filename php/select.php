<?php
$mysqli=new mysqli("sqld.duapp.com:4050","53eb0069fca0434c80249f375f54bd12","3e27aff8dbb94a8083c0e8fabffd1385","kEkXftbLbkUtlUlXnwHS");
$sql="SELECT * FROM `LIUYAN` order by id";
$result=$mysqli->query($sql);
$result=$result->fetch_all(MYSQLI_ASSOC);
echo json_encode($result);
?>