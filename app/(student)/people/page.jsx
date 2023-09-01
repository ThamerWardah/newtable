import Link from "next/link";
import TheTable from "../../components/theTable";
import finished from '../../actions/finished';

export default async function Table(){
    const data = await finished();
  
    return(
        <div>
            <div>
                <Link href='/student' className="font-bold px-2 m-2">Profile</Link>
            </div>
            <TheTable finishedFetch={data} />
        </div>
    )
}