"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { fetchurl } from "@/helpers/fetchurl";
import JsonResponses from "@/components/global/jsonresponses";

const CreateForm = ({ apitoken = "" }) => {
	const [rawFormData, setRawFormData] = useState({
		manufacturer: ``,
		title: ``,
		type: ``,
		caliber: ``,
		serialNumber: ``,
		nfaClassification: ``,
		text: ``,
		files: [""],
	});

	const [btnText, setBtnText] = useState("Submit");
	const {
		manufacturer,
		title,
		type,
		caliber,
		serialNumber,
		nfaClassification,
		text,
		files,
	} = rawFormData;

	const [weaponData, setWeaponData] = useState({});

	const handleAddFile = () => {
		setRawFormData({
			...rawFormData,
			files: [...files, ""],
		});
	};

	const handleRemoveFile = (index) => {
		const newFiles = files.filter((_, i) => i !== index);
		setRawFormData({
			...rawFormData,
			files: newFiles,
		});
	};

	const handleChange = (index, value) => {
		const newFiles = [...files];
		newFiles[index] = value;
		setRawFormData({
			...rawFormData,
			files: newFiles,
		});
	};

	const createWeapon = async (e) => {
		e.preventDefault();
		setBtnText(`Processing...`);
		const res = await fetchurl(
			`/protected/weapons`,
			"POST",
			"no-cache",
			rawFormData
		);
		if (res.status === "error") {
			toast.error(res.message, "bottom");
			setBtnText("Submit");
			return;
		}
		if (res.status === "fail") {
			toast.error(res.message, "bottom");
			setBtnText("Submit");
			return;
		}
		setWeaponData(res);
		setBtnText("Submit");
		toast.success("Weapon created", "bottom");
		resetForm();
	};

	const resetForm = () => {
		setRawFormData({
			manufacturer: ``,
			title: ``,
			type: ``,
			caliber: ``,
			serialNumber: ``,
			nfaClassification: ``,
			text: ``,
			files: [""],
		});
	};

	return (
		<div className="row">
			<div className="col-lg-6">
				<form onSubmit={createWeapon}>
					<label htmlFor="manufacturer" className="form-label">
						Manufacturer
					</label>
					<input
						id="manufacturer"
						name="manufacturer"
						value={manufacturer}
						onChange={(e) => {
							setRawFormData({
								...rawFormData,
								manufacturer: e.target.value,
							});
						}}
						type="text"
						className="form-control text-bg-dark mb-3"
						required
						placeholder="Ruger"
					/>
					<label htmlFor="title" className="form-label">
						Model
					</label>
					<input
						id="title"
						name="title"
						value={title}
						onChange={(e) => {
							setRawFormData({
								...rawFormData,
								title: e.target.value,
							});
						}}
						type="text"
						className="form-control text-bg-dark mb-3"
						required
						placeholder="M4A1"
					/>
					<label htmlFor="type" className="form-label">
						Type
					</label>
					<select
						id="type"
						name="type"
						value={type}
						onChange={(e) => {
							setRawFormData({
								...rawFormData,
								type: e.target.value,
							});
						}}
						className="form-control text-bg-dark mb-3"
						required
					>
						<option value="none">Choose an option</option>
						<option value="rifle">Rifle</option>
						<option value="shotgun">Shotgun</option>
						<option value="pistol">Pistol</option>
						<option value="supressor">Supressor</option>
						<option value="short-barrel-rifle">Short Barrel Rifle</option>
						<option value="short-barrel-shotgun">Short Barrel Shotgun</option>
						<option value="any-other-weapon">Any Other Weapon</option>
						<option value="destructive-device">Destructive Device</option>
						<option value="machine-gun">Machine Gun</option>
					</select>
					<label htmlFor="caliber" className="form-label">
						Caliber
					</label>
					<input
						id="caliber"
						name="caliber"
						value={caliber}
						onChange={(e) => {
							setRawFormData({
								...rawFormData,
								caliber: e.target.value,
							});
						}}
						type="text"
						className="form-control text-bg-dark mb-3"
						required
						placeholder="5.56x45mm NATO"
					/>
					<label htmlFor="serialNumber" className="form-label">
						Serial Number
					</label>
					<input
						id="serialNumber"
						name="serialNumber"
						value={serialNumber}
						onChange={(e) => {
							setRawFormData({
								...rawFormData,
								serialNumber: e.target.value,
							});
						}}
						type="text"
						className="form-control text-bg-dark mb-3"
						placeholder="COL123456"
					/>
					<label htmlFor="nfaClassification" className="form-label">
						NFA Classification
					</label>
					<select
						id="nfaClassification"
						name="nfaClassification"
						value={nfaClassification}
						onChange={(e) => {
							setRawFormData({
								...rawFormData,
								nfaClassification: e.target.value,
							});
						}}
						className="form-control text-bg-dark mb-3"
						required
					>
						<option value="none">Choose an option</option>
						<option value="short-barrel-rifle">Short Barrel Rifle</option>
						<option value="short-barrel-shotgun">Short Barrel Shotgun</option>
						<option value="supressor">Supressor</option>
						<option value="any-other-weapon">Any Other Weapon</option>
						<option value="destructive-device">Destructive Device</option>
						<option value="machine-gun">Machine Gun</option>
					</select>
					<label htmlFor="files" className="form-label">
						Files (File URLs)
					</label>
					{files.map((file, index) => (
						<div key={index} className="d-flex mb-3">
							<input
								id={`file-${index}`}
								name="files[]"
								value={file}
								onChange={(e) => handleChange(index, e.target.value)}
								type="text"
								className="form-control text-bg-dark me-2"
								placeholder="Enter file URL"
							/>
							<button
								type="button"
								className="btn btn-danger"
								onClick={() => handleRemoveFile(index)}
								disabled={files.length === 1}
							>
								Remove
							</button>
						</div>
					))}
					<button
						type="button"
						className="btn btn-dark mb-3 w-100"
						onClick={handleAddFile}
					>
						Add File
					</button>
					<label htmlFor="text" className="form-label">
						Message
					</label>
					<textarea
						id="text"
						name="text"
						value={text}
						onChange={(e) => {
							setRawFormData({
								...rawFormData,
								text: e.target.value,
							});
						}}
						className="form-control text-bg-dark mb-3"
						required
						placeholder={`Here goes the message`}
						rows="3"
					/>
					<button type="submit" className="btn btn-light btn-sm float-start">
						{btnText}
					</button>
					<button
						type="reset"
						onClick={resetForm}
						className="btn btn-light btn-sm float-end"
					>
						Reset
					</button>
				</form>
			</div>
			<div className="col-lg-6">
				<p>API Reference</p>
				<div className="bg-dark p-4 mb-3 rounded">
					<h6>
						<span className="badge rounded-pill text-bg-light me-2">POST</span>
						/v1/weapons
					</h6>
					<p className="text-secondary">
						Creates a new weapon record in your collection.
					</p>
					<div className="d-flex gap-2">
						<JsonResponses
							text={`fetch('${
								process.env.NEXT_PUBLIC_API_URL
							}/protected/weapons', {
  method: "POST",
  headers: {
    'armed_code_sk': '${apitoken || "12345abcdef67890"}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    manufacturer: ${manufacturer},
    model: ${title},
    type: ${type},
    caliber: ${caliber},
    serialNumber: ${serialNumber},
    nfaClassification: ${nfaClassification},
    files: [${files}],
    notes: ${text}
  })
})`}
						/>
					</div>
				</div>
				<div className="bg-dark p-4 rounded">
					<h6>Response</h6>
					<div className="d-flex gap-2">
						<JsonResponses
							text={`{
  "success": ${weaponData?.success || true},
  "data": {
    "id": ${weaponData?.data?._id || 1},
    "manufacturer": ${weaponData?.data?.manufacturer || "Colt"},
    "model": ${weaponData?.data?.title || "M4A1"},
    "type": ${weaponData?.data?.type || "Rifle"},
    "caliber": ${weaponData?.data?.caliber || "5.56x45mm NATO"},
    "serialNumber": ${weaponData?.data?.serialNumber || "COL123456"},
    "nfaClassification": ${weaponData?.data?.nfaClassification},
    "files": ${weaponData?.data?.files},
    "notes": ${
			weaponData?.data?.text ||
			'Yada yada14.5" barrel with pinned and welded flash hider'
		},
    "createdAt": ${weaponData?.data?.createAt || "2025-03-14T00:18:29.577Z"},
    "updatedAt": ${weaponData?.data?.updatedAt || "2025-03-14T00:18:29.577Z"}
  }
}`}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateForm;
