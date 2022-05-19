import * as React from "react";

interface PageProps {
  children: React.ReactNode;
}
export default function Page(props: PageProps) {
  return <main className="p-4 md:p-8">{props.children}</main>;
}
