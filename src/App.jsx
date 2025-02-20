import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getAnecdotes, updateAnecdote } from './services/requests'
import { QueryClientProvider } from '@tanstack/react-query'

import { useNotificationDispatch } from './reducers/NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryDataKey = ['anecdotes']
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const updateNoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updated) => {
      const anecdotes = queryClient.getQueryData(queryDataKey)
      queryClient.setQueryData(queryDataKey, anecdotes.map(anecdote => anecdote.id === updated.id ? { ...updated } : anecdote))
    }
  })

  const result = useQuery({
    queryKey: queryDataKey,
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  if(result.isLoading) {
    return <div>Loading Data...</div>
  }

  if(result.isError) {
    return <div>{result.error.message}: Server inaccessible</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateNoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    setNotification(`Successfully voted for '${anecdote.content}'`)
  }

  const setNotification = (message) => {
    notificationDispatch({ type: 'SET', message })
    setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <QueryClientProvider client={queryClient}>
        <AnecdoteForm setNotification={setNotification}/>
      </QueryClientProvider>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
