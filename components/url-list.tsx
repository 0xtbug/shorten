"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Check, CopyIcon, EyeIcon, TrashIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";

type Url = {
  id: string;
  shortCode: string;
  originalUrl: string;
  visits: number;
};

export default function UrlList() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyUrl, setCopyurl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const shortenerUrl = (code: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

  const fetchUrls = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/urls");
      if (!response.ok) {
        throw new Error("Failed to fetch URLs");
      }
      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyUrl = async (code: string) => {
    const fullUrl = `${shortenerUrl(code)}`;
    setCopyError(null);

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        // Fallback method
        const textArea = textAreaRef.current;
        if (!textArea) return;

        textArea.value = fullUrl;
        textArea.style.display = 'block';
        textArea.select();
        document.execCommand('copy');
        textArea.style.display = 'none';
      }

      setCopied(true);
      setCopyurl(code);
      setTimeout(() => {
        setCopied(false);
        setCopyurl("");
      }, 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      setCopyError("Failed to copy. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/urls/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUrls(urls.filter(url => url.id !== id));
      } else {
        console.error("Failed to delete URL");
      }
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <ul className="space-y-2">
          {[1, 2, 3].map((num) => (
            <li
              key={num}
              className="flex items-center gap-2 rounded-md border bg-card p-4 text-card-foreground justify-between"
            >
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                    <span className="flex items-center gap-2">
                    <div className="h-4 w-5 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 w-10 rounded"></div>
                    </span>
                </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Recent URLs</h2>
      <ul className="space-y-2">
        {urls.map((url) => (
          <li
            key={url.id}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 justify-between bg-card rounded-md text-card-foreground border p-3"
          >
            <Link
              href={`/${url.shortCode}`}
              target="_blank"
              className="text-blue-500 text-sm sm:text-base break-all"
            >
              {shortenerUrl(url.shortCode)}
            </Link>
            <div className="flex items-center gap-1 mt-2 sm:mt-0">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:bg-muted"
                onClick={() => handleCopyUrl(url.shortCode)}
              >
                {copied && copyUrl == url.shortCode ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
                <span className="sr-only">Copy URL</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:bg-red-100"
                onClick={() => handleDelete(url.id)}
              >
                <TrashIcon className="w-4 h-4" />
                <span className="sr-only">Delete URL</span>
              </Button>
              <span className="flex items-center gap-1 text-xs sm:text-sm">
                <EyeIcon className="h-4 w-4" />
                {url.visits} views
              </span>
            </div>
          </li>
        ))}
      </ul>
      <textarea
        ref={textAreaRef}
        style={{ position: 'absolute', left: '-9999px' }}
        aria-hidden="true"
      />
      {copyError && <p className="text-red-500 text-sm mt-2">{copyError}</p>}
    </div>
  );
}
