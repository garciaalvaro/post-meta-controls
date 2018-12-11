import l, { store_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";

const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component } = wp.element;
const { TextControl } = wp.components;

class Text extends Component {
	render() {
		const { label, help, value, updateText } = this.props;

		return (
			<TextControl
				className="ps-control-checkbox"
				label={label}
				help={help}
				value={value}
				onChange={updateText}
			/>
		);
	}
}

export default withStoreConnection(Text);
