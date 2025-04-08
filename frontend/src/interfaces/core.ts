export interface Pessoa {
  id?: number
  nome: string
  data_nasc: string
  cpf: string
  sexo: 'M' | 'F'
  altura: number
  peso: number
}

export interface PesoIdealResponse {
  pesoIdeal: number
}
