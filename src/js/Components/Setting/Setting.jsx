import l from "../../utils";
import Div from "../Utils";
import controls from "../Controls";

const {
	Checkbox,
	Radio,
	Select,
	Range,
	Text,
	Textarea,
	Color,
	ImageContainer,
	CustomText,
	CustomHTML
} = controls;
const { isUndefined } = lodash;
const { Component } = wp.element;

class Setting extends Component {
	getControl() {
		const { type } = this.props;

		switch (type) {
			case "checkbox":
				return <Checkbox {...this.props} />;

			case "radio":
				return <Radio {...this.props} />;

			case "select":
				return <Select {...this.props} />;

			case "range":
				return <Range {...this.props} />;

			case "text":
				return <Text {...this.props} />;

			case "textarea":
				return <Textarea {...this.props} />;

			case "color":
				return <Color {...this.props} />;

			case "image":
				return <ImageContainer {...this.props} />;

			case "custom_html":
				if (!isUndefined(CustomHTML)) {
					return <CustomHTML {...this.props} />;
				}

			case "custom_text":
				return <CustomText {...this.props} />;

			default:
				return null;
		}
	}

	render() {
		const { id, valid } = this.props;

		return (
			<Div id={`ps-control-${id}`} className="ps-control">
				{this.getControl()}
			</Div>
		);
	}
}

export default Setting;
