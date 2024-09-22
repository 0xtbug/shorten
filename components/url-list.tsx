"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Check, CopyIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Url = {
  id: string;
  shortCode: string;
  originUrl: string;
  visits: number;
};

export default function UrlList() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyUrl, setCopyurl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const shortenerUrl = (code: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

  const fetchUrls = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/urls");
      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyUrl = (code: string) => {
    const fullUrl = `${shortenerUrl(code)}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setCopyurl(code);
      setTimeout(() => {
        setCopied(false);
        setCopyurl("");
      }, 3000);
    });
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
      <h2 className="text-2xl font-bold mb-2">Recent URLs</h2>
      <ul className="space-y-2">
        {urls.map((url) => (
          <li
            key={url.id}
            className="flex items-center gap-2 justify-between bg-card rounded-md text-card-foreground border p-3"
          >
            <Link
              href={`/${url.shortCode}`}
              target="_blank"
              className="text-blue-500"
            >
              {shortenerUrl(url.shortCode)}
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
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
              <span className="flex items-center gap-2">
                <EyeIcon className="h-4 w-4" />
                {url.visits} views
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
