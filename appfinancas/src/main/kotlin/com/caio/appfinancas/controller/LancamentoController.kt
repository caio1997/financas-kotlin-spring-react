package com.caio.appfinancas.controller

import com.caio.appfinancas.entity.Lancamento
import com.caio.appfinancas.entity.Usuario
import com.caio.appfinancas.entity.dto.AtualizaStatusDTO
import com.caio.appfinancas.entity.enum.StatusLancamento
import com.caio.appfinancas.exception.RegraNegocioException
import com.caio.appfinancas.repository.UsuarioRepository
import com.caio.appfinancas.service.LancamentoService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*


@CrossOrigin
@RestController
@RequestMapping("/api/lancamento")
class LancamentoController {

    @Autowired
    lateinit var lancamentoService: LancamentoService

    @Autowired
    lateinit var usuarioRepository: UsuarioRepository

    @GetMapping
    fun buscar(
        @RequestParam(value = "mes", required = false, defaultValue = "0") mes: Int,
        @RequestParam(value = "ano", required = false) ano: Int,
        @RequestParam("usuario") idUsuario: Long
    ): ResponseEntity<Any>{

        val lancamentoFiltro = Lancamento()

        if(mes.toString() != "0"){
            lancamentoFiltro.mes = mes
        }
        lancamentoFiltro.ano = ano


        val usuario: Optional<Usuario> = usuarioRepository.findById(idUsuario)

        if(!usuario.isPresent) {
            return ResponseEntity.badRequest().body("Não foi possível realizar a consulta! Usuário não encontrado")
        } else {
            lancamentoFiltro.usuario = usuario.get()
        }

        val lancamentos: List<Lancamento> = lancamentoService.buscar(lancamentoFiltro)

        return ResponseEntity.ok(lancamentos)

    }

    @PostMapping("add")
    fun adicionarLancamento(@RequestBody lancamento: Lancamento): ResponseEntity<Any> {

        try {

            return ResponseEntity.ok().body(lancamentoService.salvaLancamento(lancamento))

        } catch (e: RegraNegocioException) {

            return ResponseEntity.badRequest().body(e.message)

        }

    }

    @DeleteMapping("/{id}")
    fun deletarLancamento(@PathVariable id: Long): ResponseEntity<Any> {

        try {

            lancamentoService.deletarLancamento(id)
            return ResponseEntity.noContent().build()

        } catch (e: RegraNegocioException) {

            return ResponseEntity.badRequest().build()

        }

    }

    @GetMapping("listar")
    fun listarLancamentos(): ResponseEntity<List<Lancamento>> {

        try {

            val lista: List<Lancamento> = lancamentoService.listarLancamentos()

            return ResponseEntity.ok().body(lista)

        } catch (e: RegraNegocioException) {

            return ResponseEntity.badRequest().build()

        }

    }

    @PutMapping("/{id}")
    fun atualizar(@PathVariable id: Long, @RequestBody lancamento: Lancamento): ResponseEntity<Any> {

        try {

            return ResponseEntity.ok().body(lancamentoService.atualizar(id, lancamento))

        } catch (e: RegraNegocioException) {

            return ResponseEntity.badRequest().body(e.message)

        }

    }

    @PutMapping("/{id}/atualiza-status")
    fun atualizarStatus(@PathVariable id: Long, @RequestBody dto: AtualizaStatusDTO): ResponseEntity<Any> {

        try {

            val getLancamento: Optional<Lancamento> = lancamentoService.findById(id)
            val statusSelecionado: StatusLancamento = StatusLancamento.valueOf(dto.status)
            if(statusSelecionado.toString().equals("")) {
                return ResponseEntity.badRequest().body("Status não encontrado")
            } else {
                getLancamento.get().status = statusSelecionado
                lancamentoService.atualizar(id, getLancamento.get())
                return ResponseEntity.ok().body(getLancamento)
            }

        } catch (e: RegraNegocioException) {

            return ResponseEntity.badRequest().body(e.message)

        }

    }
    @GetMapping("/buscar/{id}")
    fun buscarPorId(@PathVariable id: Long): ResponseEntity<Any> {

        try {
            val lancamento: Optional<Lancamento> = lancamentoService.findById(id)
            return ResponseEntity.ok().body(lancamento)
        } catch (e: RegraNegocioException) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }



}