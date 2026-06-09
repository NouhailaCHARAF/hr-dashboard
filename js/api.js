
import { SUPABASE_KEY,SUPABASE_URL } from "./config.js";
const API_URL=`${SUPABASE_URL}/rest/v1/employees`




// GET REQUEST: Fetch All Employees
export async function getEmployees(){

try{
const response=await fetch(API_URL,{

 method: "GET",
    headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Accept-Profile": "public"
    }
});

if (!response.ok) {
      console.log("Response status:", response.status);
      return []; 
    }

 const data= await response.json();
 return data;

}
catch (error) {
    console.error('Fetch failed:', error);
    return [];
  }
}




//POST REQUEST: Add New Employee Record
export async function addEmployee(employee) {
    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
                "Content-Type": "application/json",
                Prefer: "return=representation"
            },
            body: JSON.stringify(employee)
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("POST failed:", error);
        return null;
    }
}


//DELETE REQUEST: Drop Row By Column ID Match
export async function DeleteData(num) {
    
try{

const response = await fetch(`${API_URL}?id=eq.${num}`, {
            method: "DELETE",
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
                
                Prefer: "return=representation"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const deletedData = await response.json();
        return deletedData;
}
catch(error){

console.error("Delete failed:", error);
        throw error;
}
}



//  PATCH REQUEST: Update Field Columns inside specific ID Match

export async function UpdateData(id,dataUpdate) {
    
try{

const response = await fetch(`${API_URL}?id=eq.${id}`, {
            method: "PATCH",
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
                "Content-Type": "application/json",
                Prefer: "return=representation"
            },
            body: JSON.stringify(dataUpdate)
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const updateData = await response.json();
        return updateData;
}

catch(error){

console.error("Delete failed:", error);
        throw error;


}
}