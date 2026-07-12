const blogContainer = document.getElementById("blogContainer");

async function loadBlogs() {

    const response = await fetch("http://localhost:5000/blogs");

    const blogs = await response.json();

    blogContainer.innerHTML = "";

    blogs.forEach(function (blog) {

        blogContainer.innerHTML += `

        <div class="card">

            <img src="${blog.image}">

            <div class="card-content">

                <span class="category">${blog.category}</span>

                <h3>${blog.title}</h3>

                <p>${blog.content}</p>

                <div class="blog-info">

                    <span>👤 ${blog.author}</span>

                    <span>📅 ${blog.date}</span>

                </div>

        <a href="blog.html">
            <button>Read More</button>
        </a>

        <button onclick="editBlog(${blog.id})">
            Edit
        </button>

        <button onclick="deleteBlog(${blog.id})">
            Delete
        </button>

            </div>

        </div>

        `;

    });

}

loadBlogs();


// ================= SEARCH =================

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {

    const cards = document.querySelectorAll(".card");

    const searchText = searchInput.value.toLowerCase();

    cards.forEach(function(card){

        const title = card.querySelector("h3").textContent.toLowerCase();

        if(title.includes(searchText)){

            card.style.display = "block";

        }

        else{

            card.style.display = "none";

        }

    });

});


// ================= LOGIN =================

const loginBtn = document.getElementById("loginBtn");

const loginModal = document.getElementById("loginModal");

const closeBtn = document.querySelector(".close");

loginBtn.onclick = function(){

    loginModal.style.display = "block";

};

closeBtn.onclick = function(){

    loginModal.style.display = "none";

};


// ================= SIGNUP =================

const signupBtn = document.getElementById("signupBtn");

const signupModal = document.getElementById("signupModal");

const signupCloseBtn = document.querySelector(".signup-close");

signupBtn.onclick = function(){

    signupModal.style.display = "block";

};

signupCloseBtn.onclick = function(){

    signupModal.style.display = "none";

};

window.onclick = function(event){

    if(event.target == loginModal){

        loginModal.style.display = "none";

    }

    if(event.target == signupModal){

        signupModal.style.display = "none";

    }

};

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const email = document.getElementById("loginEmail").value;

    const password = document.getElementById("loginPassword").value;

    const response = await fetch("http://localhost:5000/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            email,
            password

        })

    });

const data = await response.json();

if(data.message === "Login Successful"){

    loginModal.style.display = "none";

    loginBtn.style.display = "none";

    signupBtn.style.display = "none";

    logoutBtn.style.display = "inline-block";

}

alert(data.message);

});

// ================= SIGNUP API =================

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const name = document.getElementById("signupName").value;

    const email = document.getElementById("signupEmail").value;

    const password = document.getElementById("signupPassword").value;

    const response = await fetch("http://localhost:5000/signup",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name,
            email,
            password

        })

    });

    const data = await response.json();

    alert(data.message);

    signupModal.style.display = "none";

});

const addBlogBtn = document.getElementById("addBlogBtn");
const addBlogModal = document.getElementById("addBlogModal");
const closeAddBlog = document.getElementById("closeAddBlog");
const addBlogForm = document.getElementById("addBlogForm");

addBlogBtn.onclick = function () {
    addBlogModal.style.display = "block";
};

closeAddBlog.onclick = function () {
    addBlogModal.style.display = "none";
};

addBlogForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const blog = {

        title: document.getElementById("title").value,
        category: document.getElementById("category").value,
        author: document.getElementById("author").value,
        date: document.getElementById("date").value,
        image: "https://picsum.photos/300/200?random=" + Math.floor(Math.random() * 1000),
        content: document.getElementById("content").value

    };

    const response = await fetch("http://localhost:5000/blogs",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(blog)

    });

    const data = await response.json();

    alert(data.message);

    addBlogModal.style.display = "none";

    loadBlogs();

});

async function deleteBlog(id){

    const response = await fetch(`http://localhost:5000/blogs/${id}`,{

        method:"DELETE"

    });

    const data = await response.json();

    alert(data.message);

    loadBlogs();

}

async function editBlog(id){

    const title = prompt("Enter New Title");

    if(title == null) return;

    const category = prompt("Enter Category");

    const author = prompt("Enter Author");

    const date = prompt("Enter Date");

    const content = prompt("Enter Content");

    const image = "https://picsum.photos/300/200?random=" + Math.floor(Math.random() * 1000);

    const response = await fetch(`http://localhost:5000/blogs/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            title,
            category,
            author,
            date,
            content,
            image

        })

    });

    const data = await response.json();

    alert(data.message);

    loadBlogs();

}

// ================= LOGOUT =================

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.style.display = "none";

logoutBtn.onclick = function(){

    loginBtn.style.display = "inline-block";

    signupBtn.style.display = "inline-block";

    logoutBtn.style.display = "none";

    alert("Logged Out Successfully");

};