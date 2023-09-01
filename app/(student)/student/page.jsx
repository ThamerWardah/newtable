import Student from '../../components/Student';
import {finihsed} from '../../actions/finished';
import { Items } from '../../components/data';

const student = async()=>{
    const oldFinished = await finihsed();
    const studentLevel = oldFinished.reduce((a,b)=>{
        return a + (Items[b]).significant
    } ,0)
     
        return(
            <section>
                <Student oldFinished={oldFinished} studentLevel={studentLevel}/>
            </section>
        )
};
export default student;