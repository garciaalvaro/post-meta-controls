import l, { store_slug } from "../../utils";
import Div, { Img } from "../Utils/_Html";

const { Component, Fragment, createRef } = wp.element;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

class Image extends Component {
	render() {
		l(this.props);
		const { open, image_data } = this.props;
		const { url, alt } = image_data;

		return (
			<Div id="icp-image-container">
				<Img onClick={open} src={url} alt={alt} />
			</Div>
		);
	}
}

export default compose([
	withSelect((select, { setting_id, image_id }) => {
		const { getImageData } = select(store_slug);

		return {
			image_data: getImageData(setting_id, image_id)
		};
	})
])(Image);
