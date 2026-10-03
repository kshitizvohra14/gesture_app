import React, { createContext, useContext, useState, useCallback } from 'react';
import { NOTIFS } from './data';

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

export function StoreProvider({ children }) {
  const [notifs, setNotifs] = useState(NOTIFS);
  const [toast, setToast] = useState(null);
  const unread = notifs.filter((n) => !n.read).length;

  const push = useCallback((n) => {
    const item = { ...n, id: Date.now(), read: false, sub: 'Buddy · Just now' };
    setNotifs((p) => [item, ...p]);
    setToast(item);
    setTimeout(() => setToast((t) => (t && t.id === item.id ? null : t)), 3200);
  }, []);
  const markRead = (id) => setNotifs((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAll = () => setNotifs((p) => p.map((n) => ({ ...n, read: true })));

  return <Ctx.Provider value={{ notifs, unread, toast, push, markRead, markAll }}>{children}</Ctx.Provider>;
}
