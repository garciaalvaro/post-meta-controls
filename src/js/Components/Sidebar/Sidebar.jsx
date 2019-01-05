import l, { plugin_slug, store_slug, Div, Span } from "../../utils";
import Invalid from "./Invalid";
import Tabs from "../Tab/Tabs";

const { isEmpty } = lodash;
const { __ } = wp.i18n;
const { withSelect } = wp.data;
const { Component } = wp.element;

class Sidebar extends Component {
	render() {
		const { id, all_warnings } = this.props;
		const classes = [
			`${plugin_slug}-sidebar`,
			`color_scheme-type-light`,
			`color_scheme-name-banana`
		].join(" ");

		if (!isEmpty(all_warnings)) {
			return (
				<Div>
					<Div id="ps-invalid-header">
						<Span>
							{__("The sidebar has some invalid properties:")}
						</Span>
					</Div>
					{all_warnings.map(({ message, title }, index) => (
						<Invalid key={index} message={message} title={title} />
					))}
				</Div>
			);
		}

		return (
			<Div id={`ps-sidebar-${id}`} className={classes}>
				<Tabs sidebar_id={id} />
			</Div>
		);
	}
}

export default withSelect((select, { sidebar_id }) => {
	const { getSidebar, getWarnings } = select(store_slug);
	const sidebar = getSidebar(sidebar_id);
	const all_warnings = getWarnings(sidebar_id);

	return {
		all_warnings,
		...sidebar
	};
})(Sidebar);
