const ThemeButton = ({
  children,
  addClass,
  onClick,
  disabled,
}: IThemeButton) => {
  return (
    <button
      onClick={onClick ?? undefined}
      className={`w-[140px] xl:w-[200px] h-8 xl:h-10 transition-all duration-150 rounded-[5px] flex items-center justify-center text-sm xl:text-base font-semibold border-[2px] outline-none ${
        disabled
          ? 'cursor-not-allowed bg-color-dark/60 border-color-dark/50 text-white'
          : 'bg-theme/10 hover:bg-theme/20 border-theme/50  text-theme'
      } ${addClass ?? ''}`}
      disabled={disabled ? true : false}
    >
      {children}
    </button>
  );
};

export default ThemeButton;
