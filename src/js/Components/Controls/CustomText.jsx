import l, { plugin_slug, Div, P, H3, Ol, Ul, Li } from "../../utils";

const { map } = lodash;
const { Component } = wp.element;

class CustomText extends Component {
	render() {
		const { content } = this.props;

		return (
			<Div className={`${plugin_slug}-control-custom_text`}>
				{content.map((element, root_index) => {
					switch (element.type) {
						case "paragraph":
						case "p":
							return <P key={root_index}>{element.content}</P>;
							break;

						case "title":
						case "h3":
							return <H3 key={root_index}>{element.content}</H3>;
							break;

						case "ordered_list":
						case "ol":
							return (
								<Ol key={root_index}>
									{map(element.content_array, (li, index) => (
										<Li key={index}>{li}</Li>
									))}
								</Ol>
							);
							break;

						case "unordered_list":
						case "ul":
							return (
								<Ul key={root_index}>
									{map(element.content_array, (li, index) => (
										<Li key={index}>{li}</Li>
									))}
								</Ul>
							);
							break;

						default:
							return null;
							break;
					}
				})}
			</Div>
		);
	}
}

export default CustomText;
