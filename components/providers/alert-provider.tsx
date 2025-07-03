"use client";
import React, {
  useState,
  createContext,
  useMemo,
  useCallback,
  useContext,
} from "react";
import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";
type AlertMetaData = {
  title: string;
  description: string;
  cancel?: string;
  action: string;
  onCancel?: () => void;
  onAction: () => void;
};
type AlertContextType = {
  confirm: (metadata: AlertMetaData) => void;
};
const AlertContext = createContext<AlertContextType>({
  confirm: () => {},
});
function AlertProvider({ children }: { readonly children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [metaData, setMetaData] = useState<AlertMetaData>({} as AlertMetaData);
  const { title, action, cancel, description, onAction, onCancel } = metaData;
  const handleCancel = () => {
    setOpen(false);
    if (onCancel) {
      onCancel();
    }
  };
  const handleAction = async () => {
    setLoading(true);
    onAction();
    setOpen(false);
    setLoading(false);
  };
  const confirm = useCallback((metadata: AlertMetaData) => {
    setMetaData(metadata);
    setOpen(true);
  }, []);
  const value = useMemo(() => ({ confirm }), [confirm]);
  return (
    <AlertContext.Provider value={value}>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="hover:bg-destructive"
              disabled={loading}
              onClick={handleCancel}
            >
              {cancel ?? "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction disabled={loading} onClick={handleAction}>
              {action}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {children}
    </AlertContext.Provider>
  );
}

function useAlert() {
  const { confirm } = useContext(AlertContext);
  return { confirm };
}

export { AlertProvider };
export default useAlert;
