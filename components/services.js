"use client";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";

const Services = () => {
	return (
		<section className="bg-black text-bg-dark py-5">
			<div className="container">
				<h2 className="text-center">OUR SERVICES</h2>
				<p className="text-center text-secondary">
					Expertise in both NFA transfers and software development.
				</p>
				<Tab.Container defaultActiveKey="nfatransfers">
					<Nav variant="pills" className="nav-justified bg-dark rounded mb-3">
						<Nav.Item>
							<Nav.Link
								eventKey="nfatransfers"
								className="my-nav-links text-bg-dark me-1"
							>
								NFA Transfers
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								eventKey="softwaredevelopment"
								className="my-nav-links text-bg-dark ms-1"
							>
								Software Development
							</Nav.Link>
						</Nav.Item>
					</Nav>
					<Tab.Content>
						<Tab.Pane eventKey="nfatransfers">
							<h3>
								<i aria-hidden className="fa-solid fa-pen fa-xs me-2" />
								NFA Transfer Services
							</h3>
							<p className="text-secondary">
								Professional handling of all your NFA item transfers
							</p>
							<div className="row">
								<div className="col">
									<h4>
										<i
											aria-hidden
											className="fa-regular fa-circle-check fa-xs me-2"
										/>
										Form 4 Transfers
									</h4>
									<p className="text-secondary">
										Individual and trust transfers for suppressors, SBRs, and
										more
									</p>
									<h4>
										<i
											aria-hidden
											className="fa-regular fa-circle-check fa-xs me-2"
										/>
										eForm Processing
									</h4>
									<p className="text-secondary">
										Digital submission for faster approval times
									</p>
								</div>
								<div className="col">
									<h4>
										<i
											aria-hidden
											className="fa-regular fa-circle-check fa-xs me-2"
										/>
										Form 3 Dealer Transfers
									</h4>
									<p className="text-secondary">
										Fast and efficient FFL to FFL transfers
									</p>
									<h4>
										<i
											aria-hidden
											className="fa-regular fa-circle-check fa-xs me-2"
										/>
										Trust Formation
									</h4>
									<p className="text-secondary">
										Assistance with NFA trust creation and management
									</p>
								</div>
							</div>
						</Tab.Pane>
						<Tab.Pane eventKey="softwaredevelopment">
							<h3>
								<i aria-hidden className="fa-solid fa-code fa-xs me-2" />
								Software Development
							</h3>
							<p className="text-secondary">
								Custom software solutions for your business needs
							</p>
							<div className="row">
								<div className="col">
									<h4>
										<i
											aria-hidden
											className="fa-regular fa-circle-check fa-xs me-2"
										/>
										Web Applications
									</h4>
									<p className="text-secondary">
										Responsive, modern web applications built with the latest
										technologies
									</p>
									<h4>
										<i
											aria-hidden
											className="fa-regular fa-circle-check fa-xs me-2"
										/>
										Database Solutions
									</h4>
									<p className="text-secondary">
										Efficient data storage and management systems
									</p>
								</div>
								<div className="col">
									<h4>
										<i
											aria-hidden
											className="fa-regular fa-circle-check fa-xs me-2"
										/>
										Mobile Development
									</h4>
									<p className="text-secondary">
										Native and cross-platform mobile applications
									</p>
									<h4>
										<i
											aria-hidden
											className="fa-regular fa-circle-check fa-xs me-2"
										/>
										Custom Integrations
									</h4>
									<p className="text-secondary">
										Connect your existing systems and streamline workflows
									</p>
								</div>
							</div>
						</Tab.Pane>
					</Tab.Content>
				</Tab.Container>
			</div>
		</section>
	);
};

export default Services;
