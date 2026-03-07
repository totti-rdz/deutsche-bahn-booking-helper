import ConnectionList from "./components/ConnectionList";
import EmptyState from "./components/EmptyState";
import { useSavedConnections } from "./hooks/useSavedConnections";

export default function App() {
  const { connections, loading, remove } = useSavedConnections();

  return (
    <div className="container">
      <h1>🚂 DB Booking Helper</h1>

      {loading ? (
        <p className="hint">Laden…</p>
      ) : connections.length === 0 ? (
        <EmptyState />
      ) : (
        <ConnectionList connections={connections} onRemove={remove} />
      )}
    </div>
  );
}
