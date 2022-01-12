import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom"
import { BookList } from './Components/BookList';
import { FavoriteBook } from './Components/FavoriteBook';
import { InfoBook } from './Pages/InfoBook';
import { Authorization } from './Pages/Auth';
import { Registration } from './Pages/Registration';
import { AddBook } from './Components/AddBook';
import { Error } from './Pages/Error';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: 1
    }
  }


  render() {
    if (this.state.auth === 1)
      return (
        <div>
          <Routes>
            <Route exact path="/" element={<AddBook />} />
            <Route exact path="/favoritebook" element={<FavoriteBook />} />
            <Route exact path="/infobook" element={<InfoBook />} />
            <Route exact path="/authorization" element={<Authorization />} />
            <Route exact path="/registration" element={<Registration />} />
            <Route exact path="/booklist" element={<BookList />} />
            <Route exact path="/bookDescription" element={<InfoBook />} />
            <Route path="*" element={< Error />} />
          </Routes>
        </div>
      )
  }
}

