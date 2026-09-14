<#
.SYNOPSIS
    Builds the FERS Planning Project workspace folder tree and places the living registers.

.DESCRIPTION
    Creates the eight working folders the master prompt expects, then copies
    templates/facts-register.md to "02 Baseline\Facts Register.md" and
    templates/open-items.md to "06 Open Items\Open Items.md".

    Existing folders are left alone. Existing register files are never
    overwritten unless -Force is supplied, because they hold your data.

.PARAMETER Path
    Where to build the workspace. Created if it does not exist.

.PARAMETER Force
    Overwrite the two register files if they already exist. Use with care.

.EXAMPLE
    .\New-FersWorkspace.ps1 -Path "C:\Users\you\Documents\FERS Planning"

.EXAMPLE
    .\New-FersWorkspace.ps1 -Path "D:\Retirement" -Force

.NOTES
    Part of https://github.com/JBrady0850/fers-planning-project
    MIT licensed. Not financial advice. See DISCLAIMER.md.
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Path,

    [switch]$Force
)

$ErrorActionPreference = 'Stop'

$folders = @(
    '01 Source Documents',
    '01 Source Documents\New Raw Data',
    '01 Source Documents\Old Raw Data',
    '02 Baseline',
    '03 Monthly Reports',
    '04 Analysis',
    '05 Boldin',
    '06 Open Items',
    '07 Archive'
)

# Locate the repository root relative to this script, so the templates are found
# no matter which directory the user runs it from.
$repoRoot = Split-Path -Parent $PSScriptRoot
$templates = @(
    @{ Source = Join-Path $repoRoot 'templates\facts-register.md'; Destination = '02 Baseline\Facts Register.md' },
    @{ Source = Join-Path $repoRoot 'templates\open-items.md';     Destination = '06 Open Items\Open Items.md' }
)

Write-Host ''
Write-Host 'FERS Planning Project, workspace setup' -ForegroundColor Cyan
Write-Host ''

if (-not (Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
    Write-Host "  created  $Path" -ForegroundColor Green
}
else {
    Write-Host "  exists   $Path"
}

$root = (Resolve-Path -LiteralPath $Path).Path

foreach ($folder in $folders) {
    $full = Join-Path $root $folder
    if (Test-Path -LiteralPath $full) {
        Write-Host "  exists   $folder"
    }
    else {
        New-Item -ItemType Directory -Path $full -Force | Out-Null
        Write-Host "  created  $folder" -ForegroundColor Green
    }
}

Write-Host ''

foreach ($t in $templates) {
    $dest = Join-Path $root $t.Destination

    if (-not (Test-Path -LiteralPath $t.Source)) {
        Write-Warning "Template not found: $($t.Source). Copy it manually from the repository."
        continue
    }

    if ((Test-Path -LiteralPath $dest) -and -not $Force) {
        Write-Host "  skipped  $($t.Destination) already exists, not overwritten" -ForegroundColor Yellow
        continue
    }

    Copy-Item -LiteralPath $t.Source -Destination $dest -Force
    Write-Host "  placed   $($t.Destination)" -ForegroundColor Green
}

Write-Host ''
Write-Host 'Workspace ready.' -ForegroundColor Cyan
Write-Host ''
Write-Host 'Next steps:'
Write-Host '  1. Open Claude Desktop and create a Project named "FERS Planning".'
Write-Host '  2. Copy everything between the two ===== markers in MASTER-PROMPT.md'
Write-Host '     into the project Instructions field. Not into a chat message.'
Write-Host "  3. Use Add folder and select: $root"
Write-Host '  4. Gather the six documents in docs/03-document-intake-checklist.md.'
Write-Host '  5. Start a conversation and type:'
Write-Host '        Begin Phase A, then start the interview at Block 1.'
Write-Host ''
Write-Host 'Before you load documents, decide where the raw ones live.' -ForegroundColor Yellow
Write-Host 'This folder will hold pay statements, benefit estimates and tax returns.'
Write-Host 'If it is shared or synced, those documents go wherever it goes.'
Write-Host 'Do not place any of this on a government system.'
Write-Host ''
