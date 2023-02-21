const AddNameForm = ({ onFormSubmit, onNameChange, newName, onNumberChange, newNumber }) => {
    return (
        <form onSubmit={onFormSubmit}>
            <div>name: <input onChange={onNameChange} value={newName} /></div>
            <div>number: <input onChange={onNumberChange} value={newNumber} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default AddNameForm