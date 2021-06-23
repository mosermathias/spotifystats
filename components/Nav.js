import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function NavComponent(){
    return (
        <>
        
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="#home">SpotifyStats</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                   
                    </Nav>
                    <Nav>
                    <Nav.Link href="/toptracks">Your top tracks</Nav.Link>
                    <Nav.Link href="/topartists">Yout top artists</Nav.Link>
                    <Nav.Link href="/personal">Personal</Nav.Link>
                    <Nav.Link href="/song">Specific Song</Nav.Link>
                    <Nav.Link href="/song">Specific Artist</Nav.Link>
                    <Nav.Link href="/logout">LogOut</Nav.Link>
                        </Nav>
                
                </Navbar.Collapse>
                </Navbar>
        </>
    )
}