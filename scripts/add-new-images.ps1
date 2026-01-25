# Add 5 new images to assets.json
$jsonPath = "data\assets.json"
$json = Get-Content $jsonPath -Raw -Encoding UTF8 | ConvertFrom-Json

$newImages = @(
    @{
        id = "quantum-tower-01"
        title = "驥丞ｭ宣壻ｿ｡繧ｿ繝ｯ繝ｼ"
        description = "繝帙Ο繧ｰ繝ｩ繝輔ぅ繝・け騾壻ｿ｡繝ｪ繝ｳ繧ｰ繧堤ｺ上≧谺｡荳紋ｻ｣騾壻ｿ｡繧ｿ繝ｯ繝ｼ縲る㍼蟄先囓蜿ｷ謚陦薙↓繧医ｊ雜・ｫ倬溘・雜・ｮ牙・縺ｪ騾壻ｿ｡繧貞ｮ溽樟縺吶ｋ譛ｪ譚･驛ｽ蟶ゅ・荳ｭ譫｢繧､繝ｳ繝輔Λ縲Ａn[Spec: 驥丞ｭ先囓蜿ｷ騾壻ｿ｡蟇ｾ蠢彎"
        src = "./assets/images/smartcity/quantum-tower.jpg"
        category = "Smart City"
        score = 98
        width = 1024
        height = 1024
        size = "1.2 MB"
        aspectRatio = "1:1 (Square)"
        tags = @("#驥丞ｭ宣壻ｿ｡", "#譛ｪ譚･驛ｽ蟶・, "#5G/6G", "#蝠・畑蛻ｩ逕ｨ蜿ｯ")
    },
    @{
        id = "central-tower-01"
        title = "繧ｹ繝槭・繝医す繝・ぅ荳ｭ螟ｮ繧ｿ繝ｯ繝ｼ"
        description = "AI蛻ｶ蠕｡縺ｫ繧医ｋ驛ｽ蟶らｮ｡逅・す繧ｹ繝・Β縺ｮ荳ｭ譫｢縲ゅラ繝ｭ繝ｼ繝ｳ繝阪ャ繝医Ρ繝ｼ繧ｯ縺ｨ騾｣謳ｺ縺励√お繝阪Ν繧ｮ繝ｼ繝ｻ莠､騾壹・繧ｻ繧ｭ繝･繝ｪ繝・ぅ繧堤ｵｱ蜷育ｮ｡逅・☆繧区ｬ｡荳紋ｻ｣繧､繝ｳ繝輔Λ縲Ａn[Spec: AI驛ｽ蟶０S謳ｭ霈云"
        src = "./assets/images/smartcity/central-tower.jpg"
        category = "Smart City"
        score = 97
        width = 1024
        height = 1024
        size = "1.1 MB"
        aspectRatio = "1:1 (Square)"
        tags = @("#AI驛ｽ蟶らｮ｡逅・, "#繝峨Ο繝ｼ繝ｳ", "#繧ｹ繝槭・繝医う繝ｳ繝輔Λ", "#蝠・畑蛻ｩ逕ｨ蜿ｯ")
    },
    @{
        id = "biophilic-residence-01"
        title = "繝舌う繧ｪ繝輔ぅ繝ｪ繝・け髮・粋菴丞ｮ・
        description = "閾ｪ辟ｶ縺ｨ蟒ｺ遽峨′陞榊粋縺励◆譛画ｩ溽噪繝・じ繧､繝ｳ縺ｮ髮・粋菴丞ｮ・ょｱ倶ｸ顔ｷ大喧縺ｨ繧ｽ繝ｼ繝ｩ繝ｼ繝代ロ繝ｫ繧堤ｵｱ蜷医＠縲√き繝ｼ繝懊Φ繝九Η繝ｼ繝医Λ繝ｫ繧貞ｮ溽樟縺吶ｋ謖∫ｶ壼庄閭ｽ縺ｪ螻・ｽ冗ｩｺ髢薙Ａn[Spec: LEED Platinum隱崎ｨｼ諠ｳ螳咯"
        src = "./assets/images/architecture/biophilic-residence.jpg"
        category = "Architecture"
        score = 99
        width = 1024
        height = 1024
        size = "1.3 MB"
        aspectRatio = "1:1 (Square)"
        tags = @("#繝舌う繧ｪ繝輔ぅ繝ｪ繝・け", "#繧ｰ繝ｪ繝ｼ繝ｳ繝薙Ν繝・ぅ繝ｳ繧ｰ", "#謖∫ｶ壼庄閭ｽ蟒ｺ遽・, "#蝠・畑蛻ｩ逕ｨ蜿ｯ")
    },
    @{
        id = "organic-residence-01"
        title = "繧ｪ繝ｼ繧ｬ繝九ャ繧ｯ繝ｻ繝ｬ繧ｸ繝・Φ繧ｹ"
        description = "豬∫ｷ壼梛縺ｮ譛画ｩ溽噪繝輔か繝ｫ繝縺ｨ蝙ら峩蠎ｭ蝨偵′隱ｿ蜥後＠縺滓悴譚･蝙倶ｽ丞ｮ・り・辟ｶ蜈峨→邱代ｒ譛螟ｧ髯舌↓蜿悶ｊ蜈･繧後∝ｱ・ｽ剰・・蛛･蠎ｷ縺ｨ繧ｦ繧ｧ繝ｫ繝薙・繧､繝ｳ繧ｰ繧定ｿｽ豎ゅＡn[Spec: 繧ｦ繧ｧ繝ｫ繝阪せ隱崎ｨｼ蟇ｾ蠢彎"
        src = "./assets/images/architecture/organic-residence.jpg"
        category = "Architecture"
        score = 98
        width = 1024
        height = 1024
        size = "1.2 MB"
        aspectRatio = "1:1 (Square)"
        tags = @("#繧ｪ繝ｼ繧ｬ繝九ャ繧ｯ蟒ｺ遽・, "#蝙ら峩蠎ｭ蝨・, "#繧ｦ繧ｧ繝ｫ繝薙・繧､繝ｳ繧ｰ", "#蝠・畑蛻ｩ逕ｨ蜿ｯ")
    },
    @{
        id = "aerial-network-01"
        title = "遨ｺ荳ｭ莠､騾壹ロ繝・ヨ繝ｯ繝ｼ繧ｯ"
        description = "閾ｪ蜍暮°霆｢繝昴ャ繝峨′邵ｦ讓ｪ辟｡蟆ｽ縺ｫ遘ｻ蜍輔☆繧・谺｡蜈・ｺ､騾壹す繧ｹ繝・Β縲よｸ区ｻ槭ぞ繝ｭ縺ｮ譛ｪ譚･驛ｽ蟶ゅｒ螳溽樟縺吶ｋ髱ｩ譁ｰ逧・Δ繝薙Μ繝・ぅ繧､繝ｳ繝輔Λ縲Ａn[Spec: 螳悟・閾ｪ蜍暮°霆｢繝ｬ繝吶Ν5]"
        src = "./assets/images/mobility/aerial-network.jpg"
        category = "Mobility"
        score = 99
        width = 1024
        height = 576
        size = "980 KB"
        aspectRatio = "16:9 (Widescreen)"
        tags = @("#遨ｺ荳ｭ莠､騾・, "#閾ｪ蜍暮°霆｢", "#3D莠､騾夂ｶｲ", "#蝠・畑蛻ｩ逕ｨ蜿ｯ")
    }
)

# Add new images
foreach ($img in $newImages) {
    $json += $img
}

# Save updated JSON
$json | ConvertTo-Json -Depth 10 | Set-Content $jsonPath -Encoding UTF8

Write-Host "笨・Added 5 new images. Total: $($json.Count)"
