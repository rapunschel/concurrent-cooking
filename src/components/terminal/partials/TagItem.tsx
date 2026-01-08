import type React from "react";

export function TagItem({
  tag,
  style,
  isSelected,
  onClick,
}: {
  tag: string;
  style?: React.CSSProperties;
  isSelected: boolean;
  onClick?: (text: string) => void;
}) {
  return (
    <button
      className="tag"
      style={style ?? {}}
      onClick={() => {
        onClick?.(tag);
      }}
    >
      {isSelected ? `[${tag}]` : tag}
    </button>
  );
}
