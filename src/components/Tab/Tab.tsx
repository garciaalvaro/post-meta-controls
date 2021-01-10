import { Div } from "utils/Components";
import { Panels } from "../Panel";

interface Props {
	id: TabProps["id"];
}

export const Tab: React.ComponentType<Props> = props => {
	const { id } = props;

	return (
		<Div id={id} className="tab">
			<Panels tab_id={id} />
		</Div>
	);
};
