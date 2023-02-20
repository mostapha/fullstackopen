const NamesFilter = ({ onSearchChange, newSearch }) => {
    return <div>filter shown with: <input onChange={onSearchChange} value={newSearch} /></div>
}

export default NamesFilter