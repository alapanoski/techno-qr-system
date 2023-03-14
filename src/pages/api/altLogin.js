export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const password = req.body.password;
      
      if (password === process.env.VOLUNTEER_ALT_PASSWORD) {
        res.status(200).json({ data: true });
      } else {
        res.status(200).json({ data: false });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
