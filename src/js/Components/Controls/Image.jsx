import l, { plugin_slug, Div, Img, icons } from "../../utils";

const { isUndefined } = lodash;
const { __ } = wp.i18n;
const { Component } = wp.element;
const { Button } = wp.components;

class Image extends Component {
	render() {
		const { removeImage, image_data } = this.props;
		const { id, url, alt } = image_data;

		// TODO: This should appear if there was an error getting
		// the data from apiFetch
		if (isUndefined(url)) {
			return <Div className={`${plugin_slug}-image-placeholder`} />;
		}

		return (
			<Div className={`${plugin_slug}-image-container`}>
				<Img className={`${plugin_slug}-image`} src={url} alt={alt} />
				<Button
					className={`${plugin_slug}-image-remove`}
					onClick={() => removeImage(id)}
				>
					{icons.remove}
				</Button>
			</Div>
		);
	}
}

export default Image;
