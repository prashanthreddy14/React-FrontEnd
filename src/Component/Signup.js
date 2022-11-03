import axios from "axios";
import { useState } from "react";
import { useParams ,  useNavigate, Navigate} from "react-router-dom";
import {object, string, number} from 'yup';

// const regex = '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
const registerSchame = object({
    email: string().email().required(),
    // userFirstName: string().required(),
    // userLastName: string().required(),
    username: string().required(),
    password: string().min(6).max(12).required(),
    confirmPassword: 
        string().min(6).max(12).required().test("Cofirm-pass", "Confirm password not matching", 
        function(confirmPassword){
            return confirmPassword == this.parent.password;
        })
})
const SignUp =() =>{
    const params = useParams();
    const navigate = useNavigate();

    const [detials, setDetials] = useState({
        username:'',
        // userFirstName:'',
        // userLastName:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const [errors, setErrors] = useState({
        username:'',
        // userFirstName:'',
        // userLastName:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const handleOnChange = (key, value) =>{
        setDetials({
            ...detials,
            [key]:value
        })
    }
    const handleSubmit = () =>{
        registerSchame.validate(detials, {abortEarly: false})
        .then((res)=>{
            setErrors({})

            axios({
                method:"Post",
                url: "http://localhost:8080/api/auth/signup",
                data: {
                    username: detials["username"],
                    email: detials["email"],
                    password: detials["password"]
                     
                }
               
            }).then((response)=>{
                if(response.status == 200){
                    navigate("/login")
                }

            }).catch((error)=>{
                console.log(error);
                
            })
            
        }).catch((error)=>{
            let errObj = {}
            error.inner.map((valErr)=>{
                errObj[valErr.path] = valErr.message;
            })
            setErrors(errObj);
        })
    }

    return(
        <div className="grid align__item">
            <div className="register">
            <svg xmlns="http://www.w3.org/2000/svg" className="site__logo" style={{width:56, height:100 }} viewBox="77.7 214.9 274.7 418">
                <defs>
                    <linearGradient id="a" x1="0%" y1="0%" y2="0%">
                        <stop offset="0%" stopColor="#8ceabb"/>
                        <stop offset="100%" stopColor="#378f7b"/>
                        </linearGradient>
                    </defs>
                    <path fill="url(#a)" d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z"/>
                    </svg>
            <h2>Sign Up</h2>
            <form  className="form" >
                <div className="form__field">
                    <input 
                    className="input1" 
                    type="text" 
                    style={{width:"100%", padding:10}} 
                    placeholder="Enter Your Username "
                    value={detials.username}                  
                    onChange={(event)=>{
                        handleOnChange("username", event.target.value)
                     }}/>
                    <p className="text-danger">{errors["username"]}</p>
                <input 
                        type="email" 
                        value={detials.email}
                        style={{width:"100%", padding:10}} 
                        className="input1" 
                        onChange={(event)=>{
                            handleOnChange("email", event.target.value)
                        }}
                        placeholder="Enter Name Here"/>
                    <p className="text-danger">{errors["email"]}</p>
                    
                {/* <input 
                    className="input1" 
                    type="text" 
                    style={{width:"100%", padding:10}} 
                    placeholder="Enter Your Name "
                    value={detials.userFirstName}                  
                    onChange={(event)=>{
                        handleOnChange("userFirstName", event.target.value)
                     }}/>
                <input 
                    className="input2" 
                    type="text" 
                    style={{width:"100%", padding:10}} 
                    placeholder="Enter Your Name "
                    value={detials.userLastName}                  
                    onChange={(event)=>{
                        handleOnChange("userLastName", event.target.value)
                     }}/>
                 */}
                <input 
                    className="input2"  
                    type="password"
                    style={{width:"100%", padding:10}} 
                    placeholder="••••••••••••"
                    value={detials.password} 
                    onChange={(event)=>{
                        handleOnChange("password", event.target.value)
                     }}/>
                <p className="text-danger">{errors["password"]}</p>
                <input 
                    type="password" 
                    value={detials.confirmPassword}
                    style={{width:"100%", padding:10}} 
                    className="input2"
                    placeholder="••••••••••••"
                    onChange={(event)=>{
                        handleOnChange("confirmPassword", event.target.value)
                    }}/>
                <p className="text-danger">{errors["confirmPassword"]}</p>
                </div>
            </form>
                <div className="form__field">
                    <input className="input3" type="submit" onClick ={handleSubmit} value="Sign Up"/>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                     <label className="form-check-label" >Check me out</label>
                 </div>

            <p> Alredy have an account <a href="/login">login</a>here</p>
            </div>
        </div>

        // <div style={{display:'flex' , justifyContent:'center', alignItems:'center'}}>
        //     <div style={{width: 300 , height : 600 , border:'0.5px solid', padding: 20}}>
        //         <div className="form-group">
        //             <h1>SignUp Here</h1>
        //             <label for="exampleInputEmail1">Email address</label>
        //             <input 
        //                 type="email" 
        //                 value={detials.email} 
        //                 className="form-control" 
        //                 onChange={(event)=>{
        //                 handleOnChange("email", event.target.value)
        //                 }} 
        //                 placeholder="Enter email"/>
        //                 <p className="text-danger">{errors["email"]}</p>
        //             <label for="exampleInputPassword1">Phone Number</label>
        //             <input 
        //                 type="number" 
        //                 value={detials.phone} 
        //                 className="form-control" 
        //                 onChange={(event)=>{
        //                     handleOnChange("phone", event.target.value)
        //                 }}
        //                 placeholder="Enter Phone number"/>
        //                 <p className="text-danger">{errors["phone"]}</p>
        //             <label for="exampleInputPassword1">Password</label>
        //             <input 
        //                 type="password" 
        //                 value={detials.password} 
        //                 className="form-control" 
        //                 onChange={(event)=>{
        //                     handleOnChange("password", event.target.value)
        //                 }}
        //                 placeholder="Password"/>
        //                 <p className="text-danger">{errors["password"]}</p>
        //             <label for="exampleInputPassword1">Confirm Password</label>
        //             <input 
        //                 type="password" 
        //                 value={detials.confirmPassword} 
        //                 className="form-control"
        //                 onChange={(event)=>{
        //                     handleOnChange("confirmPassword", event.target.value)
        //                 }}
        //                 placeholder="Confirm Password"/>
        //                 <p className="text-danger">{errors["confrimPassword"]}</p>
        //         </div>
        //         <div class="form-group form-check">
        //             <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        //             <label className="form-check-label" for="exampleCheck1">Check me out</label>
        //         </div>
        //         <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        //         <p> Alredy have an account <a href="/login">login</a>here</p>
        //     </div>
        // </div>
    )
}
export default SignUp;