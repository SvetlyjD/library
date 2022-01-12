import React from "react"

export class InfoBook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book: []
        }
    }

    componentDidMount() {
        this.setState({ book: JSON.parse(localStorage.getItem("book")) })
    }

    render() {
        console.log(this.state.book);
        return (
            <div className="containerBookList">
                <div className="containerBooklist__header">
                    <div className="containerBooklist__headerText">Library Info</div>
                </div>
                <div className="containerBookList__mainInfo mainInfoBook">
                    <div className="mainInfoBook__title">{this.state.book.title}</div>
                    <div className="mainInfoBook__autor">
                        <div className="mainInfoBook__autorText">{this.state.book.authors}</div>
                    </div>
                    <div className="mainInfoBook__description">{this.state.book.description}</div>
                </div>
            </div >
        );
    }
}