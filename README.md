# 🔍 URL Verifier

A web application that checks whether a given URL is **safe or malicious** in real-time using **Google Safe Browsing API**.  
The app consists of a **Node.js + Express backend** and a **React frontend** for live results.

---

## ✨ Features
- ✅ Verify URLs for malware, phishing, and unsafe content
- ✅ Real-time analysis with Google Safe Browsing API v4
- ✅ Domain lookup using **Whois** and **TLDts**
- ✅ Input validation with **Validator.js**
- ✅ User-friendly React frontend for quick checks

---

## 🛠️ Tech Stack
**Backend:**
- Node.js, Express.js  
- Axios (API requests)  
- Google Safe Browsing API  
- Whois, TLDts, Validator  

**Frontend:**
- React.js  
- Axios (API calls to backend)  
- Tailwind CSS / Basic CSS for styling  

---

## 📂 Project Structure
url-verifier/
│── backend/ # Express.js server
│ ├── index.js # Main backend logic
│ ├── package.json
│
│── url-verifier-frontend/ # React frontend
│ ├── src/
│ │ ├── App.js # UI for URL input & results
│ │ ├── index.js
│ ├── package.json
│
│── README.md




---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/treee27/url-verifier.git
cd url-verifier
