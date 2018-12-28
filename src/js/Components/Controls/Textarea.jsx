import l, { store_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";

const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component } = wp.element;
const { TextareaControl } = wp.components;

class Textarea extends Component {
	render() {
		const { label, help, value, updateValue } = this.props;

		return (
			<TextareaControl
				className="ps-control-textarea"
				label={label}
				help={help}
				value={value}
				onChange={updateValue}
			/>
		);
	}
}

export default withStoreConnection(Textarea);
