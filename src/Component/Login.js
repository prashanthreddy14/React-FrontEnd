import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LogIn =() =>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [detials, setDetials] = useState({
        username:'',
        password:'',
    })
    const handleOnChange = (key, value) =>{
        setDetials({
            ...detials,
            [key]:value
        })
    }

    const handleSubmit = ()=>{
        setLoading(true)
        axios({
            method:"Post",
            url: "http://localhost:8080/api/auth/signin",
            data: {
                username: detials["username"],
                password: detials["password"]
            }
        }).then((res)=>{
            setLoading(false)
            console.log(res)
            if (res.status == 200){
                const token = res.data["accessToken"]
                localStorage.setItem("EcommerceAuthToken", token)
                navigate("/productsfeed")

            }
        }).catch((error)=>{
            setLoading(false)
            alert(error.response.data.message)
            console.log(error);
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
            <h2>Log In</h2>
            <form  className="form1" >
                <div className="form__field">
                <input 
                    className="input1" 
                    type="email" 
                    style={{width:"100%", padding:10}} 
                    placeholder="info@mailaddress.com"
                    value={detials.username}                  
                    onChange={(event)=>{
                        handleOnChange("username", event.target.value)
                     }}/>
                </div>
                <div className="form__field">
                <input 
                    className="input2"  
                    type="password"
                    style={{width:"100%", padding:10}} 
                    placeholder="••••••••••••"
                    value={detials.password}                  
                    onChange={(event)=>{
                        handleOnChange("password", event.target.value)
                     }}/>
                </div>
            </form>
                <div className="form__field">
                <input className="input3" type="submit" onClick={handleSubmit} value="Log In"/>
                </div>
                <div className="form-group form-check">
                     <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" style={{marginleft: 10}} >Check me out</label>
                 </div>
            {
                loading ? <p> Wait checking your Credentials </p> : null
            }
            <p> Don't have an account <a href="/signup">SignUp</a>here</p>
            </div>
        </div>



    //     <div style={{display:'flex' , justifyContent:'center', alignItems:'center'}}>
    //     <div style={{width: 300 , height : 600 , border:'0.5px solid', padding: 20}}>
    //         <div className="form-group">
    //             <h1>Login Here</h1>
    //             <label for="exampleInputEmail1">Email address</label>
    //             <input type="email" className="form-control"  placeholder="Enter email"/>
    //             <label for="exampleInputPassword1">Password</label>
    //             <input type="password" className="form-control" placeholder="Password"/>
    //         </div>
    //         <div class="form-group form-check">
    //             <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    //             <label className="form-check-label" style={{marginleft: 10}} >Check me out</label>
    //         </div>
    //         <button type="submit" className="btn btn-primary">Submit</button>
    //         <p> Don't have an account <a href="/signup">SignUp</a>here</p>
    //     </div>
    // </div>
    )
}
export default LogIn;