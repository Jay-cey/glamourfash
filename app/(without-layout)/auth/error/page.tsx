// app/auth-error/page.tsx

// Define a type for the component's props to clearly specify the searchParams structure.
// This is an internal type and does not need to be imported from 'next'.
type Props = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function AuthErrorPage({ searchParams }: Props) {
  // Wait for the searchParams promise to resolve, which is required in Next.js 15+.
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
