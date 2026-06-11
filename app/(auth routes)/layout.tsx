import AuthNav from './AuthNav';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <AuthNav />
      <div>{children}</div>
    </div>
  );
}
