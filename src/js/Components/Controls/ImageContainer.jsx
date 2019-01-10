import l, { plugin_slug, Div, prepareImageData } from "../../utils";
import Image from "./Image";
import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const { isUndefined, isArray, isEmpty, find, castArray, pull } = lodash;
const { __ } = wp.i18n;
const { MediaUpload } = wp.editor;
const { Component } = wp.element;
const { Button } = wp.components;
const { withState } = wp.compose;
const { apiFetch } = wp;

const SortableItem = SortableElement(({ value, custom }) => {
	return (
		<Image
			image_data={value}
			removeImage={custom.removeImage}
			setting_id={custom.setting_id}
			multiple={custom.multiple}
		/>
	);
});

const SortableList = SortableContainer(({ items, custom }) => {
	return (
		<Div className={`${plugin_slug}-images-container`}>
			{items.map((value, index) => (
				<SortableItem
					key={`item-${index}`}
					index={index}
					value={value}
					custom={custom}
				/>
			))}
		</Div>
	);
});

class ImageContainer extends Component {
	updateImagesData = images_id => {
		const { setState } = this.props;
		const images_id_list = castArray(images_id).join(",");

		const path = `wp/v2/media/?include=${images_id_list}`;

		apiFetch({ path }).then(images_data_raw => {
			if (isUndefined(images_data_raw)) {
				// TODO: notice of not found images, option to remove.
				return;
			}

			let images_data;
			images_data = prepareImageData(images_data_raw, true);
			// The sorting of the elements from images_data_raw is not
			// the same as the one from the id, so we need to order it.
			images_data = images_id.map(id => find(images_data, { id: id }));

			setState({ images_data });
		});
	};

	componentDidMount = () => {
		const { updateImagesData, props } = this;
		const { value } = props;

		updateImagesData(value);
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		let {
			value: images_id,
			images_data,
			updateValue,
			setState
		} = this.props;

		images_id = arrayMove(images_id, oldIndex, newIndex);
		images_data = arrayMove(images_data, oldIndex, newIndex);

		updateValue(images_id);
		setState({ images_data });
	};

	updateImagesId = image_data_raw => {
		const { updateImagesData, props } = this;
		const { updateValue } = props;
		let images_id;

		images_id = castArray(image_data_raw).map(({ id }) => id);
		images_id = isArray(image_data_raw) ? images_id : images_id[0];

		updateValue(images_id);
		updateImagesData(images_id);
	};

	removeImage = image_id => {
		let {
			value: images_id,
			images_data,
			updateValue,
			setState
		} = this.props;

		images_id = pull(images_id, image_id);
		images_data = pull(images_data, find(images_data, { id: image_id })); // TODO: improve

		updateValue(images_id);
		setState({ images_data });
	};

	getImagesComponent = () => {
		const { removeImage, onSortEnd, props } = this;
		let { value: images_id, images_data, setting_id, multiple } = props;

		images_id = castArray(images_id);
		images_data = castArray(images_data);

		if (
			isEmpty(images_id) ||
			images_id[0] === 0 ||
			isUndefined(images_data[0])
		) {
			return null;
		}

		if (images_id.length === 1) {
			return (
				<Image
					image_data={images_data[0]}
					removeImage={removeImage}
					setting_id={setting_id}
					multiple={multiple}
				/>
			);
		}

		return (
			<SortableList
				distance={3} // Needed so clicks can be triggered
				helperClass={`${plugin_slug}-dragging_image`}
				items={images_data}
				onSortEnd={onSortEnd}
				custom={{ removeImage, setting_id, multiple }}
			/>
		);
	};

	render() {
		const { updateImagesId, getImagesComponent } = this;
		const { value: images_id, multiple } = this.props;

		return (
			<Div className={`${plugin_slug}-control-image`}>
				<MediaUpload
					onSelect={updateImagesId}
					allowedTypes={["image"]}
					value={images_id}
					multiple={multiple}
					render={({ open }) => (
						<Button onClick={open} isDefault>
							{__("Open Media Library")}
						</Button>
					)}
				/>
				{getImagesComponent()}
			</Div>
		);
	}
}

export default withState({ images_data: [] })(ImageContainer);
