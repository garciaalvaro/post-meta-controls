import l, { plugin_slug, Div, P, H3, Ol, Ul, Li } from "../../utils";

const { map } = lodash;
const { Component } = wp.element;

class CustomText extends Component {
	render() {
		const { content } = this.props;

		return (
			<Div className={`${plugin_slug}-control-custom_text`}>
				{content.map(element => {
					switch (element.type) {
						case "p":
						case "paragraph":
							return <P>{element.content}</P>;
							break;

						case "title":
						case "h3":
							return <H3>{element.content}</H3>;
							break;

						case "ordered_list":
						case "ol":
							return (
								<Ol>
									{map(element.content, li => (
										<Li>{li}</Li>
									))}
								</Ol>
							);
							break;

						case "unordered_list":
						case "ul":
							return (
								<Ul>
									{map(element.content, li => (
										<Li>{li}</Li>
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
