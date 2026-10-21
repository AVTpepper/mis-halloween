$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$outputDirectory = Join-Path $projectRoot 'artifacts'
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
$sourceFiles = @('index.html', 'styles.css', 'game.js', 'snake.js', 'cutscenes.js', 'exploration.js', 'README.md', 'assets') | ForEach-Object { Join-Path $projectRoot $_ }
Compress-Archive -LiteralPath $sourceFiles -DestinationPath (Join-Path $outputDirectory 'midnight-museum-classroom.zip') -Force
Write-Output (Join-Path $outputDirectory 'midnight-museum-classroom.zip')
