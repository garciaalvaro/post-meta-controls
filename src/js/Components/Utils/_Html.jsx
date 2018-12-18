import l from "../../utils";

const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>;
const Span = ({ children, ...rest }) => <span {...rest}>{children}</span>;
const Img = props => <img {...props} />;
const P = ({ children, ...rest }) => <p {...rest}>{children}</p>;
const H3 = ({ children, ...rest }) => <h3 {...rest}>{children}</h3>;
const Ol = ({ children, ...rest }) => <ol {...rest}>{children}</ol>;
const Ul = ({ children, ...rest }) => <ul {...rest}>{children}</ul>;
const Li = ({ children, ...rest }) => <li {...rest}>{children}</li>;

export default Div;
export { Span, Img, P, H3, Ol, Ul, Li };
