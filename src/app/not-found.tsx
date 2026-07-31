import { ContentArea } from "@/components/shared/content-area";
import Link from "next/link";

export default async function NotFoundPage() {
  return (
    <ContentArea className="flex flex-1">
      <div>
        <h1>404</h1>
        <p>ページが見つかりません。</p>
        <p>
          <Link href="/">トップへ戻る</Link>
        </p>
      </div>
    </ContentArea>
  );
}
