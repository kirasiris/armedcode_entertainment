"use client";

const Globalcontent = ({ children, classList = `col-lg-8` }) => {
	return <div className={`${classList}`}>{children}</div>;
};

export default Globalcontent;
