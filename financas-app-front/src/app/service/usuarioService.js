import ApiService from '../apiservice'

class UsuarioService extends ApiService {

    constructor(){
        super('/api/usuario')
    }

    autenticar(credenciais){
        return this.post('/login', credenciais)
    }


    obterSaldoPorId(id){
        return this.get(`/${id}/consulta-saldo`)
    }

    cadastrar(objeto) {
        return this.post('/add', objeto)
    }

}

export default UsuarioService