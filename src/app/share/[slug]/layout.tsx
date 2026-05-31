import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shared Note - Text Keeper",
  description: "View a note shared via Text Keeper.",
};

function NoteLayout({ children }: { children: React.ReactNode }) {
  return <div className="py-10 px-5 sm:px-14">{children}</div>;
}

export default NoteLayout;
