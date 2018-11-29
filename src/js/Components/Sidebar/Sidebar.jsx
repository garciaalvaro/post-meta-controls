import l, { store_slug } from "../../utils";
import Div from "../Utils";
import Tab from "../Tab/Tab";
import TabsContainer from "../Tab/TabsContainer";

const { withState, compose } = wp.compose;
const { withSelect } = wp.data;
const { Component } = wp.element;

class Sidebar extends Component {
	render() {
		const { id } = this.props;
		const classNames = [
			`ps-sidebar`,
			`color_scheme-type-light`,
			`color_scheme-name-banana`
		].join(" ");

		return (
			<Div id={`ps-sidebar-${id}`} className={classNames}>
				<TabsContainer sidebar_id={id} />
			</Div>
		);
	}
}

export default Sidebar;
// export default compose([
// 	withSelect((select, { id }) => {
// 		const { getSidebar } = select(store_slug);

// 		return {
// 			sidebar: getSidebar(id)
// 		};
// 	})
// ])(Sidebar);
