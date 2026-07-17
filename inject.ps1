$files = Get-ChildItem -Path d:\aman -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -notmatch 'responsive-core.css' -and $content -match '<link href="style.css" rel="stylesheet" />') {
        $newContent = $content -replace '<link href="style.css" rel="stylesheet" />', "<link href=`"style.css`" rel=`"stylesheet`" />`n        <link href=`"responsive-core.css`" rel=`"stylesheet`" />"
        Set-Content -Path $file.FullName -Value $newContent
    }
}
