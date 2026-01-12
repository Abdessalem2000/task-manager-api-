export default function handler(req, res) {
  // CORS headers at VERY TOP - first thing executed
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { name } = req.body || {};
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Task name is required' });
    }
    const task = { _id: Date.now().toString(), name: name.trim(), completed: false };
    return res.status(201).json(task);
  }

  if (req.method === 'GET') {
    return res.status(200).json([{ _id: '1', name: 'Sample Task 1', completed: false }]);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
