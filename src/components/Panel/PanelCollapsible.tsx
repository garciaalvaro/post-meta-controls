import React from "react";
import { Fragment } from "@wordpress/element";
import { PanelBody } from "@wordpress/components";

import { Div, Span } from "@/utils/components";
import { addPrefix } from "@/utils/tools";
import { Settings } from "../Setting";
import { PanelPrepared } from "./Panels";

export const PanelCollapsible: React.ComponentType<PanelPrepared> = props => {
	const { label, initial_open, icon, id } = props;

	return (
		<PanelBody
			// @ts-expect-error TODO
			title={
				<Fragment>
					{icon}
					<Span className="panel-label">{label}</Span>
				</Fragment>
			}
			id={id}
			initialOpen={initial_open}
			className={addPrefix(["panel", "panel-collapsible"])}
		>
			<Div id={id} className="panel-content">
				<Settings panel_id={id} />
			</Div>
		</PanelBody>
	);
};
