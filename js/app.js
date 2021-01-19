'use strict'

// all global variables definition
var d = document;
var generatedNumbers = [];



var firstImgName = d.getElementById('item1-name');
var secondImgName = d.getElementById('item2-name');
var thirdImgName = d.getElementById('item3-name');


var firstImg = d.getElementById('firstImg');
var secondImg = d.getElementById('secondImg');
var thirdImg = d.getElementById('thirdImg');

var imagesSection = d.getElementById('row');


var maxRounds = 25;
var roundCounter = 0
var maxRounndSubmitionListener = d.getElementById('submitRoundNumber')

var redo = d.getElementById('redo');

var product1
var product2
var product3

var generate1
var generate2
var generate3

var showResults = d.getElementById("showResults")
var statistics = d.getElementById("statistics-box")


var images = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg'
]

products.prototype.allProductsObjects = []

// adding event listner on change rounds number  
maxRounndSubmitionListener.addEventListener('click', changeMaxRounds)

function changeMaxRounds(event) {

    event.preventDefault();
    maxRounds = d.getElementById('roundNumber').value;

}


// random number generator

function generateRandomNumber() {

    var gerneratedNumber = Math.floor(Math.random() * images.length);

    return gerneratedNumber
}


// main class for all products

function products(name, filePath) {

    this.name = name;
    this.filePath = filePath;
    this.shown = 0
    this.clicked = 0
    products.prototype.allProductsObjects.push(this)
}


// initionating all the products upon the page load 
(function () {
    var product
    for (var i = 0; i < images.length; i++) {

        product = new products(images[i].slice(0, images[i].indexOf(".")), `img/${images[i]}`, `img/${images[i]}`)

    }


}());


// main rendering function for all the images 
var notFirstTimeFlag = false;
function renderer(event) {

    if (notFirstTimeFlag) {

        if (roundCounter <= maxRounds) {
            if (event.target.id == "vote1") {
                product1.clicked++;
            } else
                if (event.target.id == "vote2") {
                    product2.clicked++;
                } else
                    if (event.target.id == "vote3") {
                        product3.clicked++;
                    } else {
                        return
                    }

            product1.shown++;
            product2.shown++;
            product3.shown++;

            generate1 = generateRandomNumber();
            generate2 = generateRandomNumber();
            generate3 = generateRandomNumber();

            while (generate1 == generate2
                || generate1 == generate3
                || generate2 == generate3
                || generatedNumbers.includes(generate1)
                || generatedNumbers.includes(generate2)
                || generatedNumbers.includes(generate3)) {

                generate1 = generateRandomNumber();


                generate2 = generateRandomNumber();


                generate3 = generateRandomNumber();

            }
            generatedNumbers = []
            generatedNumbers.push(generate1)
            generatedNumbers.push(generate2)
            generatedNumbers.push(generate3)


            product1 = products.prototype.allProductsObjects[generate1]

            product2 = products.prototype.allProductsObjects[generate2]

            product3 = products.prototype.allProductsObjects[generate3]




            firstImgName.innerHTML = product1.name;
            secondImgName.innerHTML = product2.name;
            thirdImgName.innerHTML = product3.name;

            firstImg.setAttribute('src', product1.filePath)
            secondImg.setAttribute('src', product2.filePath)
            thirdImg.setAttribute('src', product3.filePath)

            roundCounter++

        }


    } else {
        notFirstTimeFlag = true;
        generate1 = generateRandomNumber();


        generate2 = generateRandomNumber();


        generate3 = generateRandomNumber();

        while (generate1 == generate2
            || generate1 == generate3
            || generate2 == generate3) {

            generate1 = generateRandomNumber();


            generate2 = generateRandomNumber();


            generate3 = generateRandomNumber();

        }


        product1 = products.prototype.allProductsObjects[generate1]

        product2 = products.prototype.allProductsObjects[generate2]

        product3 = products.prototype.allProductsObjects[generate3]


        firstImgName.innerHTML = product1.name;
        secondImgName.innerHTML = product2.name;
        thirdImgName.innerHTML = product3.name;

        firstImg.setAttribute('src', product1.filePath)
        secondImg.setAttribute('src', product2.filePath)
        thirdImg.setAttribute('src', product3.filePath)

        roundCounter++;
    }



}


renderer()

// adding click event listner on images

imagesSection.addEventListener('click', renderer)



// adding redo listner
redo.addEventListener('click', allowUserToRedo)

function allowUserToRedo() {

    location.reload();


}


// adding show results listener

showResults.addEventListener('click', renderProducts)






// main Products renderer function
function renderProducts(e) {



    e.preventDefault()

    var statisticsValues = `<ul class="products-Results">`;

    products.prototype.allProductsObjects.map(product => statisticsValues += `<li> ${product.name} had <strong class="products-Results-vals">${product.clicked}</strong> votes, and was seen <strong class="products-Results-vals">${product.shown}</strong> times. </li> <br>  `)
    statisticsValues += `</ul>`;


    statistics.innerHTML = statisticsValues;

    maxRounndSubmitionListener.disabled
    showResults.disabled;

    maxRounndSubmitionListener.removeEventListener('click', renderProducts)
    showResults.removeEventListener('click', renderProducts)

}