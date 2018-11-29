import l, { store_slug } from "../../utils";
import Div from "../Utils";
import TabButton from "./TabButton";

const { withState, compose } = wp.compose;
const { withSelect } = wp.data;
const { Component } = wp.element;

class TabsNavigation extends Component {
	render() {
		const { tabs, active_tab, sidebar_id } = this.props;

		return (
			<Div
				id={`ps-tabs_navigation-${sidebar_id}`}
				className="ps-tabs_navigation"
			>
				{tabs.map((tab, index) => (
					<TabButton
						key={tab.id}
						sidebar_id={sidebar_id}
						is_active={
							tab.id === active_tab ||
							(active_tab === false && index === 0)
						}
						{...tab}
					/>
				))}
			</Div>
		);
	}
}

export default TabsNavigation;
