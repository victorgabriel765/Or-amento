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

  // Exibicao

  preco: document.getElementById('infoPreco'),
  medidaEstribo: document.getElementById('infoMedidas'),
  infoEstribo: document.getElementById('infoFerro'),
  qtdEstribo: document.getElementById('infoQtd'),

 // Botões 

 limpar: document.getElementById('clear'),
 calcular: document.getElementById('btnCalcular'),
 preco: document.getElementById('')

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
  const largura = document.getElementById('larguraEtb')
  const altura = document.getElementById('alturaEtb')
  const qtdEtb = document.getElementById('qtdEtb')
  const ferro = document.getElementById('diametroEtb')

  if (largura.value === '' || altura.value === '' || qtdEtb.value === '' || ferro.value === 'padrao') {
    alert('Preencha todos os campos corretamente!')
    return
  }

  const largConvertida = convert(largura.value).from('cm').to('mm')
  const altConvertida = convert(altura.value).from('cm').to('mm')

  console.log(estribo(largConvertida, altConvertida, qtdEtb.value))

  // Exibir resultado para o usuario 

  const tamanhoEtb = document.getElementById('infoMedidas')
  const fettoEtb = document.getElementById('infoFerro')


  tamanhoEtb.innerText = `${largura.value} x ${altura.value}`
  fettoEtb.innerText = `${ferro.value}`
  document.getElementById('infoPreco').innerText = estribo(largConvertida, altConvertida, qtdEtb.value)

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

  console.log(DOM.mmEstribo.value)

}

const clear = () => {
  const resetInput = document.querySelectorAll('input, select')
  resetInput.forEach((el) => {
    if (el.tagName === 'SELECT') {
      return 
    }
    el.value = ''
    console.log('Passou aqui')
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


