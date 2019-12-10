import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import VideoSearch from "../VideoSearch/VideoSearch";
import "./ConditionSearchBar.css";

export class ConditionSearchBar extends Component {
  constructor() {
    super();
    this.timer = null;

    this.state = {
      conditionSearchTerm: "",
      conditionsReturned: 0,
      selectedCondition: null,
      selectedSymptoms: null,
      results: null
    };

    const newArr = [];

    const onClick = event => {
      console.log(event);
    };

    this.clearSearch = () => {
      console.log("Clicked!");
      this.setState({
        conditionSearchTerm: "",
        selectedCondition: null,
        results: null
      });
    };
  }

  callConditions = () => {
    axios
      .get(
        `https://my-healthbuddy.herokuapp.com/api/v1/conditions/search/${this.state.conditionSearchTerm}?limit=5`
      )
      .then(({ data }) => {
        this.setState({ conditionsReturned: data.data.length });
        this.newArr = data.data.slice(0, 10);
        this.setState({ results: this.newArr });
      });
  };

  clicked = (condition, conditionSymptoms) => {
    this.setState({ conditionSearchTerm: "" });
    this.setState({ selectedCondition: condition });
    this.setState({ selectedSymptoms: conditionSymptoms });
    console.log(condition);
    console.log(conditionSymptoms);
  };

  onInputChange = async event => {
    clearTimeout(this.timer);
    this.setState({
      conditionSearchTerm: event.target.value.trim().toLowerCase()
    });

    if (this.state.conditionSearchTerm === "") {
      this.setState({ results: null });
    }

    if (this.state.conditionSearchTerm !== "") {
      this.setState({ selectedCondition: null, selectedSymptoms: null });
    }

    this.timer = setTimeout(() => {
      if (this.state.conditionSearchTerm !== "") {
        console.log("searching!");
        this.callConditions();
      }
    }, 500);
  };

  onFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    let newData = this.state.results;
    let suggestionsList;

    if (newData !== null && this.state.conditionSearchTerm !== "") {
      suggestionsList = newData.map((suggestion, index) => {
        return (
          <li
            key={index}
            className="conditionResults"
            ref={suggestion.condition}
            symptoms={suggestion.conditionSymptoms}
            onClick={() =>
              this.clicked(suggestion.condition, suggestion.conditionSymptoms)
            }
          >
            {suggestion.condition}
          </li>
        );
      });
    }

    return (
      <div className="container form">
        <h1 className="searchHead">
          Search Conditions To Start Tracking Your Health:
        </h1>
        {this.state.conditionSearchTerm === "" ? (
          <div />
        ) : (
          <h3>
            {"Search Results: "} {this.state.conditionsReturned}
          </h3>
        )}
        <form onSubmit={this.onFormSubmit}>
          <input
            className="ui input focus massive conditionSearchBar"
            type="text"
            placeholder="Search Conditions..."
            ref={input => (this.search = input)}
            value={this.state.conditionSearchTerm}
            onChange={this.onInputChange}
          />
          {this.state.conditionSearchTerm === "" ? (
            <div></div>
          ) : (
            <div>
              {this.state.conditionSearchTerm !== "" &&
              this.state.results === null ? (
                <div class="ui segment">
                  <p></p>
                  <div class="ui active dimmer">
                    <div class="ui loader"></div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="resultsH3">
                    <ul className="resultsContainer">{suggestionsList}</ul>
                  </h3>{" "}
                </div>
              )}
            </div>
          )}
        </form>
        {this.state.selectedCondition === null ? (
          <div>
            {/* <div class='ui segment'>
              <p></p>
              <div class='ui active dimmer'>
                <div class='ui loader'></div>
              </div>
            </div> */}
          </div>
        ) : (
          <div>
            <VideoSearch
              condition={this.state.selectedCondition}
              symptoms={this.state.selectedSymptoms}
              clearSearch={this.clearSearch}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ConditionSearchBar;
