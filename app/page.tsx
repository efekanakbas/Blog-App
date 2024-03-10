import HomePageLayout from "../layouts/HomePageLayout";
import Feeds from "../components/Feeds";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home Page of Blog",
};

export default async function Home() {
 

  return (
    <main className="">
      <HomePageLayout>
          <Feeds shareShow={true} />
      </HomePageLayout>
    </main>
  );
}
