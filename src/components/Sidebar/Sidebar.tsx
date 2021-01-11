import React from "react";
import { Component } from "@wordpress/element";
import { withSelect } from "@wordpress/data";
import { compose, withState } from "@wordpress/compose";

import { store_slug } from "utils/data";
import { getColorScheme } from "utils/tools";
import { Div } from "utils/Components";
import { Warnings } from "../Warnings";
import { Tabs } from "../Tab";

interface OwnProps {
	id: SidebarProps["id"];
}

interface WithStateProps {
	setState: SetState<{ color_scheme: { id: string; type: string } }>;
	color_scheme: { id: string; type: string };
}

interface WithSelectProps {
	sidebar: SidebarProps;
	warnings: SidebarProps["warnings"];
}

interface Props extends OwnProps, WithStateProps, WithSelectProps {}

export const Sidebar = compose([
	withState({ color_scheme: { id: "", type: "" } }),
	withSelect<WithSelectProps, OwnProps>((select, { id }) => ({
		sidebar: select(store_slug).getSidebar(id),
		warnings: select(store_slug).getWarnings(id),
	})),
])(
	class extends Component<Props> {
		componentDidMount() {
			const { sidebar, setState } = this.props;

			setState({ color_scheme: getColorScheme(sidebar.ui_color_scheme) });
		}

		render() {
			const { id, warnings, color_scheme } = this.props;

			return (
				<Div
					id={id}
					className={[
						"sidebar",
						`color_scheme-type-${color_scheme.type}`,
						color_scheme.id
							? `color_scheme-name-${color_scheme.id}`
							: null,
					]}
				>
					{warnings.length ? (
						<Warnings warnings={warnings} />
					) : (
						<Tabs sidebar_id={id} />
					)}
				</Div>
			);
		}
	}
);
