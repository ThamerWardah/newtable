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



export  {finihsed , finishedId, newOpened, finihsedToFixTheError};