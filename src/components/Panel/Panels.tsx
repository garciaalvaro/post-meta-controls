import React from "react";
import { withSelect } from "@wordpress/data";
import { Component, Fragment } from "@wordpress/element";
import { compose, withState } from "@wordpress/compose";

import "./Panels.styl";
import { PanelCollapsible } from "./PanelCollapsible";
import { PanelNotCollapsible } from "./PanelNotCollapsible";
import { store_slug } from "utils/data";
import { prepareIcon } from "utils/tools";

interface OwnProps {
	tab_id: TabProps["id"];
}

interface WithSelectProps {
	panels: PanelProps[];
}

interface WithStateProps {
	setState: SetState<{ panels_prepared: PanelPrepared[] }>;
	panels_prepared: PanelPrepared[];
}

export interface PanelPrepared
	extends Omit<PanelProps, "icon_dashicon" | "icon_svg"> {
	icon: React.ReactNode;
}

interface Props extends WithSelectProps, WithStateProps, OwnProps {}

export const Panels: React.ComponentType<OwnProps> = compose([
	withState({ panels_prepared: [] }),
	withSelect<WithSelectProps, OwnProps>((select, { tab_id }) => ({
		panels: select(store_slug).getPanels(tab_id),
	})),
])(
	class extends Component<Props> {
		preparePanels() {
			const { setState, panels } = this.props;

			setState({
				panels_prepared: panels.map(panel => {
					const { icon_svg, icon_dashicon, ...rest } = panel;

					return {
						...rest,
						icon: prepareIcon(icon_svg, icon_dashicon, "panel"),
					};
				}),
			});
		}

		componentDidMount() {
			this.preparePanels();
		}

		componentDidUpdate(prev_props: Props) {
			const { tab_id, panels } = this.props;

			if (
				tab_id !== prev_props.tab_id ||
				panels.length > prev_props.panels.length
			) {
				this.preparePanels();
			}
		}

		render() {
			const { panels_prepared } = this.props;

			return (
				<Fragment>
					{panels_prepared.map(panel =>
						panel.collapsible ? (
							<PanelCollapsible key={panel.id} {...panel} />
						) : (
							<PanelNotCollapsible key={panel.id} {...panel} />
						)
					)}
				</Fragment>
			);
		}
	}
);
