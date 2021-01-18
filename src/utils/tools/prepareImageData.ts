export const prepareImageDataFromMedia = (
	images_raw: ImageFromMedia[]
): Image[] =>
	images_raw.reduce<Image[]>((data, image_raw) => {
		const { id, alt, sizes } = image_raw;

		const { url } =
			sizes.medium_large ||
			sizes.medium ||
			sizes.large ||
			sizes.thumbnail ||
			sizes.full;

		return data.concat({
			id,
			alt,
			url,
		});
	}, []);

export const prepareImageDataFromRest = (
	images_raw: ImageFromRest[]
): Image[] =>
	images_raw.reduce<Image[]>((data, image_raw) => {
		const {
			id,
			alt_text: alt,
			media_details: { sizes },
		} = image_raw;

		const { source_url } =
			sizes.medium_large ||
			sizes.medium ||
			sizes.large ||
			sizes.thumbnail ||
			sizes.full ||
			image_raw;

		return data.concat({
			id,
			alt,
			url: source_url,
		});
	}, []);
