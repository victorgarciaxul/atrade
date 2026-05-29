"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <h2 className="text-xl font-semibold text-primary">Algo salió mal.</h2>
          <button
            onClick={reset}
            className="bg-green text-white px-5 py-2 rounded-full text-sm"
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  );
}
