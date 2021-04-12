import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/cards'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'

import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localStorageService'

import * as messages from '../../components/toastr'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';



class ConsultaLancamentos extends React.Component {

    constructor(){
        super()
        this.service = new LancamentoService()
    }


    state = {
        ano: '',
        mes: '',
        tipo: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    editar = (id) => {
        this.props.history.push(`/cadastra-lancamento/${id}`)
    }

    deletar = () => {
        console.log(this.state.lancamentoDeletar.id)
        this.service.deletar(this.state.lancamentoDeletar.id)
        .then ( response => {
            const lancamentos = this.state.lancamentos
            const index = lancamentos.indexOf(this.state.lancamentoDeletar)
            lancamentos.splice(index, 1)
            this.setState(lancamentos)
            messages.mensagemSucesso('Lançamento excluído com sucesso!')
            this.setState({showConfirmDialog: false})
        }).catch(error => {
            messages.mensagemErro('Não foi possível deletar o lançamento!')
        })
        console.log("DELETAR: ", this.state.lancamentoDeletar.id)
    }

    buscar = () => {

        if(!this.state.ano) {
            messages.mensagemErro('O preenchimento do campo ano é obrigatório!')
            return false
        }

        const usuarioLogado = LocalStorageService.getItem('usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            usuario: usuarioLogado.id
        }
        console.log(this.state)

        this.service.consultar(lancamentoFiltro)
        .then( response => {
            this.setState({lancamentos: response.data})
            console.log('passou aqui')
            const cont = !!Object.values(response.data).length
            if(cont === false){
                messages.mensagemAlerta('Não foi encontrado nenhum registro!')
            }
        }).catch( error => {
            messages.mensagemErro('Ocorreu algum erro ao realizar a consulta.')
        })

    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}})
    }

    preparaCadastroLancamento = () => {
        this.props.history.push('/cadastra-lancamento')
    }

    alterarStatus =(lancamento, status) => {
        this.service.alterarStatus(lancamento.id, status)
        .then( response => {
            const lancamentos = this.state.lancamentos
            const index = lancamentos.indexOf(lancamento)
            if(index !== -1) {
                lancamento['status'] = status;
                lancamentos[index] = lancamento
                this.setState({lancamentos})
            }
            messages.mensagemSucesso('Status atualizado com sucesso!')

        })
    }


    render(){

        const confirmDialogFooter = (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-text" />
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar}/>
            </div>
        )
            
       

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

        const tipos = [
            {key: '0', label: 'Selecione', value: ''},
            {key: '1', label: 'RECEITA', value: 'RECEITA'},
            {key: '2', label: 'DESPESA', value: 'DESPESA'},
        ]

        return(
            <div className="container">
                <Card title='Consulta Lançamentos'>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="bs-component">
                                <FormGroup htmlFor='inputAno' label='Ano: *'>
                                <input type="text" className="form-control" 
                                id="inputAno"
                                value={this.state.ano}
                                onChange={e => this.setState({ano: e.target.value})}
                                placeholder="Digite o Ano"/>
                                </FormGroup>
                                <FormGroup htmlFor='inputMes' label='Mês: '>
                                    <SelectMenu id='inputMes' className='form-control' 
                                    lista={meses} value={this.state.mes} 
                                    onChange={e => this.setState({mes: e.target.value})}/>
                                </FormGroup>
                                <FormGroup htmlFor='inputTipo' label='Tipo de Lancamento:'>
                                    <SelectMenu id='inputTipo' className='form-control' lista={tipos}
                                    value={this.state.tipo} 
                                    onChange={e => this.setState({tipo: e.target.value})}/>
                                </FormGroup>
                                <button onClick={this.buscar} type="button" className="btn btn-success" style={ {marginRight: 10} }>Buscar</button>
                                <button type="button" className="btn btn-danger" onClick={this.preparaCadastroLancamento} >Cadastrar</button>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <LancamentosTable 
                                lancamentos={this.state.lancamentos} 
                                deleteAction={this.abrirConfirmacao} 
                                editarAction={this.editar}
                                alterarStatus={this.alterarStatus}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Dialog header="Confirmação" 
                        visible={this.state.showConfirmDialog} 
                        style={{ width: '50vw' }} 
                        footer={confirmDialogFooter}
                        onHide={() => this.setState({showConfirmDialog: false})}>
                            <p>Confirma a exclusão deste lançamento?</p>
                        </Dialog>
                    </div>
                </Card>
            </div>
        )
    }

}

export default withRouter(ConsultaLancamentos)