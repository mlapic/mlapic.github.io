document.getElementById('switch').addEventListener("click", switchClick, false);

function switchClick() {
	let c1 = document.getElementById('currency1').textContent;
  let c2 = document.getElementById('currency2').textContent;
  document.getElementById('currency1').textContent = c1 === 'HRK' ? 'EUR' : 'HRK';
  document.getElementById('currency2').textContent = c2 === 'HRK' ? 'EUR' : 'HRK';
  
  convertValue();
}

document.getElementById('calculator')
	.querySelectorAll('.button')
  .forEach( e => {
    e.addEventListener("click", buttonClick, false);
  });

function buttonClick(event) {
  let value = event.target.dataset.value;
  let display = document.getElementById('display1');
  let input = display.textContent;
    
  if(value === 'bs') {
    display.textContent = input.slice(0, -1);
  } else if (value === 'decimal') {
    display.textContent = input + '.';
  } else {
    display.textContent = input + value;
  }
  
  convertValue();
}

function convertValue() {

  const conversionRate = 7.53450;

  let fromCurrency = document.getElementById('currency1').textContent;
  let fromValue = document.getElementById('display1').textContent;
  let value = 0.00;
  
  if(fromCurrency === 'HRK') {
  	value =  fromValue / conversionRate;
  } else {
    value = fromValue * conversionRate;
  }
  
  console.log(fromCurrency, fromValue, value, value.toFixed(2));
  
  if(isNaN(value.toFixed(2)) || fromValue === '') {
  	document.getElementById('display2').textContent = '';
  } else {
  	document.getElementById('display2').textContent = value.toFixed(2);
  }
}