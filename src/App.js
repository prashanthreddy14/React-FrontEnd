import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import LogIn from './Component/Login';
import SignUp from './Component/Signup';
import ProductFeed from './Component/ProductFeed';


const ProtectedRoute = (props) =>{
  const token = localStorage.getItem("EcommerceAuthToken");
  const hasLoggedIn = token !="";

  if(hasLoggedIn) return props.children;
     return  <Navigate  to= "/Login"/>
}

const UnProtectedRoute = (props) =>{
  const token = localStorage.getItem("EcommerceAuthToken");
  const hasLoggedIn = token !="";

  if(hasLoggedIn) return <Navigate to="/productsfeed"/>;
     return props.children

}

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/productsfeed" element={ 
          <ProtectedRoute>
            <ProductFeed/>
          </ProtectedRoute>
        }></Route>
          <Route path="/Login" element={
            <UnProtectedRoute>
              <LogIn/>
            </UnProtectedRoute>
          }></Route>
          <Route path="/Signup" element={ 
            <UnProtectedRoute>
              <SignUp/>
            </UnProtectedRoute>
            }></Route>
          <Route path="/referal/:referalid" element={<SignUp/>}></Route>
        </Routes>


      </BrowserRouter>
     <LogIn/>
    </div>
  );
}

export default App;
