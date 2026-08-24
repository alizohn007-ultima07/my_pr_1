import React from "react";

export default function Text({
  children,
  className = "",
  style = {},
  as = "span",
}) {
  const Component = as;

  return (
    <Component className={className} style={style}>
      {children}
    </Component>
  );
}
