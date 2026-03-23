"use client";

import { deleteNoteAction, editNoteAction } from "@/app/text/action";
import {
  ChevronDown,
  ChevronUp,
  CircleX,
  Copy,
  Edit2,
  Link2,
  QrCode,
  Save,
  Trash2,
  Undo2,
  X,
} from "lucide-react";
import { useQRCode } from "next-qrcode";
import { Geist_Mono } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const geistMono = Geist_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

type TextContentPropsType = {
  id: string;
  text: string;
  heading: string;
  isDeletable?: boolean;
};

const MAX_HEIGHT = 250;

function TextContent({
  id,
  heading,
  text,
  isDeletable = true,
}: TextContentPropsType) {
  const { Image } = useQRCode();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [noteContent, setNoteContent] = useState<string>(text);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [needsExpansion, setNeedsExpansion] = useState<boolean>(false);

  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;

      // Check if content exceeds max height
      if (scrollHeight > MAX_HEIGHT && !isEditing) {
        setNeedsExpansion(true);
        if (!isExpanded) {
          textarea.style.height = `${MAX_HEIGHT}px`;
        } else {
          textarea.style.height = `${scrollHeight}px`;
        }
      } else {
        setNeedsExpansion(false);
        textarea.style.height = `${scrollHeight}px`;
      }
    }
  }, [noteContent, isExpanded, isEditing]);

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
    toast("Note deleted successfully");
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setNoteContent(newContent);
    setHasChanges(newContent !== text);
  };

  const toggleEdit = () => {
    setIsEditing(true);
    setIsExpanded(true);
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

  const undoEdit = () => {
    setNoteContent(text);
    setHasChanges(false);
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div id={id} className="pb-5 mt-2 relative">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">{heading}</h3>
        <div className="flex items-center gap-1">
          {isDeletable &&
            (isEditing ? (
              <>
                <X
                  onClick={cancelEdit}
                  className="h-4 hover:text-[#c0c1bd] cursor-pointer text-[#949592]"
                />
                <Undo2
                  className={`h-4 cursor-pointer ${
                    hasChanges
                      ? "text-[#949592] hover:text-[#c0c1bd]"
                      : "text-[#494a48] cursor-default!"
                  }`}
                  onClick={hasChanges ? undoEdit : undefined}
                />
                <Save
                  className={`h-4 cursor-pointer ${
                    hasChanges
                      ? "text-[#949592] hover:text-[#c0c1bd]"
                      : "text-[#494a48] cursor-default!"
                  }`}
                  onClick={handleSave}
                />
              </>
            ) : (
              <>
                <Edit2
                  className="h-4 hover:text-[#c0c1bd] cursor-pointer text-[#949592]"
                  onClick={toggleEdit}
                />
                <Trash2
                  onClick={deleteNoteHandler}
                  className="h-4 hover:text-[#c0c1bd] cursor-pointer text-[#949592]"
                />
              </>
            ))}
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
          id={`text-content-${id}`}
          ref={textRef}
          readOnly={!isEditing}
          value={noteContent}
          onChange={handleTextChange}
          className={`${geistMono.className} scrollbar-hide p-4 w-full whitespace-pre-wrap wrap-break-words text-xs text-[#C5C8C6] resize-none font-medium ${
            needsExpansion && !isExpanded && !isEditing
              ? "overflow-hidden"
              : "overflow-hidden"
          } focus:outline-none transition-all duration-300`}
        />
        {needsExpansion && !isEditing && (
          <div
            onClick={toggleExpansion}
            className="flex items-center justify-center gap-1 py-2 cursor-pointer text-[#949592] hover:text-[#c0c1bd] text-xs transition-colors"
          >
            {isExpanded ? (
              <>
                <span>Show less</span>
                <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                <span>Show more</span>
                <ChevronDown className="h-3 w-3" />
              </>
            )}
          </div>
        )}
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
