import path from "path";
import { SupabaseClient } from "../../utils";

const handler = async (req, res) => {
  const csv = require("csv-parser");
  const fs = require("fs");
  const results = [];
  let count = 0;
  fs.createReadStream(path.join(process.cwd(), "public", "data", "both.csv"))
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        // Loop through each row of data and insert into Supabase tables
        for (const row of results) {
          // Insert into Users table
          const { data: users, error: usersError } = await SupabaseClient.from(
            "users"
          )
            .insert([
              {
                name: row["Name"],
                email: row["Email"],
                phone: row["phone-number"],
                first_name: row["First Name"],
                last_name: row["Last Name"],
                ticket_type: row["Ticket Type"],
                technical_workshop_topic: row["technical-workshop-topic"],
                non_technical_workshop_topic:
                  row["non-technical-workshop-topic"],
                food_preference: row["food-preferrence"],
                institution: row["institutionorganization"],
                ticket_number: row["Ticket No"],
              },
            ])
            .select();

          // console.log(users[0]);

          // Get the ID of the newly inserted user
          const userId = users[0].id;

          console.log(row["BAR/QR code No."]);

          // Insert into Registers table with the user_id as a foreign key
          const { data: registers, error: registersError } =
            await SupabaseClient.from("register").insert([
              {
                bar_code: row["BAR/QR code No."],
                user_id: userId,
                // event_id: 11,
                event_id: 22,
              },
            ]);
          console.log({ registersError });

          console.log("Inserted:", users[0].name, registers);
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
