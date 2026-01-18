# Add 5 new images to assets.json
$jsonPath = "data\assets.json"
$json = Get-Content $jsonPath -Raw -Encoding UTF8 | ConvertFrom-Json

$newImages = @(
    @{
        id = "quantum-tower-01"
        title = "量子通信タワー"
        description = "ホログラフィック通信リングを纏う次世代通信タワー。量子暗号技術により超高速・超安全な通信を実現する未来都市の中枢インフラ。`n[Spec: 量子暗号通信対応]"
        src = "/images/smartcity/quantum-tower.jpg"
        category = "Smart City"
        score = 98
        width = 1024
        height = 1024
        size = "1.2 MB"
        aspectRatio = "1:1 (Square)"
        tags = @("#量子通信", "#未来都市", "#5G/6G", "#商用利用可")
    },
    @{
        id = "central-tower-01"
        title = "スマートシティ中央タワー"
        description = "AI制御による都市管理システムの中枢。ドローンネットワークと連携し、エネルギー・交通・セキュリティを統合管理する次世代インフラ。`n[Spec: AI都市OS搭載]"
        src = "/images/smartcity/central-tower.jpg"
        category = "Smart City"
        score = 97
        width = 1024
        height = 1024
        size = "1.1 MB"
        aspectRatio = "1:1 (Square)"
        tags = @("#AI都市管理", "#ドローン", "#スマートインフラ", "#商用利用可")
    },
    @{
        id = "biophilic-residence-01"
        title = "バイオフィリック集合住宅"
        description = "自然と建築が融合した有機的デザインの集合住宅。屋上緑化とソーラーパネルを統合し、カーボンニュートラルを実現する持続可能な居住空間。`n[Spec: LEED Platinum認証想定]"
        src = "/images/architecture/biophilic-residence.jpg"
        category = "Architecture"
        score = 99
        width = 1024
        height = 1024
        size = "1.3 MB"
        aspectRatio = "1:1 (Square)"
        tags = @("#バイオフィリック", "#グリーンビルディング", "#持続可能建築", "#商用利用可")
    },
    @{
        id = "organic-residence-01"
        title = "オーガニック・レジデンス"
        description = "流線型の有機的フォルムと垂直庭園が調和した未来型住宅。自然光と緑を最大限に取り入れ、居住者の健康とウェルビーイングを追求。`n[Spec: ウェルネス認証対応]"
        src = "/images/architecture/organic-residence.jpg"
        category = "Architecture"
        score = 98
        width = 1024
        height = 1024
        size = "1.2 MB"
        aspectRatio = "1:1 (Square)"
        tags = @("#オーガニック建築", "#垂直庭園", "#ウェルビーイング", "#商用利用可")
    },
    @{
        id = "aerial-network-01"
        title = "空中交通ネットワーク"
        description = "自動運転ポッドが縦横無尽に移動する3次元交通システム。渋滞ゼロの未来都市を実現する革新的モビリティインフラ。`n[Spec: 完全自動運転レベル5]"
        src = "/images/mobility/aerial-network.jpg"
        category = "Mobility"
        score = 99
        width = 1024
        height = 576
        size = "980 KB"
        aspectRatio = "16:9 (Widescreen)"
        tags = @("#空中交通", "#自動運転", "#3D交通網", "#商用利用可")
    }
)

# Add new images
foreach ($img in $newImages) {
    $json += $img
}

# Save updated JSON
$json | ConvertTo-Json -Depth 10 | Set-Content $jsonPath -Encoding UTF8

Write-Host "✅ Added 5 new images. Total: $($json.Count)"
