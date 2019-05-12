import l, { plugin_slug, store_slug, prepareIcon, Span } from "utils";
import Tab from "./Tab";

const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component, Fragment } = wp.element;
const { TabPanel } = wp.components;

class Tabs extends Component {
	render() {
		const { tabs, active_tab, updateActiveTab } = this.props;

		if (tabs.length === 1) {
			return <Tab tab_id={tabs[0].id} />;
		}

		const tabs_prepared = tabs.map(tab => ({
			name: tab.id,
			title: (
				<Fragment>
					{prepareIcon(tab.icon_svg, tab.icon_dashicon, "tab")}
					<Span classes="tab-label">{tab.label}</Span>
				</Fragment>
			),
			className: `${plugin_slug}-tab-button`
		}));

		return (
			<TabPanel
				activeClass="is-active"
				onSelect={updateActiveTab}
				tabs={tabs_prepared}
				initialTabName={active_tab}
			>
				{tab => <Tab tab_id={tab.name} />}
			</TabPanel>
		);
	}
}

export default compose([
	withDispatch((dispatch, { sidebar_id }) => {
		const { updateActiveTab } = dispatch(store_slug);

		return {
			updateActiveTab: tab_id => updateActiveTab(sidebar_id, tab_id)
		};
	}),
	withSelect((select, { sidebar_id }) => {
		const { getTabs, getActiveTab } = select(store_slug);

		return {
			tabs: getTabs(sidebar_id),
			active_tab: getActiveTab(sidebar_id)
		};
	})
])(Tabs);
