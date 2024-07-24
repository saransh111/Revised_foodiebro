import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { account } from "../Appwrite/appwriteConfig";
import {v4} from "uuid";

export default function App() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
        console.log(data);
        if(data.Password===data.ReType_Password){
            const Promise = await account.create(
              v4(),
              data.firstName,
              data.lastName,
              data.Email,
              data.Password
            )
            Promise.then(
              function(response){
                console.log(response);
              },
              function(error){
                console.log("lorermsfdngvjkdfbjhkdfbgjkhdfbjuyl");
                console.log(error);
              }
            )
            console.log(data);
            navigate('/');
        }
        else{
            alert("Passwords Do Not Match");
        }
    };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="First Name" {...register("firstName", { required: true, maxLength: 20 })} />
      <br/>
      <input placeholder="Last Name" {...register("lastName", { required: true, maxLength: 20 })} />
      <br/>
      <input type="Email" placeholder="Email" {...register("Email")} />
      <br/>
      <input placeholder="Password" type="password" {...register("Password")} />
      <br/>
      <input type="password" placeholder="ReType Password" {...register("ReType_Password")} />
      <br/>
      <input type="submit" />
      <br/>
    </form>
  );
}