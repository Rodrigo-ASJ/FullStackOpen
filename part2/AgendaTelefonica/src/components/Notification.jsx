const Notification = ({ note }) => {
const { message, status} = note
if(message === null ){ return null }
  return (
    <div className={status}>
        { message }
    </div>
  )
}

export default Notification