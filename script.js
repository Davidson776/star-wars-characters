let currentPageUrl ='https://swapi.dev/api/people/'

window.onload = async () =>{
    try{
        await loadCharacters(currentPageUrl)
    } catch (error){
        console.log(error)
        alert('erro ao carregar cards');

    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click',loadNExtPage)
    backButton.addEventListener('click',loadPReviousPage)
};
async function loadCharacters(url){
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML ='';
    
    try{
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div")
            card.style.backgroundImage =
            `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g,"")}.jpg')`
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-Name-BG"

            const characterName = document.createElement("span")
            characterName.className = "characterName"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML =''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g,"")}.jpg')`
                characterImage.className ="character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome:${character.name}`

                const characterHeight = document.createElement("span")
                characterHeight.className = "character-details"
                characterHeight.innerText = `Altura:${convertHeigth(character.height)}`

                const mass = document.createElement("span")
                mass.className = "character-details"
                mass.innerText = `Peso:${convertMass(character.mass)}`

                const eyerColor = document.createElement("span")
                eyerColor.className = "character-details"
                eyerColor.innerText = `cor dos olhos: ${convertEyeColor(character.eye_color)}`

                const birthYear = document.createElement("span")
                birthYear.className = "character-details"
                birthYear.innerText = `Nascimento:${convertBirthEyer(character.birth_year)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterHeight)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyerColor)
                modalContent.appendChild(birthYear)
            }
            
            

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous?"visible":"hiden"


        currentPageUrl = url
    } catch(error) {
        alert('Erro ao carregar os persongens')
        console.log(error)
    }
}

async function loadNExtPage(){
    if(!currentPageUrl) return;
    
    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)
    }

    catch (error){
        console.log(error)
        alert('erro ao carregar a proxima pagina')
    }
}
async function loadPReviousPage(){
    if(!currentPageUrl) return;
    
    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)
    }

    catch (error){
        console.log(error)
        alert('erro ao carregar a pagina anterior')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertEyeColor(eyeColor) {
    const cores = {
        Blue:"azul",
        brown:"castanho",
        green:"verde",
        yellow:"amarelo",
        black:"preto",
        pink:"rosa",
        red:"vermelho",
        orange:"laranja",
        hazel:"avelã",
        unknown:"desconheçida"
    };

    return cores[eyeColor.toLowerCase()]||eyeColor;
}

function convertHeigth(height){
    if(height ==="unknown") {
        return "desconheçida"
    }

    return (height / 100).toFixed(2);
}
function convertMass(mass){
    if(mass ==="unknown") {
        return "desconheçido"
    }

    return `${mass}kg`
}

function convertBirthEyer(birthYear){
    if(birthYear==="unknown") {
        return"desconheçido"
    }

    return birthYear
}

