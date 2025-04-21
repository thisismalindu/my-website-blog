// build.js

const fs = import("fs");
const path = import("path");
const md = import("markdown-it")();

const POSTS_DIR = path.join(__dirname, "src", "posts");
const PUBLIC_DIR = path.join(__dirname, "public");
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
  const htmlContent = md.render(markdownContent);

  return { metadata, htmlContent };
}

function buildPostPage(slug, metadata, content) {
  let page = POST_TEMPLATE.replace("{{title}}", metadata.title || "Untitled");
  page = page.replace("{{author}}", metadata.author || "Unknown");
  page = page.replace("{{date}}", metadata.date || "");
  page = page.replace("{{content}}", content);

  fs.writeFileSync(path.join(PUBLIC_DIR, "posts", `${slug}.html`), page);
}

function buildBlogPage(postSummaries) {
  const postsHTML = postSummaries
    .map((post) => {
      return `
        <a href="/posts/${post.slug}.html" class="block p-4 border-b hover:bg-gray-50">
          <h2 class="text-xl font-bold">${post.title}</h2>
          <p class="text-sm text-gray-600">${post.date} — ${post.author}</p>
          <p class="mt-1">${post.excerpt}</p>
        </a>
      `;
    })
    .join("\n");

  const blogHTML = BLOG_TEMPLATE.replace(BLOG_PLACEHOLDER, postsHTML);
  fs.writeFileSync(path.join(PUBLIC_DIR, "blog.html"), blogHTML);
}

function buildAll() {
  if (!fs.existsSync(path.join(PUBLIC_DIR, "posts"))) {
    fs.mkdirSync(path.join(PUBLIC_DIR, "posts"), { recursive: true });
  }

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
