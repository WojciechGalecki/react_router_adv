import { redirect } from "react-router-dom";

import EventForm from "../components/EventForm";
import { backendUrl } from "../config";

export default function NewEventPage() {
  return <EventForm />;
}

export async function newEventAction({ request, params }) {
  const data = await request.formData();
  const event = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch(`${backendUrl}/events`, {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Failed to create event",
      }),
      { status: 500 }
    );
  }

  return redirect("/events");
}
