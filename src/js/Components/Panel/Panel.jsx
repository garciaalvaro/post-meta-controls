import l, { prepareIcon, store_slug } from "../../utils";

import PanelCollapsible from "./PanelCollapsible";
import PanelNotCollapsible from "./PanelNotCollapsible";

const { withSelect } = wp.data;
const { Component } = wp.element;

class Panel extends Component {
	render() {
		const {
			id,
			label,
			settings_id,
			initial_open,
			collapsible,
			icon_svg,
			icon_dashicon
		} = this.props;
		const icon = prepareIcon(icon_svg, icon_dashicon, "panel");

		if (collapsible) {
			return (
				<PanelCollapsible
					id={id}
					label={label}
					icon={icon}
					settings_id={settings_id}
					initial_open={initial_open}
				/>
			);
		}

		return (
			<PanelNotCollapsible
				id={id}
				label={label}
				icon={icon}
				settings_id={settings_id}
			/>
		);
	}
}

export default withSelect((select, { panel_id }) => {
	const { getSettingsId, getPanel } = select(store_slug);
	const panel = getPanel(panel_id);
	const settings_id = getSettingsId(panel_id);

	return { ...panel, settings_id };
})(Panel);
