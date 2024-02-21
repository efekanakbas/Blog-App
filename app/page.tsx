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
  title: "Home",
  description: "Home Page of Blog",
};

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: ({pageParam}) => {
    return axios.get(`https://65cbe2afefec34d9ed883ace.mockapi.io/feed?page=${pageParam}&limit=5`).then((response) => response.data);
  },
  staleTime: 5000,
  initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const morePageExist = lastPage.length === 5;
      if(!morePageExist) {
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
