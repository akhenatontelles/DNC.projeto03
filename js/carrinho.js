// variáveis
let cartItems = [];
let totalValue = 0;

// Adiciona um produto
function addToCart(nomeProduto, productPrice) {
  let existingItem = cartItems.find((item) => item.name === nomeProduto);

  if (existingItem) {
    existingItem.quantidade++;
  } else {
    cartItems.push({ name: nomeProduto, price: productPrice, quantidade: 1 });
  }

  updateCart();
}

// Add  um item no carrinho
function incrementItem(index) {
  cartItems[index].quantidade++;
  updateCart();
}

// Remove um item no carrinho ou remove se a quantidade for 1
function decrementItem(index) {
  if (cartItems[index].quantidade > 1) {
    cartItems[index].quantidade--;
  } else {
    cartItems.splice(index, 1);
  }

  updateCart();
}

// Remove um item do carrinho
function removeItem(index) {
  cartItems.splice(index, 1);
  updateCart();
}

// Atualiza a exibição do carrinho na página
function updateCart() {
  let cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";
  totalValue = 0;

  cartItems.forEach((item, index) => {
    let listarItem = document.createElement("li");
    listarItem.className = "cart-item";

    listarItem.innerHTML = `
    <div class="container">
  <div class="row">
    <div class="col">
    <img style="width: 100%; margin-top:15px" src="img/1.png" />
    </div>
    <div class="col-6">
    <p class="fw-normal">${
      item.name
    }</p><p style="margin-top:-20px; color:s;">R$${formatPrice(
      item.price
    )}</br><button class='circulo' onclick='decrementItem(${index})'>- </button>
              <span id='count'>${formatquantidade(item.quantidade)}</span>
              <button class='circulo' onclick='incrementItem(${index})'> +</button></p>
    </div>
    <div class="col"><h6>
    R$${formatPrice(item.price * item.quantidade)}
    </h6>
    </div>
  </div>
  </div>
        `;
    cartList.appendChild(listarItem);
    totalValue += item.price * item.quantidade;
  });

  document.getElementById("total").textContent = formatPrice(totalValue);
  document.getElementById("quantidade").textContent = cartItems.reduce(
    (acc, item) => acc + item.quantidade,
    0
  );
}

function formatPrice(price) {
  return price.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

function formatquantidade(quantidade) {
  return quantidade.toLocaleString();
}
