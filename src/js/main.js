const list = ['Hearts of Iron IV', 'Europa Universalis IV', 'Victoria 3', 'Crusader Kings 3'];

    // Task 1

let ul = document.querySelector('.sidebar__list');
let input_field = document.querySelector('.search__input')
let search_button = document.querySelector('.search__button')

let fill_list = function() {
    ul.replaceChildren()
    for (let game of list) {
        let li = document.createElement('li')               //Fill list from massive
        li.textContent = game
    
        ul.append(li)
    }
}
let filter_list = function(input_field) {
    let re = new RegExp(`${input_field.value}`)
    ul.replaceChildren()
    for (let game of list) {
        if (re.test(game)) {
            let li = document.createElement('li')           //If name contains filter string, it will appear in list
            li.textContent = game

            ul.append(li)
        }
    }
    document.querySelector('.search__input').value = ''
}
fill_list()

search_button.textContent = 'Сброс'

input_field.addEventListener('keyup', function() {
    if (input_field.value == '') {
        search_button.textContent = 'Сброс'
    }                                                       //When input field is null, there is a reset button, otherwise - a search button
    else {
        search_button.textContent = 'Поиск'
    }
})

search_button.addEventListener('click', function() {
    if (search_button.textContent == 'Сброс') {
        fill_list()
    }
    else {                                                  //Function depends on button's text
        filter_list(input_field)
        search_button.textContent = 'Сброс'
    }
})

    // Task 2

let gridSelector = document.querySelector('.view-selector__grid')
let listSelector = document.querySelector('.view-selector__list')

let toggleGridSelector = function() {
    gridSelector.classList.toggle('view-selector__grid--active')
}

let toggleListSelector = function() {
    listSelector.classList.toggle('view-selector__list--active')
}

toggleListSelector()

let articles = document.querySelectorAll('.articles-content__item')
let images = document.querySelectorAll('.article__image')
let articleSection = document.querySelector('.articles__content')

listSelector.addEventListener('click', function() {
    articles = document.querySelectorAll('.articles-content__item')
    images = document.querySelectorAll('.article__image')
    articleSection = document.querySelector('.articles__content')

    if (gridSelector.classList.contains('view-selector__grid--active')) {
        toggleGridSelector()
        toggleListSelector()
        
        articles.forEach(element => element.classList.toggle('articles-content__item--list'))       //If list selector is not active, the view will switch to list
        images.forEach(element => element.classList.toggle('article__image--list'))
        articleSection.classList.toggle('articles__content--list')
    }
})

gridSelector.addEventListener('click', function() {
    
    if (listSelector.classList.contains('view-selector__list--active')) {
        articles = document.querySelectorAll('.articles-content__item--list')
        images = document.querySelectorAll('.article__image--list')
        articleSection = document.querySelector('.articles__content--list')

        toggleGridSelector()
        toggleListSelector()

        articles.forEach(element => element.classList.toggle('articles-content__item--list'))       //If grid selector is not active, the view will switch to grid
        images.forEach(element => element.classList.toggle('article__image--list'))
        articleSection.classList.toggle('articles__content--list')
    }
})

    // Task 3

let showFormButton = document.querySelector('.content__add-article-button')
let articleCreateForm = document.querySelector('.content__create-article')
let cancelButton = document.querySelector('.article-creating__cancel-button')
let addButton = document.querySelector('.article-creating__add-button')

showFormButton.addEventListener('click', function() {
    showFormButton.style.display = 'none'
    articleCreateForm.style.display = 'flex'
    
})
cancelButton.addEventListener('click', function() {
    articleCreateForm.style.display = 'none'
    showFormButton.style.display = 'block' 
})
addButton.addEventListener('click', function() {
    let articleHead = document.querySelector('.article-creating__head')
    let articleText = document.querySelector('.article-creating__text')
    let imageUrl = document.querySelector('.article-creating__image')
    let isValidArticle = true                                                   //This var will check if all the inputs to have some text

    if (articleHead.value == '') {
        articleHead.setAttribute('placeholder', "Название статьи не может быть пустым")
        isValidArticle = false
    }
    else if (articleText.value == '') {
        articleText.setAttribute('placeholder', "Текст статьи не может быть пустым")
        isValidArticle = false
    }
    else if (imageUrl.value == '') {
        imageUrl.setAttribute('placeholder', "Отсутствует ссылка на изображение")
        isValidArticle = false
    }

    if (isValidArticle) {
        let newArticle = document.createElement('article')
        if (listSelector.classList.contains('view-selector__list--active')) {
            newArticle.className = "articles-content__item articles-content__item--list article"
        }
        else {
            newArticle.className = "articles-content__item article"
        }
        
        let newArticleImage = document.createElement('img')
        newArticleImage.setAttribute('src', imageUrl.value)
        if (listSelector.classList.contains('view-selector__list--active')) {
            newArticleImage.className = 'article__image article__image--list'
        }
        else {
            newArticleImage.className = 'article__image'
        }

        let newArticleContent = document.createElement('div')
        newArticleContent.className = 'article__content'

        let newArticleHead = document.createElement('h3')
        newArticleHead.className = 'article__head'
        newArticleHead.innerHTML = articleHead.value

        let newArticleText = document.createElement('p')
        newArticleText.className = 'article__text'
        newArticleText.innerHTML = articleText.value                                                                            //Creating elements and get them together 

        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let now = new Date()
        let newArticleDate = document.createElement('time')
        newArticleDate.className = 'article__date'
        newArticleDate.innerHTML = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} · ${Math.floor(Math.random() * (16 - 2)) + 2} min read`

        newArticleContent.append(newArticleHead)
        newArticleContent.append(newArticleText)
        newArticleContent.append(newArticleDate)
        newArticle.append(newArticleImage)
        newArticle.append(newArticleContent)
        articleSection.append(newArticle)
        
        articleCreateForm.style.display = 'none'
        showFormButton.style.display = 'block' 
    }
})

    // Task 4

let faqQuestions = document.getElementsByClassName('FAQ__question')
for (let i = 0; i < faqQuestions.length; i++) {
    faqQuestions[i].addEventListener('click', function() {
        let faqAnswer = this.nextElementSibling
        faqAnswer.classList.toggle('FAQ__answer--active')
        faqAnswer.classList.toggle('FAQ__answer')
        if (faqAnswer.classList.contains('FAQ__answer')) {
            this.lastChild.innerHTML = '↑'
        }
        else {
            this.lastChild.innerHTML = '↓'
        }
    })
}
