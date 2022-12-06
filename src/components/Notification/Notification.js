import './Notification.css'

const Notification = ({text, color}) => {

    return (
        <div className={`notification ${color}`}>
            <h2 className='notification_text'>{text}</h2>
        </div>
    )
}

export default Notification;