/**
 * 素材のメタデータから決定的な説明文を生成するユーティリティ
 */

interface Asset {
    id: string;
    title: string;
    description?: string;
    category?: string;
    tags?: string[];
}

function hashString(input: string): number {
    let h = 0;
    for (let i = 0; i < input.length; i++) {
        h = (h * 31 + input.charCodeAt(i)) >>> 0;
    }
    return h;
}

function pick<T>(arr: T[], seed: number, offset: number): T {
    return arr[(seed + offset) % arr.length];
}

function normalizeTags(tags: any): string[] {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags.map(String);
    if (typeof tags === "string")
        return tags
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
    return [];
}

/**
 * 既存の説明文が十分な長さ（40文字）あればそれを返し、
 * 短い、または空の場合はメタデータから自然文を決定的に生成する。
 */
export function generateDescription(item: Asset): string {
    const raw = String(item?.description || "").trim();

    // 1) 既存が十分長い（40文字以上）ならそのまま使用
    if (raw.length >= 40) return raw;

    // 2) 短い/無い場合は自動生成
    const title = String(item?.title || "").trim();
    const category = String(item?.category || "").trim();
    const tags = normalizeTags(item?.tags);
    const seed = hashString(String(item?.id || title || category || "gx"));

    // タイトルから固有語を抽出
    const titleTokens = title
        .replace(/[：:・、,。.!?()（）【】\[\]「」『』]/g, " ")
        .split(/\s+/)
        .map((s) => s.trim())
        .filter(Boolean)
        .filter((s) => s.length >= 2 && s.length <= 10);

    const subject = titleTokens.length > 0 ? pick(titleTokens, seed, 11) : "";
    const subjectPhrase = subject ? `「${subject}」を想起させる` : "";

    const has = (kw: string) =>
        tags.some((t) => String(t).includes(kw)) ||
        category.includes(kw) ||
        title.includes(kw);

    const theme =
        has("モビリティ")
            ? "次世代モビリティ"
            : has("未来都市")
                ? "未来都市"
                : has("エネルギー")
                    ? "クリーンエネルギー"
                    : has("脱炭素")
                        ? "脱炭素"
                        : has("宇宙")
                            ? "宇宙・先端技術"
                            : has("水中")
                                ? "水中・環境技術"
                                : "GXコンセプト";

    // 自然な日本語、AI感を抑えた構成
    const openings = [
        `本素材は${subjectPhrase}「${theme}」のビジョンを、資料やWebサイトで使いやすいトーンで表現したビジュアルです。`,
        `GX（グリーントランスフォーメーション）の文脈を意識し、${subjectPhrase}「${theme}」の方向性を美しく整理した素材です。`,
        `プレゼンテーションやWebサイトのキービジュアルとして、${subjectPhrase}「${theme}」の世界観を効果的に伝えることができます。`,
    ];

    const details = [
        `要素を盛りすぎず、テキストや図表を重ねても視認性を損なわない、使い勝手の良い構成に仕上げています。`,
        `適切な余白と視線の流れを計算しているため、スライドの扉絵やセクションの背景としても自然に馴染みます。`,
        `背景としての静寂さと、主役としての存在感を両立させ、幅広いクリエイティブに対応可能です。`,
    ];

    const useCases = [
        `企業の提案書や事業紹介、ピッチ資料のほか、LPのメインビジュアル、記事のサムネイルなど、未来志向の訴求に適しています。`,
        `採用資料、社内説明、イベント等の告知物において、全体のトーンをプロフェッショナルに整えたい場面で活用いただけます。`,
        `プレゼンテーションの表紙からプロダクト紹介の補助素材まで、クリーンな印象を与えたい様々な用途に最適です。`,
    ];

    const gxContext = [
        `脱炭素やスマートシティ、持続可能な技術革新といったテーマと親和性が高く、抽象的な概念を視覚的に補完します。`,
        `GX領域のプロジェクトにおいて、言葉だけでは伝わりにくい未来像を、共通言語としてのイメージで強力にサポートします。`,
        `環境意識の高まりを反映したデザインで、サステナビリティに関する合意形成や意識啓発の補助素材として機能します。`,
    ];

    const s1 = pick(openings, seed, 1);
    const s2 = pick(details, seed, 2);
    const s3 = pick(useCases, seed, 3);
    const s4 = pick(gxContext, seed, 4);

    return `${s1}${s2}${s3}${s4}`;
}
