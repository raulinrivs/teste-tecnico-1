<template>
  <div>
    <form @submit.prevent>
      <input v-model="pessoa.nome" placeholder="Nome" />
      <input type="date" v-model="pessoa.data_nasc" />
      <input v-model="pessoa.cpf" placeholder="CPF" />
      <select v-model="pessoa.sexo">
        <option value="M">Masculino</option>
        <option value="F">Feminino</option>
      </select>
      <input v-model.number="pessoa.altura" placeholder="Altura (m)" />
      <input v-model.number="pessoa.peso" placeholder="Peso (kg)" />
    </form>

    <button @click="criarPessoa">Incluir</button>
    <button @click="alterarPessoa" :disabled="pessoas.length === 0">Alterar</button>
    <button @click="deletarPessoa" :disabled="pessoas.length === 0">Excluir</button>
    <button @click="buscarPessoas">Pesquisar</button>
    <button @click="calcularPesoIdeal" :disabled="!pessoa.id">Peso Ideal</button>

    <div v-if="pesoIdeal !== null">Peso Ideal: {{ pesoIdeal }} kg</div>

    <div>
      <h2>Lista de Pessoas</h2>
      <ul v-if="pessoas.length > 0">
        <li v-for="p in pessoas" :key="p.id">
          {{ p.nome }} - {{ p.cpf }} - {{ p.sexo }} - {{ p.data_nasc }} - {{ p.altura }} m -
          {{ p.peso }} kg
          <button @click="pessoa = { ...p }">Selecionar</button>
        </li>
      </ul>
      <p v-else>Nenhuma pessoa cadastrada.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pessoa } from '@/interfaces/core'
import { ref } from 'vue'
import {
  criarPessoa as criarPessoaRequest,
  buscarPessoa as buscarPessoaRequest,
  alterarPessoa as alterarPessoaRequest,
  deletarPessoa as deletarPessoaRequest,
  calcularPesoIdealPessoa as calcularPesoIdealRequest,
} from '@/services/http'

const pessoaReset: Pessoa = {
  nome: '',
  data_nasc: '',
  cpf: '',
  sexo: 'M',
  altura: 0,
  peso: 0,
  id: undefined,
}
const pessoa = ref<Pessoa>(pessoaReset)
const pessoas = ref<Pessoa[]>([])
const pesoIdeal = ref(null)

const criarPessoa = async () => {
  try {
    await criarPessoaRequest(pessoa.value)
    await buscarPessoas()
    pessoa.value = pessoaReset
  } catch (error) {
    console.error('Erro ao criar pessoa:', error)
  }
}
const buscarPessoas = async () => {
  try {
    const response = await buscarPessoaRequest()
    pessoas.value = response.data
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error)
  }
}
const alterarPessoa = async () => {
  try {
    await alterarPessoaRequest(pessoa.value)
    await buscarPessoas()
    pessoa.value = pessoaReset
  } catch (error) {
    console.error('Erro ao alterar pessoa:', error)
  }
}
const deletarPessoa = async () => {
  if (!pessoa.value.id) {
    console.error('ID da pessoa não está definido.')
    return
  }
  try {
    await deletarPessoaRequest(pessoa.value.id)
    await buscarPessoas()
    pessoa.value = pessoaReset
  } catch (error) {
    console.error('Erro ao deletar pessoa:', error)
  }
}
const calcularPesoIdeal = async () => {
  if (!pessoa.value.id) {
    console.error('ID da pessoa não está definido.')
    return
  }
  try {
    const response = await calcularPesoIdealRequest(pessoa.value.id)
    pesoIdeal.value = response.data.peso_ideal
  } catch (error) {
    console.error('Erro ao calcular peso ideal:', error)
  }
}
</script>
