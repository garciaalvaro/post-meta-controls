import l, { plugin_slug, store_slug, prepareImageData, Div } from "../../utils";
import Image from "./Image";
import {
	SortableContainer,
	SortableElement,
	arrayMove
} from "react-sortable-hoc";

const { isEmpty, castArray, pull, get } = lodash;
const { __ } = wp.i18n;
const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { MediaUpload } = wp.editor;
const { Component } = wp.element;
const { Button } = wp.components;

const SortableItem = SortableElement(({ value, custom }) => (
	<li>
		<Image
			image_data={value}
			removeImage={custom.removeImage}
			setting_id={custom.setting_id}
			multiple={custom.multiple}
		/>
	</li>
));

const SortableList = SortableContainer(({ items, custom }) => (
	<ul>
		{items.map((image_data, index) => (
			<SortableItem
				key={`item-${index}`}
				index={index}
				value={image_data}
				custom={custom}
			/>
		))}
	</ul>
));

class ImageContainer extends Component {
	onSortEnd = ({ oldIndex, newIndex }) => {
		let { value: images_id, updateValue } = this.props;

		images_id = arrayMove(images_id, oldIndex, newIndex);

		updateValue(images_id);
	};

	updateImages = image_data_raw => {
		image_data_raw = castArray(image_data_raw);
		const image_data = prepareImageData(image_data_raw, false);

		this.props.updateValue(image_data);
	};

	removeImage = image_id => {
		let { value: images_id, updateValue } = this.props;

		images_id = pull(images_id, { id: image_id });

		updateValue(images_id);
	};

	render() {
		const { updateImages, removeImage, onSortEnd } = this;
		const { value, multiple, setting_id } = this.props;
		l(value);
		return (
			<Div className={`${plugin_slug}-control-image`}>
				<MediaUpload
					onSelect={updateImages}
					allowedTypes={["image"]}
					value={value}
					multiple={multiple}
					render={({ open }) => (
						<Button onClick={open} isDefault>
							{__("Open Media Library")}
						</Button>
					)}
				/>
				<SortableList
					items={value}
					onSortEnd={onSortEnd}
					custom={{ removeImage, setting_id, multiple }}
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
