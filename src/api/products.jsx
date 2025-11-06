export const fetchAllProducts = () => {
    return fetch('https://dummyjson.com/products?limit=100')
        .then(res => res.json())
        .then(data => data.products);
};



export const fetchMenProducts = () => {
    return fetch('https://dummyjson.com/products/category/mens-shirts?limit=100')
        .then(res => res.json())
        .then(data => data.products);
};



export const fetchWomenShoesProducts = () => {
    return fetch('https://dummyjson.com/products/category/womens-shoes?limit=30')
        .then(res => res.json())
        .then(data => data.products);
};



export const fetchWomenProducts = () => {
    return fetch('https://dummyjson.com/products/category/womens-dresses')
        .then(res => res.json())
        .then(data => data.products);
}

fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => console.log('Total:', data.total, 'Returned:', data.products.length));