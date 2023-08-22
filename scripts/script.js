
/*CART PAGE*/

let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Winter Jacket',
        tag: 'winterjacket',
        price: 15,
        inCart: 0
    },
    {
        name: 'Jogger Pants',
        tag: 'joggerpants',
        price: 18,
        inCart: 0
    },
    {
        name: 'Jumper',
        tag: 'jumper',
        price: 25,
        inCart: 0
    },
    {
        name: 'Cargo Jacket',
        tag: 'cargojacket',
        price: 22,
        inCart: 0
    },
];

for (let i=0; i < carts.length; i++)
    {
        carts[i].addEventListener('click', () =>
        {
            cartNumbers(products[i]);
            totalCost(products[i])
        }
        )
    }

function onLoadCartNumbers()
    {
        let productNumbers = localStorage.getItem('cartNumbers');

        if(productNumbers)
        {
            document.querySelector('.cart span').textContent = productNumbers;
        }
    }

function cartNumbers(product)
        {
            let productNumbers = localStorage.getItem('cartNumbers');
            productNumbers = parseInt(productNumbers);

            if(productNumbers)
            {
                localStorage.setItem('cartNumbers', productNumbers + 1);
                document.querySelector('.cart span').textContent = productNumbers + 1;
            }   else
            {
                localStorage.setItem('cartNumbers', 1);
                document.querySelector('.cart span').textContent = 1;
            }
            setItems(product);
        }

function setItems(product)
{
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null)
    {
        if(cartItems[product.tag] == undefined)
        {
            cartItems =
            {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1; 
    }

    else
    {
        product.inCart = 1;

        cartItems = 
        {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product)
{
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null)
    {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else
    {
        localStorage.setItem("totalCost", product.price)
    }
}

function displayCart()
{
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost')

    if( cartItems && productContainer)
    {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>
        {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src="../imgs/Products/Adidas Jacket 2 Front${item.tag}.jpg">
                <span>${item.name}</span>
            </div>

            <div class="price" style="margin-top: 30px;">
                $${item.price},00
            </div>

            <div class="quantity" style="margin-top: 30px;">
                <ion-icon class="decrease" name="arrow-back-outline">
                </ion-icon>

                
                <span>${item.inCart}</span>

                <ion-icon class="increase" name="arrow-forward-outline">
                </ion-icon>
            </div>

            <div class="total" style="margin-top: 30px;"> 
                $${item.inCart * item.price},00
            </div>
            `;
        });

        productContainer.innerHTML += 
        `
            <div class="basketTotalContainer">
                <h3 class"basketTotalTitle">
                    Basket Total
                <h3>

                <h3 class"basketTotal">
                    $${cartCost},00
                <h3>

            </div>
        `;
    }
}


onLoadCartNumbers();
displayCart();







