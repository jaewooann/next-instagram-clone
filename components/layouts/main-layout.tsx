import SideBar from "components/sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <SideBar />
      {children}
    </main>
  );
}
