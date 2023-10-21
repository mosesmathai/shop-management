import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import HomeStats from "@/components/HomeStats";

export default function Home() {
  const {data: session} = useSession()
  return (
    <Layout>
      Hello&#44; {session?.user?.name}&#128521;
      <HomeStats />
    </Layout>
  )
}
