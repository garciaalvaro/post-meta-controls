import l from "../../utils";

const { applyFilters } = wp.hooks;

const Imported = applyFilters("pmc_add_component", null);

const CustomComponent = props => {
	return <Imported />;
};

export default CustomComponent;
