function bodyLoad(){loadCategories(),loadProducts("https://fakestoreapi.com/products/"),getCartCount()}function loadCategories(){fetch("https://fakestoreapi.com/products/categories").then(t=>t.json()).then(function(t){for(var e of(t.unshift("all"),t)){var a=document.createElement("option");a.text=e.toUpperCase(),a.value=e,document.querySelector("select").appendChild(a)}})}function loadProducts(t){document.querySelector("main").innerHTML="",fetch(t).then(function(t){return t.json()}).then(function(t){for(var e of t){var a=document.createElement("div");a.className="card p-1 me-1",a.style.width="250px",a.innerHTML=`
    <a href="${e.image}"target="_blank"><img src="${e.image}" class="img-top "width="200" height="150"></img></a>
    <div class="card-header overflow-auto" style="height:100px">
    <p>${e.title}</p>
    </div>
    <div class="card-body">
    <dl>
    <dt>Price</dt>
    <dd> &#8377;${e.price}</dd>
    <dt>Ratings</dt>
    <dd> <span class="bi bi-star-fill text-warning"></span> ${e.rating.rate} (${e.rating.count}) Reviews</dd>
    </dl>
    </div>
    <div class="card-footer">
    <button class="btn btn-success w-100" onclick="cartAdd(${e.id})"><span class="bi bi-cart4"></span> Add to Cart</button>
    </div>
    `,document.querySelector("main").appendChild(a)}})}function categoryChanged(){var t=document.getElementById("lstCategories").value;"all"==t?loadProducts("https://fakestoreapi.com/products"):loadProducts(`https://fakestoreapi.com/products/category/${t}`)}function navClick(t){document.getElementById("lstCategories").value=t,"all"===t?loadProducts("https://fakestoreapi.com/products"):loadProducts(`https://fakestoreapi.com/products/category/${t}`)}var cartItems=[];function cartAdd(t){fetch(`https://fakestoreapi.com/products/${t}`).then(function(t){return t.json()}).then(function(t){alert(`${t.title}
added to cart`),cartItems.push(t),getCartCount(),loadCartItems(),findTotal()})}function getCartCount(){document.getElementById("cartCount").innerHTML=cartItems.length}function loadCartItems(){let t=document.querySelector("tbody");for(var e of(t.innerHTML="",cartItems)){var a=document.createElement("tr"),n=document.createElement("td"),r=document.createElement("td"),o=document.createElement("td"),d=document.createElement("td");n.innerHTML=e.title,r.innerHTML=`<img src="${e.image}" width="50" height="50">`,o.innerHTML=`₹${e.price}`,d.innerHTML=`<button class="bi bi-trash-fill btn btn-danger" onclick="deleteItem(${e.id})"></button>`,a.appendChild(n),a.appendChild(r),a.appendChild(o),a.appendChild(d),t.appendChild(a)}}function deleteItem(t){var e=cartItems.findIndex(function(e){return e.id===t});-1!==e?(cartItems.splice(e,1),getCartCount(),loadCartItems(),findTotal()):console.error("Item with the specified ID not found.")}var total=0;function findTotal(){for(var t of(total=0,cartItems))total+=t.price;document.getElementById("tot").innerHTML=`₹ ${total.toFixed(2)}`}