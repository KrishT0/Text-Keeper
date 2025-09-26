import TextContent from "@/components/textContent";

type TextItem = {
  id: string;
  header: string;
  text: string;
};

async function getTexts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notes`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

const TextPage = async () => {
  const data = await getTexts();

  return (
    <div className="pb-8 ">
      {data.map((item: TextItem) => (
        <TextContent
          key={item.id}
          heading={item.header}
          id={item.id}
          text={item.text}
        />
      ))}
    </div>
  );
};

export default TextPage;
