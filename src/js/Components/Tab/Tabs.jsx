import l, { plugin_slug, store_slug } from "../../utils";
import Tab from "./Tab";

const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component, Fragment } = wp.element;
const { TabPanel } = wp.components;

class Tabs extends Component {
	render() {
		const { tabs, sidebar_id, active_tab, updateActiveTab } = this.props;

		const tabs_prepared = tabs.map(tab => ({
			name: tab.id,
			title: tab.label,
			className: `${plugin_slug}-tab-content`,
			id: `${plugin_slug}-tab-content-${tab.id}`
		}));

		return (
			<TabPanel
				id={`${plugin_slug}-sidebar-${sidebar_id}`}
				activeClass="is-active"
				onSelect={updateActiveTab}
				tabs={tabs_prepared}
				initialTabName={active_tab}
			>
				{tab => <Tab id={tab.name} />}
			</TabPanel>
		);
	}
}

export default compose([
	withDispatch((dispatch, { sidebar_id }) => {
		const { updateActiveTab } = dispatch(store_slug);

		return {
			updateActiveTab: id => updateActiveTab(sidebar_id, id)
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
