import { PageContainer } from "@/components/PageContainer";
import { PageContents } from "@/components/PageContents";
import { PageTitle } from "@/components/PageTitle";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      {/* タイトル */}
      <PageTitle/>
      {/* コンテンツ（共通のpadding幅） */}
      <PageContainer>
        <Suspense>
          <PageContents/>
        </Suspense>
      </PageContainer>
    </div>
  );
}
