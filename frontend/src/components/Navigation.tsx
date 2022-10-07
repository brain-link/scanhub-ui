import React from 'react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { version } from '../utils/version'

import {
    CNavbarBrand,
    CContainer,
    CNavbar,
    CCollapse,
    CNavbarNav,
    CNavItem,
    CNavLink,
    CNavbarToggler,
    CForm,
    CButton,
    CFooter
} from '@coreui/react'


export function Navigation() {

    const [activeElement, setActiveElement] = useState(0)

    const updateActiveElement = (id) => {
        setActiveElement(activeElement !== id ? id : -1)
    }

    return (
        <>
        <CNavbar colorScheme="light" expand="lg" className="bg-light">

            <CContainer fluid className='ms-4 me-4 align-middle'>

                <CNavbarBrand href="https://www.brain-link.de/" className='me-5'>
                    <img
                        src="https://brain-link.de/wp-content/uploads/2022/03/ScanHub.svg"
                        // src='https://avatars.githubusercontent.com/u/27105562?s=200&v=4'
                        alt=""
                        height="50"
                        className="d-inline-block align-top"
                    />
                </CNavbarBrand>

                <CContainer className='d-flex justify-content-between'>
                    <CNavbarNav>
                        <CNavItem>
                            <CNavLink to="/" component={Link} active={0 === activeElement} onClick={() => updateActiveElement(0)}>
                                Dashboard
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink to='/patients' component={Link} active={1 === activeElement} onClick={() => updateActiveElement(1)}>
                                Patients
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink to='/devices' component={Link} active={2 === activeElement} onClick={() => updateActiveElement(2)}>
                                Devices
                            </CNavLink>
                        </CNavItem>
                    </CNavbarNav>

                    <CNavbarNav>
                        <CNavItem>
                            <CNavLink href="#" disabled>V{version}</CNavLink>
                        </CNavItem>
                        <CForm className="container-fluid justify-content-start">
                            <CButton type="button" color="dark" variant="outline" className="me-2">
                                Logout
                            </CButton>
                        </CForm>
                    </CNavbarNav>
                </CContainer>

            </CContainer>
        </CNavbar>

        <main>
            <Outlet />
        </main>

        </>
    )
}
