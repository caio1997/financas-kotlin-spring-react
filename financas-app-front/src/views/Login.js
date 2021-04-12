import React from 'react'
import Card from '../components/cards'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../main/provedorAuth'

import UsuarioService from '../app/service/usuarioService'
import { mensagemErro } from '../components/toastr'

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
    }

    constructor(){
        super();
        this.service = new UsuarioService()
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            console.log(response.data)
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
        }).catch( erro => {
            mensagemErro(erro.response.data)
        })
    }

    preparaCadastro = () => {
        this.props.history.push('/cadastro-usuario')
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style={ {position: 'relative', left: '300px'} }>
                        <div className="bs-docs-section">
                            <Card title="Login">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                    <input type="email" 
                                                    value={this.state.email}
                                                    onChange={e => this.setState({email: e.target.value})}
                                                    className="form-control" 
                                                    id="exampleInputEmail1" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Digite o Email"/>
                                                </FormGroup>
                                                <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                    <input type="password" 
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({senha: e.target.value})}
                                                    className="form-control" 
                                                    id="exampleInputPassword1" 
                                                    placeholder="Password"/>
                                                </FormGroup>
                                                <button onClick={this.entrar} className="btn btn-success" style={ {marginRight: 10} }>Entrar</button>
                                                <button onClick={this.preparaCadastro} className="btn btn-danger">Cadastrar</button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext

export default withRouter( Login )