import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => {
    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Reto-Front-End</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Lista de Paquetes</Nav.Link>
                            <Nav.Link href="/nuevo">Nuevo Paquete</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="https://github.com/AlejoWally666/reto-front-end" target="_blank">GitHub.front-end</Nav.Link>
                            <Nav.Link href="https://github.com/AlejoWally666/reto-back-end" target="_blank">GitHub.back-end</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}

export default Navigation;