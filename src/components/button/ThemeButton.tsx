const ThemeButton = ({ children, addClass }: IThemeButton) => {
  return (
    <button
      className={`w-[200px] h-10 border-theme/50 border-[2px] bg-theme/10 hover:bg-theme/20 transition-all duration-150 rounded-[5px] flex items-center justify-center text-theme text-base font-semibold ${
        addClass ?? ''
      }`}
    >
      {children}
    </button>
  );
};

export default ThemeButton;
