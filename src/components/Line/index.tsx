export interface LineProp {
  width?: string;
  color?: string;
}

export const Line = (props: LineProp) => {
  const { width = "100%", color = "#ffffffA0" } = props;

  return <div className="h-[1px]" style={{ width: width, background: color }} />;
};
