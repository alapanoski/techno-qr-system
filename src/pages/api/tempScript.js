import path from "path";
import { SupabaseClient } from "../../utils";

const handler = async (req, res) => {
  const csv = require("csv-parser");
  const fs = require("fs");
  const results = [];
  let count = 0;
  fs.createReadStream(path.join(process.cwd(), "public", "data", "deb.csv"))

    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        for (const row of results) {
          console.log(row);
          const { data: users, error: usersError } = await SupabaseClient.from(
            "users"
          )
            .insert([
              {
                id: row["id"],
                name: row["Name"],
                email: row["Email"],
                phone: row["phone"],
                // first_name: row["First Name"],
                // last_name: row["Last Name"],
                // ticket_type: row["Ticket Type"],
                food_preference: row["veg"] == "TRUE" ? "veg" : "non-veg",
                institution: row["college"],
                //category: row["category"],
                points: 0,
              },
            ])
            .select("id, name");
          console.log(users);

          const userId = users[0].id;
          console.log(userId);

          // Insert into Registers table with the user_id as a foreign key
          let { data: registers, error: registersError } =
            await SupabaseClient.from("register").insert([
              {
                bar_code: row["bar_code"],
                user_id: userId,
                event_id: 44,
              },
            ]);
          console.log({ registersError });
          console.log("Inserted:", users[0].name, userId);
          console.log("Inserted record: ", ++count);
        }

        res.send("Data imported successfully!");
      } catch (error) {
        console.error(error);
        res.send("Error importing data!");
      }
    });
};

export default handler;
