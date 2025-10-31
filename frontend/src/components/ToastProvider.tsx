import { Alert, AlertColor, Snackbar } from '@mui/material';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type ToastVariant = 'default' | 'destructive';

export interface ToastMessage {
  title?: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastContextValue {
  toast: (message: ToastMessage) => void;
}

const noop = () => undefined;

const ToastContext = createContext<ToastContextValue>({
  toast: noop,
});

const variantToSeverity: Record<ToastVariant, AlertColor> = {
  default: 'info',
  destructive: 'error',
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<ToastMessage | null>(null);

  const toast = useCallback((value: ToastMessage) => {
    setMessage(value);
  }, []);

  const handleClose = useCallback(() => {
    setMessage(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      toast,
    }),
    [toast]
  );

  const severity =
    message?.variant && variantToSeverity[message.variant]
      ? variantToSeverity[message.variant]
      : variantToSeverity.default;

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message?.title && <strong>{message.title}</strong>}
          {message?.description && (
            <div style={{ marginTop: message?.title ? 4 : 0 }}>
              {message.description}
            </div>
          )}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => useContext(ToastContext);
