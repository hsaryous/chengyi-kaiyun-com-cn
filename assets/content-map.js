// assets/content-map.js
// 站点内容分区与搜索过滤函数

const siteConfig = {
  baseUrl: "https://chengyi-kaiyun.com.cn",
  keywords: ["开云", "开源", "云原生", "容器", "自动化"],
  sections: [
    { id: "intro", title: "平台简介", tags: ["开云", "概览"] },
    { id: "features", title: "功能特性", tags: ["云原生", "容器"] },
    { id: "resources", title: "资源中心", tags: ["文档", "API", "开云"] },
    { id: "community", title: "社区交流", tags: ["开源", "论坛"] }
  ]
};

// 内容条目示例数据
const contentItems = [
  {
    title: "开云平台快速入门",
    section: "intro",
    tags: ["开云", "快速入门"],
    url: "/docs/quickstart"
  },
  {
    title: "容器编排最佳实践",
    section: "features",
    tags: ["容器", "编排"],
    url: "/docs/orchestration"
  },
  {
    title: "开源协议说明",
    section: "resources",
    tags: ["开源", "法律"],
    url: "/legal/license"
  },
  {
    title: "社区贡献指南",
    section: "community",
    tags: ["开源", "贡献"],
    url: "/community/contributing"
  },
  {
    title: "云原生监控方案",
    section: "features",
    tags: ["云原生", "监控"],
    url: "/docs/monitoring"
  }
];

/**
 * 根据关键词数组过滤内容条目
 * @param {string[]} keywords - 要匹配的关键词列表
 * @param {object[]} items - 内容条目数组（可选，默认使用 contentItems）
 * @returns {object[]} 匹配的内容条目
 */
function filterByKeywords(keywords, items = contentItems) {
  if (!keywords || keywords.length === 0) {
    return items;
  }
  const lowerKeywords = keywords.map(k => k.toLowerCase());
  return items.filter(item => {
    const allTags = item.tags.map(t => t.toLowerCase());
    return lowerKeywords.some(kw => allTags.includes(kw));
  });
}

/**
 * 根据分区 ID 获取内容
 * @param {string} sectionId - 分区标识
 * @param {object[]} items - 内容条目数组（可选）
 * @returns {object[]} 属于该分区的内容
 */
function getItemsBySection(sectionId, items = contentItems) {
  return items.filter(item => item.section === sectionId);
}

/**
 * 构建站点地图（用于导航或搜索索引）
 * @returns {object[]} 带有完整 URL 的内容条目
 */
function buildSiteMap() {
  return contentItems.map(item => ({
    ...item,
    fullUrl: siteConfig.baseUrl + item.url
  }));
}

// 导出函数以便其他模块使用
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    siteConfig,
    contentItems,
    filterByKeywords,
    getItemsBySection,
    buildSiteMap
  };
}

// 自测示例（仅在直接运行时执行）
if (typeof require !== "undefined" && require.main === module) {
  console.log("=== 站点配置 ===");
  console.log("Base URL:", siteConfig.baseUrl);
  console.log("关键词:", siteConfig.keywords.join(", "));
  console.log("分区数:", siteConfig.sections.length);

  console.log("\n=== 按关键词过滤 (关键词: 开云) ===");
  const filtered = filterByKeywords(["开云"]);
  filtered.forEach(item => console.log(` - ${item.title}`));

  console.log("\n=== 按分区获取 (features) ===");
  const features = getItemsBySection("features");
  features.forEach(item => console.log(` - ${item.title}`));

  console.log("\n=== 站点地图 (前2条) ===");
  const sitemap = buildSiteMap();
  sitemap.slice(0, 2).forEach(item => console.log(` - ${item.title}: ${item.fullUrl}`));
}