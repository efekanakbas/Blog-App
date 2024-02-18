import HomePageLayout from "../layouts/HomePageLayout";
import Feeds from "../components/Feeds";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Home Page of Blog",
};

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["feeds"],
    queryFn: () => {
    return axios.get("https://65cbe2afefec34d9ed883ace.mockapi.io/feed").then((response) => response.data);
  },
  });

  return (
    <main className="">
      <HomePageLayout>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Feeds shareShow={true} />
        </HydrationBoundary>
      </HomePageLayout>
    </main>
  );
}
