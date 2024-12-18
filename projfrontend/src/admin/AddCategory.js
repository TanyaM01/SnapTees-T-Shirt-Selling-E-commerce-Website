/* import React, {useState} from 'react'
import Base from '../core/Base';
//import { isAuthenticated } from '../auth/helper';
import { isAuthenticated } from "../auth/helper/index"
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';

// Call the function to get the user and token


const AddCategory = () => {

    const[name, setName]= useState("")
    const [error, setError] = useState(false)
    const[success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated

    const goBack =() => (
        <div className='mt-5'>
            <Link className='btn btn-sm btn-success mb-3' to="/admin/dashboard">
                Admin Home
            </Link>
        </div>
    );

    const handleChange =(event) => {
        setError("");
        setName(event.target.value)

    }
/*
    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false)

        //backend request fired 
        createCategory(user._id, token, {name})
        .then(data => {
            if (data.error){
                setError(true)
            } else {
                setError("")
                setSuccess(true)
            }
        })
    }
*/

/*
const onSubmit = (event) => {
    event.preventDefault();
    setError(false); // Reset error state
    setSuccess(false); // Reset success state
    
    console.log("User:", user); // Check if user is available
    console.log("Token:", token); // Check if token is available

    // Proceed if user and token are defined
    if (!user || !token) {
        setError(true);
        return console.log("User or token is not available");
    }

    // Backend request fired 
    createCategory(user._id, token, { name })
      .then(data => {
        console.log("Response from server:", data);  // Log the response
        
        if (data.error) {
          setError(true); // Set error state if there's an error
        } else {
          setError(""); // Reset error
          setSuccess(true); // Set success to true on successful creation
          setName(""); // Clear the input field
        }
      })
      .catch(err => console.log("Error in createCategory", err));
};
*/
/*
const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // Backend request fired
    createCategory(user._id, token, { name })
        .then(data => {
            console.log("Response from server:", data); // Log the response
            
            if (data.error) {
                setError(true);
            } else {
                setError("");
                setSuccess(true);
            }
        })
        .catch(err => console.log("Error in createCategory", err));
};


    const myCategoryForm = () => (
        <form>
            <div className='form-group'>
                <p className='lead'>Enter the category</p>
                <input type="text"
                className='form-control my-3'
                onChange={handleChange}
                value={name}
                autoFocus 
                required
                placeholder='For Ex. Summer'
                />
                <button onClick={onSubmit} className='btn btn-outline-info'>Create Category</button>
            </div>
        </form>
    )
    const auth = isAuthenticated();
console.log("Authenticated User:", auth); // Log the result of isAuthenticated




    return (
        <Base 
        title="Create a category here" 
        description="Add a new category for new tshirts"
        className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className='col-md-8 offset-md-2'>
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory;

*/

import React, { useState } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from "../auth/helper/index";
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // Call the isAuthenticated function to get user and token
    const auth = isAuthenticated();
    const { user, token } = auth; // Correctly destructure user and token from auth

    const goBack = () => (
        <div className='mt-5'>
            <Link className='btn btn-sm btn-success mb-3' to="/admin/dashboard">
                Admin Home
            </Link>
        </div>
    );

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        // Check if user and token are defined
        if (!user || !token) {
            setError(true);
            console.log("User or token is not available");
            return;
        }

        // Backend request fired
        createCategory(user._id, token, { name })
            .then(data => {
                console.log("Response from server:", data); // Log the response
                if (data.error) {
                    setError(true);
                } else {
                    setError("");
                    setSuccess(true);
                    setName(""); // Reset the name input field after success
                }
            })
            .catch(err => console.log("Error in createCategory", err));
    };

    const successMessage = () => {
        if(success){
            return <h4 className='text-success'>Category Created Successfully!</h4>
        }
    }

    const warningMessage = () => {
        if(error){
            return <h4 className='text-success'>Failed to create category</h4>
        }
    }

    const myCategoryForm = () => (
        <form>
            <div className='form-group'>
                <p className='lead'>Enter the category</p>
                <input
                    type="text"
                    className='form-control my-3'
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                    placeholder='For Ex. Summer'
                />
                <button onClick={onSubmit} className='btn btn-outline-info'>Create Category</button>
            </div>
        </form>
    );

    // Log the authenticated user
    console.log("Authenticated User:", auth);

    return (
        <Base
            title="Create a category here"
            description="Add a new category for new t-shirts"
            className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className='col-md-8 offset-md-2'>
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
}

export default AddCategory;
