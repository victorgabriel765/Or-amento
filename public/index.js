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
    default:
      break;
  }

}

const calculoVergalhao = () => {

  const ferragem = document.getElementById('diametro')
  const orcamento = document.getElementById('tipoOrcamento')
  const comprimento = document.getElementById('comprimento')
  const qtdBarras = document.getElementById('qtdBarras')
  // Verificação do tipo de orçamento
  if (orcamento.value === 'vergalhao') {
    // Verificação sa os campos estão preenchidos
    if (comprimento.value === "" || qtdBarras.value === "" || ferragem.value === "padrao") {
      alert('Preencha todos os campos corretamente!')
      return
    }
    const cpmConvertido = convert(comprimento.value).from('m').to('mm')
    vergalhao(qtdBarras, cpmConvertido)
    document.getElementById('infoPreco').innerText = vergalhao(qtdBarras.value, cpmConvertido)
  }

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

document.getElementById('btnCalcular').addEventListener('click', function () {
 calcular()
})

DOM.limpar.addEventListener('click', () => {
  clear()
})
// Configuraçao do display 
document.getElementById('tipoOrcamento').addEventListener('change', () => {

  const orcamento = document.getElementById('tipoOrcamento')
  const estbClass = document.querySelector('.estribo')
  const vergalhaoClass = document.querySelector('.vergalhao')
  const subClassEstb = document.querySelector('#inputEtb')
  const classInfo = document.querySelectorAll('.boxInfo')


  if (orcamento.value === 'vergalhao') {
    clear()
    vergalhaoClass.style.display = ''
    estbClass.style.display = 'none' 
    // Removendo as informações não compativel com a seleção. 
    classInfo.forEach((el) => {
      el.querySelector('.estriboInfo').style.display = 'none'
    })

  } else if (orcamento.value === 'estribo') {
    clear()
    estbClass.style.display = ''
    vergalhaoClass.style.display = 'none'
    subClassEstb.children[2].style.display = 'none'

    // Adicionando as informações compativel com a seleção.
    classInfo.forEach((el) => {
      el.querySelector('.estriboInfo').style.display = ''
    })

    estbClass.querySelectorAll('.inputBox')[1].style.display = ''


  } else if (orcamento.value === 'completo') {
    clear()
    estbClass.style.display = ''
    vergalhaoClass.style.display = ''
    subClassEstb.children[2].style.display = ''

    // Adicionando as informações compativel com a seleção.
    classInfo.forEach((el) => {
      el.querySelector('.estriboInfo').style.display = ''
    })

    estbClass.querySelectorAll('.inputBox')[1].style.display = 'none'
  }

})


