<?php


$date = null;
function headerCallbackForTimeFromGoogle($curl, $header) {
    global $date;
    if (preg_match('/^Date:/', $header)) {
        $date = trim(substr($header, 5));
        $date = DateTimeImmutable ::createFromFormat('D, d M Y H:i:s e', $date);
    }
    return strlen($header);
}

function getCurrentTimeFromGoogle(){
    global $date;
    $curl = curl_init("http://www.google.com/");
    curl_setopt($curl, CURLOPT_NOBODY, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HEADERFUNCTION, 'headerCallbackForTimeFromGoogle');
    curl_exec($curl);
    curl_close($curl);
    if ($date != NULL) {
        $date = $date->setTimezone(new DateTimeZone('Europe/Moscow'));
        // echo "Date from HTTP: " . $date->format('c');
    }
    // else $date = 
    return $date;
}