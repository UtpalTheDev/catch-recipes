import React from "react";

import "./styles.css";

class App extends React.Component {
  //class app

  constructor() {
    super();
    this.state = {
      item: [],
      text: "",
      search: ""
    };
    this.text_maker = this.text_maker.bind(this);
    this.search_maker = this.search_maker.bind(this);
  }

  componentDidMount() {
    //mounting function for setting value in state

    console.log("in mount text", this.state.text);
    console.log("in mount search", this.state.search);
    console.log();
    var pass1 = "chicken";
    this.fetching(pass1);
  }

  fetching(passing) {
    const appid = "6a52ad3";
    const appkey = "9d30f78821bd47dce56b55fd6441ea92";
    var param = passing;
    const url = `https://api.edamam.com/search?q=${param}&app_id=${appid}&app_key=${appkey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          item: data.hits
        });
        console.log(this.id);
      });
  }

  text_maker(event) {
    var input_text = event.target.value;
    this.setState({
      text: input_text
    });
    console.log("check", this.state.text);
  }
  search_maker = (event) => {
    console.log("---", this.state.text);
    var input_search = this.state.text;
    this.setState({
      search: input_search
    });
    event.preventDefault();
    this.fetching(input_search);
  };

  render() {
    var { item } = this.state;
    console.log("search--", this.state.search);
    return (
      <div>
        <form className="form">
          <input className="name" type="text" onChange={this.text_maker} />
          <button className="button" onClick={this.search_maker}>
            search
          </button>
        </form>
        <div className="bind">
          {item.map((recipes) => (
            <div key={recipes.id} className="container">
              {recipes.recipe.label}
              <img src={recipes.recipe.image} alt="ll"></img>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
