export interface RoundProgressProps {
  radius: number;
  sqSize: number;
  strokeWidth: number;
  percentage: number;
}

export const RoundProgress = (props: RoundProgressProps) => {
  const { radius, sqSize, strokeWidth, percentage } = props;
  const viewBox: string = `0 0 ${sqSize * 2} ${sqSize * 2}`;
  const dashArray: number = radius * Math.PI * 2;
  const offsetPercentage: number = (dashArray * percentage) / (percentage <= 1 ? 1 : 100);
  const dashOffset: number = dashArray - offsetPercentage;

  return (
    <svg width={sqSize} height={sqSize} viewBox={viewBox}>
      <circle
        className="duration-[0.5s]"
        cx={sqSize}
        cy={sqSize}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
        stroke="white"
        transform={`rotate(-90 30 30)`}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
      />
    </svg>
  );
};
