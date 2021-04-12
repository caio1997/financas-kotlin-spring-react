package com.caio.appfinancas.repository

import com.caio.appfinancas.entity.Usuario
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface UsuarioRepository : JpaRepository<Usuario, Long> {

    fun findByEmail(email: String?): Usuario?

    override fun findById(id: Long): Optional<Usuario>

}