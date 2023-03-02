const productDOM = document.querySelector('.product');
// console.log(productDOM);
const url = 'https://course-api.com/javascript-store-single-product';

const fetchProduct = async() => {
    // return `product`;
    try {
        productDOM.innerHTML = `<h4 class ="product-loading">Loading...</h4>`;
        // console.log(window.location.search);
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        // const response = await fetch(url);
        const response = await fetch(`${url}?id=${id}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        productDOM.innerHTML = `<p class ="error">There was an error...</p>`;

    }
}
const displayProduct = (product) => {
    // console.log(product);
    //company,colors,description,name:title, price, image(img:url)
    const {company,colors,description,name:title, price, image} =product.fields;
    const{url:img} = image[0];
    //change page title
    document.title = title.toUpperCase();
    //color
    const colorsList = colors.map((color) => {
        return `<span class="product-color" style = "background : ${color}"></span>`
    }) 
    productDOM.innerHTML = `<div class="product-wrapper">
    <img src="${img}" alt="${title}" class="img">
    <div class="product-info">
        <h3>${title}</h3>
        <h5>${company}</h5>
        <span>$${price/100}</span>
        <div class="colors">
           ${colorsList}
        </div>
            <p>${description}</p>
            <button class="btn">add to cart</button>
        
    </div>
</div>`;
}

const start = async () => {
    const data = await fetchProduct();
    displayProduct(data);
}
start();