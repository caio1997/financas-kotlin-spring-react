package com.caio.appfinancas.service

import com.caio.appfinancas.entity.Lancamento
import com.caio.appfinancas.entity.Usuario
import com.caio.appfinancas.entity.enum.StatusLancamento
import com.caio.appfinancas.entity.enum.TipoLancamento
import com.caio.appfinancas.exception.CriacaoDeUsuarioException
import com.caio.appfinancas.exception.ErroDeLoginExcetion
import com.caio.appfinancas.exception.RegraNegocioException
import com.caio.appfinancas.repository.LancamentoRepository
import com.caio.appfinancas.repository.UsuarioRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class UsuarioService {

    @Autowired
    lateinit var usuarioRepository: UsuarioRepository

    @Autowired
    lateinit var lancamentoRepository: LancamentoRepository

    fun criarUsuario(usuario: Usuario): Usuario {

        validarEmail(usuario.email)
        return usuarioRepository.save(usuario)

    }

    fun autenticarUsuario(email: String, senha: String): Usuario {

        val valida = usuarioRepository.findByEmail(email)

        if(valida?.email == null) {
            throw ErroDeLoginExcetion("Email nao encontrado!")
        } else {
            if(senha == valida?.senha) {
                return valida
            } else {
               throw ErroDeLoginExcetion("Senha não confere!")
            }
        }
    }

    fun validarEmail(email: String) {

        val valida = usuarioRepository.findByEmail(email)

        if(valida?.email != null) {
            throw CriacaoDeUsuarioException("Email já cadastrado!")
        }

    }

    fun consultaSaldo(id: Long): Double {

        val getUsuario: Optional<Usuario> = usuarioRepository.findById(id)

        if(!getUsuario.isPresent) {

            throw RegraNegocioException("Usuário não está cadastrado no sistema!")

        }

        var somatoriaPositiva: Double = 0.0
        var somatoriaNegativa: Double = 0.0

        val listTemp: List<Lancamento> = lancamentoRepository.findAllByUsuarioId(id)
        listTemp.forEach {
            if(TipoLancamento.DESPESA.equals(it.tipo)) {
                if(StatusLancamento.EFETIVADO.equals(it.status)) {
                    somatoriaNegativa += it.valor!!
                }
            } else {
                if(StatusLancamento.EFETIVADO.equals(it.status)) {
                    somatoriaPositiva += it.valor!!
                }
            }
        }

        val somatoriaTotal = somatoriaPositiva - somatoriaNegativa

        print("SOMATÓRIA POSITIVA: " + somatoriaPositiva)
        print("\n")
        print("SOMATÓRIA NEGATIVA: " + somatoriaNegativa)

        return somatoriaTotal

    }

}