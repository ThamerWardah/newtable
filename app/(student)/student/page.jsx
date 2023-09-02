import Student from '../../components/Student';
import {finihsed} from '../../actions/finished';
import { Items } from '../../components/data';
import Link from "next/link";

const student = async()=>{
    const oldFinished = await finihsed();
    const studentLevel = oldFinished?.reduce((a,b)=>{
        return a + (Items[b]).significant
    } ,0) || 0 ;
     
        return(
            <section>
                <div className="bg-black text-white px-4 py-2 shadow-md  shadow-white">
                <Link href='/openItemsPage' className="font-bold px-2 m-2">Open Items</Link>
            </div>
                <Student oldFinished={oldFinished} studentLevel={studentLevel}/>
            </section>
        )
};
export default student;