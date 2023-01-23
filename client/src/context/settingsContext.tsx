import { createContext, ReactNode, useContext, useState } from 'react';

interface Props {
  children?: ReactNode;
}

const SettingsContext = createContext<{
  view: string;
  itemsOnPage: number;
  toggleView: (viewType: string) => void;
  changeItemsOnPage: (items: number) => void;
} | null>(null);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: Props) => {
  const [view, setView] = useState('list');
  const [itemsOnPage, setItemsOnPage] = useState(3);

  const toggleView = (viewType: string) => {
    setView(viewType);
  };

  const changeItemsOnPage = (items: number) => {
    setItemsOnPage(items);
  };

  return (
    <SettingsContext.Provider value={{ view, itemsOnPage, toggleView, changeItemsOnPage }}>
      {children}
    </SettingsContext.Provider>
  );
};
