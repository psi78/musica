---
description: how to deploy the music portal to Render
---

To deploy your latest changes to the live website (Render), follow these steps in your command prompt (CMD or PowerShell):

1. **Navigate to the project folder:**
   ```powershell
   cd C:\Users\user\/.gemini/antigravity/scratch/music_login_project
   ```

2. **Stage your changes:**
   This tells Git to include all the files you edited.
   ```powershell
   git add .
   ```

3. **Commit your changes:**
   This "saves" the changes with a short description.
   ```powershell
   git commit -m "Update the design"
   ```

4. **Push to GitHub:**
   This sends the code to the cloud, which triggers Render to update your site.
   ```powershell
   git push
   ```

5. **Wait for Render:**
   Open your [Render Dashboard](https://dashboard.render.com/) to see the progress. It usually takes 2-3 minutes to finish the build.
