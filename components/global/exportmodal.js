"use client";
import { Form } from "react-bootstrap";
import {
	EmailShareButton,
	FacebookShareButton,
	TwitterShareButton,
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
		<div className="card rounded-0 mb-3">
			<div className="card-header">Share</div>
			<div className="card-body bg-black text-bg-dark">
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
						object.title ? `beFree - ` + object.title : `beFree - ` + object._id
					}
				>
					<FacebookIcon size={iconSize} />
				</FacebookShareButton>
				<TwitterShareButton
					url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkToShare}`}
					title={
						object.title ? `beFree - ` + object.title : `beFree - ` + object._id
					}
				>
					<TwitterIcon size={iconSize} />
				</TwitterShareButton>
				<RedditShareButton
					url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkToShare}`}
					title={
						object.title ? `beFree - ` + object.title : `beFree - ` + object._id
					}
				>
					<RedditIcon size={iconSize} />
				</RedditShareButton>
				<WhatsappShareButton
					url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkToShare}`}
					title={
						object.title ? `beFree - ` + object.title : `beFree - ` + object._id
					}
				>
					<WhatsappIcon size={iconSize} />
				</WhatsappShareButton>
				<PinterestShareButton
					url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkToShare}`}
					title={
						object.title ? `beFree - ` + object.title : `beFree - ` + object._id
					}
				>
					<PinterestIcon size={iconSize} />
				</PinterestShareButton>
				<LinkedinShareButton
					url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkToShare}`}
					title={
						object.title ? `beFree - ` + object.title : `beFree - ` + object._id
					}
				>
					<LinkedinIcon size={iconSize} />
				</LinkedinShareButton>
				<TelegramShareButton
					url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkToShare}`}
					title={
						object.title ? `beFree - ` + object.title : `beFree - ` + object._id
					}
				>
					<TelegramIcon size={iconSize} />
				</TelegramShareButton>
			</div>
		</div>
	);
};

export default ExportModal;
