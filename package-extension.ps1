$outputDirectory = "../prev-inpact-package";
$zip = "../prev-inpact.zip"
Remove-Item $outputDirectory -Recurse -Force;
Remove-Item $zip;
New-Item -ItemType Directory $outputDirectory;
Copy-Item ./* -Destination $outputDirectory -Recurse;
Remove-Item $outputDirectory/node_modules -Recurse -Force;
Remove-Item $outputDirectory/docs -Recurse -Force;
Remove-Item $outputDirectory/spec -Recurse -Force;
Remove-Item $outputDirectory/assets/screenshots -Recurse -Force;
Remove-Item $outputDirectory/package.json;
Remove-Item $outputDirectory/package-lock.json;
Get-ChildItem $outputDirectory -Include "*.ts" -Recurse | Remove-Item;
Get-ChildItem $outputDirectory -Include "*.ps1" -Recurse | Remove-Item;
Get-ChildItem $outputDirectory -Include "*.md" -Recurse | Remove-Item;
Get-ChildItem $outputDirectory -Include "*.scss" -Recurse | Remove-Item;
Get-ChildItem $outputDirectory -Include "*.spec.data" -Recurse | Remove-Item;
Get-ChildItem $outputDirectory -Include "tsconfig.json" -Recurse | Remove-Item;

Compress-Archive -Path $outputDirectory/* -Force -DestinationPath $zip 