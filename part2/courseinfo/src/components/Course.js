const Header = (props) => {
    return <h1>{props.course}</h1>
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Content = (props) => {
    console.log('Content props', props);
    const parts = props.parts

    return (
        <div>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </div>
    )
}

const Total = (props) => {
    const parts = props.parts
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return <b>total of {total} exercises</b>
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course