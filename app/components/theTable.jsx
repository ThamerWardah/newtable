'use client'
import { useState } from "react"
import {Items , Items2 , table , lectureTime ,colors} from '../components/data';



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

       const cat_color = {DM:'border-red-500/80',DO:'border-green-400/80',UM:'border-yellow-600/80',CM:'border-blue-500/80',CO:'border-black/70'};
       const cat_shadow = {DM:'shadow-red-500/70',DO:'shadow-green-400/80',UM:'shadow-yellow-600/80',CM:'shadow-blue-500/80',CO:'shadow-black/70'}
      


    return (
        <div className="w-full h-full px-2 py-4 ">

               

            <div className="flex justify-between gap-1">
              <div className=" w-1/2  h-32 ">

               <div className="grid grid-cols-4  gap-2 text-[8px] font-bold">
                    {available2.map((item,index)=><>
                    {!takeItem.includes(item) && !availableCompare.includes(item)&& <button key={index} value={item} onClick={(e)=>{
                            setTakeItem([...takeItem,e.target.value]);
                            setNewToFinish([...newToFinish,e.target.value])
                            }} className={` outline-none border-s-2 shadow-md ${cat_shadow[Items[item?.slice(0,4)]?.cat]}  ${cat_color[Items[item?.slice(0,4)]?.cat]} bg-white rounded-sm px-1 `}>{item}</button>}
                    </>)}
             </div>  
            </div>
            <div className="w-1/2 flex flex-col gap-2 text-end text-[10px] font-bold mb-2">
                              <h1 className="text-red-500">71<span className="text-[12px]">\{IDM_Unit?IDM_Unit:0}</span> = متطلبات القسم الاجباريه</h1>
                              <h1 className="text-green-400">30<span className="text-[12px]">\{IDO_Unit?IDO_Unit:0}</span> = متطلبات القسم الاختياريه</h1>
                              <h1 className="text-yellow-600">13<span className="text-[12px]">\{IUM_Unit?IUM_Unit:0}</span> = متطلبات الجامعه الاجباريه</h1>
                              <h1 className="text-blue-500">12<span className="text-[12px]">\{ICM_Unit?ICM_Unit:0}</span> = متطلبات الكليه الاجباريه</h1>
                              <h1 className="text-black">14<span className="text-[12px]">\{ICO_Unit?ICO_Unit:0}</span> = متطلبات الكليه الاختياريه</h1> 
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
            { <button value={item} onClick={(e)=>handleRemove(e.target.value)} className={` border-2 outline-none  ${cat_color[Items[item?.slice(0,4)]?.cat]} shadow-md ${cat_shadow[Items[item?.slice(0,4)]?.cat]} bg-white rounded-md px-1`}>{item}</button>}
            </div>)}</div>

        </div>
    )

}