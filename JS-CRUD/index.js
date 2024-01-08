'use strict'

let products = []
let urlGetAllProducts = 'https://dummyjson.com/products'

//DOM REF
const elmTitle = document.querySelector('#title')
const elmPrice = document.querySelector('#price')
const elmBrand = document.querySelector('#brand')
const elmStock = document.querySelector('#stock')

const elmProductsList = document.querySelector('#products-list')
const elmAddProductPanel = document.querySelector('#add-product-conteiner')
const elmUpdateProductPanel = document.querySelector('#update-product-conteiner')

// Events

document.addEventListener('DOMContentLoaded', () => fetchAndDisplayProducts())

async function fetchAndDisplayProducts() {
    products = await fetchAllProducts()
    displayProducts()
}

async function fetchAllProducts() {
    const response = await fetch(urlGetAllProducts)
    const data = await response.json()
    return data.products
}

async function beforeAddProduct() {
    toggleDisableButtons()
    const title = document.querySelector('#add-product-input-title')
    const price = document.querySelector('#add-product-input-price')
    await addProduct(
        title.value,
        parseFloat(price.value),
    )

    toggleDisableButtons()

    title.value = ''
    price.value = ''

    hideAddProductPanel()
}

async function beforeUpdateProduct() {
    toggleDisableButtons()

    const id = document.querySelector('#update-product-input-id')
    const title = document.querySelector('#update-product-input-title')
    const price = document.querySelector('#update-product-input-price')

    await updateProduct(
        parseInt(id.value),
        title.value,
        parseFloat(price.value),
    )

    toggleDisableButtons()

    id.value = ''
    title.value = ''
    price.value = ''

    hideUpdateProductPanel()

    afterUpdateProduct()
}

async function beforeDeleteProduct(e, productId) {
    e.stopPropagation()
    await deleteProduct(productId)
    fetchAndDisplayProducts()
}

function afterUpdateProduct() {
    fetchAndDisplayProducts()
}

async function displayAndPopulateUpdatePanel(productId) {
    showUpdateProductPanel()

    const response = await fetch(`https://dummyjson.com/products/${productId}`)
    const data = await response.json()
    document.querySelector('#update-product-input-id').value = data.id
    document.querySelector('#update-product-input-title').value = data.title
    document.querySelector('#update-product-input-price').value = data.price

    await fetchAndDisplayProducts();
    console.log(`showing updeted product ID:${data.id}, title: ${data.title}, price: ${data.price}`);
}

function toggleDisableButtons() {
    const allButtons = document.querySelectorAll('button:not(#btn-add-product)')
    allButtons.forEach((button) => {
        button.toggleAttribute('disabled')
    })
}

function displayProducts() {
    let html = `
    <div>
        <h3>product list</h3><br>
        <button class="btn btn-primary" id="btn-add-product" onclick="showAddProductPanel()">add product</button><br><br>
    </div>
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">TITLE</th>
                <th scope="col">PRICE</th>
                <th scope="col">remove</th>
            </tr>
        </thead>
    `
    html += `<tbody>`
    for (let i = 0; i < products.length; i++) {
        html += `
        <tr class='product-row' onclick='displayAndPopulateUpdatePanel(${products[i].id})'>
                <th scope="row">${products[i].id}</th>
                <td>${products[i].title}</td>
                <td>$${products[i].price}</td>
                <td onclick="beforeDeleteProduct(event,${products[i].id})">🗑️</td>
            </tr>
        `
    }
    html +=
        `
        </tbody>
        </table>
        `
    elmProductsList.innerHTML = html;
}

async function updateProduct(id, title, price) {
    //update product in server
    const updatesToProduct = {
        title: title,
        price: price, //maybe use parsFloat
    }
    const updateOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatesToProduct)
    }

    const response = await fetch(`https://dummyjson.com/products/${id}`, updateOptions)
    const data = await response.json()
    console.log(data);
}

function showAddProductPanel() {
    console.log('showing add-product-conteiner');
    elmAddProductPanel.classList.remove('hidden');

}

function hideAddProductPanel() {
    console.log('add-product-conteiner removed');
    elmAddProductPanel.classList.add('hidden')
}

function showUpdateProductPanel() {
    elmUpdateProductPanel.classList.remove('hidden')
}

function hideUpdateProductPanel() {
    elmUpdateProductPanel.classList.add('hidden')
}

//--
async function getProduct() {
    const response = await fetch('https://dummyjson.com/products/1', { method: 'GET' })
    const data = await response.json()
    console.log(data)
}

async function deleteProduct(productId) {
    const response = await fetch(`https://dummyjson.com/products/${productId}`, { method: 'DELETE' })
    const data = await response.json()
    console.log(data)
}

async function addProduct(title, price) {
    const productToAdd = {
        title: title,
        price: price,
    }

    const addOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToAdd)
    }

    const response = await fetch('https://dummyjson.com/products/add', addOptions)
    const data = await response.json()
    console.log(data)

    products.push(data);
    displayProducts();
}

async function updateProduct(id, title, price) {
    const updatesToProduct = {
        title: title,
        price: price,
        /* other product data */
    }

    const updateOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatesToProduct)
    }

    const response = await fetch(`https://dummyjson.com/products/${id}`, updateOptions)
    const data = await response.json()
    console.log(data)
}