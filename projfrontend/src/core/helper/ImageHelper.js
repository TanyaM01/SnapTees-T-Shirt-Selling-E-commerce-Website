/*import React from "react";
import {API} from "../../backend";

const ImageHelper =({product}) => {
   const imageurl = product ? `${API}/product/${product._id}` : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`
    return (
        <div className="rounded border border-success p-2">
                <img
                  src={imageurl}
                  alt="photo"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  className="mb-3 rounded"
                />
        </div>
    )
}


export default ImageHelper*/


import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
   // Check if the product has an ID, then construct the URL; otherwise, use a placeholder image
   const imageurl = product && product._id 
       ? `${API}/product/photo/${product._id}`  // Ensure this endpoint exists in your backend
       : "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

   console.log("Image URL:", imageurl);  // Log the URL to check if it's constructed correctly

   return (
       <div className="rounded border border-success p-2">
           <img
               src={imageurl}
               alt="Product photo"
               style={{ maxHeight: "100%", maxWidth: "100%" }}
               className="mb-3 rounded"
               onError={(e) => {
                   e.target.onerror = null; 
                   e.target.src = "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
               }}  // Use fallback if the image fails to load
           />
       </div>
   );
};

export default ImageHelper;
