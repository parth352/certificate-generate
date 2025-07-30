const puppeteer = require("puppeteer");
const fs = require("fs");

async function generateCertificate(name, course) {
  let html = fs.readFileSync("template.html", "utf8");

  // Replace placeholders
  html = html
    .replace("{{NAME}}", name)
    .replace("{{COURSE}}", course)
    .replace("{{DATE}}", new Date().toLocaleDateString());

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });

  const fileName = `certificate-${name.replace(/\s/g, "_")}.pdf`;
  await page.pdf({ path: fileName, format: "A4", printBackground: true });

  await browser.close();
  console.log(`✅ Certificate saved as ${fileName}`);
}

// Run example
generateCertificate("Parth Patel", "Node.js Mastery");
