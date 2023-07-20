export default function validate(input) {
  let errors = {};
  var regex = new RegExp("^[0-9-]+$");
  if (!input.name) {
    errors.name = "Se require un nombre";
  } else if (input.name.length < 3 || input.name.length > 20) {
    errors.name = "El nombre debe tener entre 3 y 20 caracteres";
  } else if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\d/?~]/.test(input.name)) {
    errors.name = "Solo mayusculas y minusculas.";
  } else if (
    input.name.includes("-") ||
    input.name.charAt(input.name.length - 1) == " " ||
    input.name.charAt(0) == " "
  ) {
    errors.name = "Ingrese un nombre válido, con mayusculas y minusculas!";
  }
  /////////////////
  else if (!input.height) {
    errors.height = "El formato para la altura debe ser 'Hmin-Hmax'";
  } else if (!input.height.charAt(input.height.indexOf("-") + 1)) {
    errors.height = "El formato para la altura debe ser 'Hmin-Hmax'";
  } else if (!input.height.includes("-")) {
    errors.height = "El formato para la altura debe ser 'Hmin-Hmax'";
  } else if (
    Number(input.height.split("-")[0]) > Number(input.height.split("-")[1])
  ) {
    errors.height = "La altura Máxima debe ser superior a la Mínima";
  } else if (regex.test(input.height) == false) {
    errors.height = "Solo numeros enteros mayores a 0!";
  } else if (input.height.charAt(0) == "-") {
    errors.height = "Solo numeros enteros mayores a 0!";
  }
  ////////////////////
  else if (!input.weight) {
    errors.weight = "El formato para el peso debe ser 'Wmin-Wmax'";
  } else if (!input.weight.includes("-")) {
    errors.weight = "El formato para el peso debe ser 'Wmin-Wmax'";
  } else if (!input.weight.charAt(input.weight.indexOf("-") + 1)) {
    errors.weight = "El formato para el peso debe ser 'Wmin-Wmax'.";
  } else if (
    Number(input.weight.split("-")[0]) > Number(input.weight.split("-")[1])
  ) {
    errors.weight = "El peso Máximo debe ser superior al peso Mínimo";
  } else if (regex.test(input.weight) == false) {
    errors.weight = "Solo numeros enteros mayores a 0!";
  } else if (input.weight.charAt(0) == "-") {
    errors.weight = "Solo numeros enteros mayores a 0!";
  }
  ////////////////////
  else if (!input.life_span) {
    errors.life_span = "El formato para los años de vida debe ser 'Vmin-Vmax'";
  } else if (!input.life_span.includes("-")) {
    errors.life_span = "l formato para los años de vida debe ser 'Vmin-Vmax'";
  } else if (!input.life_span.charAt(input.life_span.indexOf("-") + 1)) {
    errors.life_span = "l formato para los años de vida debe ser 'Vmin-Vmax'";
  } else if (
    Number(input.life_span.split("-")[0]) >
    Number(input.life_span.split("-")[1])
  ) {
    errors.life_span =
      "Los años de vida máximos deben ser mayores a los mínimos.";
  } else if (regex.test(input.life_span) == false) {
    errors.life_span = "Solo numeros enteros mayores a 0!";
  } else if (input.life_span.charAt(0) == "-") {
    errors.life_span = "Solo numeros enteros mayores a 0!";
  }
  ////////////////////////////////
  else if (input.temperament?.length == 5) {
    errors.temperament = "Solo puedes seleccionar hasta 6 temperamentos";
  }
  //////////////////////////////////
  if (!errors.name && !errors.height && !errors.weight && !errors.life_span) {
    document.getElementById("Create").disabled = false;
  } else {
    document.getElementById("Create").disabled = true;
  }
  return errors;
}
