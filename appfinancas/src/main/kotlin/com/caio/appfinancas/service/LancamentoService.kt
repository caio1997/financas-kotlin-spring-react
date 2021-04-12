package com.caio.appfinancas.service

import com.caio.appfinancas.entity.Lancamento
import com.caio.appfinancas.entity.Usuario
import com.caio.appfinancas.entity.enum.StatusLancamento
import com.caio.appfinancas.exception.RegraNegocioException
import com.caio.appfinancas.repository.LancamentoRepository
import com.caio.appfinancas.repository.UsuarioRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Example
import org.springframework.data.domain.ExampleMatcher
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*


@Service
class LancamentoService {

    @Autowired
    lateinit var usuarioRepository: UsuarioRepository

    @Autowired
    lateinit var lancamentoRepository: LancamentoRepository

    @Override
    @Transactional(readOnly = true)
    fun buscar(lancamentoFiltro: Lancamento): List<Lancamento>{

        val example = Example.of(lancamentoFiltro, ExampleMatcher.matching().withIgnoreCase().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING))

        return lancamentoRepository.findAll(example)

    }

    fun findById(id: Long): Optional<Lancamento> {

        val getLancamento: Optional<Lancamento> = lancamentoRepository.findById(id)

        if(getLancamento.isPresent) {
            return lancamentoRepository.findById(id)
        } else {
            throw RegraNegocioException("Lançamento não encontrado")
        }
    }

    fun salvaLancamento(lancamento: Lancamento): Lancamento {

        validarLancamento(lancamento)

        val lancamentoDTO = Lancamento()
        lancamentoDTO.descricao = lancamento.descricao
        lancamentoDTO.ano = lancamento.ano
        lancamentoDTO.mes = lancamento.mes
        lancamentoDTO.valor = lancamento.valor
        lancamentoDTO.status = StatusLancamento.PENDENTE
        lancamentoDTO.tipo = lancamento.tipo

        if(lancamento.usuario == null) {

            throw RegraNegocioException("Não foi possível criar o lançamento! Favor enviar o usuário")

        }

        val idUsuario: Long? = lancamento.usuario!!.id

        val getUsuario: Optional<Usuario> = usuarioRepository.findById(idUsuario!!)

        if(getUsuario.isPresent){

            lancamentoDTO.usuario = getUsuario.get()

            lancamentoRepository.save(lancamentoDTO)
            return lancamentoDTO

        } else {

            throw RegraNegocioException("Usuário não cadastrado")

        }

    }

    fun validarLancamento(lancamento: Lancamento) {

        if(lancamento.descricao.equals("") || lancamento.descricao == "") {
            throw RegraNegocioException("Favor inserir uma descrição")
        }
        if(lancamento.ano!! < 1000 || lancamento.ano!! > 9999 || lancamento.ano.toString().trim().equals("")) {
            throw RegraNegocioException("Favor como um ano de 4 digitos")
        }

        if(lancamento.mes!! < 1 || lancamento.mes!! > 12 || lancamento.mes.toString().trim().equals("")) {
            throw RegraNegocioException("Favor como um mês entre 1 - 12")
        }

        if(lancamento.valor!! < 0.0 || lancamento.valor.toString().trim().equals("") || lancamento.valor == null || lancamento.valor.toString().trim() == "") {
            throw RegraNegocioException("Favor inserir um valor positivo")
        }

        if(lancamento.usuario.toString().equals("")) {
            throw RegraNegocioException("Favor inserir um usuário")
        }

        if(lancamento.status.toString().trim().equals("") || lancamento.equals("") || lancamento.status == null) {
            throw RegraNegocioException("Favor inserir um status válido")
        }

    }

    fun deletarLancamento(id: Long) {

        try {
            lancamentoRepository.deleteById(id)
        } catch (e: RegraNegocioException) {
            throw RegraNegocioException("Lançamento não encontrado")
        }

    }

    fun listarLancamentos(): List<Lancamento> {

        return lancamentoRepository.findAll()

    }

    fun atualizar(id: Long, lancamento: Lancamento): Lancamento {

        validarLancamento(lancamento)

        val lancamentoDTO = Lancamento()
        lancamentoDTO.descricao = lancamento.descricao
        lancamentoDTO.ano = lancamento.ano
        lancamentoDTO.mes = lancamento.mes
        lancamentoDTO.valor = lancamento.valor
        lancamentoDTO.status = lancamento.status
        lancamentoDTO.tipo = lancamento.tipo
        lancamentoDTO.usuario = lancamento.usuario

        val getLancamento: Optional<Lancamento> = lancamentoRepository.findById(id)

        if(getLancamento.isPresent) {

            val getUsuario: Optional<Usuario> = usuarioRepository.findById(lancamento.usuario?.id!!)

            if(getUsuario.isPresent) {

                lancamentoDTO.id = getLancamento.get().id
                return lancamentoRepository.save(lancamentoDTO)

            } else {

                throw RegraNegocioException("Usuário não encontrado")

            }

        } else {

            throw RegraNegocioException("Lançamento não encontrado")

        }

    }

}