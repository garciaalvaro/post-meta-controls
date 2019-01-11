import l from "./log";

const { reduce, get } = lodash;

const prepareImageData = (images_data_raw, from_rest_api = false) =>
	reduce(
		images_data_raw,
		(images_data, image_data_raw) => {
			const { id } = image_data_raw;
			let alt;
			let sizes;
			if (from_rest_api) {
				alt = get(image_data_raw, "alt_text");
				sizes = get(image_data_raw, "media_details.sizes");
			} else {
				alt = get(image_data_raw, "alt");
				sizes = get(image_data_raw, "sizes");
			}

			const image_size =
				sizes.medium_large ||
				sizes.medium ||
				sizes.large ||
				sizes.thumbnail;

			images_data.push({
				id,
				alt,
				url: from_rest_api ? image_size.source_url : image_size.url
			});

			return images_data;
		},
		[]
	);

export default prepareImageData;
