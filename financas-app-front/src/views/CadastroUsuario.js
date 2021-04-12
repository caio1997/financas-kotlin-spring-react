import React from 'react'
import Card from '../components/cards'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'
import { mensagemErro, mensagemSucesso } from '../components/toastr'



class CadastroUsuario extends React.Component {


    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService()
    }

    validar() {
        const msgs = []

        if(!this.state.nome){
            msgs.push('O campo nome é obrigatório')
        }

        if(!this.state.email){
            msgs.push('O campo email é obrigatório')
        } else if(!this.state.email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi)){
            msgs.push('Informe um email válido')
        }

        if(!this.state.senha || !this.state.senhaRepeticao){
            msgs.push('Digite a senha 2x.')
        } else if(this.state.senha !== this.state.senhaRepeticao){
            msgs.push('As senhas não batem.')
        }

        return msgs
    }

    cadastrar = () => {

        const msgs = this.validar()

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                mensagemErro(msg)
            })
            return false
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.service.cadastrar(usuario)
            .then( response => {
            mensagemSucesso("Usuário cadastrado com sucesso! Faça o login para acessar o sistema.")
            setTimeout( () => {
            this.props.history.push('/login')
        }, 1500)
        }).catch( erro => {
            mensagemErro(erro.response.data)
        })
    }

    voltarLogin = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="container">
                <Card title="Cadastro de Usuário">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <fieldset>
                                    <FormGroup label="Nome: *" htmlFor="exampleInputNome">
                                    <input type="nome" 
                                    className="form-control" 
                                    id="exampleInputCaio" 
                                    aria-describedby="nomelHelp" 
                                    placeholder="Digite o Nome"
                                    value={this.state.nome}
                                    onChange={e => this.setState({nome: e.target.value})}/>
                                    </FormGroup>
                                    <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                    <input type="email" 
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp"
                                    placeholder="Digite o Email"value={this.state.email}
                                    onChange={e => this.setState({email: e.target.value})}/>
                                    <small id="emailHelp" 
                                    className="form-text text-muted">
                                        Não divulgamos o seu email.
                                    </small>
                                    </FormGroup>
                                    <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                    <input type="password" 
                                    className="form-control" 
                                    id="exampleInputPassword1" 
                                    placeholder="Password"
                                    value={this.state.senha}
                                    onChange={e => this.setState({senha: e.target.value})}/>
                                    </FormGroup>
                                    <FormGroup label="Repita a senha: *" htmlFor="exampleInputPasswordRepetida">
                                    <input type="password" 
                                    className="form-control" 
                                    id="exampleInputPasswordRepetida" 
                                    placeholder="Password"
                                    value={this.state.senhaRepeticao}
                                    onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                                    </FormGroup>
                                    <button onClick={this.cadastrar} type="button" className="btn btn-success" style={ {marginRight: 10} }>Salvar</button>
                                    <button onClick={this.voltarLogin} className="btn btn-danger">Voltar</button>
                                </fieldset>
                            </div>
                         </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter( CadastroUsuario )