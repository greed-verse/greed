import React, { createContext, useContext, useState } from "react";

interface DepositContextType {
  isDepositModalVisible: boolean;
  showDepositModal: () => void;
  hideDepositModal: () => void;
}

const DepositContext = createContext<DepositContextType | undefined>(undefined);

export const useDeposit = () => {
  const context = useContext(DepositContext);
  if (!context) {
    throw new Error("useDeposit must be used within a DepositProvider");
  }
  return context;
};

export const DepositProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDepositModalVisible, setIsDepositModalVisible] = useState(false);

  const showDepositModal = () => setIsDepositModalVisible(true);
  const hideDepositModal = () => setIsDepositModalVisible(false);

  return (
    <DepositContext.Provider
      value={{ isDepositModalVisible, showDepositModal, hideDepositModal }}
    >
      {children}
    </DepositContext.Provider>
  );
};
