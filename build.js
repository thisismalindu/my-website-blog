// build.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js"; // Import highlight.js

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Configure MarkdownIt with syntax highlighting
const md = new MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><div class="language-label">${lang}</div><code class="hljs ${lang}">${hljs.highlight(str, { language: lang }).value}</code></pre>`;
      } catch (__) {}
    }
    return `<pre><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

const POSTS_DIR = path.join(__dirname, "src");
const TEMPLATES_DIR = path.join(__dirname, "templates");

const POST_TEMPLATE = fs.readFileSync(path.join(TEMPLATES_DIR, "post.html"), "utf-8");
const BLOG_TEMPLATE = fs.readFileSync(path.join(TEMPLATES_DIR, "blog-template.html"), "utf-8");

const BLOG_PLACEHOLDER = "<!-- POSTS_PLACEHOLDER -->";
const PINNED_PLACEHOLDER = "<!-- PINNED_PLACEHOLDER -->";
const LAST_BUILD_TIME = "LAST_BUILD_TIME";


function extractMetadataAndContent(fileContent) {
  const metadataRegex = /<!--([\s\S]*?)-->/;
  const metaMatch = fileContent.match(metadataRegex);

  const metadata = {};
  if (metaMatch) {
    const metaLines = metaMatch[1].split("\n");
    metaLines.forEach((line) => {
      const [key, ...rest] = line.trim().split(":");
      if (key && rest.length > 0) {
        metadata[key.trim()] = rest.join(":").trim().replace(/^\"|\"$/g, "");
      }
    });
  }

  const markdownContent = fileContent.replace(metadataRegex, "").trim();
  const htmlContent = md.render(markdownContent); // Render Markdown with syntax highlighting

  return { metadata, htmlContent, markdownContent };
}

function buildPostPage(slug, metadata, content, markdownContent) {
  let page = POST_TEMPLATE.replace("{{title}}", metadata.title || "Untitled");
  page = page.replace(/{{title}}/g, metadata.title || "Unknown"); // Replace all occurrences of {{title}}
  page = page.replace(/{{author}}/g, metadata.author || "Unknown");
  page = page.replace(/{{postId}}/g, slug);
  page = page.replace(/{{excerpt}}/g, metadata.excerpt || "Unknown");
  page = page.replace(/{{date}}/g, metadata.date || "");
  page = page.replace(/{{content}}/g, content);
  page = page.replace(/{{featuredimage}}/g, metadata.img || ""); // Replace {{featuredimage}} with the img value

  function escapeForJSString(str) {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$')
      .replace(/\n/g, '\\n');
  }
  page = page.replace(/{{markdown}}/g, escapeForJSString(markdownContent));

  fs.writeFileSync(path.join(__dirname, `${slug}.html`), page);
}

function buildBlogPage(postSummaries) {
  const sriLankaTimeZone = "Asia/Colombo"; // Timezone for Sri Lanka
  const sriLankaTime = new Date().toLocaleString("en-US", { timeZone: sriLankaTimeZone }); // Convert time to Sri Lanka timezone
  const blogHTMLWithTime = BLOG_TEMPLATE.replace(
    LAST_BUILD_TIME,
    `Last build: ${sriLankaTime} (Sri Lanka Time)`
  );

  // Separate pinned and regular posts
  const pinnedPosts = postSummaries.filter((post) => post.pinned === true);
  const regularPosts = postSummaries.filter((post) => !post.pinned);

  // Generate HTML for pinned posts
  const pinnedHTML = pinnedPosts
    .map((post) => {
      return `
        <a href="/${post.slug}.html" class="post-summary pinned">
          <h2 class="title">${post.title}</h2>
          <p class="date">${post.date} — ${post.author}</p>
          <p class="excerpt">${post.excerpt}</p>
        </a>
      `;
    })
    .join("\n");

  // Generate HTML for regular posts
  const postsHTML = regularPosts
    .map((post) => {
      return `
        <a href="/${post.slug}.html" class="post-summary">
          <h2 class="title">${post.title}</h2>
          <p class="date">${post.date} — ${post.author}</p>
          <p class="excerpt">${post.excerpt}</p>
        </a>
      `;
    })
    .join("\n");

  // Replace placeholders in the blog template
  const blogHTML = blogHTMLWithTime
    .replace(PINNED_PLACEHOLDER, pinnedHTML)
    .replace(BLOG_PLACEHOLDER, postsHTML);

  fs.writeFileSync(path.join(__dirname, "index.html"), blogHTML);
}

function buildAll() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const postSummaries = [];

  files.forEach((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { metadata, htmlContent, markdownContent } = extractMetadataAndContent(raw); // Get markdownContent

    buildPostPage(slug, metadata, htmlContent, markdownContent); // Pass markdownContent directly

    postSummaries.push({
      slug,
      title: metadata.title || slug,
      author: metadata.author || "Unknown",
      date: metadata.date || "",
      excerpt: metadata.excerpt || "",
      pinned: metadata.pinned === "True", // Convert string to boolean
    });
  });

  buildBlogPage(postSummaries);
}

buildAll();
