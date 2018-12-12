import l, { store_slug } from "../../utils";
import classnames from "classnames";
import Div from "../Utils";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import Select from "./Select";
import Range from "./Range";
import Text from "./Text";
import Textarea from "./Textarea";
import Invalid from "./Invalid";

const { withState, compose } = wp.compose;
const { withSelect } = wp.data;
const { Component } = wp.element;

class Control extends Component {
	getControl() {
		const { type, valid } = this.props;
		if (!valid) {
			return <Invalid {...this.props} />;
		}

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

			default:
				return null;
		}
	}

	render() {
		const { id, valid } = this.props;
		const classes = classnames({ invalid: !valid }, "ps-control");

		return (
			<Div id={`ps-control-${id}`} className={classes}>
				{this.getControl()}
			</Div>
		);
	}
}

export default Control;
