import { finihsed , newOpened } from "../../actions/finished";
import {Items , Items2} from '../../components/data';
import OpenItemsAndMore from '../../components/OpenItemsAndAddMore';

export default async function openPage(){

    const newOpenedArray = await newOpened();
    const finihsedItems = await finihsed();
    const student =  {name:'Hussien',id:1,finished:finihsedItems}
  
    //===========================================
    const Level = (theStudent)=>{
      let sum =0 ;
      return theStudent.finished.map(item => Items[item]).map(item=>(item).significant).map(item=> sum+= parseInt(item)).pop();
    };
  const studentOpenItems = (studentOpen)=>{
      return Items2.filter(item2=> item2.level<= studentOpen.level && (item2.pre ==='none'|| studentOpen.finished.includes(item2.pre)) && !studentOpen.finished.includes(item2.name)) 
    };
  
  
    const studentLevel = Level(student);
  
    const studentWithLevel = {...student,level:Math.ceil(studentLevel/35 +0.005)+1};
  
    const openItems = studentOpenItems(studentWithLevel) ;
    const openItemsNames = openItems.map(item=>item.name);
  
    //=========================================================================================
    return(
        <div>
            <OpenItemsAndMore openItems={openItemsNames} newOpenedArray={newOpenedArray}/>
        </div>
    )
}