import convert from 'https://cdn.skypack.dev/convert-units'
import { vergalhao, estribo, orcamentoCompleto } from './calculo.js'

const DOM = {
  // Inputs do vergalhão

  orcamento: document.getElementById('tipoOrcamento'),
  quantidadeBarra: document.getElementById('qtdBarras'),
  comprimentoBarra: document.getElementById('comprimento'),
  mmVergalhao: document.getElementById('diametro'),

  // Inputs estribo

  largura: document.getElementById('larguraEtb'),
  altura: document.getElementById('alturaEtb'),
  mmEstribo: document.getElementById('diametroEtb'),
  espacamento: document.getElementById('espacamento'),
  quantidadeEstribo: document.getElementById('qtdEtb'),

  // Exibicao

  preco: document.getElementById('infoPreco'),
  medidaEstribo: document.getElementById('infoMedidas'),
  infoEstribo: document.getElementById('infoFerro'),
  qtdEstribo: document.getElementById('infoQtd'),

 // Botões 

 limpar: document.getElementById('clear'),
 calcular: document.getElementById('btnCalcular'),
}

const calcular = () => {
  const orcamento = document.getElementById('tipoOrcamento').value

  switch (orcamento) {
    case 'vergalhao':
      calculoVergalhao()
      break;
    case 'estribo':
      calculoEst()
      break
    case 'completo':
      calculoCompleto()
      break
    case 'padrao':
      alert('Selecione um tipo de orçamento!')
      break  
    default:
      break;
  }

}

const calculoVergalhao = () => {

  const ferragem = DOM.mmVergalhao.value
  const comprimento = convert(DOM.comprimentoBarra.value).from('m').to('mm')
  const qtdBarras = DOM.quantidadeBarra.value

  if (ferragem === 'padrao' || comprimento === '' || qtdBarras === '') {
    alert('Preencha todos os campos corretamente!')
    return
  }

  // Exibicao do resultado
  DOM.preco.innerText = vergalhao(qtdBarras, comprimento)
  
}

const calculoEst = () => {
  const largura = convert(DOM.largura.value).from('cm').to('mm')
  const altura = convert(DOM.altura.value).from('cm').to('mm')
  const qtdEtb = +DOM.quantidadeEstribo.value
  const ferro = DOM.mmEstribo.value


  if (largura=== '' || altura === '' || qtdEtb=== '' || ferro === 'padrao') {
    alert('Preencha todos os campos corretamente!')
    return
  }
  // Exibicao do resultado 
  DOM.preco.innerText = estribo(largura, altura, qtdEtb)
  DOM.medidaEstribo.innerText = `${DOM.largura.value} x ${DOM.altura.value}`
  DOM.infoEstribo.innerText = ferro
}
const calculoCompleto = () => {
  // inputs do vergalhão ------>
  const comprimento = convert(DOM.comprimentoBarra.value).from('m').to('mm')
  const mmVergalhao = DOM.mmVergalhao.value

  // Inputs do estribo -------->
  const mmEstribo = DOM.mmEstribo.value
  const largura = convert(DOM.largura.value).from('cm').to('mm')
  const altura = convert(DOM.altura.value).from('cm').to('mm')
  const espacamento = convert(DOM.espacamento.value).from('cm').to('mm')
  // Exibicao do resultado 

  if (comprimento === '' || largura === '' || altura === '' || espacamento === '' || mmVergalhao === 'padrao' || mmEstribo === 'padrao') {
    alert('Preencha todos os campos corretamente!')
    return
  } 
  DOM.preco.innerText = orcamentoCompleto(DOM.quantidadeBarra.value, comprimento, espacamento, largura, altura)
  DOM.medidaEstribo.innerText = `${DOM.largura.value} x ${DOM.altura.value}`
  DOM.infoEstribo.innerText = mmEstribo
}

const clear = () => {
  const resetInput = document.querySelectorAll('input, select')
  resetInput.forEach((el) => {
    if (el.tagName === 'SELECT') {
      return 
    }
    el.value = ''
  })
}

const confgDisplay = () => {
  const tipoOrcamento = DOM.orcamento.value
  const divEstribo = document.querySelector('.estribo')
  const divVergalhao = document.querySelector('.vergalhao')

  switch (tipoOrcamento) {
    case 'vergalhao':
      divEstribo.style.display = 'none' 
      divVergalhao.style.display = 'block'
      break;
    case 'estribo':
      divEstribo.style.display = 'block' 
      divVergalhao.style.display = 'none'
      break
    case 'completo':
      divEstribo.style.display = 'block' 
      divVergalhao.style.display = 'block'
      divEstribo.querySelector('#qtdEtb').style.display = 'none'
      break     

    default:
      divEstribo.style.display = 'none' 
      divVergalhao.style.display = 'none'
      break;
  }
}

document.getElementById('btnCalcular').addEventListener('click', function () {
 calcular()
})

DOM.limpar.addEventListener('click', () => {
  clear()
})

DOM.orcamento.addEventListener('change', () => {
  confgDisplay()
})
 


