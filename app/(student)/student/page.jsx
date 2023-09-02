import Student from '../../components/Student';
import {finihsed ,finihsedToFixTheError } from '../../actions/finished';
import { Items } from '../../components/data';
import Link from "next/link";

const student = async()=>{
    const oldFinished = await finihsed();
    const errorFinished = await finihsedToFixTheError();
    const studentLevel = oldFinished?.reduce((a,b)=>{
        return a + (Items[b])?.significant
    } ,0) ;
     
        return(
            <section>
                <div className="bg-black text-white px-4 py-2 shadow-md  shadow-white">
                <Link href='/openItemsPage' className="font-bold px-2 m-2">Open Items</Link>
            </div>
                <Student oldFinished={oldFinished} studentLevel={studentLevel} errorFinished={errorFinished}/>
            </section>
        )
};
export default student;