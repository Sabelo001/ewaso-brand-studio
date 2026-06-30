import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[Ewaso Designer]', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0E0E11] text-[#ECE9E4] p-8">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-xl font-bold font-serif">Something went wrong</h1>
            <p className="text-sm text-neutral-400">
              Ewaso Designer encountered an unexpected error. Your work is autosaved locally.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="px-6 py-3 bg-[#C9A84C] text-[#141419] font-bold rounded-xl uppercase tracking-widest text-xs hover:brightness-110 transition"
            >
              Recover Studio
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
