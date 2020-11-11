/*
  José Luis Friedrich
*/

const name = prompt('Ingrese nombre: ');
const age = parseInt(prompt('Ingrese edad: '));
const ageAppearance = age - 2;

//template literal concat
alert(`Tu nombre es ${name} y si bien tenes ${age} años aunque aparentas de ${ageAppearance}.`);

//Extra
if (name === 'paula') {
  const favouriteStudent = prompt('Ingrese nombre de su alumno favorito: ');

  //normal concat
  let result = 'El alumno favorito de ' + name + ' es ' + favouriteStudent + '. ';
  result += favouriteStudent === 'josé luis' ? 'Gracias, lo sabía!' : 'Todo mal con vos!';
  alert(result);
}

console.log('hasta la vista!');
