import React from "react"

export class FavoriteBook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book: [],
        }
    }

    componentDidMount() {
        if (localStorage.getItem('favoritebook') !== null) { this.setState({ book: JSON.parse(localStorage.getItem("favoritebook")) }) }
    }

    render() {
        return (
            <div className="containerBookList">
                <div className="containerBooklist__header">
                    <div className="containerBooklist__headerText">Library Info</div>
                </div>
                <div className="containerBooklist__listBook bookList">
                    {this.state.book.map((item, index) =>
                        <div className="bookList__oneBook" key={index}>
                            <div className="bookList__indexOneBook"> {index + 1}</div>
                            <div className="bookList__titleOneBook">
                                <div className="titleOneBook">{item.title}</div>
                            </div>
                        </div>
                    )
                    }
                </div >
            </div >
        );
    }
}