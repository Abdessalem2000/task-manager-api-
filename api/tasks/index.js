export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://task-manager-frontend-opal-nu.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Handle POST requests for adding tasks
  if (req.method === 'POST') {
    try {
      const { name, completed, priority, category } = req.body;
      
      if (!name || name.trim() === '') {
        return res.status(400).json({ 
          msg: 'Task name is required'
        });
      }
      
      // Create a simple task response (without database for now)
      const task = {
        _id: Date.now().toString(),
        name: name.trim(),
        completed: completed || false,
        priority: priority || 'medium',
        category: category || 'work',
        createdAt: new Date().toISOString()
      };

      res.status(201).json({ 
        msg: 'Task created successfully', 
        task: task
      });
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ 
        msg: 'Internal server error',
        error: error.message 
      });
    }
    return;
  }
  
  // Handle GET requests
  if (req.method === 'GET') {
    try {
      // Return sample tasks for now
      const tasks = [
        { _id: '1', name: 'Sample Task 1', completed: false, priority: 'medium', category: 'work', createdAt: new Date().toISOString() },
        { _id: '2', name: 'Sample Task 2', completed: true, priority: 'high', category: 'personal', createdAt: new Date().toISOString() }
      ];
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ 
        msg: 'Internal server error',
        error: error.message 
      });
    }
    return;
  }
  
  // Handle other methods
  res.status(405).json({ msg: 'Method not allowed' });
}
