import React, { Component } from 'react';
import axios from 'axios';

class PostForm extends Component {

  constructor(props) {
    super(props)
    this.uploadFile = this.uploadFile.bind(this);
    this.state = {
      answer: '',
      fileUrl: '',
      models: [],
      selectedModel: '',
      hideGraph: false
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedModel: selectedOption });
  }

  componentDidMount() {
    let initialModels = [];
    axios.get('http://localhost:5000/selectModel')
      .then(response => {
        return response.data;
      }).then(data => {
        initialModels = Object.values(data).map((model) => {
          return model
        });
        this.setState({
          selectedModel: initialModels[0],
          models: initialModels,
        });
      }).catch(error => {
        console.log(error);
      });
  }


  uploadFile(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    if (file) {
      let data = new FormData();
      data.append('file', file);
      reader.readAsDataURL(file);
      axios.post('http://localhost:5000/postImage/'+this.state.selectedModel , data)
        .then(response => {
          this.setState({ answer: response.data, fileUrl: reader.result });
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  render() {
    return <span>
      <p> Choose a model from this list:</p>
      <form>
        <select onChange={e => {
            this.setState({ selectedModel: e.target.value }, () => { console.log(this.state.selectedModel);
});
          }}>
        {this.state.models.map(model => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
        </select>
      </form>
      <input type="file"
        name="file"
        enctype="multipart/form-data"
        onChange={this.uploadFile} />
      {this.state.answer.length === 0 ? <p>Veuillez envoyer une image</p> : <p>{this.state.answer}</p>}
      {this.state.fileUrl.length > 0 && <img src={this.state.fileUrl} alt="upload" />}
      {!this.state.hideGraph && <img src={'http://localhost:5000/displayAccuracy/'+this.state.selectedModel}/>}
      {!this.state.hideGraph && <img src={'http://localhost:5000/displayLoss/'+this.state.selectedModel}/>}
    </span>
  }
}

export default PostForm;