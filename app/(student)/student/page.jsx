import Student from '../../components/Student';
import {finihsed ,finihsedToFixTheError } from '../../actions/finished';
import {currentUser} from '../../actions/getStudent';
import { Items } from '../../components/data';

const student = async()=>{
    const user = await currentUser();
    const oldFinished = await finihsed();
    const errorFinished = await finihsedToFixTheError();
    const studentLevel = oldFinished?.reduce((a,b)=>{
        return a + (Items[b])?.significant
    } ,0) ;
     
        return(
            <section>
             
                <Student oldFinished={oldFinished} studentLevel={studentLevel} errorFinished={errorFinished} user={user}/>

            </section>
        )
};
export default student;