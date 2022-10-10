import "./styles.css";
import React from "react";
import SearchForm from "./SearchForm";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTerm: "",
      quotes: [],
      isFetchingQuote: false
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchQuote = this.searchQuote.bind(this);
  }

  searchQuote() {
    this.setState({ isFetchingQuote: true });
    fetch(
      `https://geek-quote-api.herokuapp.com/v1/quote/filter/all/${this.state.searchTerm}`
    )
      .then((response) => response.json())
      .then((json) => {
        const quotes = json;
        console.log("quotes", quotes);
        this.setState({
          quotes,
          isFetchingQuote: false
        });
      });
  }

  onSearchChange(value) {
    this.setState({ searchTerm: value });
  }
  onSearchSubmit(event) {
    event.preventDefault();
    this.searchQuote();
  }
  renderQuotes() {
    return (
      <ul className="quote-list">
        {this.state.quotes.map((item) => (
          <li key={item.id}>{item.quote}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <img className="logo" src={require("./geek.png")} />
        <SearchForm
          onFormSubmit={this.searchQuote}
          onSearchValueChange={this.onSearchChange}
          isSearching={this.state.isFetchingQuote}
          onSingleSearchClick={() => this.searchQuote(1)}
        />
        {this.state.isFetchingQuote
          ? "searching for quotes ..."
          : this.renderQuotes()}
      </div>
    );
  }
}
