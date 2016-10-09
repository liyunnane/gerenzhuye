<?php
 $id=$_GET["id"];
 $content=$_GET["content"];
 $date=$_GET["date"];
 $mysqli=new mysqli("sqld.duapp.com:4050","53eb0069fca0434c80249f375f54bd12","3e27aff8dbb94a8083c0e8fabffd1385","kEkXftbLbkUtlUlXnwHS");
 $sql="INSERT INTO `kEkXftbLbkUtlUlXnwHS`.`LIUYAN`(`id`,`content`,`date`) VALUES ('{$id}','{$content}','{$date}')";
 $mysqli->query($sql);
?>
