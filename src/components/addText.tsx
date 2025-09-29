"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { addTextAction } from "@/app/text/action";

function AddText() {
  const [text, setText] = useState("");
  const [heading, setHeading] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setHeading("");
    setIsModalOpen(false);
  };

  const handleAddTextClick = async () => {
    openModal();
  };

  const handleAddText = async () => {
    setText("");
    setHeading("");
    await addTextAction({ header: heading, text });
    closeModal();
  };

  return (
    <>
      <div className="sticky shadow-lg z-1 shadow-black top-15 left-0 w-full border-2 rounded-xl mb-5 h-24 bg-[#1F2121] flex flex-col text-xs p-1">
        <textarea
          placeholder="Paste your text here..."
          className=" border-none outline-none m-2 h-10 text-sm resize-none"
          value={text}
          onChange={handleChange}
        />
        <div className="flex gap-3 justify-end pr-3">
          {/* <Search className="w-8 cursor-pointer hover:bg-[#2D2F2F] rounded-md p-[4px]" /> */}
          <Plus
            className={`w-8 ${
              text
                ? "cursor-pointer bg-[#EDEDED] text-[#191A1A] font-semibold"
                : "bg-[#2D2F2F] text-[#636363]"
            } rounded-md p-[4px]`}
            onClick={text ? handleAddTextClick : undefined}
          />
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000a9] z-50">
          <div className="bg-[#1F2121] rounded-lg p-6">
            <div className="flex justify-between items-center gap-10 mb-8">
              <h4 className="mb-0 font-semibold text-[#949592]">
                Enter heading for the text
              </h4>
              <button
                className="cursor-pointer top-2 right-2 text-[#949592] hover:text-[#c0c1bd]"
                onClick={closeModal}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              id="heading"
              className="w-full p-1 px-2 mb-4 bg-[#2D2F2F] rounded text-sm text-[#C5C8C6] outline-none"
              placeholder="Heading"
              autoComplete="off"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
            <button
              disabled={!heading}
              className={`px-4 py-1 text-sm font-semibold cursor-pointer bg-[#3A3C3C] text-[#C5C8C6] rounded hover:bg-[#4A4C4C] ${
                !heading && "opacity-50 !cursor-not-allowed"
              }`}
              onClick={handleAddText}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddText;
