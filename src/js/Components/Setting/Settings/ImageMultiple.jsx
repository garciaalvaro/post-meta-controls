import l, {
	Div,
	Img,
	plugin_slug,
	prepareImageData,
	icons
} from "../../../utils";
import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const {
	isUndefined,
	isEmpty,
	isFinite,
	find,
	forEach,
	castArray,
	pull,
	compact
} = lodash;
const { __ } = wp.i18n;
const { MediaUpload } = wp.editor;
const { Component } = wp.element;
const { Button, BaseControl } = wp.components;
const { withState } = wp.compose;
const { apiFetch } = wp;

const SortableItem = SortableElement(({ value, custom }) => {
	const { removeImage } = custom;

	// If the image id was not found in the library we display a message
	// inside a div with the option to remove it.
	if (isFinite(value)) {
		return (
			<Div className={`${plugin_slug}-image-container`}>
				<Div
					className={`${plugin_slug}-image-not_found `}
				>{`Image with id ${value} was not found`}</Div>
				<Button
					className={`${plugin_slug}-image-remove`}
					onClick={() => removeImage(value)}
				>
					{icons.remove}
				</Button>
			</Div>
		);
	}

	const { id, url, alt } = value;

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
				setState({ images_data: images_id });
				return;
			}

			let images_data;
			images_data = prepareImageData(castArray(images_data_raw), true);
			// The sorting of the elements from images_data_raw is not
			// the same as the one from the id, so we need to order it.
			images_data = images_id.map(id => {
				const image_data = find(images_data, { id: id });
				if (!isUndefined(image_data)) {
					return image_data;
				}

				return id;
			});
			images_data = compact(images_data);

			setState({ images_data });
		});
	};

	componentDidMount = () => {
		const { updateImagesData, props } = this;
		const { value: images_id } = props;

		if (!isEmpty(images_id)) {
			updateImagesData(images_id);
		}
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

	updateImages = images_data_raw => {
		const { updateValue, setState } = this.props;
		const images_data = prepareImageData(castArray(images_data_raw));
		const images_id = images_data.map(({ id }) => id);

		updateValue(images_id);
		setState({ images_data });
	};

	removeImage = image_id => {
		let {
			value: images_id,
			images_data,
			updateValue,
			setState
		} = this.props;
		const images_data_clean = [];

		images_id = pull(images_id, image_id);

		forEach(images_data, image_data => {
			if (
				image_data === image_id ||
				(!isFinite(image_data) && image_data.id === image_id)
			) {
				return;
			}

			images_data_clean.push(image_data);
		});

		updateValue(images_id);
		setState({ images_data: images_data_clean });
	};

	getImagesComponent = () => {
		const { removeImage, onSortEnd, props } = this;
		let { value: images_id, images_data, setting_id } = props;

		images_id = castArray(images_id);
		images_data = castArray(images_data);

		if (isEmpty(images_id)) {
			return null;
		}

		return (
			<SortableList
				distance={3} // Needed, so clicks can be triggered
				helperClass={`${plugin_slug}-dragging_image`}
				items={images_data}
				onSortEnd={onSortEnd}
				custom={{ removeImage, setting_id }}
			/>
		);
	};

	render() {
		const { updateImages, getImagesComponent, props } = this;
		const { id, value: images_id, label, help, classes } = props;

		return (
			<BaseControl id={id} label={label} className={classes} help={help}>
				<MediaUpload
					onSelect={updateImages}
					allowedTypes={["image"]}
					value={images_id}
					multiple={true}
					render={({ open }) => (
						<Button onClick={open} isDefault>
							{__("Open Media Library")}
						</Button>
					)}
				/>
				{getImagesComponent()}
			</BaseControl>
		);
	}
}

export default withState({ images_data: [] })(ImageContainer);