import React from "react"

export class ModalBooksList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            password: null
        }
    }

    render() {
        return (
            <div>
                <h1>InfoBook</h1>
            </div >
        );
    }
}