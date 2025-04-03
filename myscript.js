
function calculatesal() {
        var elemento = document.getElementById('valor');
        var valor = elemento.value;

        valor = valor + '';
        valor = parseInt(valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");

        if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }

        elemento.value = valor;
        if(valor == 'NaN') elemento.value = '';
}


function calculateSalary(){

  
  var inputValue = document.getElementById("valor").value;
  var inputFormated = inputValue.replaceAll(".", "");
  var bruto = inputFormated.replaceAll(",", ".");
  if(bruto > 0){
  document.getElementById('inss').style.filter="opacity(1)";
  document.getElementById('liquido').style.filter="opacity(1)";
  document.getElementById('deducaoIr').style.filter="opacity(1)";
  document.getElementById('bruto').style.filter="opacity(1)";
  document.getElementById('deducaoInss').style.filter="opacity(1)";
  parseFloat(bruto);
  console.log(bruto)
const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  document.getElementById("bruto").textContent = formatter.format(bruto);
 
  const tabela = [{salario: 1518.01, aliquota: 7.5},
                  {salario: 2793.89, aliquota: 9},
                  {salario: 4190.83, aliquota: 12}, 
                  {salario: 8157.41, aliquota: 14}];
    
 console.log(tabela[2].porcentagem);

  // Your existing code for INSS calculation goes here
  let inss = 0;

if(bruto > tabela[3].salario){
  inss += (tabela[0].salario * tabela[0].aliquota)/100;
   inss += ((tabela[1].salario - tabela[0].salario)*tabela[1].aliquota)/100;
  inss += ((tabela[2].salario - tabela[1].salario)*tabela[2].aliquota)/100;
  inss += ((tabela[3].salario - tabela[2].salario)*tabela[3].aliquota)/100;
} else if (bruto > tabela[2].salario && bruto < tabela[3].salario){
   inss += (tabela[0].salario * tabela[0].aliquota)/100;
   inss += ((tabela[1].salario - tabela[0].salario)*tabela[1].aliquota)/100;
  inss += ((tabela[2].salario - tabela[1].salario)*tabela[2].aliquota)/100;
  inss += ((bruto - tabela[2].salario)*tabela[3].aliquota)/100;
 } else if (bruto > tabela[1].salario && bruto < tabela[2].salario){
   inss += (tabela[0].salario * tabela[0].aliquota)/100;
   inss += ((tabela[1].salario - tabela[0].salario)*tabela[1].aliquota)/100;
  inss += ((bruto - tabela[1].salario)*tabela[2].aliquota)/100;
 } else if (bruto > tabela[0].salario && bruto < tabela[1].salario){
   inss += (tabela[0].salario * tabela[0].aliquota)/100;
   inss += ((bruto - tabela[0].salario)*tabela[1].aliquota)/100;
 }
  
 
//(inss1 || 0) + inss2 + inss3 + inss4 + inss5;//
  let deducaoInss = bruto - inss;

  const irrf_a = 4664.68,
    irrf_b = 3751.06,
    irrf_c = 2826.66,
    irrf_d = 2259.21;
  let deducaoIr;

  // Your existing code for IRRF calculation goes here
  if (deducaoInss > irrf_a) {
    deducaoIr = (deducaoInss * 27.5) / 100 - 896.00;
        console.log(27.5)
  }
  if (deducaoInss < irrf_a - 0.01 && deducaoInss > irrf_b) {
    deducaoIr = (deducaoInss * 22.5) / 100 - 662.77;
     console.log(22.5)
  }
  if (deducaoInss < irrf_b - 0.01 && deducaoInss > irrf_c) {
    deducaoIr = (deducaoInss * 15) / 100 - 381.44;
    console.log(15)
  }
  if (deducaoInss < irrf_c - 0.01 && deducaoInss > irrf_d) {
    deducaoIr = (deducaoInss * 7.5) / 100 - 169.44;
        console.log(7.5)
  }

  let liquido = deducaoInss - (deducaoIr || 0);

  if (bruto) {
    // Display the results on the HTML page
    document.getElementById("inss").textContent = formatter.format(inss);
    document.getElementById("deducaoInss").textContent = formatter.format(
      deducaoInss
    );
    document.getElementById("deducaoIr").textContent = formatter.format(
      deducaoIr
    );
    document.getElementById("liquido").textContent = formatter.format(liquido);

    document.getElementById("results").style.display = "block";
  } else {
    const calcular = document.getElementById("calculate");
    this.addEventListener("click", function () {
      document.getElementById("valor").placeholder =
        "Digite seu salario aqui";
    });
  }
  }
}

const toggle = document.getElementById("toggledark");

toggle.addEventListener("click", function () {
  this.classList.toggle("bi-brightness-high-fill");
  if (this.classList.toggle("bi-moon")) {
    document.querySelector(".center").style.transition = "all 0.2s";
    document.querySelector(".center").style.filter = "invert(1)";
    var light = document.querySelector('input[type="text"]');

    light.addEventListener("focus", (event) => {
      event.target.style.boxShadow = "rgb(143 93 98) 0px 0px 3px 2px";
    });

    light.addEventListener("blur", (event) => {
      event.target.style.boxShadow = "";
    });
  } else {
    document.querySelector(".center").style.filter = "invert(0)";
    var light = document.querySelector("#salario");
    light.addEventListener("focus", (event) => {
      event.target.style.boxShadow = "";
    });
  }
});
