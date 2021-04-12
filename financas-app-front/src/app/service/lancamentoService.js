import ApiService from '../apiservice'

class LancamentoService extends ApiService {

    constructor(){
        super('/api/lancamento')
    }


    consultar(LancamentoFiltro) {
        

        let params = `?ano=${LancamentoFiltro.ano}`

        if(LancamentoFiltro.mes){
            params = `${params}&mes=${LancamentoFiltro.mes}`
        }

        if(LancamentoFiltro.tipo){
            params = `${params}&tipo=${LancamentoFiltro.tipo}`
        }

        if(LancamentoFiltro.status){
            params = `${params}&status=${LancamentoFiltro.status}`
        }

        if(LancamentoFiltro.usuario){
            params = `${params}&usuario=${LancamentoFiltro.usuario}`
        }

        return this.get(params)
    }

    deletar(id) {
        return this.delete(`/${id}`)
    }

    salvar(objeto) {
        return this.post(`/add`, objeto)
    }

    obterPorId(id) {
        return this.get(`/buscar/${id}`)
    }

    atualizar(objeto) {
        return this.put(`/${objeto.id}`, objeto)
    }

    alterarStatus(id, status) {
        return this.put(`/${id}/atualiza-status`, { status })
    }

}

export default LancamentoService