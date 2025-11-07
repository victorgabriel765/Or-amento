import convert from 'https://cdn.skypack.dev/convert-units'

let diametro = document.getElementById('diametro')
const diametroEtb = document.getElementById('diametroEtb')

let valorMedida = 0
let valorEtb = 0
let precos = {
  '3/8': 12,
  '5/8': 50,
  '1/4': 12,
}
// Trocas de valos ao selecionar o input
diametro.addEventListener('change', () => {
  let preco = precos[diametro.value]
  valorMedida = preco
})

diametroEtb.addEventListener('change', () => {
  let preco = precos[diametroEtb.value]
  valorEtb += preco
})

export const vergalhao = (qtd, comprimento) => {
  const totalMetros = qtd * comprimento
  const valorFinal = (totalMetros / convert(12).from('m').to('mm')) * valorMedida

  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorFinal)

}

export const estribo = (largura, altura, qtd) => {
  const medidaTotalEstribo = 2 * largura + 2 * altura
  const totalMetros = qtd * medidaTotalEstribo
  const valorFinal = (totalMetros / convert(12).from('m').to('mm')) * valorEtb

  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorFinal)

}

export const orcamentoCompleto = (qtd, comprimento, espacamento, largura, altura) => {

  // Estribo ------------------->
  const medidaTotalEstribo = 2 * largura + 2 * altura
  const qtdEtb = (comprimento / espacamento) - 1
  const totalMetros = qtdEtb * medidaTotalEstribo
  const precoEtb = (totalMetros / convert(12).from('m').to('mm')) * valorEtb

  // Vergalhão ----------------->
  const totalComprimeto = qtd * comprimento
  const valorFerro = (totalComprimeto / convert(12).from('m').to('mm')) * valorMedida

  // Valores Somado ------------->

  const valorTotal = valorFerro + precoEtb

 //
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal)
}


