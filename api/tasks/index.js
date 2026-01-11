export default function handler(req, res) {
  // Set CORS headers IMMEDIATELY
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS preflight FIRST - no auth, no checks
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET request
  if (req.method === 'GET') {
    res.status(200).json([
      { _id: '1', name: 'Sample Task', completed: false }
    ]);
    return;
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      // Vercel provides parsed body in req.body
      const { name } = req.body || {};
      
      if (!name || name.trim() === '') {
        return res.status(400).json({ 
          error: 'Task name is required' 
        });
      }

      const task = {
        _id: Date.now().toString(),
        name: name.trim(),
        completed: false
      };

      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ 
        error: 'Internal server error' 
      });
    }
    return;
  }

  // Handle other methods
  res.status(405).end();
}
