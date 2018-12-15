import l, { store_slug } from "../../utils";
import Div from "../Utils";
import Tab from "./Tab";
import TabsNavigation from "./TabsNavigation";

const { withState, compose } = wp.compose;
const { withSelect } = wp.data;
const { Component, Fragment } = wp.element;

class TabsContainer extends Component {
	render() {
		const { tabs, active_tab, sidebar_id } = this.props;

		return (
			<Fragment>
				{tabs.length > 1 && (
					<TabsNavigation
						tabs={tabs}
						active_tab={active_tab}
						sidebar_id={sidebar_id}
					/>
				)}
				{tabs.map((tab, index) => {
					if (
						tab.id === active_tab ||
						(active_tab === "" && index === 0)
					) {
						return <Tab key={tab.id} {...tab} />;
					}

					return null;
				})}
			</Fragment>
		);
	}
}

export default compose([
	withSelect((select, { sidebar_id }) => {
		const { getTabs, getActiveTab } = select(store_slug);

		return {
			tabs: getTabs(sidebar_id),
			active_tab: getActiveTab(sidebar_id)
		};
	})
])(TabsContainer);
