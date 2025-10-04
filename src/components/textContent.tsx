"use client";

import { useState, useEffect, useRef } from "react";
import { Geist_Mono } from "next/font/google";
import {
  Copy,
  QrCode,
  Link2,
  X,
  CircleX,
  Trash2,
  Edit2,
  Save,
  Undo2,
} from "lucide-react";
import { useQRCode } from "next-qrcode";
import { toast } from "sonner";
import { deleteNoteAction, editNoteAction } from "@/app/text/action";

const geistMono = Geist_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

type TextContentPropsType = {
  id: string;
  text: string;
  heading: string;
  isDeletable?: boolean;
};

function TextContent({
  id,
  heading,
  text,
  isDeletable = true,
}: TextContentPropsType) {
  const { Image } = useQRCode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteContent, setNoteContent] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const textRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [noteContent]);

  const onClickCopy = () => {
    navigator.clipboard.writeText(text);
    toast("Text copied to clipboard");
  };

  const onClickLink = () => {
    const shareableLink = `${process.env.NEXT_PUBLIC_BASE_URL}/share/${id}`;
    navigator.clipboard.writeText(shareableLink);
    toast("Link copied to clipboard");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteNoteHandler = async () => {
    await deleteNoteAction(id);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setNoteContent(newContent);
    setHasChanges(newContent !== text);
  };

  const toggleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      textRef.current?.focus();
    }, 0);
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    await editNoteAction(id, heading, noteContent);
    toast("Changes saved successfully");
    setIsEditing(false);
    setHasChanges(false);
  };

  const cancelEdit = () => {
    setNoteContent(text);
    setHasChanges(false);
    setIsEditing(false);
  };

  return (
    <div className="pb-5 mt-2 relative">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{heading}</h3>
        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <X
                onClick={cancelEdit}
                className="h-4 hover:text-[#c0c1bd] cursor-pointer text-[#949592]"
              />
              <Undo2
                className={`h-4 cursor-pointer ${
                  hasChanges
                    ? "text-[#949592] hover:text-[#c0c1bd]"
                    : "text-[#494a48] cursor-not-allowed"
                }`}
                onClick={hasChanges ? cancelEdit : undefined}
              />
              <Save
                className={`h-4 cursor-pointer ${
                  hasChanges
                    ? "text-[#949592] hover:text-[#c0c1bd]"
                    : "text-[#494a48] cursor-not-allowed"
                }`}
                onClick={handleSave}
              />
            </>
          ) : (
            <Edit2
              className="h-4 hover:text-[#c0c1bd] cursor-pointer text-[#949592]"
              onClick={toggleEdit}
            />
          )}

          {isDeletable && (
            <Trash2
              onClick={deleteNoteHandler}
              className="h-4 hover:text-[#c0c1bd] cursor-pointer text-[#949592]"
            />
          )}
        </div>
      </div>
      <hr className="mt-1 mb-3 text-[#f5f5f51f]" />
      <div className="bg-[#1F2121] rounded-md">
        <div className="flex justify-between pb-0">
          <p
            className={`${geistMono.className} bg-[#2D2F2F] p-1 rounded-tl-md rounded-br-md font-semibold text-xs text-[#949592]`}
          >
            text
          </p>
          <div className="flex">
            <Link2
              className="h-4 m-1 hover:text-[#c0c1bd] cursor-pointer text-[#949592]"
              onClick={onClickLink}
            />
            <QrCode
              className="h-4 m-1 hover:text-[#c0c1bd] cursor-pointer text-[#949592]"
              onClick={openModal}
            />
            <Copy
              className="h-4 m-1 hover:text-[#c0c1bd] cursor-pointer text-[#949592]"
              onClick={onClickCopy}
            />
          </div>
        </div>
        <textarea
          ref={textRef}
          readOnly={!isEditing}
          value={noteContent}
          onChange={handleTextChange}
          className={`${geistMono.className} p-4 w-full whitespace-pre-wrap break-words text-xs text-[#C5C8C6] resize-none overflow-hidden focus:outline-none`}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000a9] z-50">
          <div className="bg-[#1F2121] rounded-lg p-6 relative">
            <button
              className="absolute cursor-pointer top-2 right-2 text-[#949592] hover:text-[#c0c1bd]"
              onClick={closeModal}
              aria-label="Close"
            >
              <CircleX size={20} />
            </button>
            <h4 className="text-lg font-semibold mb-4 text-[#949592]">
              QR Code
            </h4>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              text={`${process.env.NEXT_PUBLIC_BASE_URL}/share/${id}`}
              options={{ width: 200, margin: 2 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TextContent;
