import React from "react";
import { castArray } from "lodash";
import { __ } from "@wordpress/i18n";
import { MediaUpload } from "@wordpress/block-editor";
import { Component } from "@wordpress/element";
import { Button, BaseControl } from "@wordpress/components";
import { withState } from "@wordpress/compose";
import apiFetch from "@wordpress/api-fetch";

import "./Image.styl";
import {
	addPrefix,
	prepareImageDataFromMedia,
	prepareImageDataFromRest,
} from "@/utils/tools";
import { Div, Img, Icon } from "@/utils/components";

interface WithStateProps {
	setState: SetState<{
		url: string;
		alt: string;
		image_id_not_found: number;
	}>;
	url: string;
	alt: string;
	image_id_not_found: number;
}

interface OwnProps extends ImageProps, SettingPropsShared {
	updateValue: (value: number) => void;
	value: ImageProps["default_value"];
}

interface Props extends OwnProps, WithStateProps {}

export const Image: React.ComponentType<OwnProps> = withState({
	url: "",
	alt: "",
	image_id_not_found: 0,
})(
	class extends Component<Props> {
		componentDidMount() {
			const { value: image_id, setState } = this.props;

			if (image_id === 0) {
				return;
			}

			apiFetch<ImageFromRest>({
				path: `wp/v2/media/${image_id}`,
			})
				.then(data_raw => {
					const data = prepareImageDataFromRest(castArray(data_raw));

					// The sorting of the elements from data_raw is not
					// the same as the one from the so we need to order it.
					const { url, alt } = data[0];

					setState({ url, alt });
				})
				.catch(() => setState({ image_id_not_found: image_id }));
		}

		render() {
			const {
				id,
				updateValue,
				setState,
				value: image_id,
				label,
				help,
				url,
				alt,
				image_id_not_found,
			} = this.props;

			const updateImage = (data_raw: ImageFromMedia) => {
				const data = prepareImageDataFromMedia(castArray(data_raw));
				const { id, url, alt } = data[0];

				updateValue(id);
				setState({ url, alt, image_id_not_found: 0 });
			};

			const removeImage = () => {
				updateValue(0);
				setState({ url: "", alt: "", image_id_not_found: 0 });
			};

			return (
				<BaseControl id={id} label={label} help={help}>
					<MediaUpload
						onSelect={updateImage}
						allowedTypes={["image"]}
						value={image_id}
						render={({ open }) => (
							<Button
								onClick={open}
								className={addPrefix("image-button")}
							>
								{__("Open Media Library")}
							</Button>
						)}
					/>
					<Div className="images-container">
						{!!image_id_not_found && (
							<Div className="image-container">
								<Div className="image-not_found">{`Image with id ${image_id_not_found} was not found.`}</Div>
								<Button
									className={addPrefix("image-remove")}
									onClick={removeImage}
								>
									<Icon icon="remove" />
								</Button>
							</Div>
						)}

						{!image_id_not_found && url && (
							<Div className="image-container">
								<Img className="image" src={url} alt={alt} />
								<Button
									className={addPrefix("image-remove")}
									onClick={removeImage}
								>
									<Icon icon="remove" />
								</Button>
							</Div>
						)}
					</Div>
				</BaseControl>
			);
		}
	}
);
