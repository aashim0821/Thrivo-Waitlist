# Thrivo Waitlist

Thrivo Waitlist is a beautiful, interactive, high-performance landing page designed for modern startups, creators, and investors. Built with React, Vite, Framer Motion, and Three.js for liquid glass animations and premium aesthetics.

## Features
- ✨ **High-Performance Animations**: Powered by Framer Motion, Three.js, and Lenis smooth scrolling.
- 🎨 **Liquid Glass Aesthetics**: Custom modern design with aurora gradients and responsive layouts.
- 🗂️ **Bento Grid Design**: Showcases startup profiles, investor networks, creator marketplaces, and Thrivo AI features.
- 📝 **Responsive Waitlist Forms**: Input form with dynamic role selector that scales perfectly on mobile and desktop.
- 🔒 **Secure Google Sheets Backend**: Proxied through a serverless backend function to keep spreadsheet details private.

---

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Framer Motion, Three.js / React Three Fiber, Lenis Scroll.
- **Backend / API**: Vercel Serverless Functions.
- **Database**: Google Sheets (via Google Apps Script).

---

## Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aashim0821/Thrivo-Waitlist.git
   cd Thrivo-Waitlist
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   # Local mock fallback URL or direct sheet URL (optional for dev)
   VITE_WAITLIST_API_URL=
   ```

4. **Start local server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## Backend Setup (Google Sheets Integration)

Thrivo Waitlist saves sign-ups securely into a Google Sheet using a Vercel Serverless Function to hide the Google Sheet details.

### 1. Configure the Google Sheet
1. Open Google Sheets and create a blank sheet.
2. Create three columns in the first row:
   - **Column A**: `Timestamp`
   - **Column B**: `Email`
   - **Column C**: `Role`

### 2. Deploy Google Apps Script
1. Inside the Google Sheet, go to **Extensions** -> **Apps Script**.
2. Replace any default code with:
   ```javascript
   function doPost(e) {
     try {
       var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       var email = "";
       var role = "Founder";
       
       if (e.postData.type === "application/json") {
         var data = JSON.parse(e.postData.contents);
         email = data.email;
         role = data.role;
       } else {
         email = e.parameter.email;
         role = e.parameter.role;
       }
       
       if (!email) {
         return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": "No email provided" }))
                              .setMimeType(ContentService.MimeType.JSON);
       }
       
       sheet.appendRow([new Date(), email, role]);
       
       return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
                            .setMimeType(ContentService.MimeType.JSON);
     } catch(error) {
       return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
                            .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```
3. Save the script and click **Deploy** -> **New deployment**.
4. Set the Type to **Web app**.
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
5. Deploy and copy the **Web app URL** generated.

### 3. Add to Vercel
In your Vercel Project Dashboard under **Settings** -> **Environment Variables**:
- **Key**: `GOOGLE_SHEETS_URL`
- **Value**: *Paste the Web App URL*
