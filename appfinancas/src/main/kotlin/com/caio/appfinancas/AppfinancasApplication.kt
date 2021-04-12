package com.caio.appfinancas

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@SpringBootApplication
class AppfinancasApplication



	fun main(args: Array<String>) {
		runApplication<AppfinancasApplication>(*args)

	}

