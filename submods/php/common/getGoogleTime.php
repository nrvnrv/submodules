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

function getCurrentTimeFromGoogle() {
    /**
     * Получить текущие время и дату с серверов гугл.
     *
     * @return DateTimeImmutable Текущие время и дата
     */
    global $date;
    $curl = curl_init("http://www.google.com/");
    curl_setopt_array($curl, [
        CURLOPT_NOBODY => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADERFUNCTION => 'headerCallbackForTimeFromGoogle',
    ]);
    curl_exec($curl);
    curl_close($curl);
    if ($date != NULL) {
        $date = $date->setTimezone(new DateTimeZone('Europe/Moscow'));
        // echo "Date from HTTP: " . $date->format('c');
    }
    // else $date = 
    return $date;
}