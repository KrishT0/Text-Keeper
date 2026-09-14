"use client";

import {
  createShareLink,
  deleteNoteAction,
  editNoteAction,
} from "@/app/text/action";
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
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [customExpiry, setCustomExpiry] = useState(60);
  const [isCreatingShareLink, setIsCreatingShareLink] = useState(false);

  const textRef = useRef<HTMLTextAreaElement>(null);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const isDeployed = !!process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  const baseUrl = isDeployed
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

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

  useEffect(() => {
    if (!isShareMenuOpen) return;

    const handleOutsideClick = (event: PointerEvent) => {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target as Node)
      ) {
        setIsShareMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    return () =>
      document.removeEventListener("pointerdown", handleOutsideClick);
  }, [isShareMenuOpen]);

  const onClickCopy = () => {
    navigator.clipboard.writeText(text);
    toast("Text copied to clipboard");
  };

  const onClickLink = () => {
    setIsShareMenuOpen((isOpen) => !isOpen);
  };

  const createAndCopyShareLink = async (
    expiry: "hour" | "day" | "never" | number,
  ) => {
    setIsCreatingShareLink(true);

    const result = await createShareLink(id, expiry);

    if (result.error) {
      toast.error(result.error);
      setIsCreatingShareLink(false);
      return;
    }

    const token = result.token
      ? `?token=${encodeURIComponent(result.token)}`
      : "";
    const shareableLink = `${baseUrl}/share/${id}${token}`;

    await navigator.clipboard.writeText(shareableLink);
    setIsShareMenuOpen(false);
    setIsCreatingShareLink(false);
    toast("Link copied to clipboard");
  };

  const createCustomShareLink = () => {
    if (!Number.isInteger(customExpiry) || customExpiry < 1) {
      toast.error("Enter at least 1 minute");
      return;
    }

    void createAndCopyShareLink(customExpiry);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteNoteHandler = async () => {
    const result = await deleteNoteAction(id);

    if (result.error) {
      toast.error(result.error);
      return;
    }

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

    const result = await editNoteAction(id, heading, noteContent);

    if (result.error) {
      toast.error(result.error);
      return;
    }

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
            className={`${geistMono.className} bg-[#2D2F2F] p-1.5 rounded-tl-md rounded-br-md font-semibold text-xs text-[#949592]`}
          >
            text
          </p>
          <div className="flex items-start">
            <div ref={shareMenuRef} className="relative">
              <button
                type="button"
                aria-label="Share note"
                aria-expanded={isShareMenuOpen}
                onClick={onClickLink}
                className="m-1 text-[#949592] cursor-pointer transition-colors hover:text-[#c0c1bd]"
              >
                <Link2 className="h-4" />
              </button>

              {isShareMenuOpen && (
                <div className="absolute right-1 top-5 z-30 w-52 rounded-md border-[3px] border-[#f5f5f535] bg-[#262828] p-2 shadow-xl">
                  <p className="px-2 pb-2 text-sm font-medium text-[#C5C8C6]">
                    Link expires in
                  </p>
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      disabled={isCreatingShareLink}
                      onClick={() => void createAndCopyShareLink("hour")}
                      className="rounded cursor-pointer px-2 py-1.5 text-left text-xs text-[#949592] transition-colors hover:bg-[#363939] hover:text-[#EDEDED] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      1 hour
                    </button>
                    <button
                      type="button"
                      disabled={isCreatingShareLink}
                      onClick={() => void createAndCopyShareLink("day")}
                      className="rounded cursor-pointer px-2 py-1.5 text-left text-xs text-[#949592] transition-colors hover:bg-[#363939] hover:text-[#EDEDED] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      1 day
                    </button>
                    <button
                      type="button"
                      disabled={isCreatingShareLink}
                      onClick={() => void createAndCopyShareLink("never")}
                      className="rounded cursor-pointer px-2 py-1.5 text-left text-xs text-[#949592] transition-colors hover:bg-[#363939] hover:text-[#EDEDED] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Never
                    </button>
                  </div>
                  <div className="mt-2 border-t border-[#3b3d3d] pt-2">
                    <label
                      htmlFor={`custom-expiry-${id}`}
                      className="mb-1 block px-2 text-xs text-[#949592]"
                    >
                      Custom minutes
                    </label>
                    <div className="flex gap-1 px-1">
                      <input
                        id={`custom-expiry-${id}`}
                        type="number"
                        min="1"
                        max="525600"
                        value={customExpiry}
                        onChange={(event) =>
                          setCustomExpiry(Number(event.target.value))
                        }
                        className="[appearance:textfield] w-full rounded bg-[#2D2F2F] px-2 py-1 text-xs text-[#C5C8C6] outline-none placeholder:text-[#696b69] focus:ring-1 focus:ring-[#949592] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder="Minutes"
                      />
                      <button
                        type="button"
                        disabled={isCreatingShareLink}
                        onClick={createCustomShareLink}
                        className="rounded bg-[#EDEDED] px-2 py-1 text-xs font-medium text-[#191A1A] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                      >
                        {isCreatingShareLink ? "..." : "Copy"}
                      </button>
                    </div>
                    <p className="px-2 pt-1 text-[10px] text-[#696b69]">
                      Up to 1 year
                    </p>
                  </div>
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="Generate QR code"
              onClick={openModal}
              className="m-1 text-[#949592] cursor-pointer transition-colors hover:text-[#c0c1bd]"
            >
              <QrCode className="h-4" />
            </button>
            <button
              type="button"
              aria-label="Copy note text"
              onClick={onClickCopy}
              className="m-1 text-[#949592] cursor-pointer transition-colors hover:text-[#c0c1bd]"
            >
              <Copy className="h-4" />
            </button>
          </div>
        </div>
        <textarea
          id={`text-content-${id}`}
          ref={textRef}
          readOnly={!isEditing}
          value={noteContent}
          onChange={handleTextChange}
          className={`${geistMono.className} scrollbar-hide p-4 w-full whitespace-pre-wrap text-xs text-[#C5C8C6] resize-none font-medium ${
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
              text={`${baseUrl}/share/${id}`}
              options={{ width: 200, margin: 2 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TextContent;
