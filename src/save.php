<?php
    $code = urldecode($_POST["code"]);

    $timespan = time();
    $file = fopen("../tpls_cache/$timespan.php.remove-this-extension", "w");
    fwrite($file, $code);
    fclose($file);

    $codeNew = "
        Name = Template $timespan;
        TemplateVersion = 0.0.1;
        Author = Facio;
        Description = Template generated by FacioCMS Builder!;
        fcms:TemplateFile = $timespan.php;
        fcms:MinVersion = 2.0.0;
        fcms:StableVersion = 2.0.0; 
        danger:AllowUncompatibileVersion = false;
    ";

    $fileConfig = fopen("../tpls_cache/$timespan.tplc", "w");
    fwrite($fileConfig, $codeNew);
    fclose($fileConfig);

?>

Downloading in progress...

<a target="_blank" href="../tpls_cache/<?php echo $timespan ?>.tplc" download id="tplcdownload"></a>
<a target="_blank" href="../tpls_cache/<?php echo $timespan ?>.php.remove-this-extension" download id="phpdownload"></a>

<script>
    //document.querySelector("#tplcdownload").click()
    document.querySelector("#phpdownload").click()

    //setTimeout(() => document.querySelector("#phpdownload").click(), 100)
    setTimeout(() => window.close(), 10)
</script>