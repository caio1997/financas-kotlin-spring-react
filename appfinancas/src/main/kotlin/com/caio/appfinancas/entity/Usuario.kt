package com.caio.appfinancas.entity

import com.fasterxml.jackson.annotation.JsonCreator
import javax.persistence.*

@Entity
class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    val nome: String = ""

    val email: String = ""

    val senha: String = ""

}