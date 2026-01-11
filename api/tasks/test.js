export default function handler(req, res) {
  // Set CORS headers IMMEDIATELY
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS preflight FIRST - no auth, no checks
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only after OPTIONS, handle actual requests
  res.status(200).json({ ok: true });
}
