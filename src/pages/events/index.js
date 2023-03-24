import { SupabaseClient } from "../../utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
function Error() {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  async function fetchEvents() {
    const { data, error } = await SupabaseClient.from("event_list").select();
    //console.log(error);
    console.log(data);
    setEvents(data);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      {events.map((event) => {
        return (
          <div
            key={event.id}
            onClick={() => {
              router.push(`/events/${event.id}`);
            }}
          >
            <p>{event.event_name}</p>
          </div>
        );
      })}
    </>
  );
}
export default Error;
