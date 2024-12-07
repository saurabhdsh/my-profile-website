import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from './styles/breakpoints';

const Navbar = () => (
  <Nav>
    <Logo>Saurabh Dubey</Logo>
    <Menu>
      <MenuItem><Link to="/">Home</Link></MenuItem>
      <MenuItem><Link to="/achievements">Achievements</Link></MenuItem>
      <MenuItem><Link to="/innovation">Innovation</Link></MenuItem>
      <MenuItem><Link to="/experience">Experience</Link></MenuItem>
      <MenuItem><Link to="/education">Education</Link></MenuItem>
      <MenuItem><Link to="/contact">Contact</Link></MenuItem>
    </Menu>
  </Nav>
);

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #F3F4F6;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  position: relative;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  color: #374151;
  font-weight: bold;
  letter-spacing: -0.02em;
  transition: color 0.3s ease;
  
  &:hover {
    color: rgb(16, 185, 129);
  }
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    margin-top: 1rem;
  }
`;

const MenuItem = styled.li`
  a {
    color: #4B5563;
    font-size: 1rem;
    text-decoration: none;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    
    @media (max-width: ${breakpoints.tablet}) {
      display: block;
      width: 100%;
      text-align: center;
      padding: 0.8rem;
    }
    
    &:hover {
      color: rgb(16, 185, 129);
      background: rgba(16, 185, 129, 0.1);
    }
  }
`;

export default Navbar;
