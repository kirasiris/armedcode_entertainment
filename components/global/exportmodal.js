"use client";
import { Form } from "react-bootstrap";
import {
	EmailShareButton,
	FacebookShareButton,
	XShareButton,
	RedditShareButton,
	WhatsappShareButton,
	PinterestShareButton,
	LinkedinShareButton,
	TelegramShareButton,
	EmailIcon,
	FacebookIcon,
	TwitterIcon,
	RedditIcon,
	WhatsappIcon,
	PinterestIcon,
	LinkedinIcon,
	TelegramIcon,
} from "react-share";

const ExportModal = ({
	object = {},
	linkToShare = process.env.NEXT_PUBLIC_WEBSITE_URL,
	iconSize = "45",
}) => {
	return (
		<div className="card bg-black text-bg-dark rounded-0 mb-3">
			<div className="card-header">Share</div>
			<div className="card-body bg-dark">
				<Form.Control
					readOnly
					disabled
					value={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkToShare}`}
				/>
				<hr />
				<EmailShareButton subject={object?.title} body={object?.text}>
					<EmailIcon size={iconSize} />
				</EmailShareButton>
				<FacebookShareButton
					url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkToShare}`}
					title={
						object.title
							? `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object.title
							: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object._id
					}
				>
					<FacebookIcon size={iconSize} />
				</FacebookShareButton>
				<XShareButton
					url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkToShare}`}
					title={
						object.title
							? `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object.title
							: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object._id
					}
				>
					<TwitterIcon size={iconSize} />
				</XShareButton>
				<RedditShareButton
					url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkToShare}`}
					title={
						object.title
							? `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object.title
							: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object._id
					}
				>
					<RedditIcon size={iconSize} />
				</RedditShareButton>
				<WhatsappShareButton
					url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkToShare}`}
					title={
						object.title
							? `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object.title
							: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object._id
					}
				>
					<WhatsappIcon size={iconSize} />
				</WhatsappShareButton>
				<PinterestShareButton
					url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkToShare}`}
					title={
						object.title
							? `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object.title
							: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object._id
					}
				>
					<PinterestIcon size={iconSize} />
				</PinterestShareButton>
				<LinkedinShareButton
					url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkToShare}`}
					title={
						object.title
							? `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object.title
							: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object._id
					}
				>
					<LinkedinIcon size={iconSize} />
				</LinkedinShareButton>
				<TelegramShareButton
					url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkToShare}`}
					title={
						object.title
							? `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object.title
							: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object._id
					}
				>
					<TelegramIcon size={iconSize} />
				</TelegramShareButton>
			</div>
		</div>
	);
};

export default ExportModal;
