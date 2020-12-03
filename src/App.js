import React from 'react';
import './App.css';
import unirest from 'unirest';
import Movie from "./Movie.js";
import Search from "./Search.js";

class App extends React.Component {
  state = {
    movies: []
  }
 sendRequest = (title) => {
   const req = unirest("GET", "https://movie-database-imdb-alternative.p.rapidapi.com/");
   req.query({
     "page": "1",
     "r": "json",
     "s": title
   });
   req.headers({
     "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
     "x-rapidapi-key": "7f5fa7c9a7msh7460a00d27783f2p1ded34jsn61eda8f72896"
   });
   req.end((res) => {
     if (res.error) throw new Error(res.error);
     console.log(res.body);
   });
   req.end((res) => {
    if (res.error) throw new Error(res.error);
    const movies = res.body.Search;
    this.setState({movies});
  });
 }
 render() {
   return (
     <div className="App">
       <header className="App-header">
       <Search handleSendRequest={this.sendRequest}/>
       {
   this.state.movies.map((movie) => {
     return <Movie {...movie}/>
   })
 }
       </header>
     </div>
   );
 }
}
export default App;