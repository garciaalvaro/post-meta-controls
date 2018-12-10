import l from "./log";
import icons from "./icons";
import sanitize from "./sanitize";
import validate from "./validate";
import setSchema from "./setSchema";
import prepare_elements from "./prepare_elements";
import {
	plugin_name,
	plugin_namespace,
	plugin_namespace_dash,
	plugin_slug
} from "./info-plugin";
import store_slug from "./info-store";

export default l;
export {
	icons,
	sanitize,
	validate,
	setSchema,
	prepare_elements,
	plugin_name,
	plugin_namespace,
	plugin_namespace_dash,
	plugin_slug,
	store_slug
};
