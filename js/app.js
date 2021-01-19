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
var roundNumber = d.getElementById('roundNumber')
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
    maxRounds = parseInt(roundNumber.value);

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

    var video = document.getElementById("Video");
    video.play();
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
renderChart()

// adding click event listner on images

imagesSection.addEventListener('click', renderer)

// adding redo listner
redo.addEventListener('click', allowUserToRedo, true)

function allowUserToRedo() {

    location.reload();


}



// adding show results listener
showResults.addEventListener('click', renderChart)


// main chart renderer function
function renderChart(e) {



    var imagesCopy = images
    imagesCopy = imagesCopy.map(val => val.slice(0, val.indexOf(".")))

    var clicked = []
    var shown = []
    var shownPercentage = []
    products.prototype.allProductsObjects.map(val => {
        clicked.push(val.clicked)
        shown.push(val.shown)
        shownPercentage.push((val.clicked == 0 ? 0 : ((val.clicked / val.shown) * 100)))
    })

    var ctx = document.getElementById('Chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imagesCopy,
            barPercentage: 1,
            barThickness: 6,
            maxBarThickness: 2,
            minBarLength: 2,
            datasets: [


                {
                    label: 'Clicked',
                    data: clicked,
                    backgroundColor: '#B9ABCF',
                    borderColor: 'gray',
                    borderWidth: 1,

                }, {
                    label: 'Shown',
                    data: shown,
                    backgroundColor: '#b3cdd1',
                    borderColor: 'gray',
                    borderWidth: 1,


                },

                {


                    label: 'Clicked Percentage % ',
                    data: shownPercentage,
                    backgroundColor: '#ffa500',
                    borderColor: 'gray',
                    borderWidth: 1,

                },
            ]

        },
        options: {

            scales: {
                yAxes: [{
                    ticks: {
                        max: maxRounds,
                        min: 0,
                        beginAtZero: 0,
                        stepSize: 5,
                    }
                }],

            },

            layout: {
                padding: {
                    left: 50,
                    right: 50,
                    top: 50,
                    bottom: 50
                },

            },

            legend: {
                labels: {

                    fontColor: 'red',

                }
            }

        }
    });

    myChart.canvas.parentNode.style.width = '60%';
    myChart.canvas.parentNode.style.height = '400px';

    if (e) {
        e.preventDefault()
        roundNumber.disabled = true;
        maxRounndSubmitionListener.disabled = true;
        showResults.disabled = true;
        maxRounndSubmitionListener.style.opacity = 0.3;
        showResults.style.opacity = 0.3;
        maxRounndSubmitionListener.style.cursor = "initial";
        showResults.style.cursor = "initial";
        showResults.removeEventListener('click', renderChart)
        maxRounds = 0;
    }



}
