const fs = require("fs");
const wkhtmltopdf = require("wkhtmltopdf");

async function generateCertificate(name, course) {
  const date = new Date().toLocaleDateString();

  // Read and replace placeholders in HTML
  let html = fs.readFileSync("template.html", "utf8");
  html = html
    .replace("{{NAME}}", name)
    .replace("{{COURSE}}", course)
    .replace("{{DATE}}", date);

  const fileName = `certificate-${name.replace(/\s/g, "_")}.pdf`;

  // Generate PDF
  wkhtmltopdf(html, { output: fileName }, (err) => {
    if (err) {
      console.error("Failed to generate certificate:", err);
    } else {
      console.log("Certificate saved as " + fileName);
    }
  });
}

// Run example
generateCertificate("Parth Patel", "Node.js Mastery");
