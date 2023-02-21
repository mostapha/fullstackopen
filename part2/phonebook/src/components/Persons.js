
const Persons = ({ people, deletePerson }) => {
    return (
        <ul>
            {people.map(person => (
                <li key={person.name}>
                    {person.name + " " + person.number} <button onClick={() => deletePerson(person)}>delete</button>
                </li>
            ))}
        </ul>
    )
}

export default Persons