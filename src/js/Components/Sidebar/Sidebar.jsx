import l, { plugin_slug, store_slug } from "../../utils";
import Invalids from "../Invalid/Invalids";
import Tabs from "../Tab/Tabs";

const { isEmpty } = lodash;
const { withSelect } = wp.data;
const { Component } = wp.element;

class Sidebar extends Component {
	render() {
		const { sidebar_id, warnings } = this.props;
		const classes = [
			`${plugin_slug}-sidebar`,
			`${plugin_slug}-color_scheme-type-light`,
			`${plugin_slug}-color_scheme-name-banana`
		].join(" ");

		if (isEmpty(warnings)) {
			return <Tabs sidebar_id={sidebar_id} classes={classes} />;
		}

		return (
			<Invalids
				sidebar_id={sidebar_id}
				classes={classes}
				warnings={warnings}
			/>
		);
	}
}

export default withSelect((select, { sidebar_id }) => {
	const { getSidebar, getWarnings } = select(store_slug);
	const sidebar = getSidebar(sidebar_id);
	const warnings = getWarnings(sidebar_id);

	return {
		...sidebar,
		warnings
	};
})(Sidebar);
