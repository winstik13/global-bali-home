# Generate gallery-data.js from image folders
# Usage: powershell -ExecutionPolicy Bypass -File generate-gallery.ps1

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$extensions = @('.jpg', '.jpeg', '.png', '.webp')

# Technical drawings — NOT marketing visualizations. Excluded from gallery.
$excludePatterns = @('master-plan', 'masterplan', 'site-plan', 'siteplan', 'floor-plan', 'floorplan')

$categories = @{
    villas  = 'images/serenity-villas'
    estates = 'images/serenity-estates'
    village = 'images/serenity-village'
}

$data = @{}

foreach ($cat in $categories.GetEnumerator()) {
    $folder = Join-Path $root $cat.Value.Replace('/', '\')
    $files = @()

    if (Test-Path $folder) {
        $files = Get-ChildItem -Path $folder -File |
            Where-Object { $extensions -contains $_.Extension.ToLower() } |
            Where-Object {
                $baseName = $_.BaseName.ToLower()
                $matched = $false
                foreach ($pattern in $excludePatterns) {
                    if ($baseName -like "*$pattern*") { $matched = $true; break }
                }
                -not $matched
            } |
            Sort-Object Name |
            ForEach-Object { "`"$($cat.Value)/$($_.Name)`"" }
    }

    $data[$cat.Key] = $files
}

# Build JS file
$js = "const GALLERY_DATA = {`n"
foreach ($cat in @('villas', 'estates', 'village')) {
    $items = $data[$cat]
    if ($items -and $items.Count -gt 0) {
        $list = $items -join ",`n    "
        $js += "  $cat`: [`n    $list`n  ],`n"
    } else {
        $js += "  $cat`: [],`n"
    }
}
$js += "};"

$outputPath = Join-Path $root 'gallery-data.js'
[System.IO.File]::WriteAllText($outputPath, $js, [System.Text.UTF8Encoding]::new($false))

Write-Host "gallery-data.js generated:"
foreach ($cat in @('villas', 'estates', 'village')) {
    $count = if ($data[$cat]) { $data[$cat].Count } else { 0 }
    Write-Host "  $cat`: $count images"
}
