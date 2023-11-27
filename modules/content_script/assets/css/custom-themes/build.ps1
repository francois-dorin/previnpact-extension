function skipUnneededRules($fileName) {
    $lines = Get-Content $fileName;
    $content = New-Object Collections.Generic.List[string];
    $incomment = $false;

    For($i = 0; $i -lt $lines.Count; ++$i) {
        $line = $lines[$i];

        if ($incomment) {
            $content.Add($line);

            if ($line -match "\*/") {
                # C'est la fin du commentaire multiligne
                $incomment = $false;
            }
        } else {
            if ($line -match "/\*" -and $line -notmatch "\*/") {
                # C'est une ligne de commentaire multiligne non fermée
                $content.Add($line);
                $incomment = $true;
            } else {
                if ($line -match "^\s*[\w-]+:.*") {
                    if ($line -match "^\s*[\w-]+:.*\$.*" -or
                        $line -match ":focus" -or 
                        $line -match ":hover" -or
                        $line -match ":nth" -or
                        $line -match ":first" -or
                        $line -match ":last" -or
                        $line -match ":before" -or
                        $line -match ":after" -or
                        $line -match ":not" ) {
                        # est-ce une ligne de style faisant référence à une variable ?
                        $content.Add($line);
                    } 
                } else {
                    $content.Add($line);
                }
            }                    
        }
    }
  

    [IO.File]::WriteAllLines($fileName, $content);    
}

$baseUrl = "https://next.ink/wp-content/themes/wordpress-theme/asset/sass/";
$files = @(
    "404.scss",
    "article.scss",
    "aside.scss",
    "brief-article.scss",
    "brief.scss",
    "briefs.scss",
    "carrousel.scss",
    "categories.scss",
    "category-page.scss",
    "comments.scss",
    "deontology.scss",
    "footer.scss",
    "header.scss",
    "heart.scss",
    "home.scss",
    "info-profile.scss",
    "login.scss",
    "mobile-burger.scss",
    "moreInfo.scss",
    "otherArticle.scss",
    "parameter.scss",
    "price.scss",
    "profile.scss",
    "reset-password.scss",
    "resultpay.scss",
    "search.scss",
    "share.scss",
    "signalement.scss",
    "sommaire.scss",
    "styles.scss",
    "subscribe.scss"
);

Write-Host "Current directory: $PSScriptRoot"
Write-Host "Downloading files from $baseUrl"
foreach ($fileName in $files) {
    $outputFile = "$PSScriptRoot/next-scss/$fileName";

    if (![System.IO.File]::Exists($outputFile)) {
        Write-Host "Downloading $fileName"
        $url = $baseUrl + $fileName;
        Invoke-WebRequest -Uri $url -OutFile $outputFile;
    } else {
        Write-Host "Skip downloading $fileName. File already exists."
    }
}

Write-Host "Removing unneeded rules"
foreach ($fileName in $files) {
    $outputFile = "$PSScriptRoot/next-scss/$fileName";
    skipUnneededRules $outputFile;
}

Write-Host "Generating next-scss.scss"
$builder = new-object System.Text.StringBuilder;
$builder.AppendLine("@import 'variables';");
$builder.AppendLine("@import 'theme-orange';");
$builder.AppendLine("@import 'rules';");
$builder.AppendLine("body#previnpact-extension.previnpact-theme {");
$builder.AppendLine("@import  'extra-rules';");
foreach ($fileName in $files) {
    $builder.AppendLine("@import 'next-scss/$fileName';");
}
$builder.AppendLine("}");

$builder.ToString() | Out-File "$PSScriptRoot/next-scss.scss" -Encoding utf8

Write-Host "Generating next-scss.css"

node $PSScriptRoot\..\..\..\..\..\node_modules\sass\sass.js  $PSScriptRoot\next-scss.scss $PSScriptRoot\extra-themes.css

Copy-Item $PSScriptRoot\extra-themes.css $PSScriptRoot\..\extra-themes.css -Force
