import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching product details:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (!product) {
        return <div className="text-center mt-5 text-danger">Product not found</div>;
    }

    return (
        <div className="container py-5">
            <h2>{product.title}</h2>
            <img src={product.thumbnail} alt={product.title} className="img-fluid" style={{ maxHeight: '400px', objectFit: 'cover' }} />
            <p className="mt-3"><strong>Price:</strong> ${product.price}</p>
            <p><strong>Rating:</strong> ⭐ {product.rating}</p>
            <p><strong>Description:</strong> {product.description}</p>
        </div>
    );
}

