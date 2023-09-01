'use client'
import { useState } from "react"
import {Items , Items2 , table , lectureTime ,colors} from '../components/data'


export default  function TheTable({finishedFetch}){

    const student =   {finished:finishedFetch}
const lectureTimes = lectureTime;
  const [takeItem,setTakeItem] = useState([]);
  const [newToFinish,setNewToFinish]= useState(student.finished)
  
  const Level = (theStudent)=>{
      let sum =0 ;
      return theStudent.finished.map(item => Items[item]).map(item=>(item).significant).map(item=> sum+= parseInt(item)).pop();
    };
 const studentOpenItems = (studentOpen)=>{
      return Items2.filter(item2=> item2.level<= studentOpen.level && (item2.pre ==='none'|| studentOpen.finished.includes(item2.pre)) && !studentOpen.finished.includes(item2.name)) 
    };


    const studentLevel = Level(student);
    const studentWithLevel = {...student,level:Math.ceil(studentLevel/35)+2};

    const openItems = studentOpenItems(studentWithLevel) ;
    const openItemsNames = openItems.map(item=>item.name)


    const newTable = table.map(a=>a.filter(b=>openItemsNames.includes(b.slice(0,4))));
   

    var available = [];
    for (let i = 0; i < newTable.length; i++) {
        for (let j = 0; j < newTable[i].length; j++) {
            if(!available.includes(newTable[i][j])){
           available = [...available,newTable[i][j]] }else{ null}
        }
    };

    const available2 = available.filter(a=>!takeItem.map(item=>item.slice(0,4)).includes(a.slice(0,4)))

   
    const handleRemove = (e)=>{
      const remove = takeItem.filter(item=>item !== e);
      setTakeItem(remove);
      setNewToFinish([...finishedFetch,...remove])
    }

    // solveing the same time items issue 
    
    const compareFunction = (item)=>{
        let iden = []
        for (let i = 0; i < takeItem.length; i++) {
            iden = [...iden,item.includes(takeItem[i])]
        };
        return iden.includes(true)
    };
    const compare = newTable.filter(a=>compareFunction(a));

    var availableCompare = [];
    for (let i = 0; i < compare.length; i++) {
        for (let j = 0; j < compare[i].length; j++) {
            if(!availableCompare.includes(compare[i][j])){
           availableCompare = [...availableCompare,compare[i][j]] }else{ null}
        }
    };
    //======================================
    // finding the index of the ritgh element 
    const compareFunctionOfIndex = (item)=>{
        let iden = []
        for (let i = 0; i < item.length; i++) {
            iden = [...iden,takeItem.includes(item[i])]
        };
        return iden.indexOf(true,0)
    };

    const secondStep = newTable.map(item=>compareFunctionOfIndex(item))



    //==================================
    const numberOfUnits = (one)=>{
        let sum =0 ;
        return one.map(item => Items[item.slice(0,4)]).map(item=>item.significant).map(item=> sum+= parseInt(item)).pop();
      };
      const numberOfUnit = numberOfUnits(takeItem);

      const color= {} 
      for (let k = 0; k < available.length; k++) {
        color[available[k]]=colors[k]
      }

//======== Cat items ======
      const IDM = newToFinish.filter(item=>Items[item?.slice(0,4)]?.cat === 'DM').map(a=>a?.slice(0,4));
        let IDM_Unit = Level({finished:IDM});

      const IDO = newToFinish.filter(item=>Items[item?.slice(0,4)]?.cat === 'DO').map(a=>a?.slice(0,4));
        let IDO_Unit = Level({finished:IDO});

      const IUM = newToFinish.filter(item=>Items[item?.slice(0,4)]?.cat === 'UM').map(a=>a?.slice(0,4));
        let IUM_Unit = Level({finished:IUM});

      const ICM = newToFinish.filter(item=>Items[item?.slice(0,4)]?.cat === 'CM').map(a=>a?.slice(0,4));
        let ICM_Unit = Level({finished:ICM});

      const ICO = newToFinish.filter(item=>Items[item?.slice(0,4)]?.cat === 'CO').map(a=>a?.slice(0,4));
        let ICO_Unit = Level({finished:ICO});


 


    return (
        <div className="w-full h-full px-2 py-4 ">

               

            <div className="flex justify-between gap-2">
              <div className=" w-1/2 px-2 h-32 ">

               <div className="flex flex-wrap gap-1 text-[8px] font-bold">
                    {available2.map((item,index)=><div key={index}>
                    {!takeItem.includes(item) && !availableCompare.includes(item)&& <button value={item} onClick={(e)=>{
                            setTakeItem([...takeItem,e.target.value]);
                            setNewToFinish([...newToFinish,e.target.value])
                            }} className=" border-2 border-green-300  bg-white rounded-md px-1 ">{item}</button>}
                    </div>)}
             </div>  
            </div>
            <div className="w-1/2 flex flex-col gap-4 text-end text-[8px] font-bold mb-2">
                              <h1>71\{IDM_Unit?IDM_Unit:0} = متطلبات القسم الاجباريه</h1>
                              <h1>30\{IDO_Unit?IDO_Unit:0} = متطلبات القسم الاختياريه</h1>
                              <h1>13\{IUM_Unit?IUM_Unit:0} = متطلبات الجامعه الاجباريه</h1>
                              <h1>12\{ICM_Unit?ICM_Unit:0} = متطلبات الكليه الاجباريه</h1>
                              <h1>14\{ICO_Unit?ICO_Unit:0} = متطلبات الكليه الاختياريه</h1> 
                      </div>
            </div>
            <div className="bg-green-300 p-1 rounded-md">
             <div className="bg-white overflow-hidden shadow-lg shadow-black/60 rounded-lg rounded-tl-[80px] p-1 text-[10px]">
               
                <div className="w-20 h-20 rounded-full relative bg-gray-100 shadow-md shadow-green-500 flex justify-center items-center overflow-hidden">
                <h1 className="text-2xl font-bold z-10">{numberOfUnit?numberOfUnit:0}</h1>
                <h1 className="font-bold text-blue-500 absolute bottom-2">Units</h1>
                {numberOfUnit<12 &&<div className="w-12 h-11 absolute top-[6px] bg-red-200 rounded-full animate-ping"></div>}
                </div>

                <div className="grid grid-rows-5 grid-cols-6">
                    {newTable.map((item,index)=><div key={index}>
                        <div className="my-2 text-center">
                            <h1 className="font-bold text-[8px] bg-gray-100">
                                 {lectureTimes[index]}
                            </h1>
                            <h1 className={`text-xs  py-2 font-bold ${newTable[index][secondStep[index]]?color[newTable[index][secondStep[index]]]:"bg-gray-100"}`}>
                                {newTable[index][secondStep[index]]?newTable[index][secondStep[index]]:<p className="text-red-600">_ _ _  </p>}
                            </h1>
                        </div>

                    </div>)}
                </div>
            </div>

            </div>
                             

            <div className="flex flex-wrap  mt-4 text-sm font-bold gap-2">{takeItem.map((item,index)=><div key={index}>
            { <button value={item} onClick={(e)=>handleRemove(e.target.value)} className=" border-2 border-blue-500  bg-white rounded-full px-2">{item}</button>}
            </div>)}</div>

        </div>
    )

}