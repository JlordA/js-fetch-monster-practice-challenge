const monsterCollection = document.querySelector('#monster-container')
const btnForward = document.querySelector('#forward')
const btnBack = document.querySelector('#back')
document.addEventListener("DOMContentLoaded", () => {
    
    //     Render Monsters      //
    fetch('http://localhost:3000/monsters?_limit=50&_page=1')
        .then(r => r.json())
        .then(monsterData => {
            renderAllMonster(monsterData)
            console.log(monsterData)
        })
        


    function renderAllMonster(monsterData) {
        monsterData.forEach(renderOneMonster)
    }

    function renderOneMonster(monsterData) {
        const monsterDiv = document.createElement('div')
        const monsterName = document.createElement('h2')
        const monsterAge = document.createElement('h4')
        const monsterBio = document.createElement('p')
        monsterName.textContent = monsterData.name
        monsterAge.textContent = monsterData.age
        monsterBio.textContent = monsterData.description
        monsterDiv.append(monsterName, monsterAge, monsterBio)
        monsterCollection.append(monsterDiv)
    }

    //         EVENT LISTENERS     //
    btnForward.addEventListener('click', handleMonsterListClick)
    btnBack.addEventListener('click', handleMonsterListClick)

    
    //         CREATE MONSTER      //
    const createMonsterDiv = document.querySelector('#create-monster')
    const monsterForm = document.createElement('form')
    monsterForm.addEventListener('submit', handleMonsterFormSubmit)

    const formNameInput = document.createElement('input')
    formNameInput.id = "name"
    formNameInput.placeholder = "name..."
    const formAgeInput = document.createElement('input')
    formAgeInput.id = "age"
    formAgeInput.placeholder = "age..."
    const formBioInput = document.createElement('input')
    formBioInput.id = "description"
    formBioInput.placeholder = "description..."
    const formSubmitBtn = document.createElement('button')
    formSubmitBtn.textContent = "Create"
    monsterForm.append(formNameInput, formAgeInput, formBioInput, formSubmitBtn)
    createMonsterDiv.append(monsterForm)

    function handleMonsterFormSubmit(event) {
        event.preventDefault()
        const monsterObj = {
            name: event.target.name.value,
            age: event.target.age.value,
            bio: event.target.description.value
        }

        function createMonster() {
            fetch('http://localhost:3000/monsters', {
                method: 'POST',
                headers:
                {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                    body: JSON.stringify({
                    name: monsterObj.name,
                    age: monsterObj.age,
                    description: monsterObj.bio 
                })
            })
            .then(r => r.json())
            .then(newMonsterObj => {
                renderOneMonster(newMonsterObj)
                console.log('Success:', newMonsterObj)
            })
                
        }
    createMonster(monsterObj)
    }
    let pageNumber = 1
    function handleMonsterListClick(event) {
        if (event.target.matches('#forward')) {
            pageNumber = pageNumber + 1
            fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNumber}`)
            .then(r => r.json())
            .then(monsterData => {
                monsterCollection.innerHTML = ''
                renderAllMonster(monsterData)
        })
        } else if (event.target.matches('#back')) {
            if (pageNumber < 2) {
                pageNumber = 1
                alert('Cant go back buddy')
            }
            else 
                pageNumber = pageNumber - 1
            fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNumber}`)
            .then(r => r.json())
            .then(monsterData => {
                monsterCollection.innerHTML = ''
                renderAllMonster(monsterData)
        })
    }
    }
})