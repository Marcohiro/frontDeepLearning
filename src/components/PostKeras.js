import React, { Component } from 'react';
import axios from 'axios';

class PostKerras extends Component{

    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null
          }
      }

      onChangeHandler=event=>{
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }

      onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:5000/postKeras", data, { // receive two parameter endpoint url ,form data 
    })
    .then(res => { // then print response status
      console.log(res.statusText)
    })
    }

    render(){
        return <span>
        <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
        </span>
    }
}

export default PostKerras;