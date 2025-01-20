interface SeparatorProps {
  color?: string;
  thickness?: string;
  margin?: string;
  dashed?: boolean;
}

const Separator = ({
  color = "#ccc",
  thickness = "1px",
  margin = "16px 0",
  dashed = false,
}: SeparatorProps) => {
  return (
    <hr
      style={{
        border: "none",
        borderTop: `${thickness} ${dashed ? "dashed" : "solid"} ${color}`,
        margin,
      }}
    />
  );
};

export default Separator;
