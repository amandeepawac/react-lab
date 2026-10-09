import { RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { Component } from "react";

type Props = { children: ReactNode; onReset?: () => void };
type State = { error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  reset = () => {
    this.props.onReset?.();
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div role="alert" className="border-l-2 border-red-500 bg-red-50 p-5">
          <h3 className="text-sm font-semibold text-red-800">
            This example hit an error.
          </h3>
          <p className="my-3 text-sm text-red-700">
            {this.state.error.message}
          </p>
          <button className="button-secondary" onClick={this.reset}>
            <RotateCcw size={14} />
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
