"use client";
import { useCallback, useEffect, useRef, useState } from "react";
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
	const [copiedUrl, setCopiedUrl] = useState(false);
	const [copiedEmbed, setCopiedEmbed] = useState(false);
	const timeoutRef = useRef(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const copyToClipboard = useCallback((text) => {
		navigator.clipboard.writeText(text);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setCopiedUrl(true);
		timeoutRef.current = setTimeout(() => setCopiedUrl(false), 2000);
	}, []);

	const presentationUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${linkToShare}`;

	return (
		<div className="card bg-black text-bg-dark rounded-0 mb-3">
			<div className="card-header">Share</div>
			<div className="card-body bg-dark">
				<div className="input-group">
					<Form.Control readOnly disabled value={presentationUrl} />
					<button
						className={`btn ${copiedUrl ? "btn-success" : "btn-secondary"}`}
						onClick={() => copyToClipboard(presentationUrl)}
					>
						{copiedUrl ? "Copied!" : "Copy"}
					</button>
				</div>
				<hr />
				<EmailShareButton subject={object?.title} body={object?.text}>
					<EmailIcon size={iconSize} />
				</EmailShareButton>
				<FacebookShareButton
					url={presentationUrl}
					title={
						object.title
							? `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object.title
							: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object._id
					}
				>
					<FacebookIcon size={iconSize} />
				</FacebookShareButton>
				<XShareButton
					url={presentationUrl}
					title={
						object.title
							? `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object.title
							: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object._id
					}
				>
					<TwitterIcon size={iconSize} />
				</XShareButton>
				<RedditShareButton
					url={presentationUrl}
					title={
						object.title
							? `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object.title
							: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object._id
					}
				>
					<RedditIcon size={iconSize} />
				</RedditShareButton>
				<WhatsappShareButton
					url={presentationUrl}
					title={
						object.title
							? `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object.title
							: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object._id
					}
				>
					<WhatsappIcon size={iconSize} />
				</WhatsappShareButton>
				<PinterestShareButton
					url={presentationUrl}
					title={
						object.title
							? `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object.title
							: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object._id
					}
				>
					<PinterestIcon size={iconSize} />
				</PinterestShareButton>
				<LinkedinShareButton
					url={presentationUrl}
					title={
						object.title
							? `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object.title
							: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} - ` + object._id
					}
				>
					<LinkedinIcon size={iconSize} />
				</LinkedinShareButton>
				<TelegramShareButton
					url={presentationUrl}
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
