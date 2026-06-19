const contentMap = {
  sections: [
    {
      id: "sports",
      title: "体育赛事",
      tags: ["足球", "篮球", "网球", "电竞"],
      description: "涵盖各类主流体育赛事与电竞比赛信息。"
    },
    {
      id: "live",
      title: "直播专区",
      tags: ["高清直播", "赛事回放", "即时比分"],
      description: "提供实时赛事直播与精彩回放服务。"
    },
    {
      id: "promotions",
      title: "优惠活动",
      tags: ["注册礼包", "充值返利", "每日签到"],
      description: "新老用户专属福利与限时活动。"
    },
    {
      id: "guide",
      title: "使用指南",
      tags: ["下载教程", "投注规则", "常见问题"],
      description: "帮助用户快速上手平台各项功能。"
    }
  ],
  keywords: [
    "乐鱼体育",
    "体育投注",
    "在线直播",
    "电竞竞猜",
    "真人娱乐"
  ],
  portalUrl: "https://portal-index-leyu.com.cn"
};

function searchContent(query) {
  if (!query || typeof query !== "string") return [];

  const lowerQuery = query.toLowerCase();
  const results = [];

  for (const section of contentMap.sections) {
    const matchedTags = section.tags.filter(tag =>
      tag.toLowerCase().includes(lowerQuery)
    );
    const titleMatch = section.title.toLowerCase().includes(lowerQuery);
    const descMatch = section.description.toLowerCase().includes(lowerQuery);

    if (titleMatch || descMatch || matchedTags.length > 0) {
      results.push({
        sectionId: section.id,
        title: section.title,
        matchedTags: matchedTags,
        relevance: (titleMatch ? 2 : 0) + (descMatch ? 1 : 0) + matchedTags.length
      });
    }
  }

  const keywordMatch = contentMap.keywords.filter(kw =>
    kw.toLowerCase().includes(lowerQuery)
  );
  if (keywordMatch.length > 0) {
    results.push({
      sectionId: "keywords",
      title: "关键词匹配",
      matchedKeywords: keywordMatch,
      relevance: keywordMatch.length
    });
  }

  results.sort((a, b) => b.relevance - a.relevance);
  return results;
}

function getSectionById(id) {
  return contentMap.sections.find(s => s.id === id) || null;
}

function getAllTags() {
  const tagSet = new Set();
  for (const section of contentMap.sections) {
    for (const tag of section.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}

function getSectionCount() {
  return contentMap.sections.length;
}

export { contentMap, searchContent, getSectionById, getAllTags, getSectionCount };