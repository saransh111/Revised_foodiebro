import { axios } from "axios";
import { useEffect ,useState} from "react"

export default function Content(){
    const [data,setdata]= useState([])
    useEffect(()=>{
        getdata();
        console.log(data);
    })
    async function getdata(){
        const a= await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=a`);
        setdata(a.data.meals)
        return a;
    }
    return(
        <div>
            hii
        </div>
    )
}