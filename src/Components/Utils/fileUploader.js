import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { CircularProgress } from '@material-ui/core';


class Fileuploader extends Component {

    state ={ 
        name:'', // name of the file blahBlah.png
        isUploading:false,
        fileURL:'' // httt://firebase/hosting.1911i2j/namsm.png
    }

    handleUploadStart = () => {
        this.setState({
            isUploading: true
        })
    }

    handleUploadError = (e) => {
        console.log(e);
        this.setState({
            isUploading: false
        })
    }


    handleUploadSuccess = (filename) => {
        this.setState({
            name:filename,
            isUploading: false
        })
    }


 

    render(){
        console.log(this.state)
        return(
            <div>
                <div>
                    <FileUploader
                        accept="image/*"
                        name="image"
                        randomizeFilename
                        storageRef={firebase.storage().ref(this.props.dir)}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                    />
                </div>
            </div>
        )
    }

}

export default Fileuploader