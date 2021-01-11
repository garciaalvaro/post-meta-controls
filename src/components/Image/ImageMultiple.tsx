import React from "react";
import { __ } from "@wordpress/i18n";
import * as blockEditor from "@wordpress/block-editor";
import * as editor from "@wordpress/editor";
import { Component } from "@wordpress/element";
import { Button, BaseControl } from "@wordpress/components";
import { withState } from "@wordpress/compose";
import apiFetch from "@wordpress/api-fetch";
import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import {
	addPrefix,
	prepareImageDataFromMedia,
	prepareImageDataFromRest,
} from "utils/tools";
import { Div, Img, Icon } from "utils/Components";

interface WithStateProps {
	setState: SetState<{ images: Image[] }>;
	images: { id: number; url: string; alt: string }[];
}

interface OwnProps extends ImageMultipleProps, SettingPropsShared {
	updateValue: (value: number[]) => void;
	value: ImageMultipleProps["default_value"];
}

interface Props extends OwnProps, WithStateProps {}

const { MediaUpload } = blockEditor ? blockEditor : editor;

const SortableItem = SortableElement(
	(props: { image: Image; removeImage: (id: number) => void }) => {
		const { image, removeImage } = props;
		const { id, url, alt } = image;

		// If the image id was not found in the library we display a message
		// inside a div with the option to remove it.
		if (!url) {
			return (
				<Div className="image-container">
					<Div className="image-not_found">{`Image with id ${id} was not found.`}</Div>
					<Button
						className={addPrefix("image-remove")}
						onClick={() => removeImage(id)}
					>
						<Icon icon="remove" />
					</Button>
				</Div>
			);
		}

		return (
			<Div className="image-container">
				<Img className="image" src={url} alt={alt} />
				<Button
					className={addPrefix("image-remove")}
					onClick={() => removeImage(id)}
				>
					<Icon icon="remove" />
				</Button>
			</Div>
		);
	}
);

const SortableList = SortableContainer(
	(props: {
		items: Image[];
		custom: { removeImage: (id: number) => void };
	}) => {
		const { items, custom } = props;

		return (
			<Div className="images-container">
				{items.map((image, index) => (
					<SortableItem
						key={image.id}
						index={index}
						removeImage={custom.removeImage}
						image={image}
					/>
				))}
			</Div>
		);
	}
);

export const ImageMultiple: React.ComponentType<OwnProps> = withState({
	images: [],
})(
	class extends Component<Props> {
		componentDidMount() {
			const { value, setState } = this.props;

			if (!value.length) {
				return;
			}

			apiFetch<ImageFromRest[]>({
				path: `wp/v2/media/?include=${value.join(",")}`,
			})
				.then(data_raw => {
					const data = prepareImageDataFromRest(data_raw);

					setState({
						// We map the original array of ids so we keep the sort.
						images: value.map(id => {
							const image = data.find(image => image.id === id);

							// If the image was not returned, because it no longer exists,
							// we pass its id with empty url and alt
							if (!image) {
								return { id, alt: "", url: "" };
							}

							return image;
						}),
					});
				})
				// When fetching an array of media the fetch doesnt return an error
				// if the images were not found, we will handle that scenario in the resolve
				.catch(() =>
					setState({
						images: value.map(id => ({ id, alt: "", url: "" })),
					})
				);
		}

		render() {
			const {
				id,
				value,
				label,
				help,
				images,
				updateValue,
				setState,
			} = this.props;

			return (
				<BaseControl id={id} label={label} help={help}>
					<MediaUpload
						allowedTypes={["image"]}
						value={value}
						multiple={true}
						render={({ open }) => (
							<Button
								onClick={open}
								className={addPrefix("image-button")}
							>
								{__("Open Media Library")}
							</Button>
						)}
						onSelect={(data_raw: ImageFromMedia[]) => {
							const data = prepareImageDataFromMedia(data_raw);

							setState({ images: data });

							// If there is no value selected we save an empty string.
							// This is needed because meta_key_exists would turn false otherwise,
							// which makes it impossible to differentiate between a post that has
							// no values selected and one which hasnt saved any value, and this permits us
							// to use the default_value correctly.
							updateValue(
								data.length ? data.map(({ id }) => id) : [0]
							);
						}}
					/>
					<SortableList
						distance={3} // Needed, so clicks can be triggered
						helperClass={addPrefix("dragging_image")}
						items={images}
						onSortEnd={({ oldIndex, newIndex }) => {
							updateValue(arrayMove(value, oldIndex, newIndex));
							setState({
								images: arrayMove(images, oldIndex, newIndex),
							});
						}}
						custom={{
							removeImage: (image_id: Image["id"]) => {
								const value_updated = value.filter(
									id => id !== image_id
								);

								updateValue(
									value_updated.length ? value_updated : [0]
								);
								setState({
									images: images.filter(
										({ id }) => id !== image_id
									),
								});
							},
						}}
					/>
				</BaseControl>
			);
		}
	}
);
