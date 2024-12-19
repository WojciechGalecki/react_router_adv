import { useRouteLoaderData } from "react-router-dom";

import EventItem from "../components/EventItem";
import { backendUrl } from "../config";

export default function EventDetailPage() {
  const data = useRouteLoaderData("event-detail");

  return <EventItem event={data.event} />;
}

export async function eventDetailsLoader({ request, params }) {
  const response = await fetch(`${backendUrl}/events/${params.id}`);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Failed to load selected event details",
      }),
      { status: 500 }
    );
  } else {
    return response;
  }
}
