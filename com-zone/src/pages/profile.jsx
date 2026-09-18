import {useEffect,useState} from "react";
import {getProfile} from "../services/profileservice";


export default function Profile(){

const [user,setUser]=useState(null);


useEffect(()=>{


const loadProfile=async()=>{

try{

const data = await getProfile();

setUser(data.user);


}
catch(error){

console.log(error);

}


};


loadProfile();


},[]);



if(!user){

return <h2>Loading...</h2>;

}



return(

<div className="w-[85%] min-[500px]:w-[400px] bg-[var(--bg-card)] my-[100px] mx-auto p-[25px] min-[500px]:p-[35px] rounded-[18px] text-center shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-[transform,box-shadow] duration-300 ease-in-out hover:-translate-y-[5px] hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)]">

<h1 className="text-[24px] min-[500px]:text-[30px] text-[var(--text)] mb-[15px] font-bold">
{user.Name}
</h1>

<p className="text-base min-[500px]:text-lg text-[var(--text-muted)] bg-[var(--bg-elevated-2)] p-3 rounded-[10px] m-0">
{user.Email}
</p>

</div>

)

}
