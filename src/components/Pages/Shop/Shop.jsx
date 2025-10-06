import UpNav from '../../UpNav/UpNav';
import Navbar from '../../Nav/Nav';
import { useEffect, useState } from 'react';
import { fetchAllProducts, fetchMenProducts, fetchWomenProducts } from '../../../api/products';
export default function Shop() {

    const [productsAll, setProductsAll] = useState([]);
    const [productsMen, setProductsMen] = useState([]);
    const [productsWomen, setProductsWomen] = useState([]);

    
    useEffect(() => {
        fetchAllProducts().then(data => setProductsAll(data));
    }, [])
    useEffect(() => {
        fetchMenProducts().then(data => setProductsMen(data));
    }, [])
    useEffect(()=>{
        fetchWomenProducts().then(data=>setProductsWomen(data));
    },[])




    return (
        <>
            <UpNav />
            <Navbar />
            
        </>
    )
}