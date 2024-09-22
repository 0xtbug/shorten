import UrlShortenerContainer from "@/components/url-shortener-container";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-xl px-4 sm:px-6 py-6 sm:py-12 space-y-6">
      <UrlShortenerContainer />
    </main>
  );
}