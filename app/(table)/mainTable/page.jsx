import {table} from '../../components/data';
import Link from 'next/link';

const MainTable = ()=>{

    return(
        <main className='w-full h-full'>
            <div className="p-4 shadow-sm ">
                <Link className="px-4 font-bold border-2 mx-4 py-1  shadow-md shadow-blue-500 active:bg-green-400" href='/student'>رجوع</Link>
            </div>

        <div className='py-10 px-2 grid grid-cols-6 grid-rows-5 text-xs font-bold'>
            { table.map((hour,index)=><div key={index} className='border-2 border-black py-2 px-1 bg-white' >

                    {hour.map((item,i)=><div key={i+100} className='flex flex-col gap-1'>
                        {item}
                    </div>)}

            </div>) }
        </div>


        </main>
    )
};

export default MainTable;