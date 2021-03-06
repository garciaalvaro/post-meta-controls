import React from "react";
import { compose, withState } from "@wordpress/compose";
import { withSelect, withDispatch } from "@wordpress/data";
import { Component, Fragment } from "@wordpress/element";
import { TabPanel } from "@wordpress/components";

import "./Tabs.styl";
import { Span } from "@/utils/components";
import { store_slug } from "@/utils/data";
import { addPrefix, prepareIcon } from "@/utils/tools";
import { Tab } from "./Tab";

export interface TabsPrepared {
	name: TabProps["id"];
	title: React.ReactNode;
	className: string;
}

interface WithStateProps {
	setState: SetState<{ tabs_prepared: TabsPrepared[] }>;
	tabs_prepared: TabsPrepared[];
}

interface OwnProps {
	sidebar_id: SidebarProps["id"];
}

interface WithSelectProps {
	tabs: TabProps[];
	active_tab: TabProps["id"];
}

type WithDispatchProps = Pick<ActionCreators, "openTab">;

interface Props
	extends WithStateProps,
		WithSelectProps,
		OwnProps,
		WithDispatchProps {}

export const Tabs = compose([
	withState({ tabs_prepared: [] }),
	withDispatch(dispatch => ({
		openTab: dispatch(store_slug).openTab,
	})),
	withSelect<WithSelectProps, OwnProps>((select, { sidebar_id }) => ({
		tabs: select(store_slug).getTabs(sidebar_id),
		active_tab: select(store_slug).getActiveTab(sidebar_id),
	})),
])(
	class Tabs extends Component<Props> {
		prepareTabs() {
			const { tabs, setState } = this.props;

			setState({
				tabs_prepared: tabs.map(
					({ label, icon_dashicon, icon_svg, id }) => ({
						name: id,
						className: addPrefix("tab-button"),
						title: (
							<Fragment key={id}>
								{prepareIcon(icon_svg, icon_dashicon, "tab")}
								<Span className="tab-label">{label}</Span>
							</Fragment>
						),
					})
				),
			});
		}

		componentDidMount() {
			this.prepareTabs();
		}

		componentDidUpdate(prev_props: WithSelectProps) {
			if (this.props.tabs.length > prev_props.tabs.length) {
				this.prepareTabs();
			}
		}

		render() {
			const {
				tabs,
				tabs_prepared,
				active_tab,
				openTab,
				sidebar_id,
			} = this.props;

			if (!tabs_prepared.length) {
				return null;
			}

			if (tabs.length === 1) {
				return <Tab id={tabs[0].id} />;
			}

			return (
				<TabPanel
					activeClass="is-active"
					onSelect={tab_name =>
						openTab({ sidebar_id, tab_id: tab_name })
					}
					// @ts-expect-error TODO:
					// Passing a title that includes an icon.
					// Confirm this type is accepted.
					tabs={tabs_prepared}
					initialTabName={active_tab}
				>
					{({ name }) => <Tab id={name} />}
				</TabPanel>
			);
		}
	}
);
