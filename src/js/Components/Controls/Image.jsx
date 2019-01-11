import l, { Div, Img, plugin_slug, prepareImageData, icons } from "../../utils";

const { isUndefined, castArray } = lodash;
const { __ } = wp.i18n;
const { MediaUpload } = wp.editor;
const { Component } = wp.element;
const { Button, BaseControl } = wp.components;
const { withState } = wp.compose;
const { apiFetch } = wp;

class Image extends Component {
	updateImageData = image_id => {
		const { setState } = this.props;
		const path = `wp/v2/media/${image_id}`;

		apiFetch({ path }).then(image_data_raw => {
			if (isUndefined(image_data_raw)) {
				// TODO: notice of not found images, option to remove.
				return;
			}

			let image_data;
			image_data = prepareImageData(castArray(image_data_raw), true);
			// The sorting of the elements from image_data_raw is not
			// the same as the one from the id, so we need to order it.
			const { url, alt } = image_data[0];

			setState({ url: url, alt: alt });
		});
	};

	componentDidMount = () => {
		const { updateImageData, props } = this;
		const { value: image_id } = props;

		if (image_id !== 0) {
			updateImageData(image_id);
		}
	};

	updateImage = image_data_raw => {
		const { updateValue, setState } = this.props;
		const image_data = prepareImageData(castArray(image_data_raw))[0];
		const { id, url, alt } = image_data;

		updateValue(id);
		setState({ url, alt });
	};

	removeImage = () => {
		let { updateValue, setState } = this.props;

		updateValue(0);
		setState({ url: "", alt: "" });
	};

	render() {
		const { updateImage, removeImage, props } = this;
		const { value: image_id, label, help, url, alt } = props;

		return (
			<BaseControl
				label={label}
				help={help}
				className={`${plugin_slug}-control-image`}
			>
				<MediaUpload
					onSelect={updateImage}
					allowedTypes={["image"]}
					value={image_id}
					render={({ open }) => (
						<Button onClick={open} isDefault>
							{__("Open Media Library")}
						</Button>
					)}
				/>
				{url !== "" && (
					<Div className={`${plugin_slug}-image-container`}>
						<Img
							className={`${plugin_slug}-image`}
							src={url}
							alt={alt}
						/>
						<Button
							className={`${plugin_slug}-image-remove`}
							onClick={removeImage}
						>
							{icons.remove}
						</Button>
					</Div>
				)}
			</BaseControl>
		);
	}
}

export default withState({ url: "", alt: "" })(Image);
