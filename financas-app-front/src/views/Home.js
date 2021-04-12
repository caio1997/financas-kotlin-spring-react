import React from 'react'

import UsuarioService from '../app/service/usuarioService'
import { AuthContext } from '../main/provedorAuth'


class Home extends React.Component {

    state = {
        saldo: 0
    }

    constructor(){
        super();
        this.service = new UsuarioService()
    }

    componentDidMount(){

        const usuarioLogado = this.context.usuarioAutenticado

        this.service.obterSaldoPorId(usuarioLogado.id)
        .then( response => {
            this.setState({ saldo: response.data })
        }).catch( erro => {
            console.log( erro.response )
        })
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Esse é seu sistema de finanças.</p>
                    <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                    <hr className="my-4"/>
                    <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                    <p className="lead">
                        <a  className="btn btn-primary btn-lg" 
                            href="#/cadastro-usuario" 
                            role="button"><i className="fa fa-users"></i>Cadastrar Usuário</a>
                        <a style={{marginLeft: 10}} className="btn btn-danger btn-lg"
                            href="#/cadastra-lancamento" 
                            role="button"><i className="fa fa-users" ></i>Cadastrar Lançamento</a>
                    </p>
                </div>
            </div>
        )
    }
}

Home.contextType = AuthContext

export default Home