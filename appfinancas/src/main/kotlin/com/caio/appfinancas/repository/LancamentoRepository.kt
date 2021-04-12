package com.caio.appfinancas.repository

import com.caio.appfinancas.entity.Lancamento
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface LancamentoRepository : JpaRepository<Lancamento, Long> {

    override fun findById(id: Long): Optional<Lancamento>

    fun findAllByUsuarioId(id: Long): List<Lancamento>

}