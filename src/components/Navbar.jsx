import { Link } from "react-router-dom"

function Navbar(){
return(

<nav>

<h2>ATSS College</h2>

<Link to="/">Home</Link>
<Link to="/about">About ATSS</Link>
<Link to="/courses">Courses</Link>
<Link to="/contact">Contact</Link>
<Link to="/login">LMS Login</Link>
<Link to="/register">Register</Link>

</nav>

)
}

export default Navbar