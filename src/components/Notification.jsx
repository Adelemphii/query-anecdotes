import { useNotificationValue } from "../reducers/NotificationContext"

const Notification = () => {
  const message = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: message !== null ? '' : 'none'
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
