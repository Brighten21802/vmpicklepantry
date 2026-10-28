$url = "https://github.com/cli/cli/releases/download/v2.45.0/gh_2.45.0_windows_amd64.zip"
$zip = Join-Path $env:TEMP "gh.zip"
$dest = Join-Path $env:LOCALAPPDATA "gh"

Write-Output "Downloading GitHub CLI from $url..."
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $url -OutFile $zip

Write-Output "Extracting GitHub CLI..."
Expand-Archive -Path $zip -DestinationPath $dest -Force
Remove-Item $zip -Force

$ghDir = Get-ChildItem -Path $dest -Directory | Select-Object -First 1
$ghBin = Join-Path $ghDir.FullName "bin"

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$ghBin*") {
    [Environment]::SetEnvironmentVariable("Path", "$userPath;$ghBin", "User")
    Write-Output "Added $ghBin to User PATH."
}

& (Join-Path $ghBin "gh.exe") --version
