<?php 


function parseAssocArray($keyList, $assocArray){
    /**
     * Извлекает значения по массиву ключей из ассоциативного массива .
     *
     * @param array $keyList Массив ключей
     * @param array $assocArray Ассоциативного массив
     *
     * @return array Массив значений
     */
    $result = [];
    foreach($keyList as $keyIterator){
        array_push($result, $assocArray[$keyIterator]);
    }
    return $result;
}


function createAssocArray($keyList, $valueList) {
    /**
     * Из 2 входных массивов создает ассоциативный массив ключ: значение.
     *
     * @param array $keyList Массив ключей
     * @param array $valueList Массив значений
     *
     * @return array Ассоциативный массив
     */
    for($iter = 0; $iter < count($keyList); $iter++) 
        $result[$keyList[$iter]] = $valueList[$iter];
    return $result;
}
