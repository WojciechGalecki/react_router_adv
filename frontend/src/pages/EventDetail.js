import { Await, redirect, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";

import EventItem from "../components/EventItem";
import { backendUrl } from "../config";
import EventsList from "../components/EventsList";
import { loadEvents } from "./Events";

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvent(id) {
  const response = await fetch(`${backendUrl}/events/${id}`);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Failed to load selected event details",
      }),
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

export async function eventDetailsLoader({ params }) {
  return {
    event: await loadEvent(params.id), // 'await' load data before rendering component
    events: loadEvents(), // load data before rendering component
  };
}

export async function deleteEventAction({ request, params }) {
  const response = await fetch(`${backendUrl}/events/${params.id}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Failed to delete event",
      }),
      { status: 500 }
    );
  } else {
    return redirect("/events");
  }
}
