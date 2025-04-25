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

  return { metadata, htmlContent };
}

function buildPostPage(slug, metadata, content) {
  let page = POST_TEMPLATE.replace("{{title}}", metadata.title || "Untitled");
  page = page.replace("{{title}}", metadata.title || "Unknown");
  page = page.replace("{{author}}", metadata.author || "Unknown");
  page = page.replace("{{date}}", metadata.date || "");
  page = page.replace("{{content}}", content);

  fs.writeFileSync(path.join(__dirname, `${slug}.html`), page);
}

function buildBlogPage(postSummaries) {
  const postsHTML = postSummaries
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

  const blogHTML = BLOG_TEMPLATE.replace(BLOG_PLACEHOLDER, postsHTML);
  fs.writeFileSync(path.join(__dirname, "index.html"), blogHTML);
}

function buildAll() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const postSummaries = [];

  files.forEach((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { metadata, htmlContent } = extractMetadataAndContent(raw);

    buildPostPage(slug, metadata, htmlContent);

    postSummaries.push({
      slug,
      title: metadata.title || slug,
      author: metadata.author || "Unknown",
      date: metadata.date || "",
      excerpt: metadata.excerpt || "",
    });
  });

  buildBlogPage(postSummaries);
}

buildAll();
