export default function handler(req, res) {
  // Manual CORS check at the very top
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

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
