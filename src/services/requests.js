import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  console.log('fetching')
  return axios.get(baseUrl).then(response => response.data)
}

export const createAnecdote = newAnecdote => axios.post(baseUrl, newAnecdote).then(response => response.data)

export const updateAnecdote = updatedAnecdote => axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(response => response.data)