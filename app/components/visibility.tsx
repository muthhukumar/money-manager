import * as React from "react";

export default function Visibility({
  condition,
  children,
  either,
}: {
  children: React.ReactNode;
  condition: boolean;
  either?: React.ReactNode;
}) {
  if (condition) {
    return <>{children}</>;
  }

  return <>{either ? either : null}</>;
}
