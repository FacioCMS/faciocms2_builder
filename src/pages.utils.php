<?php
    function fastQuery($query) {
        global $db;

        if($res = $db->query($query)) {
            if($res->num_rows) {
                $rows = [];
                while($row = $res->fetch_assoc()) {
                    $rows[] = $row;
                }

                return $rows;
            }

            return 0;
        }
    }

    function getPage($link) {
        global $db;
        $linkSplitted = explode("/", $link);
        $prevparentid = - 1;

        foreach ($linkSplitted as $key => $_link) {
            $query = "SELECT * FROM pages WHERE link = '$_link' AND parentid = '$prevparentid'";
            $ready = fastQuery($query) [0];
            $prevparentid = $ready["id"];
            if ($key == count($linkSplitted) - 1) {
                return $ready;
            }
        }
        
        return 0;
    }