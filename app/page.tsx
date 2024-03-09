import HomePageLayout from "../layouts/HomePageLayout";
import Feeds from "../components/Feeds";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import type { Metadata } from "next";
import { getData } from "../utils/CRUD";

export const metadata: Metadata = {
  title: "Home",
  description: "Home Page of Blog",
};

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: ({ pageParam }) => {
      return getData(`feeds?page=${pageParam}&limit=10`);
    },
    staleTime: 5000,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const morePageExist = lastPage.length === 10;
      if (!morePageExist) {
        return;
      }
      return pages.length + 1;
    },
    pages: 1,
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
