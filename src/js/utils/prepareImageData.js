import l from "./log";

const { mapValues, includes, isUndefined } = lodash;

const prepareImageData = (multiple, images_data) => {
	// res

	if (multiple) {
		value = [];
		image_data = [];

		forEach(images_data, image => {
			const { id: image_id, url, alt } = image;
			value = [...value, image_id];
			image_data = [...image_data, { id: image_id, url, alt }];
		});
	} else {
		const { id: image_id, url, alt } = images_data;

		value = image_id;
		image_data = { url, alt };
	}
};

export default prepareImageData;
