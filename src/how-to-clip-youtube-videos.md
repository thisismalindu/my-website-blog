<!--
title: "How I Clipped a YouTube Video with yt-dlp + ffmpeg"
author: "Malindu"
date: "2025-05-28"
excerpt: "A simple guide on how I used yt-dlp and ffmpeg to download and trim a YouTube video for WhatsApp status, and the small tool I built around it."
img: "/img/youtube-ffmpeg-yt-dlp.png"  
pinned: False 
tags: youtube, ffmpeg, tool, yt-dlp, video
-->

## 🎥 How I Clipped a YouTube Video with yt-dlp + ffmpeg

The other day I wanted to post a short video on my WhatsApp status.
It was on YouTube, but I didn’t want the whole thing — just a small part of it.

I thought this would be simple.
But of course, **YouTube had other plans**.

---

### 🧰 What You Need

To pull this off, you need two powerful tools:

* [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) – downloads the video
* [`ffmpeg`](https://ffmpeg.org/) – trims and encodes it

I already knew about both of these. They're used behind the scenes in so many apps, and if you care about video/audio stuff even a little bit, **learning them is 100% worth it**.

---

### 📦 Step 1: Find the Right Format

You can see the list of available video+audio formats using:

```bash
yt-dlp -F <youtube-url>
```

This shows you all the format codes (like `137`, `140`, etc.)
They usually separate video and audio, so you need to combine them manually.

---

### ⬇️ Step 2: Download Video + Audio

You pick the correct codes (let's say `137` for video and `140` for audio):

```bash
yt-dlp -f 137+140 <youtube-url>
```

This gives you two separate files, usually `.mp4` and `.m4a`.

---

### 🧪 Step 3: Merge Using ffmpeg

Now we combine them into a single file:

```bash
ffmpeg -i video.mp4 -i audio.m4a -c copy output.mp4
```

This merges both without re-encoding, so it's fast and keeps the original quality.

---

### ✂️ Step 4: Trim the Clip

Let’s say you only want 20 seconds from 1:05 to 1:25:

```bash
ffmpeg -ss 00:01:05 -to 00:01:25 -i output.mp4 -c copy trimmed.mp4
```

---

### 📱 Step 5: Make It WhatsApp Friendly

Here’s the annoying part:
If you post that `trimmed.mp4` directly to WhatsApp, it **might get recompressed** or **go out of sync**.

To avoid that, re-encode it cleanly:

```bash
ffmpeg -i trimmed.mp4 -c:v libx264 -preset veryfast -crf 23 -c:a aac -b:a 128k final.mp4
```

This gives you a clean, small, synced file ready for posting.

---

### 🧪 My Attempt to Automate All This

I got tired of typing these commands every time, so I built a small app to do it for me.
You can try it too if you have Node.js and npm installed:

👉 [thisismalindu.com/github/yt-downloader](https://thisismalindu.com/github/yt-downloader)

It’s a rough web UI (no CSS, looks cursed), but it works.
You paste the URL, pick the format, trim the time, and boom – it gives you a video ready to go.

I wanted to host this on my own server, but YouTube blacklisted the IPs.
It started asking for sign-ins and detected the bot stuff, so yeah... rip public deployment.

---

### 🧱 Lessons I Learned

* ffmpeg and yt-dlp are **still super useful**, but not as easy as they used to be
* YouTube has made it way harder to download stuff lately
* The `cookies.txt` trick in yt-dlp can sometimes help bypass login, but it didn’t work for me
* I used to download tons of videos back when mobile data was rare. These days, I hardly do — except when I *really* need a clip for something like a meme or a WhatsApp status

---

### 💭 Final Thoughts

This isn’t the kind of project I’d brag about.
I didn’t write the code from scratch – **I just wanted it to work**, so I used ChatGPT to speed things up.

But even then, I learned a lot.
And sometimes, that's enough.

If you ever need to clip part of a YouTube video, this setup might save you some headache.

Or you can just use mine.
Ugly UI, but it gets the job done.
