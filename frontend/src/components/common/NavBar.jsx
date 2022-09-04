import "./NavBar.css"

const NavBar = ({navItemList}) => {
    const navItems = navItemList.map((item) => <a className="navbar-item" href={item.link}>{item.text}</a>)
    return (<div className="navbar">{navItems}</div>)
}
export default NavBar