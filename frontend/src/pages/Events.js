import EventsList from "../components/EventsList";

export default function EventsPage() {
  return <EventsList />;
}

export async function eventsLoader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // ...
  } else {
    const data = await response.json();
    return data.events;
  }
}
