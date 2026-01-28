# How to Share Test Reports with Management

Ways to share the Allure test report with higher management.

---

## 1. **Jenkins – One link (recommended)**

After each build, management can open the report with a single link.

**Steps:**
1. Ensure **Allure Report** plugin is installed in Jenkins:  
   *Manage Jenkins → Plugins → search "Allure" → install*
2. Configure **Allure Commandline** in Jenkins:  
   *Manage Jenkins → Tools → Allure Commandline*
3. Your pipeline already publishes the report. After a build:
   - Open the build (e.g. **Build #9**)
   - Click **Allure Report** in the left sidebar (or the report icon)
   - Copy that URL and share it with management

**What to send to management:**  
*“Test report for build &lt;number&gt;: &lt;paste Jenkins Allure Report URL&gt;”*

They open the link in a browser; no download or extra steps.

---

## 2. **PDF for email or meetings**

Good for formal updates, emails, or slide decks.

**Steps:**
1. Open the report locally: `npm run report:open`
2. In the browser: **Ctrl+P** (or Cmd+P) → **Save as PDF** → choose location
3. Attach the PDF to email or share via Teams/Drive

**What to send:**  
Email subject like *“Playwright test report – &lt;date&gt;”* with the PDF attached.

---

## 3. **Share the report zip (for internal hosting)**

If you have an internal web server or SharePoint/Confluence:

1. **From Jenkins:** Build → **Build Artifacts** → download the archived `allure-report` (or the zip that contains it).
2. **Or locally:** Zip the `allure-report` folder after `npm run report:generate`.
3. Upload the contents (or zip) to your internal site and share the URL.

**What to send:**  
*“Latest test report: &lt;link to hosted report&gt;”*

---

## 4. **Quick summary in chat/email**

For a short status update:

- **From Jenkins:** Build page shows pass/fail. You can write:  
  *“Build #9 – All stages passed. Full report: &lt;Allure Report link&gt;”*
- **From Allure:** Open the report → **Overview** tab → copy the summary (total tests, passed, failed) and paste into Slack/Teams/email.

---

## Checklist before sharing

- [ ] Report is generated (`npm run report:generate` or Jenkins “Generate Allure Report” stage).
- [ ] For Jenkins: Allure plugin installed and “Allure Report” link is visible on the build.
- [ ] For PDF: Report opened in browser and saved as PDF.
- [ ] Link or file is shared with the right audience (management / stakeholders).
