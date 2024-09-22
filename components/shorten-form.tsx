"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ShortenForm() {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(url);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="space-y-4">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-12"
          type="url"
          placeholder="Enter your URL"
          required
        />
        <Button className="w-full py-2" type="submit">
          Shorten URL
        </Button>
      </div>
    </form>
  );
}
