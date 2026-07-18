import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <Link href={"/notes"}>Notes</Link>
    </main>
  );
}
