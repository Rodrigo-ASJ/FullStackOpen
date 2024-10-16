import Content from './Content'
import Header from './Header.jsx'
import Total from './Total.jsx'

const Course = ({course}) =>{
    return(
        <>
        <Header course={course.name}/>
        <Content exercises={course.parts}/>
        <Total array={course.parts} />
        </>
    )
}
export default Course