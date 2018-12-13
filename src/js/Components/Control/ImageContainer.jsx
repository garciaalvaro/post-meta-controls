import l, { store_slug } from "../../utils";
import Div from "../Utils";
import Image from "./Image";
import withStoreConnection from "./_withStoreConnection";

const { isEmpty, isArray, isNil, map, reduce, forEach } = lodash;
const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { MediaUpload } = wp.editor;
const { Component } = wp.element;

class ImageContainer extends Component {
	renderHandler = ({ open }) => {
		const { id: setting_id, value } = this.props;

		if (value === 0 || (isArray(value) && isEmpty(value))) {
			return (
				<Div
					onClick={open}
					style={{
						height: 100,
						backgroundColor: "#fc0",
						width: "100%"
					}}
				/>
			);
		} else if (isArray(value)) {
			return map(value, image_id => (
				<Image
					key={image_id}
					open={open}
					setting_id={setting_id}
					image_id={image_id}
				/>
			));
		} else {
			return (
				<Image open={open} setting_id={setting_id} image_id={value} />
			);
		}
	};

	getImageDataObject = image_data => {
		const { sizes, id, alt } = image_data;
		const image_size =
			sizes.medium_large ||
			sizes.medium ||
			sizes.large ||
			sizes.thumbnail;

		if (isNil(image_size)) {
			return null;
		}

		return {
			id,
			url: image_size.url,
			alt: alt
		};
	};

	onSelectHandler = images => {
		const { getImageDataObject } = this;
		const { updateImageData } = this.props;
		let image_data = null;

		if (!isArray(images)) {
			image_data = getImageDataObject(images);
		} else {
			image_data = reduce(
				images,
				(result, image) => {
					result.push(getImageDataObject(image));
					return result;
				},
				[]
			);
		}
		l(image_data, isEmpty(image_data));
		if (!isEmpty(image_data)) {
			updateImageData(image_data);
		}
	};

	render() {
		const { onSelectHandler, renderHandler } = this;
		const { value, multiple } = this.props;

		return (
			<Div id="icp-media-container">
				<MediaUpload
					onSelect={onSelectHandler}
					type="image"
					value={value}
					multiple={multiple}
					render={renderHandler}
				/>
			</Div>
		);
	}
}

export default compose([
	withDispatch((dispatch, props) => {
		const {
			id: setting_id,
			valid,
			data_type,
			data_key_with_prefix,
			multiple
		} = props;
		const { updateImageData } = dispatch(store_slug);
		const { editPost } = dispatch("core/editor");
		const should_save_meta =
			valid && data_type === "meta" && !isEmpty(data_key_with_prefix);

		return {
			updateImageData: data => {
				let value;
				let image_data;

				if (multiple) {
					value = [];
					image_data = [];

					forEach(data, image => {
						const { id: image_id, url, alt } = image;
						value = [...value, image_id];
						image_data = [
							...image_data,
							{ id: image_id, url, alt }
						];
					});
				} else {
					const { id: image_id, url, alt } = data;

					value = image_id;
					image_data = { url, alt };
				}

				updateImageData(setting_id, value, image_data);

				if (should_save_meta) {
					editPost({
						meta: { [data_key_with_prefix]: value }
					});
				}
			}
		};
	})
])(ImageContainer);
