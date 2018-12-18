import React, { Component } from 'react';
import './App.css';



class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      titulo: [],
      descrição: [],
      links: [],
      inputValor: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e){

    this. setState ({
      inputValor: e.target.value
    });
  }

  handleSubmit(e){
    if(this.state.inputValor==="")return
    e.preventDefault();
    let query = this.state.inputValor;
    let url = 
    'https://cors-anywhere.herokuapp.com/https://pt.wikipedia.org/w/api.php?action=opensearch&search='+query+'&limit=10&format=json';

    fetch(url).then(function (res){
      return res.json();
    }).then(function(data){
      this.setState({
        titulo: data[1],
        descrição: data[2],
        links: data[3],
      });
    }.bind(this));
  }

  render() {
    return (
      <div className="App App-header">
        <div className="container py-5">
          <div className="row">
            <div className="mx-auto d-block">
              <h4>WikiViewer</h4>
              <hr color="white" className="mt-0"/>
            </div>
          </div>
          <div className="row">
            <form onSubmit={this.handleSubmit} className="form-inline mx-auto d-block mt-3 mb-2">
              <div className="form-group">
                <input onChange={this.handleChange} className="form-control mx-sm-2"></input>
                <button type="submit" className="btn btn-primary">Procurar</button>
              </div>
            </form>
          </div>
          {
            this.state.titulo.map((titulos, i) => 
              <div key={i}>
                <div className="col-md8 push-md-2">
                  <a href={this.state.links[i]} target="_blank">
                    <div className="card-block mt-4">
                      <h3 className="mb-2 mt-2">{titulos}</h3>
                      <p>{this.state.descrição[i]}</p>
                    </div>
                  </a>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}



export default App;
