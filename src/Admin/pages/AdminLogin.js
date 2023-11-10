import { Link } from "react-router-dom";
const AdminLogin =  () => {
    return (
        <center>
            <h2>Admin Login Page</h2>
            <table border={1}>
                <tr>
                    <td>Email :- </td>
                    <td><input type="text" name="email"/></td>
                </tr>
                <tr>
                    <td>Password :- </td>
                    <td><input type="text" name="password"/></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="button" value="submit"/></td>
                </tr>
            </table>
            <Link to='/admin/register'>Register</Link>
        </center>
    )
}

export default AdminLogin;