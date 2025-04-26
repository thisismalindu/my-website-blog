# Malindu's Blog

A static blog built with plain HTML, CSS, and JavaScript, powered by a custom build script. This project uses Markdown for content creation and generates a static website with features like syntax highlighting, pinned posts, and floating action buttons.

## Features

- **Markdown-Based Content**: Write posts in Markdown, and the build script converts them into static HTML.
- **Pinned Posts**: Highlight important posts by marking them as pinned in the metadata.
- **Syntax Highlighting**: Code blocks are styled using `highlight.js` with the Atom One Dark theme.
- **Floating Action Buttons (FABs)**: Quick access to actions like sharing, printing, and copying Markdown.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Custom Build Script**: Automates the process of generating the blog from Markdown files.

## Project Structure

```
website-blog/
├── src/                # Markdown files for blog posts
├── templates/          # HTML templates for posts and the blog page
├── style.css           # Main stylesheet
├── reset.css           # Reset stylesheet
├── build.js            # Custom build script
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/thisismalindu/my-website-blog.git
   cd my-website-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Usage

#### Build the Blog
Run the build script to generate the static files:
```bash
npm run build
```

#### Watch for Changes
Automatically rebuild the blog when files change:
```bash
npm run watch
```

#### Serve the Blog Locally
Use a static file server to preview the blog locally:
```bash
npx serve
```

### Metadata for Posts

Each Markdown file should include a metadata block at the top:

```markdown
<!--
title: "Post Title"
author: "Author Name"
date: "YYYY-MM-DD"
excerpt: "Short description of the post."
img: "/path/to/image.png"
pinned: True
-->
```

- `title`: The title of the post.
- `author`: The author's name.
- `date`: The publication date.
- `excerpt`: A short summary of the post.
- `img`: Path to the featured image.
- `pinned`: Set to `True` to pin the post on the blog's main page.

### Customization

- **Themes**: Modify `style.css` to customize the blog's appearance.
- **Templates**: Edit the HTML files in the `templates/` directory to change the structure of the blog and posts.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgments

- [highlight.js](https://highlightjs.org/) for syntax highlighting.
- [NiftyButtons](https://niftybuttons.com/) for social media icons.
- [Markdown-it](https://github.com/markdown-it/markdown-it) for Markdown editing.