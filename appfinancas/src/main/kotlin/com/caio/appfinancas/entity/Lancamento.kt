package com.caio.appfinancas.entity

import com.caio.appfinancas.entity.enum.StatusLancamento
import com.caio.appfinancas.entity.enum.TipoLancamento
import java.util.*
import javax.persistence.*
import javax.persistence.JoinColumn

import com.caio.appfinancas.entity.*
import com.fasterxml.jackson.annotation.JsonIgnore

import lombok.AllArgsConstructor
import lombok.NoArgsConstructor
import org.hibernate.annotations.NotFound
import org.hibernate.annotations.NotFoundAction


@Entity
class Lancamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    var descricao: String = ""

    var ano: Int? = null

    var mes: Int? = null

    var valor: Double? = null

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    var usuario: Usuario? = null

    @Enumerated(value = EnumType.STRING)
    var status: StatusLancamento? = null

    @Enumerated(value = EnumType.STRING)
    var tipo: TipoLancamento? = null

}