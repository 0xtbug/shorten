import RegisterForm from "@/components/register-form";
import { SquareSlash } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-center flex items-center justify-center">
            Shorten <SquareSlash className="ml-2" />
          </h1>
          <p className="text-center text-gray-600 text-sm">
            Shorten your URLs and share them easily
          </p>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}