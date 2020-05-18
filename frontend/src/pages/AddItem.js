import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

let selectedFile = null;


const fileSelectedHandler = event => {
    console.log(event.target.files)
    selectedFile = event.target.files[0];
}


const onFileUpload = () => { 
     
    // Create an object of formData 
    const formData = new FormData(); 
   
    // Update the formData object 
    formData.append( 
        "myFile", 
        selectedFile,
        selectedFile.name,
    ); 
   
   
    // Request made to the backend api 
    // Send formData object 
    axios.post("api/uploadfile", formData)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    }) 
  }; 

const addToDB = (email) => {
    console.log(email);
};

const AddItem = ({	
	email,
	dispatch,
}) => { 
    
	return (
		<div> 
            <h1> 
              Upload New Item For Sale 
            </h1>  
            <div> 
                <input type="file" onChange={fileSelectedHandler}/> 
                <button onClick={() => {onFileUpload(); addToDB(email);}}> 
                  Upload! 
                </button> 
            </div> 
        </div> 
	);
};

// Step 2 create mapping function
const mapStateToProps = state => ({
	email: state.userReducer.email,
});

// step 3 connect mapping function to component
export default connect(mapStateToProps)(AddItem);