import l, { store_slug, Div, Img } from "../../utils";

const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Button } = wp.components;

class Image extends Component {
	render() {
		const { removeImage, image_data } = this.props;
		l(image_data);
		const { url, alt } = image_data;

		return (
			<Div>
				<Button onClick={removeImage} isDefault>
					{__("Remove")}
				</Button>
				<Img src={url} alt={alt} />
			</Div>
		);
	}
}

export default Image;
// export default compose([
// 	withSelect((select, { setting_id, image_id }) => {
// 		const { getImageData } = select(store_slug);
// 		const image_data = getImageData(setting_id, image_id);

// 		return {
// 			...image_data
// 		};
// 	})
// ])(Image);
