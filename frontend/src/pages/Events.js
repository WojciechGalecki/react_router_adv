import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

export default function EventsPage() {
  const data = useLoaderData();

  return <EventsList events={data.events} />;
}

export async function eventsLoader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Failed to load events",
      }),
      { status: 500 }
    );
  } else {
    return response;
  }
}
