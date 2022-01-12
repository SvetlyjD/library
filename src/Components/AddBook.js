import React from "react"

export class AddBook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listBook: [],
            modalBook: null
        }
    }
    addBookhandler() {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.nameBook}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then(result => {
                console.log(result);
                let books = result.items.map(item => {
                    let { volumeInfo: { title, description } } = item;
                    let authors = item.volumeInfo.authors;
                    // let uid = item.id.substr(0, 5);
                    let rand = Math.random() * 100000;
                    let uid = Math.floor(rand)
                    const favorite = 0;
                    if (authors === undefined) { authors = "No Autors" } else { authors = authors.toString() };
                    if (title === undefined) { title = "No title" };
                    if (description === undefined) { description = "No description" } else { description = description.substr(0, 20) };
                    return { title, authors, description, favorite, uid }
                })
                console.log(books);
                this.setState({ listBook: books });
            })

    }

    sendNewBook(book) {
        console.log(book);
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append("Authorization", "Bearer " + JSON.parse(localStorage.getItem("token")));
        fetch("https://internsapi.public.osora.ru/api/book/add", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(this.state.modalBook)
        })
            .then(response => response.json())
            .then(result => { console.log(result); this.setState({ modalBook: null }) })


    }

    render() {
        return (
            <div className="containerAddBook">
                <div className="containerAddBook__main">
                    <div className="containerAddBook__addFormBook">
                        <form className="containerAddBook__addBook">
                            <div className="containerAddBook__search" onClick={(e) => { e.preventDefault(); this.addBookhandler() }}></div>
                            <input className="containerAddBook__inputAddBook" type="text" placeholder="name of book" value={this.state.nameBook || ""}
                                onChange={(e) => this.setState({ nameBook: e.target.value })} />
                        </form>
                    </div>
                    <div className="containerAddBook__listBook listBook">
                        {
                            this.state.listBook.map((item, index) =>
                                <div className="listBook__oneBook" key={index}>
                                    <div className="listBook__indexOneBook"> {index + 1}</div>
                                    <div className="listBook__titleOneBook1">
                                        <div className="titleOneBook2">{item.title}</div>
                                    </div>
                                    <div className="listBook__addButtonBlock">
                                        <button className="listBook__addOneBook" data-id={item.id} onClick={() => this.setState({ modalBook: item })}>ADD</button>
                                    </div>
                                </div>
                            )}
                    </div>
                    <div>{
                        this.state.modalBook ?
                            <div className="modalBookList">
                                <div className="modalBookList__main">
                                    <div className="modalBookList__headerClose">
                                        <div className="modalBookList__header"><h2>Add Book</h2></div>
                                        <div class="ex2" onClick={() => this.setState({ modalBook: null })}></div>
                                    </div>
                                    <div className="modalBookList__text">Добавить книгу в список?</div>
                                </div>
                                <div className="modalBookList__buttonBlock">
                                    <button className="modalBookList__sendButton" onClick={() => this.sendNewBook(this.state.modalBook)}>Yes</button>
                                    <button className="modalBookList__closeButton" onClick={() => this.setState({ modalBook: null })}>No</button>
                                </div>
                            </div>
                            :
                            <></>
                    }
                    </div>
                </div>
            </div >
        );
    }
}