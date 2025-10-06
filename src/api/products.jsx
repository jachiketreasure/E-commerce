// Fetch All Products
export const fetchAllProducts = () => {
    return fetch('https://dummyjson.com/products?limit=100')
        .then(res => res.json())
        .then(data => data.products);
};



// Men's Products Only
export const fetchMenProducts = () => {
    return fetch('https://dummyjson.com/products/category/mens-shirts?limit=100')
        .then(res => res.json())
        .then(data => data.products);
};



// Women's Shoes Products Only
export const fetchWomenShoesProducts = () => {
    return fetch('https://dummyjson.com/products/category/womens-shoes?limit=30')
        .then(res => res.json())
        .then(data => data.products);
};



// Women's Products Only
export const fetchWomenProducts = () => {
    return fetch('https://dummyjson.com/products/category/womens-dresses')
        .then(res => res.json())
        .then(data => data.products)
}

fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => console.log('Total:', data.total, 'Returned:', data.products.length));