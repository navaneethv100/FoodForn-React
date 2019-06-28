import React, { Component } from 'react';
import {recipe} from '../tempDetails';
import classes from '../App.module.css';
export default class RecipeDetails extends Component {
    constructor(props){
        super(props)
        this.state={
            recipe:recipe,
            url: `https://www.food2fork.com/api/get?key=ef16bc78aeec74d70dea4843c8d3950f&rId=${this.props.id}`
        };
    }
    
    
    state={
        recipe: recipe
    };
    async componentDidMount(){
        
        try{
        const data= await fetch(this.state.url);
        const jsonData= await data.json();
        this.setState(
            { recipe:jsonData.recipe});
        
    }   catch(error){
        console.log(error);
        }
    }
    
    
    render() {
        const {
            image_url,
            publisher,
            publisher_url,
            source_url,
            title,
            ingredients}=this.state.recipe;
        const {handleIndex} =this.props;
        return (
            <React.Fragment>
            <div className="container my-5">
            <div className="row">
              <div className="col-10 mx-auto col-md-6 my-3">
                <button
                  type="button"
                  className="btn btn-warning mb-5 text-capitalize"
                  onClick={() => handleIndex(1)}
                >
                  back to recipe list
                </button>
                <img src={image_url} className="d-block w-100" alt="recipe" />
              </div>
              {/* details */}
              <div className="col-10 mx-auto col-md-6 my-3">
                <h6 className="text-uppercase">{title}</h6>
                <div className={classes.textslanted} >
                <h6 className="text-warning text-capitalize">
                  provided by {publisher}
                </h6>
                </div>
                <a
                  href={publisher_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-2 text-capitalize"
                >
                  Publisher Webpage
                </a>
                <a
                  href={source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success mt-2 mx-3 text-capitalize"
                >
                  recipe url
                </a>
                <ul className="list-group mt-4">
                  <h2 className="mt-3 mb-4">Ingredients</h2>
                  {ingredients.map((item, index) => {
                    return (
                      <div className={classes.textslanted} >
                      <li key={index} className="list-group-item text-slanted">
                        {item}
                      </li>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
            </React.Fragment>
        )
    }
}

