export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, role } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const googleSheetsUrl = process.env.GOOGLE_SHEETS_URL;

  if (!googleSheetsUrl) {
    console.error("GOOGLE_SHEETS_URL environment variable is not configured.");
    return res.status(500).json({ error: 'Backend is misconfigured. Missing GOOGLE_SHEETS_URL.' });
  }

  try {
    // Forward the payload to the private Google Sheets Apps Script Web App URL
    const response = await fetch(googleSheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        role: role || 'Founder',
      }),
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Error communicating with Google Sheets:", error);
    return res.status(500).json({ error: 'Failed to save waitlist sign-up.' });
  }
}
