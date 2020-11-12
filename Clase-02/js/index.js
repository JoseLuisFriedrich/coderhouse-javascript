/*
  José Luis Friedrich
*/

const number = Number(prompt('Ingrese un número: '));

const isPositive = number > 0;
console.log(`el nro ${number} ${isPositive ? 'es positivo' : 'es negativo'}`);

const isMillon = number >= 1000000;
if (isMillon) {
  console.log('si ingresaste el saldo de tu cuenta bancaria, sos millonari@');
}

if (number > 1000) {
  alert('mayor a mil');
} else if (number > 10 && number < 50) {
  alert('espero no hayas ingresando el saldo de tu cuenta bancaria...');
} else {
  console.log('ninguna de las anteriores condiciones');
}
