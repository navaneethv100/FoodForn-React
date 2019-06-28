import React, { Component } from "react";
import "./App.module.css";


import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import { recipes } from "./tempList";

class App extends Component {
  constructor(props) {
    super(props);
    this.getRecipes = this.getRecipes.bind(this);
  }
  state = {
    recipes: recipes,
    base_url: "https://www.food2fork.com/api/search?key=ef16bc78aeec74d70dea4843c8d3950f",
    url: "https://www.food2fork.com/api/search?key=ef16bc78aeec74d70dea4843c8d3950f",
    pageIndex: 1,
    details_id: 35389,
    search: "",
    query: "&q="
    
  };
  async getRecipes() {
    try {
      console.log(this.state.url);

      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      
      
      this.setState({
        recipes: jsonData.recipes
      });
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.getRecipes();
  }

  displayPage = () => {
    switch (this.state.pageIndex) {
      default:
      case 1:
        return (
          <RecipeList
            handleDetails={this.handleDetails}
            recipes={this.state.recipes}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            search={this.state.search}
            
          />
        );
      case 0:
        return (
          <RecipeDetails
            handleIndex={this.handleIndex}
            id={this.state.details_id}
          />
        );
    }
  };
  handleIndex = index => {
    this.setState({
      pageIndex: index
    });
  };
  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    });
  };
  handleChange = e => {
    this.setState({
      search: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { base_url, query, search } = this.state;
    this.setState(
      {
        url: `${base_url}${query}${search}`,
        search: ""
      },
      () => {
        this.getRecipes();
        console.log(this.state);
      }
    );
  };
  render() {
    // console.log(this.state.recipes);

    return <React.Fragment>{this.displayPage()}</React.Fragment>;
  }
}

export default App;
