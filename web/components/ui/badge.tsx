import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, style, className }) => {
  const defaultStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "0.375rem",
    padding: "0.125rem 0.625rem",
    fontSize: "0.75rem",
    fontWeight: "600",
    lineHeight: "1.5",
    backgroundColor: "#f3f4f6",
    color: "#374151",
    ...style,
  };

  return (
    <span style={defaultStyle} className={className}>
      {children}
    </span>
  );
};