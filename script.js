//2A(i): POSTS - КОЛЛБЭКИ 
function getPosts(get) {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            console.log('Посты получены');
            get(null, posts);
        })
        .catch(error => {
            console.log('Ошибка получения:', error);
            get(error, null);
        });
}
function sortPosts(posts) {
    return posts.sort((a, b) => {
        return b.title.length - a.title.length;
    });
}
function Result(error, posts) {
    if (error) {
        console.log('Ошибка:', error);
    } else {
        const sort1Posts = sortPosts(posts);
        console.log('Посты отсортированы по убыванию длины поля title:', sort1Posts);
    }
}
getPosts(Result);

//2A(ii): COMMENTS - КОЛЛБЭКИ 
function getComments(get) {
    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(comments => {
            console.log('Комменты получены');
            get(null, comments);
        })
        .catch(error => {
            console.log('Ошибка получения:', error);
            get(error, null);
        });
}
function sortComments(comments) {
    return comments.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
}
function handleCommentsResult(error, comments) {
    if (error) {
        console.log('Ошибка получения:', error);
    } else {
        const sort1Comments = sortComments(comments);
        console.log('Комменты отсортированы по имени автора');
        console.log('Всего комментариев: ' + sort1Comments.length);
        console.log('Первый автор: ' + sort1Comments[0].name);
        console.log('Последний автор: ' + sort1Comments[sort1Comments.length-1].name);
    }
}
getComments(handleCommentsResult);
// 2B(i): USERS - ПРОМИСЫ
function getUsers() {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => resolve(users))
            .catch(error => reject(error));
    });
}
function filterUsers(users) {
    return users.map(user => {
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone
        };
    });
}
getUsers()
    .then(users => {
        const filter1Users = filterUsers(users);
        console.log('Users с отфильтрованными полями:', filter1Users);
    })
    .catch(error => {
        console.log('Ошибка:', error);
    });
//2B(ii): TODOS - ПРОМИСЫ
function getTodos() {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(todos => resolve(todos))
            .catch(error => reject(error));
    });
}
function filterTodos(todos) {
    return todos.filter(todo => !todo.completed);
}
getTodos()
    .then(todos => {
        const filter1Todos = filterTodos(todos);
        console.log('Todos с completed=false:', filter1Todos);
    })
    .catch(error => {
        console.log('Ошибка:', error);
    });

//2C: ASYNC/AWAIT
function makeRequest(url) {
    return fetch(url).then(response => response.json());
}

async function getPostsSort() {
    try {
        const posts = await makeRequest('https://jsonplaceholder.typicode.com/posts');
        const sort1Posts = posts.sort((a, b) => b.title.length - a.title.length);
        console.log('Posts отсортированы по убыванию длины title:', sort1Posts);
    } catch (error) {
        console.log('Ошибка получения posts:', error);
    }
}
async function getCommentsSort() {
    try {
        const comments = await makeRequest('https://jsonplaceholder.typicode.com/comments');
        const sort1Comments = comments.sort((a, b) => a.name.localeCompare(b.name));
        console.log('Comments отсортированы по имени автора:', sort1Comments);
    } catch (error) {
        console.log('Ошибка получения comments:', error);
    }
}
async function getUsersFilter() {
    try {
        const users = await makeRequest('https://jsonplaceholder.typicode.com/users');
        const filter1Users = users.map(user => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone
        }));
        console.log('Users с отфильтрованными полями:', filter1Users);
    } catch (error) {
        console.log('Ошибка получения users:', error);
    }
}
async function getTodosFilter() {
    try {
        const todos = await makeRequest('https://jsonplaceholder.typicode.com/todos');
        const filter1Todos = todos.filter(todo => !todo.completed);
        console.log('Todos с completed=false:', filter1Todos);
    } catch (error) {
        console.log('Ошибка получения todos:', error);
    }
}
async function runAllAsync() {
    await getPostsSort();
    await getCommentsSort(); 
    await getUsersFilter();
    await getTodosFilter();
}
runAllAsync();