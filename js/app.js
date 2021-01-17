'use strict'


var d = document;
var generatedNumbers = [];

var allProductsObjects = []

var firstImgName = d.getElementById('item1-name');
var secondImgName = d.getElementById('item2-name');
var thirdImgName = d.getElementById('item3-name');


var firstImg = d.getElementById('firstImg');
var secondImg = d.getElementById('secondImg');
var thirdImg = d.getElementById('thirdImg');

var firstVote = d.getElementById('vote1');
var secondVote = d.getElementById('vote2');
var thirdVote = d.getElementById('vote3');

var maxRounds = 25;
var roundCounter = 0
var maxRounndSubmitionListener = d.getElementById('submitRoundNumber')
maxRounndSubmitionListener.addEventListener('click', changeMaxRounds)

function changeMaxRounds() {

    event.preventDefault();
    maxRounds = d.getElementById('roundNumber').value;

}

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

function generateRandomNumber() {

    var gerneratedNumber = Math.floor(Math.random() * images.length);

    return gerneratedNumber
}


function products(name, filePath) {

    this.name = name;
    this.filePath = filePath;
    this.shown = 0
    this.clicked = 0

}

var product1
var product2
var product3

var generate1
var generate2
var generate3


(function () {
    var product
    for (var i = 0; i < images.length; i++) {

        product = new products(images[i].slice(0, images[i].indexOf(".")), `img/${images[i]}`, `img/${images[i]}`)
        allProductsObjects.push(product)

    }

}());

function renderer(event) {

    if (event) {
        if (roundCounter <= maxRounds) {
            if (event.target.id == "vote1") {
                product1.shown++;
                product1.clicked++;


            }
            if (event.target.id == "vote2") {
                product2.shown++;
                product2.clicked++;

            }
            if (event.target.id == "vote3") {
                product3.shown++;
                product3.clicked++;


            }


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


            product1 = allProductsObjects[generate1]

            product2 = allProductsObjects[generate2]

            product3 = allProductsObjects[generate3]




            firstImgName.innerHTML = product1.name;
            secondImgName.innerHTML = product2.name;
            thirdImgName.innerHTML = product3.name;

            firstImg.setAttribute('src', product1.filePath)
            secondImg.setAttribute('src', product2.filePath)
            thirdImg.setAttribute('src', product3.filePath)

            roundCounter++
            console.log(allProductsObjects)
        } else {

            console.log(allProductsObjects)
            renderChart()
        }

    } else {

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


        product1 = allProductsObjects[generate1]

        product2 = allProductsObjects[generate2]

        product3 = allProductsObjects[generate3]


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



firstVote.addEventListener('click', renderer, true)
secondVote.addEventListener('click', renderer, true)
thirdVote.addEventListener('click', renderer, true)


function renderChart() {
    var imagesCopy = images
    imagesCopy = imagesCopy.map(val => val.slice(0, val.indexOf(".")))
    console.log(imagesCopy)
    var clicked = []
    var shown = []
    allProductsObjects.map(val => {
        clicked.push(val.clicked)
        shown.push(val.shown)
    })

    console.log(clicked)
    console.log(shown)

    console.log(allProductsObjects)

    var ctx = document.getElementById('Chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imagesCopy,
            barPercentage: 1,
            barThickness: 6,
            maxBarThickness: 2,
            minBarLength: 2,
            datasets: [{
                label: 'Shown',
                data: shown,
                backgroundColor: 'blue',
                borderColor: 'gray',
                borderWidth: 2

            },
            {
                label: 'Clicked',
                data: clicked,
                backgroundColor: 'orange',
                borderColor: 'gray',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        max: 10,
                        min: 0,
                        beginAtZero: 0,
                        stepSize: 2,
                    }
                }],
                xAxes: [{
                    ticks: {
                        max: 20,
                        min: 0,
                        beginAtZero: 0,
                        stepSize: 2,
                    }
                }]
            },

            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                },
                fontSize: "18",

                width: "70",
                height: "500px",
                fullWidth: false
            },

        }
    });
}