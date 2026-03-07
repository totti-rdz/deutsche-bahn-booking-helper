interface Props {
  from: string;
  to: string;
  url: string;
  savedAt: string;
  onRemove: () => void;
}

export default function ConnectionItem({
  from,
  to,
  url,
  savedAt,
  onRemove,
}: Props) {
  return (
    <li className="conn-item">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="conn-link"
        title={`Gespeichert am ${new Date(savedAt).toLocaleString("de-DE")}`}
      >
        <span className="conn-route">
          {from} → {to}
        </span>
      </a>
      <button className="conn-remove" title="Entfernen" onClick={onRemove}>
        ✕
      </button>
    </li>
  );
}
