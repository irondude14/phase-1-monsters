document.addEventListener('DOMContentLoaded', () => {
    function createForm() {
        const form = document.createElement('form')
        const div = document.querySelector('#create-monster')
        form.className = 'monster-form'
        let name = document.createElement('input')
        name.type = 'text';
        name.placeholder = 'Name...'
        name.id = 'name'
        let age = document.createElement('input')
        age.type = 'text';
        age.placeholder = 'Age...'
        age.id = 'age'
        let descriptionInput = document.createElement('input')
        descriptionInput.type = 'text'
        descriptionInput.id = 'description'
        descriptionInput.placeholder = 'Description...'
        let submitBtn = document.createElement('input')
        submitBtn.type = 'submit'
        submitBtn.value = 'Create Monster'
        form.appendChild(name)
        form.appendChild(age)
        form.appendChild(descriptionInput)
        form.appendChild(submitBtn)
        div.append(form)
    }
    
    createForm()
    
    const create = document.querySelector('.monster-form');
    create.addEventListener('submit', (e) => {
        e.preventDefault();
        let description = document.querySelector('#description').value
        let newMonster = {
            name: e.target.name.value,
            age: e.target.age.value,
            description: description
        }
        createMonster(newMonster)
        clearPage()
    })

    clearPage = () => {
        document.querySelector('.monster-form').reset() 
    }
    
    const navigation = () => {
        let page = 1; //Starting point
        const backArrow = document.getElementById('back')
        const forwardArrow = document.getElementById('forward')
        
        const pageForward  = () => {
             page++, fetchMonsters(page);
        };
        const pageBack = () => {
            1 < page ? (page--, fetchMonsters(page)) : alert('End of the List');
        };
        forwardArrow.addEventListener('click', () => {
            pageForward();
        });
        backArrow.addEventListener('click', () => {
            pageBack();
        });
    }  
    navigation()  
    fetchMonsters()
})

function fetchMonsters(monster) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${monster}`)
    .then(res => res.json())
    .then(data => data.forEach(monster => {
        addMonster(monster)
    }))
}

function createMonster(newMonster) {
    fetch('http://localhost:3000/monsters', {
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newMonster)
    })
    .then(res => res.json())
    .then(data => addMonster(data))
}

function addMonster(monster) {
    const monsterContainer = document.querySelector('#monster-container');
    const div = document.createElement('div');
    div.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${Math.round(monster.age)}</h4>
        <p>Bio: ${monster.description}</p>
    `
    monsterContainer.prepend(div)
}

// Logic:
// 1. I need to iterate thru the .json file -- Masking forEach iteration
// 2. My iteration should be in increments of 50 elements -- I managed to limit render to 50 monsters thru "/?_limit=50&_page=${monster}"
// 3. I need to assign my iteration to the arrow buttons -- I've created navigation function, but it add's to the page, not updates
// 4. By pressing the button left/right, iteration goes backwards/forward 50 elements
// 5. I need to render these 50 elements onto the page -- Originally works, but pressing the arrow button add's to the page

