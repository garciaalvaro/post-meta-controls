import l, { store_slug } from "../../utils";
import Div from "../Utils";
import Invalid from "./Invalid";
import TabsContainer from "../Tab/TabsContainer";

const { isEmpty } = lodash;
const { __ } = wp.i18n;
const { withState, compose } = wp.compose;
const { withSelect } = wp.data;
const { Component } = wp.element;

class Sidebar extends Component {
	render() {
		const { id, warnings } = this.props;
		const classNames = [
			`ps-sidebar`,
			`color_scheme-type-light`,
			`color_scheme-name-banana`
		].join(" ");

		if (isEmpty(warnings)) {
			return (
				<Div id={`ps-sidebar-${id}`} className={classNames}>
					<TabsContainer sidebar_id={id} />
				</Div>
			);
		} else {
			return (
				<Div>
					<Div>{__("The sidebar has some invalid properties:")}</Div>
					{warnings.map(({ message, title }, index) => (
						<Invalid key={index} message={message} title={title} />
					))}
				</Div>
			);
		}
	}
}

export default withSelect((select, { sidebar_id }) => {
	const { getSidebar, getWarnings } = select(store_slug);
	const sidebar = getSidebar(sidebar_id);

	return {
		warnings: getWarnings(sidebar_id),
		...sidebar
	};
})(Sidebar);
