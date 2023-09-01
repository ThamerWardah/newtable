import Link from "next/link";
import AddDistributor from "./components/AddDistributor";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function Home(){
  const session = await getServerSession(authOptions)
  if(session){redirect('/student')}
  return(
    <main className="p-20">
      <section>
        <Link href='/student'>Profile</Link>
      </section>
      <AddDistributor />

    </main>
  )
};