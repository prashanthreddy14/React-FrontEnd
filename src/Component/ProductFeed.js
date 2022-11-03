import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const  ProductFeed  = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // const loadProducts = () => {
    //     axios({
    //         method: 'GET',
    //         url: 'https://fakestoreapi.com/products',
    //         params: {},
    //         header: {
    //             "x-Authorization": localStorage.getItem("EcommerceAuthToken")
    //         }
    //         // "pk_185066f1f96affca225ca48cd4a64803a4b791d6d0d5b"
    //     }).then((res) =>{
    //         setProducts([res.data.products])
    //     }).catch((err) =>{
    //         console.log(err, "failed2");
    //     })
    // }

    useEffect(() => { fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => setProducts(json));
        // loadProducts();
    }, [])
    const handleLogout = () => {
        localStorage.setItem("EcommerceAuthToken", "")
        navigate("/Login")
    }

    return(
        <>
            <div style={{textAlign : 'center', display: 'flex', justifyContent: 'center', alignItems : 'center'}}>
                <h1> Ecommerce APP</h1>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems : 'center'}}>
                {
                    products.map((product, index) =>{
                        return (
                            <>    
                                {/* <div className="card" style={{width: 300, margin: 20}} key={index}>
                                    <img 
                                    src={product.image}
                                    style= {{width: '100%', height: 300}}
                                    className= " card-img-top" alt="..."
                                /></div> */}
                                <div className="crad-boby" style={{width: 300, margin: 20}} key={index}>
                                    {/* <h6>{product.id}</h6> */}
                                    <h6 className="text-success">{product.category}</h6>
                                    <h6 className="text-success">Price - {product.price}</h6>
                                    <img 
                                    src={product.image}
                                    style= {{width: '100%', height: 300}}
                                    className= " card-img-top" alt="..."
                                    />
                                    <h5 className="crad-title">{product.title}</h5>
                                    <p className="card-text">{product.description}</p>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ProductFeed;