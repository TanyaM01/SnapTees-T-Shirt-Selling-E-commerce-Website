import {API} from "../../backend"
//API means : http://localhost:8000/api/

export const signup = (user) => {
    // Use the fetch function to make a POST request to the `${API}/signup` endpoint.   fetch req.. passing to url  
    return fetch(`${API}/signup`, {   //fetch req Uses the fetch function to make a POST request to the ${API}/signup 
        method: "POST",  //specifies post req
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user) // Converts the user object into a JSON string and sets it as the request body. This is necessary for sending data in the request.//pass on user(in json)
    })
    //// After the fetch operation is complete, handle the response.
    .then((response) => {   //if everything goes as success
        return response.json(); //whatever res is coming up we are converting into json and giving back to frontend
    })
    .catch((err) => console.log(err))

};

export const signin = (user) => {
    return fetch(`${API}/signin`, {   //fetch req Uses the fetch function to make a POST request to the ${API}/signup 
        method: "POST",  //specifies post req
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user) // Converts the user object into a JSON string and sets it as the request body. This is necessary for sending data in the request.
    })
    .then((response) => {
        return response.json(); //whatever res is coming up we are converting into json
    })
    .catch((err) => console.log(err))
};

export const authenticate = (data, next) => {
    if(typeof window!== "undefined"){  //set jwt with json.stringify(data)
        localStorage.setItem("jwt", JSON.stringify(data)) //a token is been set which is jwt token if user is successfully signed in
        next();
    }
}

export const signout = (next) => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt") //remove jwt token
        next();

        return fetch(`${API}/signout`, {
            method: "GET"
        })
        .then(response => console.log("signout success"))
        .catch(err => console.log(err))
    }
};

export const isAuthenticated = () => {   //to validate if user is signed in or not

    if(typeof window == "undefined"){  //window object
        return false   //user not authenticated
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    }
}

//where to store data frm form before we submit to backend?
//learn abt states
