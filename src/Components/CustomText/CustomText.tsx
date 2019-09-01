import { Fragment } from "@wordpress/element";

import "./CustomText.styl";
import { A, P, H3, Ol, Ul, Li } from "utils/Components";

interface Props extends CustomTextProps, SettingPropsShared {
	updateValue: (value: any) => void;
}

export const CustomText: React.ComponentType<Props> = props => {
	const { content } = props;

	return (
		<Fragment>
			{content.map((element, index) => (
				<Fragment key={index}>
					{(() => {
						switch (element.type) {
							case "paragraph":
							case "p":
								return <P>{element.content}</P>;

							case "title":
							case "h3":
								return <H3>{element.content}</H3>;

							case "link":
							case "a":
								return <A href={element.href || "#"}>{element.content}</A>;

							case "ordered_list":
							case "ol":
								return (
									<Ol>
										{element.content.map((li, index) => (
											<Li key={index}>{li}</Li>
										))}
									</Ol>
								);

							case "unordered_list":
							case "ul":
								return (
									<Ul>
										{element.content.map((li, index) => (
											<Li key={index}>{li}</Li>
										))}
									</Ul>
								);

							default:
								return null;
						}
					})()}
				</Fragment>
			))}
		</Fragment>
	);
};
