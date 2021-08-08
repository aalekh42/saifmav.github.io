/* eslint-disable default-case */
import { useContext } from 'react'
import { Button } from '@material-ui/core'
import app from '../../config/firebase-config'
import { UserContext } from '../../provider/userProvider'
import { v4 as uuidv4 } from 'uuid';

const changeHandler =(e,user)=>{
  const file = e.target.files[0]
  const storageRef = app.storage().ref()

// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child(uuidv4(file.name)).put(file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(app.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case app.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case app.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    app.firestore()
    .collection('data')
    .add({
        username: user.displayName,
        email: user.email,
        profile_picture : downloadURL,
        filename: file.name,
        createdAt: new Date().getTime()
    })
      console.log('File available at', downloadURL);
    });
  }
);

}

export default function BasicTextFields() {
  const user = useContext(UserContext)
  return (
    <label htmlFor="upload-photo">
    <input
      style={{ display: 'none' }}
      onChange={(e)=>changeHandler(e,user)}
      id="upload-photo"
      name="upload-photo"
      type="file"
    />
  
    <Button color="primary" variant="contained" component="span">
      Upload File
    </Button>
  </label>
  )
}
