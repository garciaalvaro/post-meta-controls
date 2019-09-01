import { PanelRow } from "@wordpress/components";

import { Span, Div } from "utils/Components";
import { Settings } from "../Setting/Settings";
import { PanelPrepared } from "./Panels";

export const PanelNotCollapsible: React.ComponentType<
	PanelPrepared
> = props => {
	const { label, icon, id } = props;

	return (
		<Div id={id} className={["panel", "panel-no-collapsible"]}>
			{label && (
				<Div className="panel-label-container">
					{icon}
					<Span className="panel-label">{label}</Span>
				</Div>
			)}
			<PanelRow>
				<Settings panel_id={id} />
			</PanelRow>
		</Div>
	);
};
