const RegisterLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex items-center justify-center p-2 max-w-xl mx-auto min-h-screen">
      {children}
    </div>
  );
};

export default RegisterLayout;
