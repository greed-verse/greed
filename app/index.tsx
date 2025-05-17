import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToHome = () => {
    router.push("/app/(tabs)/home/index.tsx");
  };

  return (
    <button
      onClick={goToHome}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Go to Home
    </button>
  );
}
