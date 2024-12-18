import { Link } from "react-router-dom";

const EVENTS = [
  {
    id: 1,
    name: "Event 1",
  },
  {
    id: 2,
    name: "Event 2",
  },
  {
    id: 3,
    name: "Event 3",
  },
];

export default function EventsPage() {
  return (
    <>
      <h1>Events Page</h1>
      <ul>
        {EVENTS.map((e) => (
          <li key={e.id}>
            <Link to={`${e.id}`}>{e.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
