import connectDB from '../../../src/db.js';
import Task from '../../../src/models/Task.js';
import auth from '../../../src/middleware/authMiddleware.js';

export default async function handler(req, res) {
  try {
    // Connect to database
    await connectDB();
    
    // Handle different methods
    switch (req.method) {
      case 'GET':
        // For now, return sample data without auth
        res.status(200).json([
          { _id: '1', name: 'Sample Task 1', completed: false, priority: 'medium', category: 'work' },
          { _id: '2', name: 'Sample Task 2', completed: true, priority: 'high', category: 'personal' }
        ]);
        break;
        
      case 'POST':
        const { name, completed, priority, category } = req.body;
        
        if (!name || name.trim() === '') {
          return res.status(400).json({ 
            msg: 'Task name is required'
          });
        }
        
        const task = await Task.create({ 
          name: name.trim(), 
          completed: completed || false,
          priority: priority || 'medium',
          category: category || 'work',
          user: 'sample-user-id' // TODO: Get from auth
        });

        res.status(201).json({ 
          msg: 'Task created successfully', 
          task: task
        });
        break;
        
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ msg: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in tasks API:', error);
    res.status(500).json({ 
      msg: 'Internal server error',
      error: error.message 
    });
  }
}
