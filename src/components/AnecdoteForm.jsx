import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/requests'
import Notification from './Notification'

const AnecdoteForm = ({ setNotification }) => {
  const queryDataKey = ['anecdotes']
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(queryDataKey)
      queryClient.setQueryData(queryDataKey, anecdotes.concat(newAnecdote))
      setNotification(`Successfully created: '${newAnecdote.content}'`)
    },
    onError: (error) => {
      setNotification(`Error: ${error.response?.data?.error || 'Failed to create anecdote'}`)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <Notification/>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
