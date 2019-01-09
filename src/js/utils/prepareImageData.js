import l from "./log";

const { reduce, get } = lodash;

const prepareImageData = (image_data_raw, from_rest_api) =>
	reduce(
		image_data_raw,
		(data, image_data_raw_this) => {
			const { id } = image_data_raw_this;
			let alt;
			let sizes;
			if (from_rest_api) {
				alt = get(image_data_raw_this, "alt_text");
				sizes = get(image_data_raw_this, "media_details.sizes");
			} else {
				alt = get(image_data_raw_this, "alt");
				sizes = get(image_data_raw_this, "sizes");
			}

			const image_size =
				sizes.medium_large ||
				sizes.medium ||
				sizes.large ||
				sizes.thumbnail;

			data.value.push(id);
			data.image_data.push({
				id,
				alt,
				url: from_rest_api ? image_size.source_url : image_size.url
			});

			return data;
		},
		{ value: [], image_data: [] }
	);

export default prepareImageData;
