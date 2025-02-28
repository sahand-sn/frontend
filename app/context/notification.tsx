import { createContext, useContext, useMemo, useState } from "react";
import { Alert, type AlertColor, Snackbar } from "@mui/material";

interface NotificationContextType {
  showNotification: (message: string | string[], severity?: AlertColor) => void;
}

const NotificationContext = createContext<NotificationContextType>(null!);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  const showNotification = (
    msg: string | string[],
    severity: AlertColor = "info"
  ) => {
    setMessage(Array.isArray(msg) ? msg.join("\n") : msg);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const value = useMemo(() => ({ showNotification }), []);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
