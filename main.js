let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
const cartContent=document.querySelector(".cart-content");
const totalPrice=document.querySelector(".total-price");

//open
cartIcon.onclick = () => {
    cart.classList.add("active");
    document.getElementById("counter").style.display="none";
};
//close
closeCart.onclick = () => {
    cart.classList.remove("active");
    document.getElementById("counter").style.display="inline-block";
};

let in_cart=[
];

function removeProduct(div){
    let ele=div.children[0].innerText;

    let size=div.children[3].innerText;

    let confirmation=confirm("do you want really want to delete this item?");
    
    if(confirmation==true){
        in_cart=in_cart.filter(item=>{
            return !(item.name===ele && item.size===size);
        })

        render();
    }
}

function addQty(div){
    let name=div.children[0].innerText;
    let size=div.children[3].innerText;

    in_cart.forEach(item=>{
        if(item.name===name && item.size===size){
            item.qty++;
        }
    })

    render();
}

function removeQty(div){
    let name=div.children[0].innerText;
    let size=div.children[3].innerText;

    in_cart.forEach(item=>{
        if(item.name===name && item.size===size && item.qty>=2){
            item.qty--;
        }
    })

    render();
}

function addToCart(ele){
    const name=ele.children[1].innerText //Name ke liye
    const price=ele.children[2].innerText.substr(1)//price
    const size=ele.children[3].children[1].value//size
    const image_path=ele.children[0].getAttribute("src")//imagePath
    

    let isPresent=false;

    in_cart.forEach(item=>{
        if(item.name===name && item.size==size){    
            item.qty++;
            isPresent=true;
        }
    })

    if(isPresent==false){
        const newAdd={
            name,
            price,
            qty:1,
            size,
            image_path
        }
    in_cart=[...in_cart,newAdd];
    }

    render();
}

function render(){
    document.getElementById("counter").innerText=in_cart.length;
    cartContent.innerHTML="";

    let price=0;
    for(let i=0;i<in_cart.length;i++){
        let child=add_product(in_cart[i].image_path,in_cart[i].name,in_cart[i].price,in_cart[i].qty,in_cart[i].size);
        cartContent.appendChild(child);
        price=price+parseInt(in_cart[i].price*in_cart[i].qty);
    }
    totalPrice.innerText="₹"+price;
    console.log("New forloop It is rendered");

    const button = document.querySelector('.btn-buy')
    if(in_cart.length>=1){
        button.disabled=false;
    }
    else{
        button.disabled=true;
    }
}

function add_product(image_path,parameter_title,parameter_price,parametere_qty,parameter_size){
    var cartBox=document.createElement('div');
    cartBox.classList.add("cart-box");

    var image=document.createElement('img');
    image.src = image_path;
    image.classList.add("cart-img");
    cartBox.appendChild(image);

    var detailBox=document.createElement('div');
    detailBox.classList.add("detail-box");
    cartBox.appendChild(detailBox);

    var title=document.createElement("div");
    title.classList.add("cart-product-title");
    title.innerText=parameter_title;
    detailBox.appendChild(title);

    var price=document.createElement("div");
    price.classList.add("cart-price");
    price.innerText="₹"+parameter_price;
    detailBox.appendChild(price);

    var divQty=document.createElement("div");

    var plus=document.createElement("button");
    plus.classList.add("plus");
    plus.setAttribute("onclick",`addQty(this.parentElement.parentElement)`);
    plus.innerText="+";
    var minus=document.createElement("button");
    minus.classList.add("minus");
    minus.setAttribute("onclick",`removeQty(this.parentElement.parentElement)`);
    minus.innerText="-";
    
    var input=document.createElement("input");
    input.classList.add("cart-quantity");
    input.setAttribute("readonly",true);
    input.setAttribute("value",parametere_qty);

    divQty.appendChild(minus);
    divQty.appendChild(input);
    divQty.appendChild(plus);

    detailBox.appendChild(divQty);

    var select=document.createElement("div");
    select.innerText=parameter_size;
    detailBox.appendChild(select);

    var dabba=document.createElement("i");
    dabba.classList.add("bx");
    dabba.classList.add("bxs-trash-alt");
    dabba.classList.add("cart-remove");
    dabba.setAttribute("onclick","removeProduct(this.parentElement)")
    detailBox.appendChild(dabba);

    return cartBox;

}


render();

// class cartItem{
//     constructor(name,price,size,image_path){
//         this.name = name
//         this.price = price
//         this.qty = 1
//         this.size = size
//         this.image_path = image_path
//     }

// }
