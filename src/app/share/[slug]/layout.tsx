import React from "react";

function NoteLayout({ children }: { children: React.ReactNode }) {
  return <div className="py-10 px-5 sm:px-14">{children}</div>;
}

export default NoteLayout;
