import l from "../../utils";
import Div from "../Utils";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import Select from "./Select";
import Range from "./Range";
import Text from "./Text";
import Textarea from "./Textarea";
import Color from "./Color";
import ImageContainer from "./ImageContainer";
import CustomHTML from "./CustomHTML";
import CustomText from "./CustomText";

const { withState, compose } = wp.compose;
const { withSelect } = wp.data;
const { Component } = wp.element;

class Control extends Component {
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
				return <CustomHTML {...this.props} />;

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

export default Control;
