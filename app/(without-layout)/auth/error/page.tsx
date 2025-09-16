import type { PageProps } from 'next';

export default async function AuthErrorPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const error = resolvedSearchParams.error;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
      {error === "OAuthAccountNotLinked" ? (
        <p>Please log in with the same provider you used originally.</p>
      ) : (
        <p>Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
