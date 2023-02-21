const notificationStyles = {
    success: {
        color: "#00423c",
        background: "#e3fbe4",
        borderColor: "#c9fd8c"
    },
    error: {
        color: "#930000",
        background: "#ffecec",
        borderColor: "#bb0d00"
    }
}

const Notification = ({ notification }) => {
    const notificationStyle = {
        padding: "10px",
        margin: "10px 0px",
        border: "2px solid #dbdbdb",
        ...notificationStyles[notification.type]
    }

    return <div style={notificationStyle}>{notification.text}</div>
}

const NamesFilter = ({ onSearchChange, newSearch, notification }) => {
    return (
        <>
            {notification !== undefined ? <Notification notification={notification} /> : ''}
            <div>filter shown with: <input onChange={onSearchChange} value={newSearch} /></div>
        </>
    )
}

export default NamesFilter