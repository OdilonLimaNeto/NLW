function populateUFs () {
  const UFselect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
        for(const state of states) {
          UFselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`  
        }
    })
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")


  const UFvalue = event.target.value
  const indexofSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexofSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UFvalue}/municipios`



  citySelect.innerHTML = "<option value>Selecione a cidade</option>"
  citySelect.disabled = true

  fetch(url)
    .then( res => res.json())
    .then( cities => {
      for(const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`  
      }
       citySelect.disabled = false
  })
}
 
document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)


//itens de coleta

const itemstoCollet = document.querySelectorAll(".items-grid li")
for (const item of itemstoCollet) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []


function handleSelectedItem(event) {
  const itemLi = event.target
  //Adicionar e remover uma classe com javascript
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  

  //Verificar se existem itens selecionados, se sim pegar os itens selecionados
  const alreadySelected = selectedItems.findIndex( item => {
    const itemFound = item == itemId
      return itemFound
  })


  //Se já estiver selecionado
  if (alreadySelected >= 0) {
    // tirar da seleção
    const filteredItems = selectedItems.filter( item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })

    selectedItems = filteredItems

  } else {
  //Se não estiver selecionado, adicionar a seleção
    selectedItems.push(itemId)

  }

  //Atualizar o campo escondido com os itens selecionados
  collectedItems.value = selectedItems
}