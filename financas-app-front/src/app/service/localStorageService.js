class LocalStorageService {

    static addItem(chave, valor) {
        return localStorage.setItem(chave, JSON.stringify(valor))
    }

    static getItem(chave) {
        const item = localStorage.getItem(chave)
        return JSON.parse(item)
    }

    static removerItem(chave) {
        localStorage.removeItem(chave)
    }

}

export default LocalStorageService