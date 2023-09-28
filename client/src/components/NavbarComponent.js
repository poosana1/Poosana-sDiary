import { Link, withRouter } from "react-router-dom"
import { getUser, logout } from "../services/authorize"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const NavbarComponent = ({ history }) => {

    return (
        <nav>
            <ul className="nav">
                <li className="nav-item icon-item pr-3 pt-3 pb-3">
                    <MoreHorizIcon />
                </li>
                <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to="/" className="nav-link">HOME</Link>
                </li>
                {
                    getUser() && (
                        <li className="nav-item pr-3 pt-3 pb-3">
                            <Link to="/create" className="nav-link">NEW NOTE</Link>
                        </li>
                    )
                }
                {!getUser() && (
                    <li className="nav-item pr-3 pt-3 pb-3">
                        <Link to="/login" className="nav-link">LOG IN</Link>
                    </li>
                )
                }
                {getUser() && (
                    <li className="nav-item pr-3 pt-3 pb-3">
                        <button className="nav-link" onClick={() => logout(() => history.push("/login"))}>SIGN OUT</button>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default withRouter(NavbarComponent)