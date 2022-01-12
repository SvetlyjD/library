import React from "react"

export class Authorization extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null
        }
    }

    authorizationSubmit() {                // нужно уточнить почему при использовании async возникает и пропадает ошибка "корс"
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        fetch("https://internsapi.public.osora.ru/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((result) => {
                if (!result.errors) {
                    localStorage.setItem("token", JSON.stringify(result.data.access_token));
                    window.location.assign("http://localhost:3000/");
                }
                else if ((result.errors.password) || (result.errors.email)) { alert(result.errors.email) || alert(result.errors.password) }
            })
    }

    render() {
        return (
            <div className="registration">
                <div className="registrarion__main">
                    <div className="registration__registrationHeader">Login</div>
                    <form action="" className="registration__registrationForm registrationForm">
                        <div className="registrationForm__inputBlock">
                            <input type="text" placeholder="email" value={this.state.email || ""}
                                onChange={(e) => this.setState({ email: e.target.value })} />
                            <input type="text" placeholder="password" value={this.state.password || ""}
                                onChange={(e) => this.setState({ password: e.target.value })} />
                        </div>
                    </form>
                    <button className="registrationForm_button" onClick={(e) => { e.preventDefault(); this.authorizationSubmit() }}>LOGIN</button>
                </div>
            </div>

        );
    }
}
