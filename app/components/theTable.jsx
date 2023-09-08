'use client'
import { useState } from "react"
import {Items , Items2  , lectureTime ,colors, itemsInArabic ,examDays} from '../components/data';
import MyOwnTable from '../components/myOwnTable';



export default  function TheTable({finishedFetch, data2 ,table,fainalExamT ,myOwnTable}){

  const student =   {finished:finishedFetch}
  const lectureTimes = lectureTime;
  const [takeItem,setTakeItem] = useState([]);
  const [newToFinish,setNewToFinish]= useState(student.finished);
  const [lastItemInTakeItem,setLastItemInTakeItem]=useState('')
  const [beforeAfter,setBeforeAfter]=useState('');
  const [onStage,setOnStage]=useState(true);
  const myOwnTableT = myOwnTable?.myOwnTable || [] ;
  
  const Level = (theStudent)=>{
      let sum =0 ;
      return theStudent.finished.map(item => Items[item]).map(item=>(item).significant).map(item=> sum+= parseInt(item)).pop() ||0;
    };
 const studentOpenItems = (studentOpen)=>{
      return Items2.filter(item2=> item2.level<= studentOpen.level && (item2.pre ==='none'|| studentOpen.finished.includes(item2.pre)) && !studentOpen.finished.includes(item2.name)) 
    };


    const studentLevel = Level(student);
    const studentWithLevel = {...student,level:Math.ceil(parseFloat(studentLevel/35) +0.005)};

    const openItems = studentOpenItems(studentWithLevel) ;
    const openItemsNames = [...openItems.map(item=>item.name),...data2];


    const newTable = table.map(a=>a.filter(b=>openItemsNames.includes(b.slice(0,4))));
   

    var available = [];
    for (let i = 0; i < newTable.length; i++) {
        for (let j = 0; j < newTable[i].length; j++) {
            if(!available.includes(newTable[i][j])){
           available = [...available,newTable[i][j]] }else{ null}
        }
    };

    const available2 = available.filter(a=>!takeItem.map(item=>item.slice(0,4)).includes(a.slice(0,4)))

    const availableWithLab = available.filter(a=>(!a.includes('lab')?!takeItem.map(item=>item.slice(0,4)).includes(a.slice(0,4)):!(takeItem.map(item=>(item.slice(0,4)===a.slice(0,4)&&item.includes('lab')))).includes(true)  ) );


   
    const handleRemove = (e)=>{
      let remove = [];

      if((e.includes('lab')&&e.slice(0,4)!==lastItemInTakeItem.slice(0,4))||(e.includes('cls')&&e!==lastItemInTakeItem)){ remove=[...takeItem.filter(a=>a.slice(0,4)!==e.slice(0,4))]; }else{
         remove = [...takeItem.filter(item=> e.includes('cls')?item.slice(0,4)!==e.slice(0,4):item!==e)];
        if(e.includes('lab')){setLastItemInTakeItem(e.slice(0,4)+'cls')}
        if(e.includes('cls')){setLastItemInTakeItem('')}
      };
      if(e.includes('cls') && beforeAfter.includes('lab')){setLastItemInTakeItem('')};
      setBeforeAfter(e);
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
        const one1=one.filter(a=>!a.includes('lab'));
        
        return one1.map(item => Items[item.slice(0,4)]).map(item=>item.significant).map(item=> sum+= parseInt(item)).pop();
      };
      const numberOfUnit = numberOfUnits(takeItem);

      
      const availableColor2 = available.map(item=>item.slice(0,4))
      var availableColor = [];
      for (let i = 0; i < availableColor2.length; i++) {
        if(!availableColor.includes(availableColor2[i]))
        availableColor  = [...availableColor,availableColor2[i]];
        
      }

      const color= {} 
      for (let k = 0; k < availableColor.length; k++) {
        color[availableColor[k]]=colors[k]
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
      
       const takeItemSlice = takeItem.map(item=>item.slice(0,4))
       const moreThanAExam = fainalExamT.map(day=>day.filter(item=>takeItemSlice.includes(item)));
    return (
        <div className="w-full h-full px-2 py-4 ">
           
            <div className="flex justify-between gap-1">
              <div className=" w-1/2  h-32 ">

               <div className="grid grid-cols-4  gap-1 text-[8px] font-bold relative">
               
                   {availableWithLab.map((item,index)=><> 
                    {!takeItem.includes(item) && !availableCompare.includes(item)&&
                    
                    ( lastItemInTakeItem.includes('cls')  ?(item.includes('lab')&&item.includes(lastItemInTakeItem.slice(0,4))):!item.includes('lab')) &&
                    
                      
                    <button key={index} value={item} onClick={(e)=>{
                            setTakeItem([...takeItem,e.target.value]);
                            setNewToFinish([...newToFinish,e.target.value]);
                            setLastItemInTakeItem(e.target.value)
                            }}
                             className={` outline-none border-s-2 shadow-md ${cat_shadow[Items[item?.slice(0,4)]?.cat]}  ${cat_color[Items[item?.slice(0,4)]?.cat]} bg-white rounded-sm  mb-1 `}>{itemsInArabic[item.slice(0,1)]}{item.includes('cls')||item.includes('lab')?item.slice(1,-3):item.slice(1)}</button>}
                    </>)}
                    {lastItemInTakeItem.includes('cls')&&<div className="text-xs absolute top-8 right-0 w-full px-2">    
                      <div dir="rtl" className="text-sm animate-pulse">اختر مجموعه العملي</div> 
                      <div dir="rtl" className="w-full text-gray-400 text-[9px]">{`في حال عدم ضهور اي مجموعه فان
مجموعه العملي لمقرر ${`  ${itemsInArabic[lastItemInTakeItem.slice(0,1)]}${lastItemInTakeItem.slice(1,4)}  `} تتضارب مع احد المواد التي قمت بالتسجيل عليها`}</div>


                    </div>}  
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

                <div dir="rtl" className="grid grid-rows-5 grid-cols-6">
                    {newTable.map((item,index)=><div key={index}>
                        <div className="my-2 text-center">
                            <h1 className="font-bold text-[8px] bg-gray-100">
                                 {lectureTimes[index]}
                            </h1>
                            <h1 className={`text-[9px]  py-2 font-bold ${newTable[index][secondStep[index]]?color[newTable[index][secondStep[index]].slice(0,4)]:"bg-gray-100"}`}>
                                {newTable[index][secondStep[index]]?`${itemsInArabic[(newTable[index][secondStep[index]]).slice(0,1)]}
                                  ${(newTable[index][secondStep[index]]).includes('cls')||(newTable[index][secondStep[index]]).includes('lab')? ((newTable[index][secondStep[index]]).includes('cls')?`${(newTable[index][secondStep[index]]).slice(1,4)}(${'نضري'})`:`${(newTable[index][secondStep[index]]).slice(1,4)}(${'عملي'})`):(newTable[index][secondStep[index]]).slice(1)} `:<p className="text-red-600">_ _ _  </p>}
                               
                            </h1>
                        </div>

                    </div>)}
                </div>
            </div>

            </div>
                             

            <div className="flex flex-wrap  mt-4 text-xs font-bold gap-2">{takeItem.map((item,index)=><div key={index}>
            { <button value={item} onClick={(e)=>handleRemove(e.target.value)} className={` border-2 outline-none  ${cat_color[Items[item?.slice(0,4)]?.cat]} shadow-sm ${cat_shadow[Items[item?.slice(0,4)]?.cat]} bg-white rounded-sm px-1`}>
              
              {itemsInArabic[item.slice(0,1)]}{(item.includes('cls')||item.includes('lab')?(item.includes('cls')?`${item.slice(1,-3)}(${'نضري'})`:`${item.slice(1,-3)}(${'عملي'})`):item.slice(1))}
              
              </button>}
            </div>)}</div>
                              <div dir="rtl" className="px-2 py-6 w-full">
                                <h1 className="text-xs text-red-600 font-bold">التضاربات في الامتحانات النهائيه</h1>
                                <ul className=" px-4 list-disc text-xs font-bold"> 
                                  {moreThanAExam.map((day,index)=>(day.length>1 &&<li key={index} className="w-full">
                                        اليوم {examDays[index]}
                                        {day.map(it =><span key={it} className="px-2 text-blue-600 font-bold text-sm"> {itemsInArabic[it.slice(0,1)]}{it.slice(1)} </span>)}
                                  </li>))} 
                                </ul> 
                              </div>

                           {takeItem.length > 0 && !lastItemInTakeItem.includes('cls')&& <MyOwnTable  takeItem={takeItem} myOwnTable2={myOwnTable}/>}

                     {myOwnTable?.id && <div>
                       <div className="grid grid-cols-4  mt-4 text-[9px] font-bold gap-2 border-2  border-gray-500 px-1 py-2">{myOwnTableT.map((item,index)=><div key={index}>
            { <div className={` border-2 outline-none  ${cat_color[Items[item?.slice(0,4)]?.cat]} shadow-md ${cat_shadow[Items[item?.slice(0,4)]?.cat]} bg-white rounded-sm p-1 text-center`}>
              
              {itemsInArabic[item.slice(0,1)]}{(item.includes('cls')||item.includes('lab')?(item.includes('cls')?`${item.slice(1,-3)}(${'نضري'})`:`${item.slice(1,-3)}(${'عملي'})`):item.slice(1))}
              
              </div>}
            </div>)}</div>
                    <div> 
                      <button  onClick={()=>{
                        onStage?setOnStage(false):setOnStage(true);
                        onStage?setTakeItem(myOwnTableT):setTakeItem([]);
                        onStage?setNewToFinish([...student.finished,...myOwnTableT.filter(a=>!a.includes('lab'))]):setNewToFinish(student.finished)
                      }}
                      className="px-4 bg-yellow-400 m-2 rounded-md shadow-md shadow-blue-500 text-sm font-bold"
                      >{onStage?'معاينه':'لغاء المعاينه'}</button>
                    </div>
            </div>}
        </div>
    )

}