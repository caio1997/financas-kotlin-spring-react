import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/cards'
import FormGroup from '../../components/form-group'

import * as messages from '../../components/toastr'
import SelectMenu from '../../components/selectMenu'
import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localStorageService'



class CadastroLancamento extends React.Component {

    state = {
        id: '',
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: '',
        atualizando: false
    }

    temp = () => {
        console.log(this.state)
    }


    constructor() {
        super()
        this.service = new LancamentoService()
    }

    validarCampos = () => {

        const msgs = []

        if(!this.state.descricao) {
            msgs.push('O campo descrição é obrigatório')
        }
        
        if(!this.state.ano) {
            msgs.push('O campo ano é obrigatório')
        } //else if((this.state.ano.length !== 4)) {
            //msgs.push('Vamos inserir um ano válido')
        //}
        

        if(!this.state.mes) {
            msgs.push('O campo mes é obrigatório')
        } else if(this.state.mes < 1 || this.state.mes > 12){
            msgs.push('Vamos inserir um mês valido')
        }

        if(!this.state.valor) {
            msgs.push('O campo valor é obrigatório')
        }

        if(!this.state.tipo) {
            msgs.push('O campo tipo é obrigatório')
        }

        return msgs
    }

    cancelarCadastroLancamento = () => {
        messages.mensagemAlerta("O lançamento não foi salvo")
        this.props.history.push('/consulta-lancamentos')
    }

    componentDidMount() {
        const params = this.props.match.params
        if(params.id) {
            this.service.obterPorId(params.id)
            .then ( response => {
                this.setState( {...response.data, atualizando: true} )
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
        }
        console.log('Params' ,params)
    }

    
    adicionarLancamento = () => {

        const msgs = this.validarCampos()

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                messages.mensagemErro(msg)
            })
            return false
        }

        const usuarioLogado = LocalStorageService.getItem('usuario_logado')

        const lancamento = {
            descricao: this.state.descricao,
            valor: this.state.valor,
            mes: this.state.mes,
            ano: this.state.ano,
            tipo: this.state.tipo,
            status: 'PENDENTE',
            usuario: usuarioLogado
        }

        console.log(lancamento)

        this.service.salvar(lancamento)
        .then( response => {
            messages.mensagemSucesso("Lançamento cadastrado com sucesso!")
            this.props.history.push('/consulta-lancamentos')
            /*
            this.setState({id: ''})
            this.setState({descricao: ''})
            this.setState({valor: ''})
            this.setState({mes: ''})
            this.setState({ano: ''})
            this.setState({tipo: ''})
            this.setState({status: ''})
            this.setState({usuario: ''})
            */
        }).catch( error => {
            messages.mensagemErro(error.response.data)
        } )

    }

    atualizar = () => {

        const msgs = this.validarCampos()

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                messages.mensagemErro(msg)
            })
            return false
        }

        const usuarioLogado = LocalStorageService.getItem('usuario_logado')

        const lancamento = {
            id: this.state.id,
            descricao: this.state.descricao,
            valor: this.state.valor,
            mes: this.state.mes,
            ano: this.state.ano,
            tipo: this.state.tipo,
            status: this.state.status,
            usuario: usuarioLogado
        }

        console.log(lancamento)

        this.service.atualizar(lancamento)
        .then( response => {
            messages.mensagemSucesso("Lançamento atualizado com sucesso!")
            this.props.history.push('/consulta-lancamentos')
        }).catch( error => {
            messages.mensagemErro(error.response.data)
        } )

    }


    render() {

        const tipos = [
            {key: '0', label: 'Selecione', value: ''},
            {key: '1', label: 'RECEITA', value: 'RECEITA'},
            {key: '2', label: 'DESPESA', value: 'DESPESA'},
        ]

        const meses = [
            {key: '0', label: 'Selecione', value: ''},
            {key: '1',label: 'JANEIRO', value: '1'},
            {key: '2', label: 'FEVEREIRO', value: '2'},
            {key: '3', label: 'MARÇO', value: '3'},
            {key: '4', label: 'ABRIL', value: '4'},
            {key: '5', label: 'MAIO', value: '5'},
            {key: '6', label: 'JUNHO', value: '6'},
            {key: '7', label: 'JULHO', value: '7'},
            {key: '8', label: 'AGOSTO', value: '8'},
            {key: '9', label: 'SETEMBRO', value: '9'},
            {key: '10', label: 'OUTUBRO', value: '10'},
            {key: '11', label: 'NOVEMBRO', value: '11'},
            {key: '12', label: 'DEZEMBRO', value: '12'},
        ]

        return (
            <div className="container">
                <Card title={ this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamentos'}>
                    <div className="row">
                        <div className="col-lg-12">
                            <FormGroup id="inputDescricao" label="Descrição: *">
                                <input id="inputDescricao" type="text" className="form-control" 
                                value={this.state.descricao} 
                                onChange={e => this.setState({descricao: e.target.value})}/>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <FormGroup id="inputAno" label="Ano: *">
                                <input id="inputAno" type="text" className="form-control" 
                                value={this.state.ano} 
                                onChange={e => this.setState({ano: e.target.value})}/>
                            </FormGroup>
                        </div>
                        <div className="col-lg-6">
                            <FormGroup id="inputMes" label="Mês: *">
                                <SelectMenu id="inputMes" lista={meses} className="form-control" value={this.state.mes} 
                                onChange={e => this.setState({mes: e.target.value})}/>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <FormGroup id="inputValor" label="Valor: *">
                                <input id="inputValor" type="text" className="form-control" value={this.state.valor} 
                                onChange={e => this.setState({valor: e.target.value})}/>
                            </FormGroup>
                        </div>
                        <div className="col-lg-4">
                            <FormGroup id="inputTipo" label="Tipo: *">
                                <SelectMenu id="inputTipo" lista={tipos} className="form-control" value={this.state.tipo} 
                                onChange={e => this.setState({tipo: e.target.value})}/>
                            </FormGroup>
                        </div>
                        <div className="col-lg-4">
                            <FormGroup id="inputStatus" label="Status: *">
                                <input id="inputStatus" type="text" className="form-control" value={this.state.status}  disabled/>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            {this.state.atualizando ? 
                                (
                                    <button  className="btn btn-primary" onClick={this.atualizar}>Atualizar</button>
                                ) : (
                                    <button  className="btn btn-success" onClick={this.adicionarLancamento} >Salvar</button>

                                )
                            }                            
                            <button  className="btn btn-danger" onClick={this.cancelarCadastroLancamento} style={{marginLeft: 10}}>Cancelar</button>
                        </div>
                    </div>                    
                </Card>    
            </div>
        )
    }
}

export default withRouter(CadastroLancamento)