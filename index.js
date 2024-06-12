// let carts = document.querySelectorAll(".add-cart");

// let products = [
//   {
//     name: "Red Suit",
//     tag: "redsuit",
//     price: 50,
//     inCate: 0,
//   },

//   {
//     name: "Yellow Shirt",
//     tag: "yellowshirt",
//     price: 20,
//     inCate: 0,
//   },

//   {
//     name: "Long Sleeve Shirt",
//     tag: "longsleeveshirt",
//     price: 25,
//     inCate: 0,
//   },

//   {
//     name: "Work Tshirt",
//     tag: "worktshirt",
//     price: 30,
//     inCate: 0,
//   },
// ];

// for (let i = 0; i < carts.length; i++) {
//   carts[i].addEventListener("click", () => {
//     cartNumbers(products[i]);
//     totalCost(products[i]);
//   });
// }

// function onLoadCardNumbers() {
//   let productNumbers = localStorage.getItem("cartNumbers");
//   if (productNumbers) {
//     document.querySelector(".cart span").textContent = productNumbers;
//   }
// }

// function cartNumbers(product) {
//   let productNumbers = localStorage.getItem("cartNumbers");

//   productNumbers = parseInt(productNumbers);

//   if (productNumbers) {
//     localStorage.setItem("cartNumbers", productNumbers + 1);
//     document.querySelector(".cart span").textContent = productNumbers + 1;
//   } else {
//     localStorage.setItem("cartNumbers", 1);
//     document.querySelector(".cart span").textContent = 1;
//   }

//   setItems(product);
// }
// function setItems(product) {
//   let cartItems = localStorage.getItem("productsInCart");
//   cartItems = JSON.parse(cartItems);

//   if (cartItems != 0) {
//     if (cartItems[product.tag] == undefined) {
//       cartItems = {
//         ...cartItems,
//         [product.tag]: product,
//       };
//     }
//     cartItems[product.tag].inCate += 1;
//   } else {
//     product.inCate = 1;
//     cartItems = {
//       [product.tag]: product,
//     };
//   }

//   localStorage.setItem("productsInCart", JSON.stringify(cartItems));
// }

// function totalCost(product) {
//   console.log("my cartCost is", cartCost );
//   console.log(typeof cartCost);
  

//   if (cartCost != null) {
//     cartCost = parseInt(cartCost);
//     localStorage.setItem("totalCost", cartCost + product.price);
//   } else {
//     localStorage.setItem("totalCost", product.price);
//   }
// }
// function displayCart() {
//   let cartItems = localStorage.getItem("productsInCart");
//   cartItems = JSON.parse(cartItems);
//   let productContainer = document.querySelector(".products");

//   let cartCost = localStorage.getItem("totalCost");
//   if (cartCost) {
//     cartCost = parseInt(cartCost);
//   }

//   console.log(cartItems);
//   if (cartItems && productContainer) {
//     productContainer.innerHTML = "";
//     Object.values(cartItems).map((item) => {
//       productContainer.innerHTML += `
//                 <div class="product">
//                 <ion-icon name="close-outline"></ion-icon>
//             <img src="./images/${item.tag}.jpg">
//             <span>${item.name}</span>
//             </div>
//             <div class="price">${item.price},00</div>
//             <div class="quantity">
//             <ion-icon name="remove-circle-outline"></ion-icon>
//             <span>${item.inCate}</span>
//             <ion-icon name="add-circle-outline"></ion-icon>
//          </div>
         
//     <div class="total">
//     $${item.inCate * item.price},00
//     </div>
//             `;
//     });

//     productContainer.innerHTML += `
//            <div class="basketTotalContainer">
//              <h4 class="basketTotalTitle">
//              Basket Total
//               </h4>
//     <h4 class="basketTotal">
//         $${cartCost},00
//        </h4>
//     </div>
// `;
//   }
// }

// onLoadCardNumbers();
// displayCart();











let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "Red Shirt",
    tag: "redsuit",
    price: 50,
    inCate: 0,
  },
  {
    name: "Yellow Shirt",
    tag: "yellowshirt",
    price: 20,
    inCate: 0,
  },
  {
    name: "Sleeve Shirt",
    tag: "longsleeveshirt",
    price: 25,
    inCate: 0,
  },
  {
    name: "Work Tshirt",
    tag: "worktshirt",
    price: 30,
    inCate: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCardNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product, action) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers) || 0;

  if (action === "decrease") {
    localStorage.setItem("cartNumbers", productNumbers - 1);
    document.querySelector(".cart span").textContent = productNumbers - 1;
  } else if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product, action);
}

function setItems(product, action) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems) || {};

  if (!cartItems[product.tag]) {
    cartItems[product.tag] = { ...product, inCate: 0 };
  }

  if (action === "decrease" && cartItems[product.tag].inCate > 0) {
    cartItems[product.tag].inCate -= 1;
  } else if (action !== "decrease") {
    cartItems[product.tag].inCate += 1;
  }

  if (cartItems[product.tag].inCate <= 0) {
    delete cartItems[product.tag];
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product, action) {
  let cartCost = localStorage.getItem("totalCost");
  cartCost = parseInt(cartCost) || 0;

  if (action === "decrease") {
    localStorage.setItem("totalCost", cartCost - product.price);
  } else {
    localStorage.setItem("totalCost", cartCost + product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems) || {};
  let productContainer = document.querySelector(".products");

  let cartCost = localStorage.getItem("totalCost");
  cartCost = parseInt(cartCost) || 0;

  if (productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
        <div class="product">
          <ion-icon name="close-outline" class="delete" data-tag="${item.tag}"></ion-icon>
          <img src="./images/${item.tag}.jpg">
          <span>${item.name}</span>
        </div>
        <div class="price">${item.price},00</div>
        <div class="quantity">
          <ion-icon name="remove-circle-outline" class="decrease" data-tag="${item.tag}"></ion-icon>
          <span>${item.inCate}</span>
          <ion-icon name="add-circle-outline" class="increase" data-tag="${item.tag}"></ion-icon>
        </div>
        <div class="total">
          $${item.inCate * item.price},00
        </div>
      `;
    });

    productContainer.innerHTML += `
      <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">Basket Total</h4>
        <h4 class="basketTotal">$${cartCost},00</h4>
      </div>
    `;

    manageQuantity();
    deleteButtons();
  }
}

function manageQuantity() {
  let decreaseButtons = document.querySelectorAll('.decrease');
  let increaseButtons = document.querySelectorAll('.increase');
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems) || {};

  for (let i = 0; i < decreaseButtons.length; i++) {
    let productTag = decreaseButtons[i].dataset.tag;
    let currentProduct = cartItems[productTag];

    decreaseButtons[i].addEventListener('click', () => {
      if (currentProduct.inCate > 1) {
        cartNumbers(currentProduct, "decrease");
        totalCost(currentProduct, "decrease");
      } else if (currentProduct.inCate === 1) {
        delete cartItems[productTag];
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        cartNumbers(currentProduct, "decrease");
        totalCost(currentProduct, "decrease");
      }
      displayCart();
    });

    increaseButtons[i].addEventListener('click', () => {
      cartNumbers(currentProduct);
      totalCost(currentProduct);
      displayCart();
    });
  }
}

function deleteButtons() {
  let deleteButtons = document.querySelectorAll('.delete');
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems) || {};
  let productNumbers = localStorage.getItem('cartNumbers');
  let cartCost = localStorage.getItem('totalCost');

  productNumbers = parseInt(productNumbers) || 0;
  cartCost = parseInt(cartCost) || 0;

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', () => {
      let productTag = deleteButtons[i].dataset.tag;
      let itemQuantity = cartItems[productTag].inCate;
      let itemTotalCost = itemQuantity * cartItems[productTag].price;

      delete cartItems[productTag];
      productNumbers -= itemQuantity;
      cartCost -= itemTotalCost;

      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
      localStorage.setItem('cartNumbers', productNumbers);
      localStorage.setItem('totalCost', cartCost);

      if (productNumbers === 0) {
        clearCart();
      } else {
        displayCart();
      }
    });
  }
}

function clearCart() {
  localStorage.removeItem('productsInCart');
  localStorage.removeItem('cartNumbers');
  localStorage.removeItem('totalCost');
  document.querySelector(".cart span").textContent = 0;
  displayCart();
}

onLoadCardNumbers();
displayCart();
