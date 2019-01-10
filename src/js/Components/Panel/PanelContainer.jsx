import l, { prepareIcon, store_slug } from "../../utils";

import PanelCollapsible from "./PanelCollapsible";
import PanelNotCollapsible from "./PanelNotCollapsible";

const { withSelect } = wp.data;
const { Component } = wp.element;

class PanelContainer extends Component {
	render() {
		const {
			label,
			id,
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
					label={label}
					icon={icon}
					id={id}
					settings_id={settings_id}
					initial_open={initial_open}
				/>
			);
		}

		return (
			<PanelNotCollapsible
				label={label}
				icon={icon}
				id={id}
				settings_id={settings_id}
			/>
		);
	}
}

export default withSelect((select, { id }) => {
	const { getSettingsId } = select(store_slug);

	return {
		settings_id: getSettingsId(id)
	};
})(PanelContainer);
