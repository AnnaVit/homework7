'use strict'

const basketPage = {

    cart:  [
        {   
            number: 1,
            img: 'img/hat.jpg',
            name:'Шляпа',
            price: 800,
            quantity: 1,                    
        },
        {
            number: 2, 
            img: 'img/scarf.jpg',
            name:'Шарфик',
            price: 500,
            quantity: 1,
        },
        { 
            number: 3, 
            img: 'img/sweatshirt.jpg', 
            name:'Свитшот',
            price: 1000,
            quantity: 1,
        },
        {
            number: 4,  
            img: 'img/coat.jpg',
            name:'Пальто',
            price: 5000,
            quantity: 1,
        },
        {
            number: 5,  
            img: 'img/socks.jpg',
            name:'Носочки',
            price: 200,
            quantity: 1,
        }
    ],
    
    Init() {
        this.basketTotal(this.cart);
        this.renderBasket(this.cart);
        this.productQuantity();
        this.buttonCheckout();
        this.orderComment();
        this.orderComplete();
        
    },

    renderBasket(cart){
        this.cart.forEach(item =>{
        this.page.insertAdjacentHTML('beforeend', this.renderItem(item));
    })
    },
    renderItem(item){
        return `<div class="product">
                <img src=${item.img}>
                <p> ${item.name}</p>
                <p>Цена: ${item.price}</p>
                <p>Количество: ${item.quantity}</p>
                <button class="rm-cart" data-id_product="${item.number}">-</button>
                <button class="add-cart" data-id_product="${item.number}">+</button>
                </div>`
        
    },

    basketPrice(){
        let  countBasketPrice = this.cart.reduce(function(total, item){
            return total + (item.price * item.quantity);    
            }, 0);
        return (countBasketPrice);     
    },

    basketTotal(){
        let basketMessage = document.querySelector('#basket-message');
        if (this.cart.length === 0){
            basketMessage.textContent = "Корзина пуста";
        }else{
            basketMessage.textContent  = `В корзине ${this.cart.length} товаров на сумму ${this.basketPrice()} рублей`;
        }
    },

/*Тык на кнопку + - увеличение quantity, тык на - - уменьшение quantity */ 

    productQuantity(){
       
        this.page.addEventListener('click', this.findProduct.bind(this));  
    },

    findProduct(){
        const productID = +event.target.dataset.id_product;
        const button = event.target.className;//нашли id
        
        const product = this.cart.find(item =>item.number===productID);
        const productIndex = this.cart.findIndex(item =>item.number===productID);
    
        if (button === "add-cart"){
            product.quantity ++;
            this.updateCart();

        }else if(button === "rm-cart"){
            product.quantity --;
            this.updateCart();
     
        };
        if(product.quantity === 0){
            this.cart.splice(productIndex,1);
            this.updateCart();       
        }
           
    },

    updateCart(){
        this.page.innerHTML = ``;
        this.renderBasket(this.cart);
        this.basketTotal(this.cart);

    },
    /*Переменные с блоками html*/ 
    basketBlock:   document.querySelector('#block-basket'),
    page:          document.querySelector('#basket'),
    inputDelivery: document.querySelector('#div_input_delivery'),
    comment:       document.querySelector('#div_comment'),
    thanks:        document.querySelector('#thanks'),

    /*Переменные с кнопками html*/ 
    checkout:      document.querySelector('#checkout'),
    buttonComment: document.querySelector('#button_comment'),
    buttonComplete: document.querySelector('#button_complete'),
    

    buttonCheckout(){
        this.checkout.addEventListener('click', this.buttonCheckoutClick.bind(this));

    },
    buttonCheckoutClick(){
        this.basketBlock.style.display="none"; 
        this.inputDelivery.style.display="block"; 
    },
    orderComment(){
        this.buttonComment.addEventListener('click', this.buttonCommentClick.bind(this));
    },
    buttonCommentClick(){
        this.inputDelivery.style.display="none";
        this.comment.style.display="block";
    },
    orderComplete(){
        this.buttonComplete.addEventListener('click', this.buttonCompleteClick.bind(this));
    },
    buttonCompleteClick(){
        this.comment.style.display="none";
        this.thanks.style.display="block";
    },
    
};

window.addEventListener('load',() => basketPage.Init());


/*if (!("a" in window)) {
    var a = 1;
}
alert(a);

 возвращает неизвестно. И я не понимаю почему. 

var b = function a(x) {
    x && a(--x);
};
alert(a);
1.Вернет ошибку, тк а не определено.


function a(x) {
    return x * 2;
}
var a;
alert(a);

вернет функцию, потому что в созданную переменную мы передаем адрес, и получается ее и вызываем.

function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);

arguments[] типа массив из аргументов функции.
arguments[2] = 10 - значит аргумент а = 10.
и вернет функция 10.
 
function a() {
    alert(this);
}
a.call(null);

Справедливости ради, скажу, что плохо понимаю, почему оно работает именно так,
 очевидным для меня было только предпоследнее задание. Я еще погуглю эти вопросы

*/