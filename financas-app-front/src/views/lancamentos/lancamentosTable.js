import React from 'react'

import currencyFormatter from 'currency-formatter'

function LancamentosTable(props){

    const rows = props.lancamentos.map( lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currencyFormatter.format(lancamento.valor, { locale: 'pt-BR'})}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')} type="button" className="btn btn-success" style={ {marginRight: 10} }>
                        Efetivar
                    </button>
                    <button onClick={e => props.alterarStatus(lancamento, 'CANCELADO')} type="button" className="btn btn-warning" style={ {marginRight: 10} }>
                        Cancelar
                    </button>
                    <button type="button" 
                    className="btn btn-primary" 
                    onClick={ e => props.editarAction(lancamento.id)}
                    style={ {marginRight: 10} }>
                        Editar
                    </button>
                    <button type="button" 
                    className="btn btn-danger" 
                    onClick={ e => props.deleteAction(lancamento)}>
                        Deletar
                    </button>
                </td>
            </tr>
        )
    })

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default LancamentosTable