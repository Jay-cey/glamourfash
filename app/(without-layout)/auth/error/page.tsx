// app/(without-layout)/auth/error/page.tsx

type Props = {
  // searchParams is now a Promise of the key-value object
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function AuthErrorPage({ searchParams }: Props) {
  // Await the searchParams promise to resolve the object
  const resolvedSearchParams = await searchParams;
  const error = resolvedSearchParams?.error;

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
