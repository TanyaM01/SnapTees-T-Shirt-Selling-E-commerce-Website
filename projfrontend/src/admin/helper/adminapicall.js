/*//APi call
import { API } from "../../backend";


//category calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || 'Network response was not ok');
            });
        }
        return response.json();
    })
    .catch(err => {
        console.log("Error in createCategory:", err);
        return { error: err.message }; // Return an object with the error message
    });
};

//get all categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method:"GET"
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}



//******** */
//product calls

//create a product
/*
export const createaProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body:product
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//get all products
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method:"GET"
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//delete a product

//get a product
export const getProduct = product => {
    return fetch(`${API}/product/${productId}`, {
        method:"GET"
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//update a product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/productId/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body:product
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/productId/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }   
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
} 
*/



//***************************
import { API } from "../../backend";

//category calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || 'Network response was not ok');
            });
        }
        return response.json();
    })
    .catch(err => {
        console.log("Error in createCategory:", err);
        return { error: err.message };
    });
};

//get all categories
/*
export const getCategories = () => {
    //console.log("API IS", API); // Should log http://localhost:8000/api

    return fetch(`${API}/categories`, {
        method: "GET",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(err => {
        console.log("Error fetching categories:", err);
        return { error: err.message };
    });
};*/
// get all categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET",
    })
    .then(response => {
        // Log the response status to help debug
        console.log("Response status:", response.status);

        // Check if the response is ok
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
    })
    .catch(err => {
        // Log the error in fetching categories
        console.log("Error fetching categories:", err);
        return { error: err.message }; // Return the error message
    });
};


//product calls

//create a product
export const createaProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data" // for form data (if product is not JSON)
        },
        body: product,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(err => {
        console.log("Error creating product:", err);
        return { error: err.message };
    });
};

//get all products
// Example for fetching all products with better error handling
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch products, status: ' + response.status);
        }
        return response.json();
    })
    .catch(err => {
        console.error("Error fetching products:", err);
        alert("An error occurred while fetching products."); // Alert user
        return { error: err.message };
    });
};


//get a product
export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(err => {
        console.log("Error fetching product:", err);
        return { error: err.message };
    });
};

//update a product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: product,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(err => {
        console.log("Error updating product:", err);
        return { error: err.message };
    });
};

//delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(err => {
        console.log("Error deleting product:", err);
        return { error: err.message };
    });
};

