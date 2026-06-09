
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xemJneGVvb2tid2d4cnJ6dmh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyMzg0MjYsImV4cCI6MjA5NTgxNDQyNn0.OBIbUkXhtwe2mwIOvVqSZjY6MXLOsQFcE2TT0Gxcr3c"
const SUPABASE_URL="https://nqzbgxeookbwgxrrzvhv.supabase.co"
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)


export async function login(email,password){

try{

const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if(error) throw error
        return data
}

catch(error){

console.error("Login failed:", error)
        throw error
}
}




export async function logout(){

    try{
        const { error } = await supabase.auth.signOut()
        if(error) throw error
    }

catch(error) {
        console.error("Logout failed:", error)
        throw error
    }
}



export async function getUser(){

try {
        const { data: { session } } = await supabase.auth.getSession()
        console.log("session:", session)
        return session
    } catch(error) {
        console.error("getUser failed:", error)
        throw error
    }
}
