import { SupabaseClient } from "../../utils";

const { google } = require("googleapis");

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { data, error } = await SupabaseClient.from("users").select();
    if (error) {
      res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
  }
  if (req.method === "POST") {
    const { error } = await SupabaseClient.from("users")
      .delete()
      .neq("id", "Payment ID");
    if (error) {
      res.status(500).json({ error: error.message });
    }
    const sheets = google.sheets({
      version: "v4",
      auth: process.env.GOOGLE_SHEETS_API_KEY,
    });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: req.body.spreadsheetId,
      range: "Sheet1!A:M",
    });
    const rows = response.data.values;
    for (const row of rows) {
      const [
        payment_id,
        name,
        linkedin,
        github,
        email,
        bio,
        phone,
        designation,
        twitter,
        instagram,
        portfolio,
        devlink,
        image,
      ] = row;
      if (payment_id === "Payment ID") continue;
      const { error } = await SupabaseClient.from("users").insert([
        {
          id: payment_id,
          name: name,
          linkedin: linkedin,
          github: github,
          email: email,
          bio: bio,
          phone: phone,
          designation: designation,
          twitter: twitter,
          instagram: instagram,
          portfolio: portfolio,
          devlink: devlink,
          image: image,
        },
      ]);

      if (error) {
        res.status(500).json({ error: error.message });
      }
      res.status(200).json({ message: "success" });
    }
  }
};
export default handler;
