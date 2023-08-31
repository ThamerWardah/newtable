import currentUser from './getStudent';


const finihsed = async()=>{
    const user = await currentUser();
    const finish =  user?.finished[0].finished.split('_') || []

    return finish ;
};

export default finihsed ;