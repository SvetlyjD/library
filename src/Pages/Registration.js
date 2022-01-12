import React from "react"
export class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            email: null,
            password: null,
            confirmPassword: null,
            levelPassword: []
        }
    }

    async registrationHandler() {
        let data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.confirmPassword
        }
        let response = await fetch("https://internsapi.public.osora.ru/api/auth/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            let result = await response.json();
            if (result.status === true) { alert("Пользователь был успешно зарегистрирован") }
            else if (result.status === false) {
                if ((result.errors.password) || (result.errors.email) || (result.errors.name)) { alert(result.errors.email) || alert(result.errors.password || alert(result.errors.name)) }
                if (result.errors.name) { alert(result.errors.name) }
                window.location.assign("http://localhost:3000/registration");
            }

            console.log(result);
        } else {
            return Promise.reject(response)
        }
    }

    levelPasswordHandler(val) {
        let c = 0;
        let arr = [];
        if (val > 6) { c = 3 } else if (val < 3) { c = 1 } else { c = Math.floor(val / 2) };
        for (let i = 0; i < c; i++) {
            arr.push("1");
        }
        return arr;
    }


    render() {
        console.log(this.state.levelPassword);
        return (
            <div className="registration">
                <div className="registrarion__main">
                    <div className="registration__registrationHeader">Registration</div>
                    <form className="registration__registrationForm registrationForm" action="">
                        <div className="registrationForm__inputBlock">
                            <input type="text" placeholder="name" value={this.state.name || ""}
                                onChange={(e) => this.setState({ name: e.target.value })}></input>
                            <input type="text" placeholder="email" value={this.state.email || ""}
                                onChange={(e) => this.setState({ email: e.target.value })}></input>
                            <input type="text" placeholder="password" value={this.state.password || ""}
                                onChange={(e) => {
                                    this.setState({ password: e.target.value });
                                    this.setState({ levelPassword: this.levelPasswordHandler(e.target.value.length) })
                                }}>
                            </input>
                            <div className="registrationForm__levelPasswordContainer">
                                {this.state.levelPassword.map((item, index) =>
                                    <div key={index} className="registrationForm__levelPassword"></div>
                                )}
                            </div>
                            <input type="text" placeholder="confirm password" value={this.state.confirmPassword || ""}
                                onChange={(e) => this.setState({ confirmPassword: e.target.value })}></input>
                        </div>
                    </form>
                    <button className="registrationForm_button" onClick={(e) => { e.preventDefault(); this.registrationHandler() }}>SUBMIT</button>
                </div>
            </div >
        );
    }
}
