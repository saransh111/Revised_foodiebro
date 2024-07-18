import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
export default function App() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = data => {
        console.log(data);
        console.log(data.ReType_Password);
        console.log(data.Password);
        const navigate = useNavigate();
        if(data.Password===data.ReType_Password){
            console.log(data);
            navigate('/');
        }
        else{
            console.log("no match found");
        }
    };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="First Name" {...register("firstName", { required: true, maxLength: 20 })} />
      <br/>
      <input placeholder="Last Name" {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <br/>
      <input type="Email" placeholder="E-mail" {...register("Email")} />
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