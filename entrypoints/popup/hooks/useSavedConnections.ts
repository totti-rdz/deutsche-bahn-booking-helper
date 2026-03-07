import { useEffect, useState } from "react";
import {
  type SavedConnection,
  getConnections,
  removeConnection,
  onConnectionChanged,
} from "@/utils/storage";

export function useSavedConnections() {
  const [connections, setConnections] = useState<SavedConnection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConnections().then((conns) => {
      setConnections(conns);
      setLoading(false);
    });

    const unsubscribe = onConnectionChanged(() => {
      getConnections().then(setConnections);
    });

    return unsubscribe;
  }, []);

  async function remove(id: string) {
    await removeConnection(id);
    setConnections((prev) => prev.filter((c) => c.id !== id));
  }

  return { connections, loading, remove };
}
