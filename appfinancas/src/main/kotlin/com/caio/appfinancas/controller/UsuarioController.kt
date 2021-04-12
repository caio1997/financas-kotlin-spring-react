package com.caio.appfinancas.controller

import com.caio.appfinancas.entity.Usuario
import com.caio.appfinancas.entity.dto.UsuarioDTO
import com.caio.appfinancas.exception.CriacaoDeUsuarioException
import com.caio.appfinancas.exception.ErroDeLoginExcetion
import com.caio.appfinancas.exception.RegraNegocioException
import com.caio.appfinancas.service.UsuarioService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
@RequestMapping("/api/usuario")
class UsuarioController {

    @Autowired
    lateinit var usuarioService: UsuarioService


    @PostMapping("add")
    fun criarUsuario(@RequestBody usuario: Usuario): ResponseEntity<Any> {

        try {

            val usuarioSalvo: Usuario = usuarioService.criarUsuario(usuario)
            return ResponseEntity.ok(usuarioSalvo)

        } catch (e: CriacaoDeUsuarioException) {

            return ResponseEntity.badRequest().body(e.message)

        }

    }

    @PostMapping("login")
    fun autenticarUsuario(@RequestBody usuarioDTO: UsuarioDTO): ResponseEntity<Any> {

        try {

            return ResponseEntity.ok(usuarioService.autenticarUsuario(usuarioDTO.email, usuarioDTO.senha))

        } catch (e: ErroDeLoginExcetion) {

            return ResponseEntity.badRequest().body(e.message)

        }

    }

    @GetMapping("/{id}/consulta-saldo")
    fun consultaSaldo(@PathVariable id: Long): ResponseEntity<Any> {

        try {

            return ResponseEntity.ok().body(usuarioService.consultaSaldo(id))

        } catch (e: RegraNegocioException) {

            return ResponseEntity.badRequest().body(e.message)

        }

    }




}