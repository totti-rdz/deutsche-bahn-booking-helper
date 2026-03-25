interface Props {
  from: string;
  to: string;
  url: string;
  onRemove: () => void;
}

export default function ConnectionItem({
  from,
  to,
  url,
  onRemove,
}: Props) {
  return (
    <li className="conn-item">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="conn-link"
        title={`Von ${from} nach ${to}`}
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
