"use client";
import Image from "next/image";
import { Carousel } from "react-bootstrap";
import ParseHtml from "./parseHtml";

const FeaturedCarousel = ({ objects = [] }) => {
	return (
		<section className="bg-dark text-bg-dark">
			<Carousel slide={false}>
				{objects?.map((object, index) => (
					<Carousel.Item key={object?._id} className={`${index + 1}`}>
						<Image
							src={object?.files?.cover?.location?.secure_location}
							width="1920"
							height="1080"
							className="d-block w-100"
							alt=""
						/>
						<Carousel.Caption>
							<h3>{object?.title}</h3>
							<ParseHtml text={object?.excerpt} />
						</Carousel.Caption>
					</Carousel.Item>
				))}
			</Carousel>
		</section>
	);
};

export default FeaturedCarousel;
