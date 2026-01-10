export default function handler(req, res) {
  // Set CORS headers IMMEDIATELY for all requests
  res.setHeader("Access-Control-Allow-Origin", "https://task-manager-frontend-opal-nu.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");

  // Handle OPTIONS preflight request immediately
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "GET") {
    return res.status(200).json([
      { _id: "1", name: "Sample Task", completed: false }
    ]);
  }

  if (req.method === "POST") {
    let body = '';
    
    // Parse the request body
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      console.log("POST RECEIVED");
      console.log("RAW BODY:", body);
      
      let parsedBody;
      try {
        parsedBody = JSON.parse(body);
        console.log("PARSED BODY:", parsedBody);
      } catch (error) {
        console.log("JSON PARSE ERROR:", error);
        res.status(400).json({ error: "Invalid JSON" });
        return;
      }

      if (!parsedBody?.name) {
        console.log("NAME MISSING");
        res.status(400).json({ error: "Name required" });
        return;
      }

      const task = {
        _id: Date.now().toString(),
        name: parsedBody.name,
        completed: false
      };

      console.log("TASK CREATED:", task);
      res.status(201).json(task);
      return;
    });
    
    return;
  }

  return res.status(405).end();
}
