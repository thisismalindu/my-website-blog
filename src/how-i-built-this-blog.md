<!--  
title: "How I Built This Blog"  
author: "Malindu"  
date: "2025-04-26"  
excerpt: "How I made this blog using a simple build script, without any fancy frameworks or backends."  
img: "/img/static-wins.png"  
pinned: True  
-->

## How I Built This Blog

When I started this blog, I did not want to use heavy frameworks or backend systems. I wanted something simple and fast that I could fully control.

So I built it with **Markdown**, **HTML**, **CSS**, **a little bit of JavaScript**, and a **custom build script**. 🛠️

---

### 🛠️ How It Works

I write my blog posts in Markdown files. Each file has a small block at the top where I add things like the title, author, date, and an excerpt.  
It looks like this:

```markdown
<!--
title: "Example Post"
author: "Malindu"
date: "2025-04-26"
excerpt: "An example post."
-->
```

Then I have a small JavaScript file called `build.js`.  
It reads all the Markdown files, turns them into HTML using a library called **Markdown-It**, and also does syntax highlighting for code blocks with **Highlight.js**. ✨

The script uses simple HTML templates and fills them with the content of my posts.  
It creates one HTML page per post and also updates the main blog page with all the post links.

---

### 🚀 Deployment

I do not manually upload anything.  
I just **push my Markdown files and the build script to GitHub**.  
Then **Vercel** runs the `build.js` script automatically and builds the HTML files for me.  
After that, the blog is ready to be viewed online.

It is fast, simple, and I do not have to think about servers or databases. 😎

---

### 🧠 Why I Chose This Method

I did not want complexity. I just wanted a space to post my thoughts.

This setup is good enough for that.  
There are no comments or user accounts here. If I ever want those, I would need a proper backend and database.  
But for now, **static is perfect**.

One small thing though - every time I update something, the site needs to rebuild all the HTML files again.  
Even though it is automated, it is still a step that happens.  
That said, even normal blogs do something similar in the background, so it is not a big problem.

---

### ✨ Final Thoughts

This blog might not have all the shiny features of big blogs.  
But it is **mine**, it is **simple**, it is **fast**, and it works exactly how I want.

And honestly, that is all I need. 💬

---

If you want to know more about why I chose to build it like this, check out:  
👉 **[Why Static Wins and When It Does Not](./why-static-wins.html)**
