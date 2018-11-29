import l, { store_slug } from "../../utils";
import Div from "../Utils";
import Checkbox from "./Checkbox";
import Radio from "./Radio";

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

			default:
				return null;
		}
	}

	render() {
		const { id } = this.props;

		return (
			<Div id={`ps-control-${id}`} className="ps-control">
				{this.getControl()}
			</Div>
		);
	}
}

export default Control;
