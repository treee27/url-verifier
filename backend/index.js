// index.js
const express = require("express");
const axios = require("axios");
const validator = require("validator");
const whois = require("whois-json");
const { parse } = require("tldts");
const cors = require("cors");


require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/verify", async (req, res) => {
  try {
    const { url } = req.body;

    // Validate URL
    if (!validator.isURL(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    // Parse domain info
    const domainInfo = parse(url);

    // Whois lookup
    let whoisData;
    try {
      whoisData = await whois(domainInfo.domain);
    } catch (err) {
      whoisData = { error: "Whois lookup failed" };
    }

    // Google Safe Browsing API check
    const response = await axios.post(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_API_KEY}`,
      {
        client: {
          clientId: "url-verifier",
          clientVersion: "1.0.0",
        },
        threatInfo: {
          threatTypes: [
            "MALWARE",
            "SOCIAL_ENGINEERING",
            "UNWANTED_SOFTWARE",
            "POTENTIALLY_HARMFUL_APPLICATION"
          ],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url }],
        },
      }
    );

    const isMalicious = response.data.matches ? true : false;

    res.json({
      url,
      isMalicious,
      domainInfo,
      whois: whoisData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("🚀 Server running at http://localhost:3000"));
