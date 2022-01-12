import React from "react"
import { Button, Container, Nav, Navbar } from "react-bootstrap"

export class HeaderMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: localStorage.getItem('token')
        }
    }

    exitHandler() {
        localStorage.removeItem("token");
        window.location.assign("http://localhost:3000/authorization")
    }

    render() {
        if (this.state.auth)
            return (
                <Navbar bg="dark" variant="dark">
                    <Container>
                        {/* <Navbar.Brand href="/">Library</Navbar.Brand> */}
                        <Nav className="me-auto">
                            <Nav.Link href="/">Add Book</Nav.Link>
                            <Nav.Link href="/favoritebook">Favorite Book</Nav.Link>
                            <Nav.Link href="/booklist">Book List</Nav.Link>
                            <Button type="button" className="btn btn-dark" onClick={() => this.exitHandler()}>Exit</Button>
                        </Nav>
                    </Container>
                </Navbar>)
        else
            return (
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Nav className="me-auto">
                            <Nav.Link href="/registration">Registration</Nav.Link>
                            <Nav.Link href="/authorization">Authorization</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>)
    }
}