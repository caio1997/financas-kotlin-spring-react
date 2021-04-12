import React from 'react'
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import Login from '../views/Login'
import CadastroUsuario from '../views/CadastroUsuario'
import Home from '../views/Home'
import ConsultaLancamentos from '../views/lancamentos/consuta-lancamentos'
import CadastraLancamento from '../views/lancamentos/cadastro-lancamento'
import { AuthConsumer } from '../main/provedorAuth'


function RotaAutenticada( {component: Component, isUsuarioAutenticado, ...props} ) {

    return (
        <Route {...props} render={ (componentProps) => {
            if(isUsuarioAutenticado){
                return (
                    <Component {...componentProps}/>
                )
            } else {
                return (
                    <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }}/>
                )
            }
        }} />
    )
}

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuario" component={CadastroUsuario}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastra-lancamento/:id?" component={CadastraLancamento}/>
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado}/>) }
    </AuthConsumer>
)