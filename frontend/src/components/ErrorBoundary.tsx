import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // 更新 state 以便下次渲染能夠顯示降級 UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 你可以將錯誤記錄到錯誤報告服務
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // 可選：將錯誤發送到監控服務（如 Sentry）
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    // 重新載入頁面
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f7f7fb',
            p: 3,
          }}
        >
          <Container maxWidth="sm">
            <Box
              sx={{
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: 4,
                p: 6,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <ErrorOutlineIcon
                sx={{
                  fontSize: 80,
                  color: '#f44336',
                  mb: 3,
                }}
              />
              <Typography variant="h4" fontWeight={700} gutterBottom>
                糟糕！發生了一些問題
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                我們遇到了一個意外錯誤。請嘗試重新整理頁面。
              </Typography>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Box
                  sx={{
                    textAlign: 'left',
                    backgroundColor: '#f5f5f5',
                    p: 2,
                    borderRadius: 2,
                    mb: 3,
                    maxHeight: 300,
                    overflow: 'auto',
                  }}
                >
                  <Typography
                    variant="caption"
                    component="pre"
                    sx={{
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {this.state.error.toString()}
                    {this.state.errorInfo && (
                      <>
                        {'\n\n'}
                        {this.state.errorInfo.componentStack}
                      </>
                    )}
                  </Typography>
                </Box>
              )}

              <Button
                variant="contained"
                size="large"
                onClick={this.handleReset}
                sx={{
                  backgroundColor: '#6d4eff',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#5a3dd9',
                  },
                }}
              >
                返回首頁
              </Button>
            </Box>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
