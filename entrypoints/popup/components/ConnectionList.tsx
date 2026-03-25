import type { SavedConnection } from "@/utils/storage";
import ConnectionItem from "./ConnectionItem";

interface Props {
  connections: SavedConnection[];
  onRemove: (id: string) => void;
}

export default function ConnectionList({ connections, onRemove }: Props) {
  return (
    <ul className="conn-list">
      {connections.map((conn) => (
        <ConnectionItem
          key={conn.id}
          from={conn.from}
          to={conn.to}
          url={conn.url}
          onRemove={() => onRemove(conn.id)}
        />
      ))}
    </ul>
  );
}
