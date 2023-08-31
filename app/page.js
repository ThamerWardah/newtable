import Link from "next/link";
import AddDistributor from "./components/AddDistributor";


export default async function Home(){

  return(
    <main className="p-20">
      <section>
        <Link href='/student'>Profile</Link>
      </section>
      <AddDistributor />

    </main>
  )
};