import currentUser from './getStudent';


const finihsed = async()=>{
    const user = await currentUser();
    const finish = (user?.finished[0]?.finished?.split('_'))?.splice(1) || [];

    return finish ;
};
const finihsedToFixTheError = async()=>{
    const user = await currentUser();
    const finish = user?.finished[0]?.finished?.split('_') || [];

    return finish ;
};

const newOpened = async()=>{
    const user = await currentUser();
    const finish =  user?.finished[0]?.addManualOpenItems || []

    return finish ;
};


const finishedId = async()=>{
    const user = await currentUser();
    const finish =  user?.finished[0]?.id

    return finish ;
};
const onelineTable2 = async()=>{
    const user = await currentUser();
    const table = await prisma.table.findUnique({
        where:{
            id:'64f636d0550fee5b24eeca6e'
        }
    });

    return table

};



export  {finihsed , finishedId, newOpened, finihsedToFixTheError , onelineTable2 };

