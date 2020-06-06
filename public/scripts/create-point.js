function populatesUFs(){
    const ufSelect = document.querySelector("select[name=uf]");
     
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states  =>{

  for( const state of states){
    ufSelect.innerHTML +=`<option value="${state.id}">${state.nome}</option>`

  }

       
    })
}

populatesUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]");
     
    const ufvalue = event.target.value

    const indexOfselectdState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfselectdState].text
 


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities  =>{
    


  for( const city of cities){
    citySelect.innerHTML +=`<option value="${city.nome}">${city.nome}</option>`

  }

  citySelect.disabled = false
       
    })
}


document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)


// itens de coleta
// pegar todos li's
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect ) {
  item.addEventListener( "click" , handleSelectedItem );
}

const collectedItems = document.querySelector("input[name=items")


let selectedItems = []

function handleSelectedItem(event){
  const itemLi = event.target

  // add ou remove itens
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id

  console.log('ITEM ID: ', itemId)

  // verificar se existem intes selecionados. se sim
  // pegar os itens selecionados, tirar da seleção

const alreadySelected = selectedItems.findIndex(item => {
   const itemFound = item == itemId // it true our false
   return itemFound
})

  //se já estiver selecionado
  if(alreadySelected >= 0){
   //tirar da seleção
   const filteredItems = selectedItems.filter( item =>{
     const itemIsDifferent = item != itemId
    return itemIsDifferent
   })

   selectedItems = filteredItems

  }else{
 //se não estiver selecionado
  
 ///add a seleção
selectedItems.push(itemId)

  }

 // console.log('selectedItems: ', selectedItems)
//atualizar o campo escondido com os intes selected
collectedItems.value = selectedItems
}