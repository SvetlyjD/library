import React from "react"

export class Error extends React.Component {
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
                <h1>Error 404</h1>
            </div >
        );
    }
}