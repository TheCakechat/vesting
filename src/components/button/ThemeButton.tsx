const ThemeButton = ({
  children,
  addClass,
  onClick,
  disabled,
}: IThemeButton) => {
  return (
    <button
      onClick={onClick ?? undefined}
      className={`w-[140px] xl:w-[200px] h-8 xl:h-10 border-theme/50 border-[2px] transition-all duration-150 rounded-[5px] flex items-center justify-center text-theme text-sm xl:text-base font-semibold ${
        disabled
          ? 'cursor-not-allowed bg-theme/20'
          : 'bg-theme/10 hover:bg-theme/20'
      } ${addClass ?? ''}`}
      disabled={disabled ? true : false}
    >
      {children}
    </button>
  );
};

export default ThemeButton;
