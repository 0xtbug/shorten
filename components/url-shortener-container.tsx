"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ShortenForm from "./shorten-form";
import UrlList from "./url-list";
import { Button } from "./ui/button";
import { Loader2, SquareSlash } from "lucide-react";
import { LogOut } from "lucide-react";

export default function UrlShortenerContainer() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [username, setUsername] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleUrlShortened = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/logout", { method: "POST" });
      localStorage.removeItem("username");
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-bold text-center flex items-center justify-center">
          Shorten <SquareSlash className="ml-2" />
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-sm sm:text-base">{username}</span>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600 hover:bg-red-100"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <LogOut className="h-5 w-5" />
            )}
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
      <ShortenForm handleUrlShortened={handleUrlShortened} />
      <UrlList key={refreshKey} />
    </div>
  );
}
