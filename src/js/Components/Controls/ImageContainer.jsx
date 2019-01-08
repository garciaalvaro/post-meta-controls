import l, {
	plugin_slug,
	store_slug,
	getImageDataObject,
	Div
} from "../../utils";
import Image from "./Image";

const { isEmpty, castArray, map, get } = lodash;
const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { MediaUpload } = wp.editor;
const { Component } = wp.element;

class ImageContainer extends Component {
	renderHandler = ({ open }) => {
		const { id: setting_id, value: images_id, multiple } = this.props;

		if (isEmpty(images_id)) {
			//TODO: is images_id always an array?
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
		} else {
			return map(images_id, image_id => (
				<Image
					key={image_id}
					open={open}
					setting_id={setting_id}
					image_id={image_id}
					multiple={multiple}
				/>
			));
		}
	};

	onSelectHandler = image_data_raw => {
		image_data_raw = castArray(image_data_raw);
		const data = getImageDataObject(image_data_raw, false);

		this.props.updateValue(data);
	};

	render() {
		const { onSelectHandler, renderHandler } = this;
		const { value, multiple } = this.props;

		return (
			<Div className={`${plugin_slug}-control-image`}>
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
			data_key_with_prefix
		} = props;
		const { updateImageData, updateSettingValue } = dispatch(store_slug);
		const { editPost } = dispatch("core/editor");
		const save_meta =
			valid && data_type === "meta" && !isEmpty(data_key_with_prefix);

		return {
			updateValue: data => {
				let { value, image_data } = data;

				updateImageData(setting_id, image_data);
				updateSettingValue(setting_id, value);

				value = get(props, "multiple") === false ? value[0] : value;

				if (save_meta) {
					editPost({
						meta: { [data_key_with_prefix]: value }
					});
				}
			}
		};
	})
])(ImageContainer);
