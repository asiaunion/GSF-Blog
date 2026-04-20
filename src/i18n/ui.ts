import type { TopicHubKey } from "@/data/topicHubs";
import { SITE } from "@/config";

export type UiLang = "en" | "ko" | "ja";

type TopicHubCopy = Record<
  TopicHubKey,
  { title: string; description: string }
>;

const ui = {
  en: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navPosts: "Posts",
    navTags: "Tags",
    navContact: "Contact",
    navAbout: "About",
    navTopics: "Topics",
    navArchives: "Archives",
    navSearch: "Search",
    themeToggleTitle: "Toggle light & dark",
    themeToggleAria: "auto",
    socialLinksLabel: "Social links:",
    footerAbout: "About",
    footerContact: "Contact",
    footerPrivacy: "Privacy Policy",
    footerCopyright: "Copyright",
    footerAllRights: "All rights reserved.",
    heroTitleLine1: "Good Samaritan",
    heroTitleLine2: "Frontier",
    heroSubscribeRss: "Subscribe RSS",
    heroRssAria: "RSS feed",
    heroRssTitle: "RSS Feed",
    heroTagline: "Bridging profit and purpose.",
    heroDescription:
      "A convergence of investments and business, people and technology, restoration and reinvention — shaping a new lifestyle.",
    sectionFeatured: "Featured",
    sectionRecentPosts: "Recent Posts",
    allPosts: "All Posts",
    topicsPageTitle: "Topic hubs",
    topicsPageDesc:
      "Four editorial axes—urban investment, macro & policy, Tokyo life, and essays—mapped to featured series posts.",
    topicsEmpty: "Posts for this hub are being prepared.",
    topicsFromHome: "Browse topic hubs",
    heroImageAlt: "GSF panoramic city view",
    postPrevious: "Previous Post",
    postNext: "Next Post",
    breadcrumbAriaLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbPostsPage: "Posts (page {page})",
    breadcrumbTagPaged: "{tag} (page {page})",
    paginationAriaNav: "Pagination",
    paginationPrev: "Prev",
    paginationNext: "Next",
    paginationPrevAria: "Go to previous page",
    paginationNextAria: "Go to next page",
    pageTitleSearch: "Search",
    pageDescSearch: "Search across posts in any language.",
    pageTitleTags: "Tags",
    pageDescTags: "All tags used on posts.",
    pageTitlePosts: "Posts",
    pageDescPosts: "All published articles.",
    tagPageTitlePrefix: "Tag:",
    tagPageDesc: 'All articles with the tag “{tag}”.',
    pageTitleArchives: "Archives",
    pageDescArchives: "Posts grouped by year and month.",
    notFoundTitle: "404 Not Found",
    notFoundHeading: "Page Not Found",
    notFoundBackHome: "Go back home",
    sharePostLead: "Share this post:",
    copyCodeButton: "Copy",
    copyCodeDone: "Copied",
    devSearchWarnTitle: "Development mode",
    devSearchWarnBody:
      "Build the project at least once to load Pagefind search locally.",
    backButton: "Go back",
    dateUpdatedLabel: "Updated:",
    topicHubs: {
      urbanInvestment: {
        title: "Urban investment insight",
        description:
          "Tokyo offices, residential pricing, REITs, redevelopment, and rental yield vs capital gains.",
      },
      macroPolicy: {
        title: "Macro & policy (Korea–Japan)",
        description:
          "FX, rates, cross-border tax and visa topics, corporate vs personal holding sketches.",
      },
      tokyoLife: {
        title: "Tokyo life & local reports",
        description:
          "Neighborhood walks, food markets, street DNA, community notes, and family-friendly picks.",
      },
      essay: {
        title: "Essays & investing philosophy",
        description:
          "Personal notes on mindset, moving, volatility, reading two markets, and post-mortems.",
      },
    } satisfies TopicHubCopy,
  },
  ko: {
    skipToContent: "본문으로 건너뛰기",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    navPosts: "글 목록",
    navTags: "태그",
    navContact: "연락",
    navAbout: "소개",
    navTopics: "주제 허브",
    navArchives: "아카이브",
    navSearch: "검색",
    themeToggleTitle: "라이트/다크 테마 전환",
    themeToggleAria: "테마",
    socialLinksLabel: "소셜 링크:",
    footerAbout: "소개",
    footerContact: "연락",
    footerPrivacy: "개인정보 처리방침",
    footerCopyright: "Copyright",
    footerAllRights: "All rights reserved.",
    heroTitleLine1: "Good Samaritan",
    heroTitleLine2: "Frontier",
    heroSubscribeRss: "RSS 구독",
    heroRssAria: "RSS 피드",
    heroRssTitle: "RSS 피드",
    heroTagline: "이윤과 목적을 잇습니다.",
    heroDescription:
      "투자와 비즈니스, 사람과 기술, 복원과 재창조가 만나 새로운 라이프스타일을 빚어 냅니다.",
    sectionFeatured: "추천 글",
    sectionRecentPosts: "최근 글",
    allPosts: "전체 글",
    topicsPageTitle: "주제 허브",
    topicsPageDesc:
      "도시형 투자·한일 거시·도쿄 라이프·에세이 네 축으로 시리즈 글을 묶었습니다.",
    topicsEmpty: "이 허브의 글을 준비 중입니다.",
    topicsFromHome: "주제 허브 보기",
    heroImageAlt: "GSF 비즈니스 히어로 이미지",
    postPrevious: "이전 글",
    postNext: "다음 글",
    breadcrumbAriaLabel: "경로 탐색",
    breadcrumbHome: "홈",
    breadcrumbPostsPage: "글 목록 (페이지 {page})",
    breadcrumbTagPaged: "{tag} (페이지 {page})",
    paginationAriaNav: "페이지 탐색",
    paginationPrev: "이전",
    paginationNext: "다음",
    paginationPrevAria: "이전 페이지",
    paginationNextAria: "다음 페이지",
    pageTitleSearch: "검색",
    pageDescSearch: "모든 언어의 글에서 검색합니다.",
    pageTitleTags: "태그",
    pageDescTags: "글에 사용된 태그 목록입니다.",
    pageTitlePosts: "글 목록",
    pageDescPosts: "발행한 글을 모았습니다.",
    tagPageTitlePrefix: "태그:",
    tagPageDesc: "‘{tag}’ 태그가 붙은 글입니다.",
    pageTitleArchives: "아카이브",
    pageDescArchives: "연·월별로 묶은 글 목록입니다.",
    notFoundTitle: "404 — 찾을 수 없음",
    notFoundHeading: "페이지를 찾을 수 없습니다",
    notFoundBackHome: "홈으로 돌아가기",
    sharePostLead: "이 글 공유:",
    copyCodeButton: "복사",
    copyCodeDone: "복사됨",
    devSearchWarnTitle: "개발 모드",
    devSearchWarnBody:
      "Pagefind 검색을 보려면 최소 한 번은 프로젝트를 빌드하세요.",
    backButton: "뒤로",
    dateUpdatedLabel: "수정:",
    topicHubs: {
      urbanInvestment: {
        title: "도시형 투자 인사이트",
        description:
          "도쿄 오피스·주거 단가, 리츠, 재개발, 임대 수익과 시세 차익 등 실물 중심 분석.",
      },
      macroPolicy: {
        title: "한일 거시·정책",
        description:
          "환율·금리, 상속·증여, 비자 경로, 법인 vs 개인 보유 등 제도·거시 이슈.",
      },
      tokyoLife: {
        title: "도쿄 라이프·로컬 리포트",
        description:
          "동네 산책, 시장 이전 이야기, 거리 비교, 커뮤니티, 가족 코스 등 현장형 글.",
      },
      essay: {
        title: "에세이·투자 철학",
        description:
          "마음가짐, 이사와 계약, 환율 변동, 두 시장 읽기, 투자 복기 등 개인적 기록.",
      },
    } satisfies TopicHubCopy,
  },
  ja: {
    skipToContent: "本文へスキップ",
    openMenu: "メニューを開く",
    closeMenu: "メニューを閉じる",
    navPosts: "記事一覧",
    navTags: "タグ",
    navContact: "お問い合わせ",
    navAbout: "について",
    navTopics: "トピックハブ",
    navArchives: "アーカイブ",
    navSearch: "検索",
    themeToggleTitle: "ライト／ダークの切り替え",
    themeToggleAria: "テーマ",
    socialLinksLabel: "ソーシャルリンク:",
    footerAbout: "について",
    footerContact: "お問い合わせ",
    footerPrivacy: "プライバシーポリシー",
    footerCopyright: "Copyright",
    footerAllRights: "All rights reserved.",
    heroTitleLine1: "Good Samaritan",
    heroTitleLine2: "Frontier",
    heroSubscribeRss: "RSSを購読",
    heroRssAria: "RSSフィード",
    heroRssTitle: "RSSフィード",
    heroTagline: "利益と目的のはざまを橋渡しする。",
    heroDescription:
      "投資とビジネス、人とテクノロジー、復元と再創造が交わり、新しいライフスタイルを形作ります。",
    sectionFeatured: "おすすめ",
    sectionRecentPosts: "最近の記事",
    allPosts: "すべての記事",
    topicsPageTitle: "トピックハブ",
    topicsPageDesc:
      "都市型投資・日韓マクロ・東京ライフ・エッセイの4軸でシリーズ記事を整理しています。",
    topicsEmpty: "このハブの記事を準備中です。",
    topicsFromHome: "トピックハブを見る",
    heroImageAlt: "GSF ヒーローイメージ",
    postPrevious: "前の記事",
    postNext: "次の記事",
    breadcrumbAriaLabel: "パンくずリスト",
    breadcrumbHome: "ホーム",
    breadcrumbPostsPage: "記事一覧（ページ {page}）",
    breadcrumbTagPaged: "{tag}（ページ {page}）",
    paginationAriaNav: "ページ送り",
    paginationPrev: "前へ",
    paginationNext: "次へ",
    paginationPrevAria: "前のページへ",
    paginationNextAria: "次のページへ",
    pageTitleSearch: "検索",
    pageDescSearch: "すべての言語の記事を横断検索します。",
    pageTitleTags: "タグ",
    pageDescTags: "記事で使っているタグ一覧です。",
    pageTitlePosts: "記事一覧",
    pageDescPosts: "公開した記事をまとめています。",
    tagPageTitlePrefix: "タグ:",
    tagPageDesc: "タグ「{tag}」の記事一覧です。",
    pageTitleArchives: "アーカイブ",
    pageDescArchives: "年・月ごとに並べた記事一覧です。",
    notFoundTitle: "404 Not Found",
    notFoundHeading: "ページが見つかりません",
    notFoundBackHome: "ホームに戻る",
    sharePostLead: "この記事を共有:",
    copyCodeButton: "コピー",
    copyCodeDone: "コピーしました",
    devSearchWarnTitle: "開発モード",
    devSearchWarnBody:
      "Pagefind の検索を表示するには、一度プロジェクトをビルドしてください。",
    backButton: "戻る",
    dateUpdatedLabel: "更新:",
    topicHubs: {
      urbanInvestment: {
        title: "都市型投資インサイト",
        description:
          "東京オフィス・住宅の単価、リート、再開発、利回りとキャピタルゲインの整理。",
      },
      macroPolicy: {
        title: "日韓マクロ・政策",
        description:
          "為替・金利、相続・贈与、在留ルート、法人と個人の保有スケッチなど。",
      },
      tokyoLife: {
        title: "東京ライフ・ローカル",
        description:
          "街歩き、市場の移転、通りの比較、コミュニティ、家族向けスポットなど。",
      },
      essay: {
        title: "エッセイ・投資観",
        description:
          "姿勢、引越しと契約、為替の揺れ、二市場の読み方、振り返りなど。",
      },
    } satisfies TopicHubCopy,
  },
} as const;

export type UiKey = keyof typeof ui.en;

export function getUi(lang: UiLang): (typeof ui)[UiLang] {
  return ui[lang] ?? ui.en;
}

/** For routes without `[...locale]` (404, archives): follow `SITE.lang` when it is a UI locale. */
export function defaultUiLang(): UiLang {
  const l: string = SITE.lang;
  if (l === "ko" || l === "ja" || l === "en") return l;
  return "en";
}
