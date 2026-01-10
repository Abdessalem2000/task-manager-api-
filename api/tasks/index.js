export default function handler(req, res) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://task-manager-frontend-opal-nu.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json([
      { _id: "1", name: "Sample Task", completed: false }
    ]);
  }

  if (req.method === "POST") {
    console.log("POST RECEIVED");
    console.log("BODY:", req.body);

    if (!req.body?.name) {
      return res.status(400).json({ error: "Name required" });
    }

    return res.status(201).json({
      _id: Date.now().toString(),
      name: req.body.name,
      completed: false
    });
  }

  return res.status(405).end();
}
