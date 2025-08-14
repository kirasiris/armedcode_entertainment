"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const Menu = ({
	title = "",
	logo = "https://www.fullstackpython.com/img/logos/bootstrap.png",
	canonical = "/",
}) => {
	const pathname = usePathname();
	const isActive = (path = "") => {
		return pathname === path ? "active" : "";
	};
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<div className="navbar-header">
					<Navbar.Toggle
						aria-controls="responsive-navbar-nav"
						className="me-1"
					/>
					<Link
						href={canonical}
						passHref
						className={`navbar-brand`}
						target="_blank"
						style={{ verticalAlign: "middle" }}
					>
						<Image
							alt={title}
							src={logo}
							width="150"
							height="40"
							className="d-inline-block align-text-top"
						/>
					</Link>
				</div>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav as="ul" className="me-auto">
						<li className="nav-item">
							<Link
								href={canonical}
								className={`nav-link ${isActive(canonical)}`}
							>
								Home
							</Link>
						</li>
						{/* <li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/api`,
									query: {},
								}}
								className={`nav-link ${isActive(`${canonical}/api`)}`}
							>
								
									
								
									API
								
							</Link>
						</li> */}
					</Nav>
					<Nav as="ul">
						<li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/about`,
									query: {},
								}}
								className={`nav-link ${isActive(`${canonical}/about`)}`}
							>
								About
							</Link>
						</li>
						<li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/blog`,
									query: {},
								}}
								className={`nav-link ${isActive(`${canonical}/blog`)}`}
							>
								Blog
							</Link>
						</li>
						<li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/theme`,
									query: {},
								}}
								className={`nav-link ${isActive(`${canonical}/theme`)}`}
							>
								Portfolio
							</Link>
						</li>
						<li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/review`,
									query: {},
								}}
								className={`nav-link ${isActive(`${canonical}/review`)}`}
							>
								Reviews
							</Link>
						</li>
						<li className="nav-item">
							<Link
								href={{
									pathname: `${canonical}/contact`,
									query: {},
								}}
								className={`nav-link ${isActive(`${canonical}/contact`)}`}
							>
								Contact
							</Link>
						</li>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Menu;
