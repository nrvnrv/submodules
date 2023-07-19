<?php 


function parseAssocArray($keyList, $assocArray){
    $result = [];
    foreach($keyList as $keyIterator){
        array_push($result, $assocArray[$keyIterator]);
    }
    return $result;
}


function createAssocArray($keyList, $valueList){
    for($iter = 0; $iter < count($keyList); $iter++) 
        $result[$keyList[$iter]] = $valueList[$iter];
    return $result;
}
