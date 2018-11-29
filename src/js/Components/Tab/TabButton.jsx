import l, { store_slug } from "../../utils";
import { Span } from "../Utils";
import { join } from "path";

const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component } = wp.element;
const { Button } = wp.components;

class TabButton extends Component {
	render() {
		const { label, id, is_active, updateActiveTab } = this.props;
		const classNames = [
			`ps-tab_button`,
			is_active ? "is_active" : "no-is_active"
		].join(" ");

		return (
			<Button
				id={`ps-tab_button-${id}`}
				className={classNames}
				onClick={updateActiveTab}
			>
				<Span>{label}</Span>
			</Button>
		);
	}
}

export default compose([
	withDispatch((dispatch, { sidebar_id, id }) => {
		const { updateActiveTab } = dispatch(store_slug);

		return {
			updateActiveTab: () => updateActiveTab(sidebar_id, id)
		};
	})
])(TabButton);
