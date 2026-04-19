interface Props {
  value: string;
  label: string;
}

export function MetricChip({ value, label }: Props) {
  return (
    <span className="metric-chip">
      <span className="metric-value">{value}</span>
      <span className="metric-label">{label}</span>
    </span>
  );
}
