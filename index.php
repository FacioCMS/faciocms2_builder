<?php
    session_set_cookie_params(3600 * 12); // 12 hours afking max then logout
    header('Cache-Control: no cache');
    session_cache_limiter('private_no_expire');
	set_time_limit(0);
    session_start();

    require_once '../admin/utils/modules.php';
    requireModule("../configuration/db.php"); // using module
    $db = getDatabaseConnection();

    requireModule("./src/pages.utils.php");
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FacioCMS - Website Builder</title>

        <link rel="stylesheet/less" type="text/css" href="less/main.less" />
        <script src="https://cdn.jsdelivr.net/npm/less@4.1.1" ></script>

        <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css"/>
        <script src="https://kit.fontawesome.com/f6412110a3.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <div id="builder">
            <?php require 'components/sidebar.php'; ?>
            <div class="website"></div>
            <?php require 'components/rightbar.php'; ?>

            <div class="bottombar">
                <form action="src/save.php" target="_blank" method="POST">
                    <input type="hidden" id="code" name="code">    

                    <button class="save">
                        <em class="fas fa-save"></em>
                    </button> 
                </form>

                <button class="settings" title="We're still creating this function">
                    <em class="fas fa-cog"></em>
                </button>

                <button class="help" title="We're still creating this function">
                    <em class="fas fa-question"></em>
                </button>
                
            </div>
        </div>

        <div id="contextmenu">
            <button>Delete</button>
        </div>

        <script
            src="https://code.jquery.com/jquery-3.6.0.min.js"
            integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
            crossorigin="anonymous"></script>
        <script
            src="https://code.jquery.com/ui/1.13.0/jquery-ui.min.js"
            integrity="sha256-hlKLmzaRlE8SCJC1Kw8zoUbU8BxA+8kR3gseuKfMjxA="
            crossorigin="anonymous"></script>
        <script src="js/script.js" type="module"></script>
    </body>
</html>