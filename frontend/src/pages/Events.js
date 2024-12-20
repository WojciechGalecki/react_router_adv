import { Await, useLoaderData } from "react-router-dom";

import EventsList from "../components/EventsList";
import { backendUrl } from "../config";
import { Suspense } from "react";

export default function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>loading...</p>}>
      <Await resolve={events}>
        {(loadEvents) => <EventsList events={loadEvents} />}
      </Await>
    </Suspense>
  );
}

async function loadEvents() {
  const response = await fetch(`${backendUrl}/events`);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Failed to load events",
      }),
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function eventsLoader() {
  return { events: loadEvents() };
}
