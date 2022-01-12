import React from "react"

export class BookList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookList: [],
            modalBook: null
        }
    }
    showBookList() {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append("Authorization", "Bearer " + JSON.parse(localStorage.getItem("token")));
        fetch("https://internsapi.public.osora.ru/api/book/list", {
            method: "GET",
            headers: myHeaders
        })
            .then(response => response.json())
            .then(result => { console.log(result); this.setState({ bookList: result.data }) })
            .catch(error => console.log(error))
    }

    addFavoriteHandler(item, index) {
        let booklists1 = [...this.state.bookList];
        if (booklists1[index].favorite !== 1) { booklists1[index].favorite = 1 } else {
            booklists1[index].favorite = 0
        };
        let s = booklists1.filter(item => item.favorite === 1)
        localStorage.setItem("favoritebook", JSON.stringify(s));
        this.setState({ bookList: booklists1 });
    }

    deleteHandler(item, index) {
        let booklists1 = [...this.state.bookList];
        let c = booklists1.filter((item1, index1) => item1.id !== item.id)
        this.setState({ bookList: c });
        this.setState({ modalBook: null })
    }

    readBookHandler(item, index) {
        localStorage.setItem("book", JSON.stringify(item));
        window.location.assign("http://localhost:3000/bookDescription");
    }

    saveChangesHandler() {

    }

    componentDidMount() {
        this.showBookList();
    }


    render() {
        console.log(this.state.bookList);
        return (
            <div className="containerBooklist">
                <div className="containerBooklist__header">
                    <div className="containerBooklist__headerText">Library</div>
                </div>
                <div className="containerBooklist__listBook bookList">
                    {this.state.bookList.map((item, index) =>
                        <div className="bookList__oneBook" key={index}>
                            <div className="bookList__indexOneBook"> {index + 1}</div>
                            <div className="bookList__titleOneBook">
                                {(item.favorite === 1) ? <div className="titleOneBook1">{item.title}</div> : <div className="titleOneBook">{item.title}</div>}
                            </div>
                            <div className="bookList__addFavoriteBlock">
                                <button className="bookList__addFavoriteBook" data-id={item.id}
                                    onClick={() => this.addFavoriteHandler(item, index)}
                                >F</button>
                            </div>
                            <div className="bookList__deleteBlock">
                                <button className="bookList__deleteBook" data-id={item.id}
                                    onClick={() => this.setState({ modalBook: item })}>D</button>
                            </div>
                            <div className="bookList__readBlock">
                                <button className="bookList__readBook" data-id={item.id}
                                    onClick={() => this.readBookHandler(item, index)}>I</button>
                            </div>

                        </div>
                    )
                    }
                </div >
                <div>{
                    this.state.modalBook ?
                        <div className="modalBookList">
                            <div className="modalBookList__main">
                                <div className="modalBookList__headerClose">
                                    <div className="modalBookList__header"><h2>Delete Book</h2></div>
                                    <div className="ex2" onClick={() => this.setState({ modalBook: null })}></div>
                                </div>
                                <div className="modalBookList__text">Удалить книгу из списка?</div>
                            </div>
                            <div className="modalBookList__buttonBlock">
                                <button className="modalBookList__sendButton" onClick={() => this.deleteHandler(this.state.modalBook)}>Yes</button>
                                <button className="modalBookList__closeButton" onClick={() => this.setState({ modalBook: null })}>No</button>
                            </div>
                        </div>
                        :
                        <></>
                }
                </div>
            </div>
        );
    }
}
