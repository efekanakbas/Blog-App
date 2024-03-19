import HomePageLayout from "../layouts/HomePageLayout";
import Feeds from "../components/Feeds";
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getData } from '@/utils/CRUD';

export const metadata: Metadata = {
  title: "Home",
  description: "Home Page of Blog",
};

export default async function Home() {
 
  //! States
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["suggestions"],
    queryFn: async () => {
    return getData('suggestions')
  },
  });
  //!

  return (
    <main className="">
      <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePageLayout>
          <Feeds profile = {false} shareShow={true} />
      </HomePageLayout>
      </HydrationBoundary>
    </main>
  );
}
