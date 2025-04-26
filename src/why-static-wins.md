<!--
title: "Why Static Wins"
author: "Malindu"
date: "2025-04-21"
excerpt: "Exploring the benefits and limitations of static sites, and why they are a great choice for simplicity, speed, and security."
img: "/img/static-wins.png"
pinned: False
-->

## Why Static Wins And When It Doesn’t

Static sites are still around for a reason. They are **simple**, **fast** and **reliable**. When I built my blog I didn’t use any big frameworks or backends. Just plain markdown, html, css and a small build script. And it worked *really well* 🚀.

But I’m not saying this is perfect. Static sites have limits too ⚠️

---

### ✅ Why Static Wins

**⚡ Fast**  
Static sites are just files that are already built. So there is no waiting. The browser just shows the page right away.

**🔍 Good for Search Engines**  
What you see is what search engines see. No extra steps or hidden content. So it helps your site show up better in search.

**🧠 Simple to Build and Understand**  
No need to think about databases or complex code. You write your content and it works.

**🛡️ Safe**  
Since there is no backend there is less chance for someone to hack it.

**💸 Free to Host**  
You can host it for free on places like Vercel or GitHub Pages and it will be fast too.

---

### ❌ When Static Doesn’t Work

**💬 Things Like Comments or Forms**  
Without a backend I can’t really add comments or stuff like that. If I try to do it from the browser it will expose my APIs and that is not safe. So I would need a backend and a database to make it work properly.

**🔁 Updating Content**
Every time I update something, the site needs to be rebuilt into HTML files. This is automated for me with a script running on Vercel when I push to GitHub, so it's not hard. But still, building everything again for each update can feel like a small hassle. Then again, even in other blog systems, something similar happens behind the scenes. We don’t usually write in raw HTML anyway - it gets parsed and turned into HTML one way or another. So it’s not really a big problem.
**📦 Not Great for Complex Features**  
If I want user logins or dashboards or anything with live data then static will not work. I would have to build a whole backend for that.

---

### 🤔 Why I Still Chose Static

I just wanted this blog to *exist*. I’m not looking for views or comments or likes. I just want to write and share stuff. So for me static is enough ✍️

Yes my blog is missing some things that other blogs have. But I’m fine with that. If one day I want to make it big with more features then I will have to use something else.

But right now this is *good for what I want*.

---

If you want to know *how I built this blog from scratch* I wrote about that too.
Here it is 👉 **[How I Built This Static Blog](#)**.
