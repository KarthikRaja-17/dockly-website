import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    const baseStyles = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "0.375rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      transition: "all 0.15s ease-in-out",
      cursor: "pointer",
      border: "none",
      outline: "none",
      textDecoration: "none",
    };

    const variants = {
      default: {
        backgroundColor: "#3b82f6",
        color: "white",
        "&:hover": {
          backgroundColor: "#2563eb",
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: "inherit",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        },
      },
      outline: {
        backgroundColor: "transparent",
        color: "#3b82f6",
        border: "1px solid #3b82f6",
        "&:hover": {
          backgroundColor: "#3b82f6",
          color: "white",
        },
      },
    };

    const sizes = {
      default: {
        height: "2.5rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      },
      sm: {
        height: "2rem",
        paddingLeft: "0.75rem",
        paddingRight: "0.75rem",
        fontSize: "0.75rem",
      },
      lg: {
        height: "3rem",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        fontSize: "1rem",
      },
    };

    const buttonStyles = {
      ...baseStyles,
      ...variants[variant],
      ...sizes[size],
      ...props.style,
    };

    return (
      <button
        ref={ref}
        style={buttonStyles}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";