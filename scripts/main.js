(async function  () {
    const products = [
        {
            id: '7df3f04b-0ee0-4a8a-bda8-e2931e68860d',
            title: 'MacBook Pro 16-inch',
            description: '2.3GHz 8-Core Processor<br>1TB Storage<br>AMD Radeon Pro 5500M',
            price: {
                value: 2799.00,
                currency: 'USD',
            },
            imageLink: 'https://www.apple.com/v/mac/home/am/images/overview/hero/macbook_pro_16__ni9nkbyq2dm6_large.jpg'
        },
        {
            id: '69d8b82e-1bc6-45a7-bcb0-ba205c91b8bd',
            title: 'MacBook Pro 13-inch',
            description: '2.4GHz Quad-Core Processor with Turbo Boost up to 4.1GHz<br>256GB Storage<br>Touch Bar and Touch ID',
            price: {
                value: 1799.00,
                currency: 'USD',
            },
            imageLink: 'https://www.apple.com/v/mac/home/am/images/overview/hero/macbook_pro_16__ni9nkbyq2dm6_large.jpg'
        },
        {
            id: '9c56a489-5581-4552-802a-6e56249b0056',
            title: 'Mac Pro',
            description: '3.5GHz 8‑core Intel Xeon W processor, Turbo Boost up to 4.0GHz<br>256GB Storage<br>Radeon Pro 580X with 8GB of GDDR5 memory',
            price: {
                value: 5999.00,
                currency: 'USD',
            },
            imageLink: 'https://www.apple.com/v/mac/home/am/images/overview/hero/mac_pro__bn92faz71k6a_large.jpg'
        },
        {
            id: 'e325ae53-ba9b-4b9e-b443-20db05f95c2e',
            title: 'MacBook Air',
            description: '2-core Intel Core i5 processor<br>1TB storage<br>12 hours battery life',
            price: {
                value: 1099.00,
                currency: 'USD',
            },
            imageLink: 'https://www.apple.com/v/mac/home/am/images/overview/compare/macbook_air__csdfieli984m_large.jpg'
        },
        {
            id: '4f50005d-b422-4adf-b1f6-3b6551862500',
            title: 'iPhone 11 Pro Max',
            description: 'Midnight Green<br>521GB Storage<br>20 hours of video playback',
            price: {
                value: 1449.00,
                currency: 'USD',
            },
            imageLink: 'https://www.apple.com/v/iphone/home/af/images/overview/compare/compare_iphone_11_pro__fvqwhr4dkhiu_large.jpg'
        }
    ];


    function render(product) {
        return `
    
    <div class="shop_img"><img src="${product.imageLink}"/></div>
   <div class="shop_description">
    <p class="shop_title"> ${product.title} </p>
    <p >${product.description}</p>
   </div>
   
   <div class="button_price-block">
     <p class="button_price">BYN  ${Math.ceil(product.price.value*currencyUSD.Cur_OfficialRate)} </p>    
    <a id =${product.id} class="a" > Add to Basket</a>
     </div>`
    }

    let currentBasket = JSON.parse(localStorage.getItem('basket') ? localStorage.getItem('basket') : "[]");
    let result = [];
    const shop = document.getElementById('shop');
    let currencyUSD = await fetch('http://www.nbrb.by/api/exrates/rates/usd?parammode=2')
        .then(response => response.json())
        .then(data => data)
        .catch(err => err.message);



result = products.slice();
    function inputItem(products) {

        products.forEach(function (product) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('item');


            newDiv.innerHTML = render(product);

            shop.appendChild(newDiv);

            let addButton = document.getElementById(product.id);

            if (currentBasket.find((item) => product.id === item.id)) {
                addButton.classList.add('grey_a');
                addButton.textContent = 'Remove from Basket';
            }

            document.getElementById('basket_sum').innerText = currentBasket.length;
            document.getElementById('basket_price').innerText = currentBasket.reduce((a, b) => a + b.price.value, 0);

            addButton.addEventListener('click', (event) => {
                event.preventDefault();

                event.target.classList.toggle('grey_a');

                if (currentBasket.find((item) => product.id === item.id)) {
                    event.target.textContent = 'Add to Basket';
                    currentBasket = currentBasket.filter((item) => product.id !== item.id);
                } else {
                    event.target.textContent = 'Remove from Basket';
                    currentBasket.push(product);
                }

                localStorage.setItem("basket", JSON.stringify(currentBasket));

                document.getElementById('basket_sum').innerText = currentBasket.length;
                document.getElementById('basket_price').innerText = currentBasket.reduce((a, b) => a + b.price.value, 0);
            });
        });
    }


    inputItem(result);

    function sortProductDesc(product) {
        let sortedProducts = product.sort(function (a, b) {
            return a.price.value - b.price.value;
        });

        inputItem(sortedProducts);
    }

    function sortProductAsc(product) {
        let sortedProducts = product.sort(function (a, b) {
            return b.price.value - a.price.value;
        });

        inputItem(sortedProducts);
    }


    document.getElementById('sort').addEventListener("click", (event) => {
        let sortItem = event.target;

        shop.innerHTML = '';

        if (sortItem.textContent == 'Desc') {
            sortItem.innerText = 'Asc';
            sortProductDesc(result);
        } else if (sortItem.textContent == 'Asc') {
            sortItem.innerText = 'Desc';
            sortProductAsc(result);
        }
    });

    document.getElementById('search').addEventListener("keyup", (event) => {
        let request = event.target.value;
        if (request.length > 1) {
            let reg = new RegExp(request, 'gi');
            result = products.filter((product) => product.title.search(reg) !== -1 || product.description.search(reg) !== -1);
            shop.innerHTML = '';
            inputItem(result);
        } else {
            shop.innerHTML = '';
            result=products.slice();
            inputItem(result);
        }
    });
})();



// const CurrencyByn = await fetch('http://www.nbrb.by/api/exrates/rates/usd?parammode=2')
//     .then(r => r.json())
//     .then(data => console.log(data));
//
//
// console.log(CurrencyByn);