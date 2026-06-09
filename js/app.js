import { getEmployees } from "./api.js";
import { addEmployee } from "./api.js";
import { DeleteData } from "./api.js";
import { UpdateData } from "./api.js";
import { getUser } from "./auth.js";
import { logout } from "./auth.js";

//  DOM Elements Selection
const dataBody=document.querySelector('#dataBody')
const name=document.querySelector('#name')
const email=document.querySelector('#email')
const role=document.querySelector('#role')
const status=document.querySelector('#status')
const employeeForm=document.querySelector('#employeeForm')
const message=document.querySelector('#message')
const logoutBtn = document.querySelector('#logoutBtn')

let currentMode = "add" // Global state switch: toggles between "add" and "update" modes
let currentId = null   // Holds the active employee ID during an update operation




const user = await getUser()

if(!user){
    location.href = "./login.html"
} else {
    document.body.style.display = "block" 
    displayData()
} 



const renderEmployees=(data)=>{  

dataBody.innerHTML=""
data.forEach(item=>{
dataBody.innerHTML += `<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.role}</td>
        <td>${item.status}</td>
        <td class="d-flex flex-wrap gap-2 pt-3"><button class="btn-update btn btn-warning" data-id="${item.id}">Update</button>
        <button class="btn-delete btn btn-danger" data-id="${item.id}">Delete</button></td>
      </tr>`

})


}
/**
 * Fetch and Render Data (Read Operation)
 * Responsibility: Requests the updated employee list from Supabase, 
 * clears the current UI table, and renders fresh rows.
 */
async function displayData(){

try{

const employees=await getEmployees(); // Fetch array from backend

renderEmployees(employees)


}

catch(error){
    console.log("Error")
}
}
displayData();




/**
 * Form Submission Handler (Create & Update Operations)
 * Single Responsibility: Determines whether to route payloads to the 
 * Add or Update API, handles UI loading states, and cleans up state on success.
 */

employeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();    // Intercept default HTML form reloading behavior
    try {

        // Trigger visual loading feedback in the UI
        message.innerHTML = "Loading...";
        message.style.color = "black";


        // Construct the structural payload object from form inputs
        const ObjectData = {
            name: name.value,
            email: email.value,
            role: role.value,
            status: status.value
        };

        if (currentMode === "update") {
            await UpdateData(currentId, ObjectData);
            message.innerHTML = "Employee updated successfully!";

        } else {
            const result = await addEmployee(ObjectData);
            if (!result) {
                throw new Error("Failed to create employee"); 
            }
            message.innerHTML = "Employee created successfully! Database updated ";
        }
     
        message.style.color = "green";
        employeeForm.reset();   // Clear all input fields inside the form
        
        
        currentMode = "add"; 
        currentId = null;
        document.getElementById('saveBtn').innerText = "Add Employee"; 
        document.getElementById('saveBtn').style.backgroundColor = ""; 

        
        await displayData(); 

    } catch (error) {
        console.error("Submission pipeline failed:", error);
        message.innerHTML = "Something went wrong!";
        message.style.color = "red";
    }
});



/**
 * Event Delegation Strategy (Action Handler)
 * Performance Choice: Instead of binding multiple individual listeners to every single button, 
 * we bind one single listener to the parent container (`dataBody`) and intercept bubbling events.
 */

dataBody.addEventListener('click',async(e)=>{

e.preventDefault();

//  CASE 1: intercepted click on a DELETE action button
if(e.target.classList.contains('btn-delete')){

try{

const id=e.target.getAttribute('data-id')

if(confirm("You want to delete it?")){

e.target.innerText = "Suppression...";
            e.target.disabled = true;
await DeleteData(id);

e.target.closest('tr').remove();
    
}}
catch(error){

    console.log("Error!", error)
    e.target.innerText = "Delete";
            e.target.disabled = false;
}}


if(e.target.classList.contains('btn-update')){

const id=e.target.getAttribute('data-id');
const row = e.target.closest('tr');
const cells=row.querySelectorAll('td')


 name.value=cells[1].innerHTML
 email.value=cells[2].innerHTML
 role.value=cells[3].innerHTML
 status.value=cells[4].innerHTML

document.getElementById('saveBtn').innerText = "Save"
document.getElementById('saveBtn').style.backgroundColor="green"


// Lock values into state variables to switch pipeline context for the upcoming submit event
currentId = id
currentMode = "update"

}

else{
    console.log("Error")
}

})




//Filter and search
let AllEmployees=[]
AllEmployees = await getEmployees()
const searchInput = document.querySelector('#searchInput')




searchInput.addEventListener('input',(e)=>{
e.preventDefault();

    const valeur=e.target.value.toLowerCase().trim();
    const filtered=AllEmployees.filter(item=>item.name.toLowerCase().includes(valeur)) // javascript includes case insensitive

    
   renderEmployees(filtered)


})



logoutBtn.addEventListener('click',async()=>{

await logout()
location.href="./login.html"

})