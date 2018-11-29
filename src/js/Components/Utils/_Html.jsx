import l from "../../utils";

const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>;
const Span = ({ children, ...rest }) => <span {...rest}>{children}</span>;
const Img = props => <img {...props} />;

export default Div;
export { Span, Img };
