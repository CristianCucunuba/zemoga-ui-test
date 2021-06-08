import { ButtonHTMLAttributes } from "react";

interface ThumbDownProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: string;
}

function ThumbDown({
  className = "",
  size = "w-4 h-4",
  ...props
}: ThumbDownProps) {
  return (
    <button
      className={`bg-[#f9ad1d] p-2 ${className} focus:outline-none`}
      type="button"
      aria-label="downvote"
      {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        className={`${size} mx-auto`}
        fill="none">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M28.36 20.008c-4.36 6.073-5.907 7.803-5.649 11.318.258 3.515-.48 4.482-2.237 4.655-1.757.173-5.055-.733-5.634-6.487-.25-2.489 1.629-7.39 1.629-7.39L3.32 22.099c-1.862 0-3.32-.754-3.32-3.155 0-2.25 2.63-2.927 2.63-2.927-1.043-.444-1.705-1.433-1.683-2.514-.006-1.526 1.291-2.77 2.905-2.785-1.104-.42-1.734-1.523-1.5-2.625.2-1.322 1.282-2.369 2.674-2.589-.911-.61-1.288-1.715-.925-2.714C4.69 1.471 6.249.017 9.75.017H26.1c.973-.116 1.918.363 2.353 1.194v18.062c.006.248-.025.496-.093.735zM36 21.17h-6.396V.021H36V21.17z"
          clipRule="evenodd"></path>
      </svg>
    </button>
  );
}

export default ThumbDown;
