import { Sidebar } from "../sidebar";

export const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">{children}</main>
    </div>
  );
};
