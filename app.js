const addBtn = document.querySelector("#addbtn");
const updateBtn = document.querySelector("#updatebtn");
const input = document.querySelector("input");
const clearAll = document.querySelector("#clearitems");
const ul = document.querySelector("ul");

let groceries = JSON.parse(localStorage.getItem("groceryitems")) || [];
let editIndex = null;

function loadItems() {
    ul.innerHTML = "";

    groceries.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <p>${item}</p>
            <div class="btn">
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </div>
        `;
        ul.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    if (!input.value.trim() || input.value.length < 3) {
        return alert("Kam se kam 3 letters likho.");
    }

    groceries.push(input.value.trim());
    localStorage.setItem("groceryitems", JSON.stringify(groceries));

    input.value = "";
    loadItems();

    
});

function deleteItem(i) {
    groceries.splice(i, 1);
    localStorage.setItem("groceryitems", JSON.stringify(groceries));
    loadItems();
}

clearAll.addEventListener("click", () => {
    groceries = [];
    localStorage.removeItem("groceryitems");
    loadItems();
});

function editItem(i) {
    input.value = groceries[i];
    editIndex = i;
    console.log(updateBtn.textContent);
     updateBtn.textContent = "Update"
     
     addBtn.classList.add("nonactive");
    updateBtn.classList.remove("nonactive");

}
// editItem.addEventListener('click', function (){
    // addBtn.innerHTML = `Update`
// })

updateBtn.addEventListener("click", () => {
    groceries[editIndex] = input.value.trim();
    localStorage.setItem("groceryitems", JSON.stringify(groceries));
    // addBtn.innerHTML = 'Update'
    input.value = "";
    editIndex = null;

    addBtn.classList.remove("nonactive");
    updateBtn.classList.add("nonactive");

    loadItems();
});

loadItems();
