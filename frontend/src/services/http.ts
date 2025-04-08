import type { Pessoa } from '@/interfaces/core'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

async function criarPessoa(data: Pessoa) {
  try {
    const response = await axiosInstance.post('pessoas/', data)
    return response
  } catch (error: any) {
    return error.response.data
  }
}

async function buscarPessoa(params: Pessoa | null = null) {
  try {
    const response = await axiosInstance.get('pessoas/', {
      params: params,
    })
    return response
  } catch (error: any) {
    return error.response.data
  }
}

async function alterarPessoa(data: Pessoa) {
  try {
    const response = await axiosInstance.patch(`pessoas/${data.id}/`, data)
    return response
  } catch (error: any) {
    return error.response.data
  }
}

async function deletarPessoa(pessoaId: number) {
  try {
    const response = await axiosInstance.delete(`pessoas/${pessoaId}/`)
    return response
  } catch (error: any) {
    return error.response.data
  }
}

async function calcularPesoIdealPessoa(pessoaId: number) {
  try {
    const response = await axiosInstance.get(`pessoas/${pessoaId}/peso-ideal/`)
    return response
  } catch (error: any) {
    return error.response.data
  }
}

export { criarPessoa, buscarPessoa, alterarPessoa, deletarPessoa, calcularPesoIdealPessoa }
