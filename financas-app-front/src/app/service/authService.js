import LocalStorageService from './localStorageService'

export const USUARIO_LOGADO = 'usuario_logado'

export default class AuthService {
    

    static isUsuarioAutenticado() {
        const usuario = LocalStorageService.getItem(USUARIO_LOGADO)
        return usuario && usuario.id
    }

    static removerUsuarioAutenticado() {
        LocalStorageService.removerItem(USUARIO_LOGADO)
    }

    static logar(usuario) {
        LocalStorageService.addItem(USUARIO_LOGADO, usuario)
    }

    static obterUsuarioAutenticado() {
        return LocalStorageService.getItem(USUARIO_LOGADO)
    }

}