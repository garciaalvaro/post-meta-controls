import l, { store_slug, Div, Img } from "../../utils";

const { Component } = wp.element;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

class Image extends Component {
	render() {
		const { open, url, alt } = this.props;

		return (
			<Div>
				<Img onClick={open} src={url} alt={alt} />
			</Div>
		);
	}
}

export default compose([
	withSelect((select, { setting_id, image_id }) => {
		const { getImageData } = select(store_slug);
		const image_data = getImageData(setting_id, image_id);

		return {
			...image_data
		};
	})
])(Image);
