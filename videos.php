<?php
header('Content-Type: application/json');
if(file_exists('videos.json')==false) {
   $url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=playlistId=key';
   $ch = curl_init();
   curl_setopt($ch, CURLOPT_URL, $url);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
   $result = curl_exec($ch);
   $fp = fopen('videos.json', 'w');
   fwrite($fp, $result);
   fclose($fp);
   curl_close($ch);
   echo $result;
} else {
   echo file_get_contents('videos.json');
}
?>