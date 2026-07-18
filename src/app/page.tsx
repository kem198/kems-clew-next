import Link from "next/link";

export default function Home() {
  return (
    <main className="prose">
      <div className="flex flex-col gap-4">
        <Link href={"/notes"}>Notes</Link>
        <Link href={"/works"}>Works</Link>
        <Link href={"/about"}>About</Link>
      </div>
    </main>
  );
}
