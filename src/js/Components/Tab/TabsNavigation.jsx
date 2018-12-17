import l, { icons } from "../../utils";
import Div from "../Utils";
import TabButton from "./TabButton";
import classnames from "classnames";

const { withState, compose } = wp.compose;
const { withSelect } = wp.data;
const { Component, Fragment } = wp.element;
const { Button } = wp.components;

class TabsNavigation extends Component {
	render() {
		const { tabs, active_tab, sidebar_id } = this.props;
		const classes = classnames(
			{
				more_than_3_tabs: tabs.length > 3
			},
			"ps-tab_navigation-container"
		);

		return (
			<Div
				id={`ps-tab_navigation-container-${sidebar_id}`}
				className={classes}
			>
				{tabs.length > 3 && (
					<Fragment>
						<Button
							id="ps-tab_navigation-button-left"
							className="ps-tab_navigation-button"
						>
							{icons.left}
						</Button>
						<Button
							id="ps-tab_navigation-button-right"
							className="ps-tab_navigation-button"
						>
							{icons.right}
						</Button>
					</Fragment>
				)}
				<Div className="ps-tab_headers-container">
					<Div className="ps-tab_headers">
						{tabs.map((tab, index) => (
							<TabButton
								key={tab.id}
								sidebar_id={sidebar_id}
								is_active={
									tab.id === active_tab ||
									(active_tab === "" && index === 0)
								}
								{...tab}
							/>
						))}
					</Div>
				</Div>
			</Div>
		);
	}
}

export default TabsNavigation;
