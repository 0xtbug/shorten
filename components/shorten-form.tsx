"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ShortenFormProps {
  handleUrlShortened: () => void;
}

export default function ShortenForm({ handleUrlShortened }: ShortenFormProps) {
  const [url, setUrl] = useState<string>("");
  const [customCode, setCustomCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, customCode }),
      });
      const data = await response.json();
      if (response.ok) {
        setUrl("");
        setCustomCode("");
        handleUrlShortened();
      } else {
        setError(data.error || "Failed to shorten URL");
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="url" className="text-sm sm:text-base">URL to shorten</Label>
        <Input
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-1 text-sm sm:text-base"
          type="url"
          placeholder="Enter your URL"
          required
        />
      </div>
      <div>
        <Label htmlFor="customCode" className="text-sm sm:text-base">Custom short code (optional)</Label>
        <Input
          id="customCode"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          className="mt-1 text-sm sm:text-base"
          type="text"
          placeholder="Enter custom code"
        />
      </div>
      {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}
      <Button className="w-full text-sm sm:text-base" type="submit" disabled={isLoading}>
        {isLoading ? "Shortening..." : "Shorten URL"}
      </Button>
    </form>
  );
}
