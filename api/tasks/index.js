export default function handler(req, res) {
  // Set CORS headers FIRST - Vercel specific approach
  res.setHeader('Access-Control-Allow-Origin', 'https://task-manager-frontend-opal-nu.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle OPTIONS preflight immediately
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      console.log('POST /api/tasks - Request received');
      console.log('Request body:', req.body);
      
      const { name } = req.body || {};
      console.log('Extracted name:', name);
      console.log('Full req.body:', JSON.stringify(req.body));
      console.log('Extracted name:', name);
      
      if (!name || name.trim() === '') {
        console.log('Task name validation failed');
        return res.status(400).json({ error: 'Task name is required' });
      }
      
      const task = { _id: Date.now().toString(), name: name.trim(), completed: false };
      console.log('Task created successfully:', task);
      
      return res.status(201).json(task);
    } catch (error) {
      console.error('POST /api/tasks - Error:', error);
      console.error('Error stack:', error.stack);
      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  }

  if (req.method === 'GET') {
    return res.status(200).json([{ _id: '1', name: 'Sample Task 1', completed: false }]);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
