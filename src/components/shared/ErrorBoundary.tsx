import React, {Component, ErrorInfo, ReactNode} from "react";
import {Card, Note, Text} from "@geist-ui/core";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true
        };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return <Note type="error" label="error" filled>Что-то пошло не так.</Note>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;