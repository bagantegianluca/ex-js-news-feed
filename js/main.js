// Create the objects array
const posts = [
    {
        id: 1,
        title: 'Scoperta di una nuova specie di papera di gomma',
        content: 'Un breve articolo sulla recente scoperta di una specie di papera di gomma mai vista prima.',
        tags: ['geo', 'tech', 'PROVA'],
        author: 'Diana Rossi',
        published: '2023-02-11',
        urlImg: './img/rubber-duck.jpg'
    },
    {
        id: 2,
        title: 'Esplorando le profondità marine: il mistero degli abissi',
        content: 'Esplorando le profondità marine: il mistero degli abissi',
        tags: ['viaggi', 'geo'],
        author: 'Fabio Mari',
        published: '2023-03-14',
        urlImg: './img/deep-sea.jpg'
    },
    {
        id: 3,
        title: 'Viaggio culinario: alla ricerca dei sapori perduti',
        content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.',
        tags: ['cucina'],
        author: 'Marta Bianchi',
        published: '2023-04-20',
        urlImg: './img/kitchen-food.jpg'
    },
    {
        id: 4,
        title: 'Arte moderna: oltre i confini convenzionali',
        content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.",
        tags: ['arte', 'tech', 'prova'],
        author: 'Gabriele Neri',
        published: '2023-05-29',
        urlImg: './img/modern-art.jpg'
    }
];

let filteredPosts = posts;
let favouritePosts = [];

// Create an array with all distinct tags
const distinctTags = [...new Set(posts.flatMap(post => post.tags.map(tag => tag.toLowerCase())))];

// Select the select element
const selectEl = document.querySelector('select');

// Create the select options
selectOptionsGenerator(distinctTags);

// Add eventListener to the select filter
selectEl.addEventListener('change', function () {

    filteredPosts = this.value === 'all' ? posts : posts.filter(post => post.tags.map(tag => tag.toLowerCase()).includes(this.value));
    filteredPosts = checkBoxEl.checked ? filteredPosts.filter(post => favouritePosts.includes(post.id)) : filteredPosts;

    checkPostsToDisplay(filteredPosts);

});

// Select the checkbox element
const checkBoxEl = document.getElementById('checkBoxOnlySavedNews');

// Add eventListener to checkbox element
checkBoxEl.addEventListener('change', function () {

    filteredPosts = this.checked ? filteredPosts.filter(post => favouritePosts.includes(post.id)) : selectEl.value === 'all' ? posts : posts.filter(post => post.tags.map(tag => tag.toLowerCase()).includes(selectEl.value));

    checkPostsToDisplay(filteredPosts);

});

// Select the main element
const mainEl = document.querySelector('main');

// Generate all posts
postsGenerator(filteredPosts);

//#region FUNCTIONS

/**
 * ### selectOptionsGenerator
 * Create all elements of the array as option in the first select
 * @param {string} arr The array with elements will become options of the select
 */
function selectOptionsGenerator(arr) {

    // Create an array with different tags
    arr.push('empty');

    arr.unshift('all');

    arr.forEach(tag => {

        const optionMarkup = `<option${tag === 'all' ? ' selected' : ''}>${tag}</option>`;
        selectEl.innerHTML += optionMarkup;

    });
};

/**
 * ### tagsGenerator
 * Insert every element of the array as tag
 * @param {string} arr The list of tags
 * @returns The HTML markup to insert the tag
 */
function tagsGenerator(arr) { return arr.map(tag => `<div class="${tag.toLowerCase()} py-1 px-2 rounded-2">${tag.toLowerCase()}</div>`).join('') }

/**
 * ### generatePosts
 * Display all posts contained in an array
 * @param {string} arr The array contains the posts to be displayed
 */
function postsGenerator(arr) {

    // Generate single post
    arr.forEach(element => {

        const sectionElMarkup = `
        <section class="p-3 my-3">

            <div class="title d-flex justify-content-between">
                <div class="title-left">

                    <h2>${element.title}</h2>
                    <h5 class="mb-0">Pubblicato da ${element.author}</h5>
                    <h7 class="mb-0">in data ${element.published.slice(8, 10)}/${element.published.slice(5, 7)}/${element.published.slice(0, 4)}</h7>

                </div>

                <div class="title-right">
                    <i class="${favouritePosts.includes(element.id) ? 'fa-solid' : 'fa-regular'} fa-bookmark" id="bookmark-${element.id}"></i>
                </div>
            </div>

            <p class="my-3">${element.content}</p>

            <img src="${element.urlImg.toLowerCase()}" alt="${element.urlImg.slice(6, element.urlImg.indexOf('.jpg')).toLowerCase()}" class="w-100 object-fit-cover mb-3">

            <div class="tags d-flex text-light gap-1">
                ${tagsGenerator(element.tags)}
            </div>

        </section>
        <!-- Section post ${element.id} -->
        `

        // Add new html code at the end of main element
        mainEl.insertAdjacentHTML('beforeend', sectionElMarkup);

        // Check if post is a favourite one
        const bookmarkEl = mainEl.lastElementChild.querySelector(`#bookmark-${element.id}`);

        // Add eventListener to bookmark element 
        bookmarkEl.addEventListener('click', function () {

            // If is not a favourite
            if (bookmarkEl.classList.contains('fa-regular')) {

                // Set a class to set as favourite
                bookmarkEl.className = 'fa-solid fa-bookmark';

                // Add the id to the favouritePosts array
                favouritePosts.push(element.id);

            } else { //If is a favourite one

                // Set a class to set as not a favourite one
                bookmarkEl.className = 'fa-regular fa-bookmark';

                // Remove the id from the favouritePosts array
                favouritePosts.splice(favouritePosts.indexOf(element.id), 1);

            }
        })

    })
};

/**
 * ### checkPostsToDisplay
 * Display posts or a message in page after checking if the array is empty or not
 * @param {string} arr The array with posts to display
 */
function checkPostsToDisplay(arr) {

    // If the array is not empty
    if (arr.length !== 0) {

        // Empty the page and regenerate posts
        mainEl.innerHTML = '';
        postsGenerator(arr);

    } else { // If the array is empty

        // Message in page for no posts to be displayed
        mainEl.innerHTML = '<h2 class="text-light my-3">Nessun post da visualizzare</h2>';

    }
}
//#endregion