"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import Link from "next/link";

const Footer = ({
	classList = "",
	styleList = {},
	canonical = process.env.NEXT_PUBLIC_WEBSITE_URL,
}) => {
	return (
		<footer
			className={`bg-black text-bg-dark py-5 border-top border-dark ${classList}`}
			style={styleList}
		>
			<div className="container">
				<div className="text-center text-secondary">
					<p>
						<button className="btn btn-light btn-sm" type="button">
							&lt;/&gt;
						</button>
						&nbsp;made&nbsp;with&nbsp;
						<button className="btn btn-light btn-sm" type="button">
							&#10084;
						</button>
						&nbsp;&#38;&nbsp;
						<button className="btn btn-light btn-sm" type="button">
							&#9749;
						</button>
					</p>
					<p>
						BY&nbsp;
						<a
							href={process.env.NEXT_PUBLIC_FOUNDER_WEBSITE_URL}
							className="btn btn-secondary btn-sm"
							target="_blank"
							rel="noreferrer noopener"
						>
							KEVIN&nbsp;URIEL
						</a>
					</p>
				</div>
			</div>
			<div className="container d-flex justify-content-between">
				<p className="text-secondary">
					© 2025 {process.env.NEXT_PUBLIC_WEBSITE_NAME}. All rights reserved.
				</p>
				<ul className="list-unstyled d-flex">
					<li className="me-3">
						<Link
							href={{
								pathname: `${canonical}/privacy-policy`,
								query: {},
							}}
							className="text-secondary text-decoration-underline"
						>
							Privacy Policy
						</Link>
					</li>
					<li>
						<Link
							href={{
								pathname: `${canonical}/terms-of-service`,
								query: {},
							}}
							className="text-secondary text-decoration-underline"
						>
							Terms of Service
						</Link>
					</li>
				</ul>
			</div>
			<ToastContainer />
		</footer>
	);
};

export default Footer;
