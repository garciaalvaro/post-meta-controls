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
	without,
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
			<Div classes="image-container">
				<Div
					className={`${plugin_slug}-image-not_found `}
				>{`Image with id ${value} was not found.`}</Div>
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
		<Div classes="image-container">
			<Img classes="image" src={url} alt={alt} />
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
		<Div classes="images-container">
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
			// the same as the one from the so we need to order it.
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
		const { value, images_data, updateValue, setState } = this.props;

		let images_id_new = [...value];
		let images_data_new = [...images_data];
		images_id_new = arrayMove(images_id_new, oldIndex, newIndex);
		images_data_new = arrayMove(images_data_new, oldIndex, newIndex);

		updateValue(images_id_new);
		setState({ images_data: images_data_new });
	};

	updateImages = images_data_raw => {
		const { updateValue, setState } = this.props;
		const images_data = prepareImageData(castArray(images_data_raw));
		let images_id = images_data.map(({ id }) => id);

		// If there is no value selected we save an empty string.
		// This is needed because meta_key_exists would turn false otherwise,
		// which makes it impossible to differentiate between a post that has
		// no values selected and one which hasnt save any value, and this permits us
		// to use the default_value correctly.
		images_id = isEmpty(images_id) ? [0] : images_id;

		updateValue(images_id);
		setState({ images_data });
	};

	removeImage = image_id => {
		const {
			value: images_id,
			images_data,
			updateValue,
			setState
		} = this.props;
		const images_data_clean = [];

		let images_id_new = without(images_id, image_id);

		forEach(images_data, image_data => {
			if (
				image_data === image_id ||
				(!isFinite(image_data) && image_data.id === image_id)
			) {
				return;
			}

			images_data_clean.push(image_data);
		});

		images_id_new = isEmpty(images_id_new) ? [0] : images_id_new;

		updateValue(images_id_new);
		setState({ images_data: images_data_clean });
	};

	getImagesComponent = () => {
		const { removeImage, onSortEnd, props } = this;
		let { value: images_id, images_data, setting_id } = props;

		const images_id_prepared = castArray(images_id);
		const images_data_prepared = castArray(images_data);

		if (isEmpty(images_id_prepared)) {
			return null;
		}

		return (
			<SortableList
				distance={3} // Needed, so clicks can be triggered
				helperClass={`${plugin_slug}-dragging_image`}
				items={images_data_prepared}
				onSortEnd={onSortEnd}
				custom={{ removeImage, setting_id }}
			/>
		);
	};

	render() {
		const { updateImages, getImagesComponent, props } = this;
		const { value: images_id, label, help } = props;

		return (
			<BaseControl label={label} help={help}>
				<MediaUpload
					onSelect={updateImages}
					allowedTypes={["image"]}
					value={images_id}
					multiple={true}
					render={({ open }) => (
						<Button
							onClick={open}
							className={`${plugin_slug}-image-button`}
						>
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
