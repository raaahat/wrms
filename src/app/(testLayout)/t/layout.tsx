const RegisterLayou = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex max-h-screen  border-emerald-500 max-w-[100vw] pb-3 pr-3">
      <div className="bg-blue-800 w-32 h-screen">hgfhgf</div>
      <div className="border border-red-300 bg-yellow-500 flex-1 flex flex-col overflow-auto">
        <div className="flex-1 overflow-auto p-5">{children}</div>
      </div>
    </div>
  );
};

export default RegisterLayou;
