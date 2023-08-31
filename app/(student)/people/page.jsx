import Link from "next/link";
import currentUser from "../../actions/getStudent";
import TheTable from "../../components/theTable";

export default async function Table(){
    
    const data2 = await currentUser();
    const data = data2?.finished[0].finished.split('_') || []
    return(
        <div>
            <div>
                <Link href='/student' className="font-bold px-2 m-2">Profile</Link>
            </div>
            <TheTable finishedFetch={data} />
        </div>
    )
}