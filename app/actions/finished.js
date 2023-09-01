import currentUser from './getStudent';


const finihsed = async()=>{
    const user = await currentUser();
    const finish =  user?.finished[0]?.finished.split('_') || []

    return finish ;
};
const finishedId = async()=>{
    const user = await currentUser();
    const finish =  user?.finished[0]?.id

    return finish ;
};



export  {finihsed , finishedId};