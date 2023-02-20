const notificationStyles = {
    added: {
        color: "blue",
        background: "#f1f1ff",
        borderColor: "#d8d8ff"
    },
    modified: {
        color: "#427042",
        background: "#f0fff0",
        borderColor: "#bdcfa8"
    },
    deleted: {
        color: "#00423c",
        background: "#e3fbe4",
        borderColor: "#c9fd8c"
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