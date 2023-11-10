import { Link } from "react-router-dom"
const AdminNavbar = () => {
    return (
        <>
            <Link to='/admin/product'>Product</Link>
            <Link to='/admin/category'>Category</Link>

        </>
    )
}

export default AdminNavbar