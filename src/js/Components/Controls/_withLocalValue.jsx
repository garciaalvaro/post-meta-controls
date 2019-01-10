import l from "../../utils";

const { throttle } = lodash;
const { compose, withState } = wp.compose;
const { Component } = wp.element;

const withLocalValue = WrappedComponent => {
	return class extends Component {
		componentDidMount = () => {
			const { updateValueLocal, props } = this;
			const { value } = props;

			updateValueLocal(value, false);
		};
		// Throttle the meta update.
		updateValueThrottled = throttle(
			value => {
				const { updateValue } = this.props;

				updateValue(value);
			},
			1000,
			{
				leading: true,
				trailing: true
			}
		);

		updateValueLocal = (value_local_new, update_meta = true) => {
			const { props, updateValueThrottled } = this;
			const { setState } = props;

			setState({ value_local: value_local_new }, () => {
				if (update_meta) {
					updateValueThrottled(value_local_new);
				}
			});
		};

		render() {
			return (
				<WrappedComponent
					{...this.props}
					updateValueLocal={this.updateValueLocal}
				/>
			);
		}
	};
};

export default compose([withState({ value_local: "" }), withLocalValue]);
